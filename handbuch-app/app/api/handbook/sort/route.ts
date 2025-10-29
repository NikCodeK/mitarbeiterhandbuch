import { NextResponse } from 'next/server';

import { atUpdate } from '../../../../../lib/airtable';
import { verify } from '../../../../../lib/auth';

const PARENT_TABLE = process.env.AIRTABLE_PARENTS;
const ENTRY_TABLE = process.env.AIRTABLE_ENTRIES;

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

function requireTable(name: string | undefined, envKey: string) {
  if (!name) {
    throw new Error(`Missing required env var ${envKey}`);
  }
  return name;
}

export async function POST(request: Request) {
  try {
    const session = await readAdminSession(request);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json().catch(() => ({}));
    const { fromId, fromSort, toId, toSort, level } = body ?? {};

    if (!fromId || !toId || fromSort === undefined || toSort === undefined) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    const table = level === 'parent'
      ? requireTable(PARENT_TABLE, 'AIRTABLE_PARENTS')
      : requireTable(ENTRY_TABLE, 'AIRTABLE_ENTRIES');

    await Promise.all([
      atUpdate(table, fromId, { sort: toSort }),
      atUpdate(table, toId, { sort: fromSort }),
    ]);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('[sort] failed to swap order', error);
    const message = error instanceof Error ? error.message : 'Unable to update order';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
