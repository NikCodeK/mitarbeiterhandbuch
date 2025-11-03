#!/usr/bin/env node

/**
 * Hits the Next.js health endpoint (`/api/handbook/health`) and prints the result.
 * Assumes the dev server is running (default: http://localhost:3000).
 *
 * Usage:
 *   pnpm check:health             # uses default base URL
 *   HANDBOOK_BASE_URL=http://localhost:3001 pnpm check:health
 */

const baseUrl = process.env.HANDBOOK_BASE_URL || 'http://localhost:3001';
const endpoint = `${baseUrl.replace(/\/$/, '')}/api/handbook/health`;

async function main() {
  try {
    console.log(`Checking handbook health at ${endpoint} ...`);
    const response = await fetch(endpoint, { cache: 'no-store' });
    const payload = await response.json().catch(() => null);

    if (!response.ok) {
      throw new Error(payload?.error || `HTTP ${response.status}`);
    }

    console.log('✅ Airtable-Verbindung OK');
    console.log(JSON.stringify(payload, null, 2));
  } catch (error) {
    console.error('❌ Health-Check fehlgeschlagen:');
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  }
}

await main();
