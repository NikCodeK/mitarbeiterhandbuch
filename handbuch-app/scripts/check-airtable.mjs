#!/usr/bin/env node

/**
 * Quick sanity check for the Airtable setup used by the handbook app.
 * Loads .env.local (if present), then queries the Parents and Entries tables.
 * Usage: pnpm exec node scripts/check-airtable.mjs
 */

import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import process from 'node:process';

function loadEnvFile(fileName) {
  const path = resolve(process.cwd(), fileName);
  if (!existsSync(path)) {
    return;
  }

  const content = readFileSync(path, 'utf8');
  content.split('\n').forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) {
      return;
    }
    const idx = trimmed.indexOf('=');
    if (idx === -1) {
      return;
    }
    const key = trimmed.slice(0, idx).trim();
    const value = trimmed.slice(idx + 1).trim();
    if (!Object.prototype.hasOwnProperty.call(process.env, key)) {
      process.env[key] = value;
    }
  });
}

loadEnvFile('.env.local');

const requiredVars = ['AIRTABLE_API_KEY', 'AIRTABLE_BASE_ID', 'AIRTABLE_PARENTS', 'AIRTABLE_ENTRIES'];
const missing = requiredVars.filter((name) => !process.env[name]);

if (missing.length > 0) {
  console.error(`Missing env vars: ${missing.join(', ')}`);
  process.exit(1);
}

const { AIRTABLE_API_KEY, AIRTABLE_BASE_ID, AIRTABLE_PARENTS, AIRTABLE_ENTRIES } = process.env;

async function probeTable(tableName) {
  const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(tableName)}?maxRecords=1`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${AIRTABLE_API_KEY}`,
    },
  });

  const ok = response.ok;
  let payload;
  try {
    payload = await response.json();
  } catch {
    payload = null;
  }

  if (!ok) {
    throw new Error(`Airtable responded ${response.status} for table "${tableName}"${payload?.error ? `: ${payload.error.message ?? payload.error}` : ''}`);
  }

  const recordCount = Array.isArray(payload?.records) ? payload.records.length : 0;
  console.log(`✓ ${tableName}: reachable (${recordCount} record${recordCount === 1 ? '' : 's'} returned)`);
}

async function main() {
  try {
    console.log('Checking Airtable connectivity...');
    await probeTable(AIRTABLE_PARENTS);
    await probeTable(AIRTABLE_ENTRIES);
    console.log('All good. Airtable credentials and table names look valid.');
  } catch (error) {
    console.error('Airtable check failed:', error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

await main();
