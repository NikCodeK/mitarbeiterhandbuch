export class AirtableConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AirtableConfigError';
  }
}

export class AirtableRateLimitError extends Error {
  retryAfter?: number;

  constructor(message: string, retryAfter?: number) {
    super(message);
    this.name = 'AirtableRateLimitError';
    this.retryAfter = retryAfter;
  }
}

type AirtableConfig = {
  baseUrl: string;
  headers: Record<string, string>;
};

let cachedConfig: AirtableConfig | null = null;

const MAX_RETRY_ATTEMPTS = 3;
const FALLBACK_RETRY_DELAY_MS = 1000;

function resolveConfig(): AirtableConfig {
  if (cachedConfig) {
    return cachedConfig;
  }

  const baseId = process.env.AIRTABLE_BASE_ID?.trim();
  const apiKey = process.env.AIRTABLE_API_KEY?.trim();

  if (!baseId || !apiKey) {
    throw new AirtableConfigError(
      'Airtable configuration missing (set AIRTABLE_BASE_ID and AIRTABLE_API_KEY).',
    );
  }

  cachedConfig = {
    baseUrl: `https://api.airtable.com/v0/${encodeURIComponent(baseId)}`,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
  };

  return cachedConfig;
}

export function isAirtableConfigured() {
  try {
    resolveConfig();
    return true;
  } catch (error) {
    if (error instanceof AirtableConfigError) {
      return false;
    }
    throw error;
  }
}

type QueryValue = string | number | boolean | undefined;
type QueryMap = Record<string, QueryValue>;

const encode = (value: string) => encodeURIComponent(value);
const tableName = (name: string) => encode(name);

function parseRetryAfter(value: string | null): number | undefined {
  if (!value) {
    return undefined;
  }
  const asNumber = Number(value);
  if (Number.isFinite(asNumber) && asNumber >= 0) {
    return asNumber;
  }
  const date = Date.parse(value);
  if (Number.isFinite(date)) {
    const delta = date - Date.now();
    return delta > 0 ? delta / 1000 : 0;
  }
  return undefined;
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function readJson<T>(
  input: RequestInfo | URL,
  init?: RequestInit,
  attempt = 1,
): Promise<T> {
  const response = await fetch(input, init);
  if (!response.ok) {
    if (response.status === 429) {
      const retryAfterSeconds = parseRetryAfter(response.headers.get('retry-after'));
      if (attempt < MAX_RETRY_ATTEMPTS) {
        const safeRetrySeconds = retryAfterSeconds ?? 0;
        const retryDelayMs = safeRetrySeconds > 0
          ? safeRetrySeconds * 1000
          : FALLBACK_RETRY_DELAY_MS * attempt;
        await delay(retryDelayMs);
        return readJson<T>(input, init, attempt + 1);
      }
      throw new AirtableRateLimitError(
        '[Airtable] 429 - Too Many Requests',
        retryAfterSeconds,
      );
    }

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
  const { baseUrl, headers } = resolveConfig();
  const url = search ? `${baseUrl}/${tableName(table)}?${search}` : `${baseUrl}/${tableName(table)}`;

  return readJson<T>(url, {
    headers,
    cache: 'no-store',
  });
}

export async function atCreate<T = unknown>(table: string, fields: Record<string, unknown>): Promise<T> {
  const { baseUrl, headers } = resolveConfig();
  return readJson<T>(`${baseUrl}/${tableName(table)}`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ records: [{ fields }] }),
  });
}

export async function atUpdate<T = unknown>(
  table: string,
  id: string,
  fields: Record<string, unknown>,
): Promise<T> {
  const { baseUrl, headers } = resolveConfig();
  return readJson<T>(`${baseUrl}/${tableName(table)}`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({ records: [{ id, fields }] }),
  });
}

export async function atGet<T = unknown>(table: string, id: string): Promise<T> {
  const { baseUrl, headers } = resolveConfig();
  return readJson<T>(`${baseUrl}/${tableName(table)}/${id}`, {
    headers,
    cache: 'no-store',
  });
}

export async function atDelete<T = unknown>(table: string, id: string): Promise<T> {
  const { baseUrl, headers } = resolveConfig();
  return readJson<T>(`${baseUrl}/${tableName(table)}/${id}`, {
    method: 'DELETE',
    headers,
  });
}
