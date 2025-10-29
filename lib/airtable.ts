function requireEnv(name: string, value?: string) {
  const trimmed = value?.trim();
  if (!trimmed) {
    throw new Error(`Missing required env var ${name}`);
  }
  return trimmed;
}

const BASE_ID = requireEnv('AIRTABLE_BASE_ID', process.env.AIRTABLE_BASE_ID);
const API_KEY = requireEnv('AIRTABLE_API_KEY', process.env.AIRTABLE_API_KEY);
const BASE = `https://api.airtable.com/v0/${BASE_ID}`;

const HDRS = {
  Authorization: `Bearer ${API_KEY}`,
  'Content-Type': 'application/json',
};

type QueryValue = string | number | boolean | undefined;
type QueryMap = Record<string, QueryValue>;

const encode = (value: string) => encodeURIComponent(value);
const tableName = (name: string) => encode(name);

async function readJson<T>(input: RequestInfo | URL, init?: RequestInit): Promise<T> {
  const response = await fetch(input, init);
  if (!response.ok) {
    let detail = '';
    try {
      const payload = await response.json();
      const message = payload?.error?.message ?? payload?.error?.type;
      if (message) {
        detail = ` - ${message}`;
      }
    } catch {
      // ignore JSON parsing errors on failure responses
    }
    throw new Error(`[Airtable] ${response.status}${detail}`);
  }
  return response.json() as Promise<T>;
}

export async function atList<T = { records: { id: string; fields: Record<string, unknown> }[] }>(
  table: string,
  params: QueryMap = {},
): Promise<T> {
  const usp = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      usp.append(key, typeof value === 'string' ? value : String(value));
    }
  });

  const search = usp.toString();
  const url = search ? `${BASE}/${tableName(table)}?${search}` : `${BASE}/${tableName(table)}`;

  return readJson<T>(url, {
    headers: HDRS,
    cache: 'no-store',
  });
}

export async function atCreate<T = unknown>(table: string, fields: Record<string, unknown>): Promise<T> {
  return readJson<T>(`${BASE}/${tableName(table)}`, {
    method: 'POST',
    headers: HDRS,
    body: JSON.stringify({ records: [{ fields }] }),
  });
}

export async function atUpdate<T = unknown>(
  table: string,
  id: string,
  fields: Record<string, unknown>,
): Promise<T> {
  return readJson<T>(`${BASE}/${tableName(table)}`, {
    method: 'PATCH',
    headers: HDRS,
    body: JSON.stringify({ records: [{ id, fields }] }),
  });
}

export async function atGet<T = unknown>(table: string, id: string): Promise<T> {
  return readJson<T>(`${BASE}/${tableName(table)}/${id}`, {
    headers: HDRS,
    cache: 'no-store',
  });
}
