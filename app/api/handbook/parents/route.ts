import { NextResponse } from 'next/server';

import { atCreate, atList, atUpdate } from '../../../lib/airtable';
import type { Parent } from '../../../lib/types';
import { verify } from '../../../lib/auth';

type AirtableRecord = {
  id: string;
  fields: {
    slug?: string;
    title?: string;
    sort?: number;
    published?: boolean;
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

export async function GET() {
  try {
    const table = ensureTableName(process.env.AIRTABLE_PARENTS, 'AIRTABLE_PARENTS');
    const { records } = await atList<{ records: AirtableRecord[] }>(table, {
      sort: '[{"field":"sort","direction":"asc"}]',
    });

    const parents: Parent[] = (records ?? [])
      .map((record) => ({
        id: record.id,
        slug: record.fields.slug ?? '',
        title: record.fields.title ?? record.fields.slug ?? '',
        sort: record.fields.sort,
        published: Boolean(record.fields.published),
      }))
      .filter((parent) => parent.slug && parent.title)
      .sort((a, b) => (a.sort ?? 0) - (b.sort ?? 0));

    return NextResponse.json({ parents });
  } catch (error) {
    console.error('[parents] failed to load data', error);
    const message = error instanceof Error
      ? error.message
      : typeof error === 'string'
        ? error
        : JSON.stringify(error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

type ParentPayload = {
  id?: string;
  slug?: string;
  title?: string;
  sort?: number;
  published?: boolean;
};

export async function POST(request: Request) {
  try {
    const session = await readAdminSession(request);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let payload: ParentPayload = {};
    try {
      payload = await request.json();
    } catch {
      // ignore malformed bodies
    }

    const { id, slug, title, sort, published } = payload;
    const table = ensureTableName(process.env.AIRTABLE_PARENTS, 'AIRTABLE_PARENTS');
    const fields: Record<string, unknown> = {};

    if (slug !== undefined) fields.slug = slug;
    if (title !== undefined) fields.title = title;
    if (sort !== undefined) fields.sort = sort;
    if (published !== undefined) fields.published = published;

    if (!id) {
      const response = await atCreate<{ records?: { id?: string }[] }>(table, fields);
      const newId = response.records?.[0]?.id;
      return NextResponse.json({ ok: true, id: newId });
    }

    await atUpdate(table, id, fields);
    return NextResponse.json({ ok: true, id });
  } catch (error) {
    console.error('[parents] failed to save data', error);
    return NextResponse.json({ error: 'Unable to save parent' }, { status: 500 });
  }
}
