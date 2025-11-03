import { NextResponse } from 'next/server';

import { AirtableConfigError, AirtableRateLimitError, atCreate, atList, atUpdate } from '../../../../lib/airtable';
import type { Entry } from '../../../../lib/types';
import { verify } from '../../../../lib/auth';

type AirtableEntryFields = Record<string, unknown> & {
  parent?: string[] | string;
  parent_slug?: string;
  title?: string;
  content_md?: string;
  sort?: number;
  status?: string;
};

type AirtableEntryRecord = {
  id: string;
  fields: AirtableEntryFields;
};

const ENTRY_SLUG_FIELD = process.env.AIRTABLE_ENTRY_SLUG_FIELD?.trim();

const STATUS_TO_AIRTABLE: Record<NonNullable<Entry['status']>, string> = {
  Draft: 'Draft ',
  Published: 'Published ',
};

function ensureTableName(envValue: string | undefined, envKey: string) {
  const value = envValue?.trim();
  if (!value) {
    throw new AirtableConfigError(`Missing required env var ${envKey}`);
  }
  return value;
}

async function readAdminSession(req: Request) {
  const cookies = req.headers.get('cookie') || '';
  const cookie = cookies
    .split(';')
    .map((item) => item.trim())
    .find((item) => item.startsWith('admin_session='));

  if (!cookie) {
    return null;
  }

  try {
    const value = decodeURIComponent(cookie.split('=')[1] ?? '');
    return await verify(value);
  } catch {
    return null;
  }
}

function readEntrySlug(fields: AirtableEntryFields): string {
  if (ENTRY_SLUG_FIELD && typeof fields[ENTRY_SLUG_FIELD] === 'string') {
    return fields[ENTRY_SLUG_FIELD] as string;
  }
  if (typeof fields.slug === 'string') {
    return fields.slug;
  }
  const alt = fields.Slug;
  if (typeof alt === 'string') {
    return alt;
  }
  return '';
}

function mapRecord(record: AirtableEntryRecord): Entry {
  const fields = record.fields;
  const parentField = fields.parent;
  const parentId = Array.isArray(parentField)
    ? parentField[0]
    : parentField;
  const parentSlugField = fields.parent_slug;
  const parentSlug = Array.isArray(parentSlugField)
    ? parentSlugField[0]
    : typeof parentSlugField === 'string'
      ? parentSlugField
      : undefined;

  return {
    id: record.id,
    parentId: parentId ?? '',
    parentSlug,
    slug: readEntrySlug(fields),
    title: fields.title ?? '',
    content_md: fields.content_md,
    sort: fields.sort,
    status: typeof fields.status === 'string'
      ? (fields.status.trim() as Entry['status'])
      : undefined,
  };
}

export async function GET(request: Request) {
  const debugEnv = {
    hasApiKey: Boolean(process.env.AIRTABLE_API_KEY),
    hasBaseId: Boolean(process.env.AIRTABLE_BASE_ID),
    entriesTable: process.env.AIRTABLE_ENTRIES,
  };
  console.log('[entries] env status', debugEnv);

  try {
    const parentSlug = new URL(request.url).searchParams.get('parent') ?? undefined;
    const session = await readAdminSession(request);
    const table = ensureTableName(process.env.AIRTABLE_ENTRIES, 'AIRTABLE_ENTRIES');

    const response = await atList<{ records: AirtableEntryRecord[] }>(table);

    const entries = (response.records ?? [])
      .map(mapRecord)
      .filter((entry) => entry.title && entry.title.trim() !== '')
      .filter((entry) => {
        const status = entry.status?.trim();
        if (!session && status !== 'Published') {
          return false;
        }
        if (parentSlug) {
          const normalizedEntrySlug = entry.parentSlug?.toLowerCase();
          const normalizedTarget = parentSlug.toLowerCase();
          return normalizedEntrySlug === normalizedTarget;
        }
        return true;
      })
      .sort((a, b) => (a.sort ?? 0) - (b.sort ?? 0));

    return NextResponse.json({ entries });
  } catch (error) {
    if (error instanceof AirtableConfigError) {
      console.warn('[entries] missing Airtable configuration', error.message);
      return NextResponse.json(
        {
          entries: [],
          warning: error.message,
          requiresConfig: true,
        },
        { status: 200 },
      );
    }
    if (error instanceof AirtableRateLimitError) {
      console.warn('[entries] rate limited', error.message);
      return NextResponse.json(
        {
          entries: [],
          warning: 'Airtable-Rate-Limit erreicht. Bitte kurz warten und erneut versuchen.',
          rateLimited: true,
          retryAfter: error.retryAfter ?? null,
        },
        { status: 200 },
      );
    }
    console.error('[entries] failed to load data', error);
    const message = error instanceof Error ? error.message : 'Unable to load entries';
    return NextResponse.json(
      {
        entries: [],
        error: message,
      },
      { status: 200 },
    );
  }
}

type EntryPayload = {
  id?: string;
  parentId?: string;
  slug?: string;
  title?: string;
  content_md?: string;
  sort?: number;
  status?: Entry['status'];
};

export async function POST(request: Request) {
  try {
    const session = await readAdminSession(request);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let payload: EntryPayload = {};
    try {
      payload = await request.json();
    } catch {
      // ignore malformed bodies to keep PoC resilient
    }

    const { id, parentId, slug, title, content_md, sort, status } = payload;
    const table = ensureTableName(process.env.AIRTABLE_ENTRIES, 'AIRTABLE_ENTRIES');
    const fields: Record<string, unknown> = {};

    if (ENTRY_SLUG_FIELD && slug !== undefined) {
      fields[ENTRY_SLUG_FIELD] = slug;
    }
    if (title !== undefined) fields.title = title;
    if (content_md !== undefined) fields.content_md = content_md;
    if (sort !== undefined) fields.sort = sort;
    if (status !== undefined) {
      fields.status = STATUS_TO_AIRTABLE[status] ?? status;
    }
    if (parentId !== undefined) {
      fields.parent = parentId ? [parentId] : [];
    }

    if (id) {
      await atUpdate(table, id, fields);
      return NextResponse.json({ ok: true, id });
    }

    const response = await atCreate<{ records?: { id?: string }[] }>(table, fields);
    const newId = response.records?.[0]?.id;

    return NextResponse.json({ ok: true, id: newId });
  } catch (error) {
    if (error instanceof AirtableConfigError) {
      return NextResponse.json(
        { error: error.message, requiresConfig: true },
        { status: 503 },
      );
    }
    if (error instanceof AirtableRateLimitError) {
      return NextResponse.json(
        {
          error: 'Airtable-Rate-Limit erreicht. Bitte speichere später erneut.',
          rateLimited: true,
          retryAfter: error.retryAfter ?? null,
        },
        { status: 429 },
      );
    }
    console.error('[entries] failed to save entry', error);
    const message = error instanceof Error ? error.message : 'Unable to save entry';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
