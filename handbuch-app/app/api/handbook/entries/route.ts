import { NextResponse } from 'next/server';

import { atCreate, atList, atUpdate } from '../../../lib/airtable';
import type { Entry } from '../../../lib/types';
import { verify } from '../../../lib/auth';

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

function ensureTableName(envValue: string | undefined, fallbackName: string) {
  if (!envValue) {
    throw new Error(`Missing required env var ${fallbackName}`);
  }
  return envValue;
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
    console.error('[entries] failed to load data', error);
    const message = error instanceof Error ? error.message : 'Unable to load entries';
    return NextResponse.json({ error: message }, { status: 500 });
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
    console.error('[entries] failed to save entry', error);
    const message = error instanceof Error ? error.message : 'Unable to save entry';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
