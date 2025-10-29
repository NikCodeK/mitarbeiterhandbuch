import { NextResponse } from 'next/server';

import { atGet, atUpdate } from '../../../../../lib/airtable';
import type { Entry } from '../../../../../lib/types';
import { verify } from '../../../../../lib/auth';

type AirtableEntry = {
  id?: string;
  fields?: {
    parent?: string[] | string;
    parent_slug?: string;
    slug?: string;
    title?: string;
    content_md?: string;
    sort?: number;
    status?: string;
  };
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

function mapRecord(record: AirtableEntry): Entry {
  const parentField = record.fields?.parent;
  const parentId = Array.isArray(parentField)
    ? parentField[0]
    : parentField;
  const parentSlugField = record.fields?.parent_slug;
  const parentSlug = Array.isArray(parentSlugField)
    ? parentSlugField[0]
    : typeof parentSlugField === 'string'
      ? parentSlugField
      : undefined;

  return {
    id: record.id ?? '',
    parentId: parentId ?? '',
    parentSlug,
    slug: record.fields?.slug ?? '',
    title: record.fields?.title ?? '',
    content_md: record.fields?.content_md,
    sort: record.fields?.sort,
    status: record.fields?.status as Entry['status'],
  };
}

export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const table = ensureTableName(process.env.AIRTABLE_ENTRIES, 'AIRTABLE_ENTRIES');
    const record = await atGet<AirtableEntry>(table, id);
    const entry = mapRecord(record);
    return NextResponse.json({ entry });
  } catch (error) {
    console.error('[entry] failed to load record', error);
    return NextResponse.json({ error: 'Unable to load entry' }, { status: 500 });
  }
}

type EntryPayload = {
  slug?: string;
  title?: string;
  content_md?: string;
  sort?: number;
  status?: Entry['status'];
  parentId?: string;
};

export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const session = await readAdminSession(request);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await context.params;

    let payload: EntryPayload = {};
    try {
      payload = await request.json();
    } catch {
      // ignore malformed payloads for PoC simplicity
    }

    const { slug, title, content_md, sort, status, parentId } = payload;
    const table = ensureTableName(process.env.AIRTABLE_ENTRIES, 'AIRTABLE_ENTRIES');
    const fields: Record<string, unknown> = {};

    // slug field doesn't exist in Airtable - it's computed as parent_slug
    if (title !== undefined) fields.title = title;
    if (content_md !== undefined) fields.content_md = content_md;
    if (sort !== undefined) fields.sort = sort;
    if (status !== undefined) fields.status = status;
    if (parentId !== undefined) {
      fields.parent = parentId ? [parentId] : [];
    }

    await atUpdate(table, id, fields);
    return NextResponse.json({ ok: true, id });
  } catch (error) {
    console.error('[entry] failed to save record', error);
    return NextResponse.json({ error: 'Unable to save entry' }, { status: 500 });
  }
}
