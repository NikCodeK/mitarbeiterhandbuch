import { NextResponse } from 'next/server';

import { atList } from '../../../../lib/airtable';

function requireEnv(key: string) {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required env var ${key}`);
  }
  return value;
}

export async function GET() {
  try {
    console.log('[health] env status', {
      hasApiKey: Boolean(process.env.AIRTABLE_API_KEY),
      hasBaseId: Boolean(process.env.AIRTABLE_BASE_ID),
      parentsTable: process.env.AIRTABLE_PARENTS,
      entriesTable: process.env.AIRTABLE_ENTRIES,
    });

    requireEnv('AIRTABLE_API_KEY');
    requireEnv('AIRTABLE_BASE_ID');
    const parentsTable = requireEnv('AIRTABLE_PARENTS');
    const entriesTable = requireEnv('AIRTABLE_ENTRIES');

    const parentsResponse = await atList<{ records?: unknown[] }>(parentsTable, {
      maxRecords: 1,
    });
    const entriesResponse = await atList<{ records?: unknown[] }>(entriesTable, {
      maxRecords: 1,
    });

    const parentsCount = Array.isArray(parentsResponse.records)
      ? parentsResponse.records.length
      : 0;
    const entriesCount = Array.isArray(entriesResponse.records)
      ? entriesResponse.records.length
      : 0;

    return NextResponse.json({
      ok: true,
      parents: { table: parentsTable, sampleCount: parentsCount },
      entries: { table: entriesTable, sampleCount: entriesCount },
    });
  } catch (error) {
    console.error('[health] Airtable connectivity check failed', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
