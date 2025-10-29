import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { atGet, atUpdate } from '@/lib/airtable';
import { verify } from '@/lib/auth';
import type { Entry } from '@/lib/types';

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

async function readAdminSession(req: NextRequest) {
  const value = req.cookies.get('admin_session')?.value;
  if (!value) {
    return null;
  }

  try {
    return await verify(value);
  } catch {
    return null;
  }
}

export async function GET(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const table = ensureTableName(process.env.AIRTABLE_ENTRIES, 'AIRTABLE_ENTRIES');
    const record = await atGet<AirtableEntry>(table, id);

    const parentField = record.fields?.parent;
    const parentId = Array.isArray(parentField) ? parentField[0] : parentField;

    const entry: Entry = {
      id: record.id ?? '',
      parentId: parentId ?? '',
      parentSlug: record.fields?.parent_slug,
      slug: record.fields?.slug ?? '',
      title: record.fields?.title ?? '',
      content_md: record.fields?.content_md,
      sort: record.fields?.sort,
      status: record.fields?.status as Entry['status'],
    };

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

export async function POST(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const session = await readAdminSession(request);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let payload: EntryPayload = {};
    try {
      payload = await request.json();
    } catch {
      // ignore malformed payloads for PoC simplicity
    }

    const { id } = await context.params;
    const { slug, title, content_md, sort, status, parentId } = payload;
    const table = ensureTableName(process.env.AIRTABLE_ENTRIES, 'AIRTABLE_ENTRIES');
    const fields: Record<string, unknown> = {};

    if (slug !== undefined && process.env.AIRTABLE_ENTRY_SLUG_FIELD) {
      fields[process.env.AIRTABLE_ENTRY_SLUG_FIELD] = slug;
    }
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
