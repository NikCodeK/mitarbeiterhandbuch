const DEFAULT_LOCAL_ORIGINS = ["http://localhost:3000", "http://127.0.0.1:3000"]

function parseAllowedOrigins(): Set<string> {
  const fromEnv =
    process.env.ADMIN_ALLOWED_ORIGINS?.split(",").map((value) => value.trim()) ||
    []
  const origins = new Set(fromEnv.filter(Boolean))

  if (process.env.NODE_ENV !== "production") {
    for (const origin of DEFAULT_LOCAL_ORIGINS) {
      origins.add(origin)
    }
  }

  return origins
}

const allowedOrigins = parseAllowedOrigins()

function resolveAllowedOrigin(request: Request) {
  const requestOrigin = request.headers.get("origin")
  if (!requestOrigin) {
    return null
  }

  const url = new URL(request.url)
  if (requestOrigin === url.origin) {
    return requestOrigin
  }

  if (allowedOrigins.has("*") || allowedOrigins.has(requestOrigin)) {
    return requestOrigin
  }

  return null
}

function appendVaryHeader(headers: Record<string, string>, value: string) {
  const existing = headers["Vary"]
  headers["Vary"] = existing ? `${existing}, ${value}` : value
}

export function corsHeaders(request: Request) {
  const origin = resolveAllowedOrigin(request)
  if (!origin) {
    return null
  }

  const headers: Record<string, string> = {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Credentials": "true",
  }
  appendVaryHeader(headers, "Origin")
  return headers
}

export function preflightHeaders(request: Request) {
  const headers = corsHeaders(request)
  if (!headers) {
    return null
  }

  const requestedHeaders =
    request.headers.get("access-control-request-headers") || "Content-Type"

  headers["Access-Control-Allow-Methods"] = "POST, OPTIONS"
  headers["Access-Control-Allow-Headers"] = requestedHeaders
  headers["Access-Control-Max-Age"] = "86400"
  appendVaryHeader(headers, "Access-Control-Request-Headers")

  return headers
}
