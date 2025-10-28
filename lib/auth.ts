const COOKIE_TTL_MS = 24 * 60 * 60 * 1000

const encoder = new TextEncoder()

interface CachedKey {
  secret: string
  promise: Promise<CryptoKey>
}

let cachedKey: CachedKey | null = null

function resolveSecret(optional = false): string | null {
  const secret = process.env.APP_SECRET?.trim() ?? ""
  if (!secret) {
    if (optional) {
      return null
    }
    throw new Error("APP_SECRET environment variable is not set.")
  }
  if (secret.length < 32) {
    if (optional) {
      return null
    }
    throw new Error("APP_SECRET must be at least 32 characters long.")
  }
  return secret
}

function requireSecret() {
  return resolveSecret()!
}

function getSubtleCrypto() {
  const subtle = globalThis.crypto?.subtle
  if (!subtle) {
    throw new Error("Web Crypto API (crypto.subtle) is not available in this environment.")
  }
  return subtle
}

function importKey(secret: string) {
  if (cachedKey?.secret === secret) {
    return cachedKey.promise
  }

  const subtle = getSubtleCrypto()
  const keyPromise = subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  )
  cachedKey = { secret, promise: keyPromise }
  return keyPromise
}

function hexFromBuffer(buffer: ArrayBuffer) {
  const bytes = new Uint8Array(buffer)
  let hex = ""
  for (let i = 0; i < bytes.length; i++) {
    hex += bytes[i].toString(16).padStart(2, "0")
  }
  return hex
}

function constantTimeEqual(a: string, b: string) {
  if (a.length !== b.length) {
    return false
  }
  let mismatch = 0
  for (let i = 0; i < a.length; i++) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i)
  }
  return mismatch === 0
}

export interface AdminSession {
  u: string
  exp: number
}

export async function sign(value: string) {
  const secret = requireSecret()
  const key = await importKey(secret)
  const subtle = getSubtleCrypto()
  const signatureBuffer = await subtle.sign("HMAC", key, encoder.encode(value))
  const signature = hexFromBuffer(signatureBuffer)
  return `${value}.${signature}`
}

export async function verify(signed: string): Promise<AdminSession | null> {
  const secret = resolveSecret(true)
  if (!secret) {
    return null
  }
  const idx = signed.lastIndexOf(".")
  if (idx < 0) {
    return null
  }
  const value = signed.slice(0, idx)
  const signature = signed.slice(idx + 1)

  const key = await importKey(secret)
  const subtle = getSubtleCrypto()
  const expectedBuffer = await subtle.sign("HMAC", key, encoder.encode(value))
  const expectedSignature = hexFromBuffer(expectedBuffer)

  if (!constantTimeEqual(signature, expectedSignature)) {
    return null
  }

  try {
    const payload = JSON.parse(value) as AdminSession
    if (!payload?.exp || Date.now() > payload.exp) {
      return null
    }
    return payload
  } catch {
    return null
  }
}

export async function createSessionToken(username: string, expiresAt = Date.now() + COOKIE_TTL_MS) {
  const payload = JSON.stringify({ u: username, exp: expiresAt })
  const token = await sign(payload)
  return { token, exp: expiresAt }
}
