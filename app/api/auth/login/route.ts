import { NextResponse } from "next/server"

import { createSessionToken } from "@/lib/auth"
import { corsHeaders, preflightHeaders } from "@/lib/cors"

const DEFAULT_USERNAME = "admin"
const DEFAULT_PASSWORD = "admin123"
const COOKIE_NAME = "admin_session"

type SameSiteOption = "none" | "lax"

function resolveSameSite(isSecure: boolean): SameSiteOption {
  const value = (process.env.ADMIN_COOKIE_SAMESITE || "none").toLowerCase()
  if (value === "lax") {
    return "lax"
  }
  return isSecure ? "none" : "lax"
}

function isSecure() {
  return process.env.NODE_ENV !== "development"
}

export async function OPTIONS(request: Request) {
  const headers = preflightHeaders(request)
  if (!headers) {
    return NextResponse.json(
      { error: "Origin not allowed" },
      { status: 403 }
    )
  }

  return new NextResponse(null, { status: 204, headers })
}

export async function POST(request: Request) {
  const originHeader = request.headers.get("origin")
  const headers = corsHeaders(request)
  if (!headers && originHeader) {
    return NextResponse.json(
      { error: "Origin not allowed" },
      { status: 403 }
    )
  }

  let body: { username?: string; password?: string } = {}
  try {
    body = await request.json()
  } catch {
    // ignore malformed bodies
  }

  const expectedUsername = process.env.ADMIN_USERNAME || DEFAULT_USERNAME
  const expectedPassword = process.env.ADMIN_PASSWORD || DEFAULT_PASSWORD
  const { username, password } = body

  if (username !== expectedUsername || password !== expectedPassword) {
    return NextResponse.json(
      { error: "Ungültige Zugangsdaten" },
      { status: 401, headers: headers ?? undefined }
    )
  }

  let tokenData
  try {
    tokenData = await createSessionToken(expectedUsername)
  } catch (error) {
    console.error("Failed to create admin session:", error)
    return NextResponse.json(
      { error: "Serverkonfiguration fehlt. Bitte APP_SECRET setzen." },
      { status: 500, headers: headers ?? undefined }
    )
  }
  const { token, exp } = tokenData
  const secure = isSecure()
  const sameSite = resolveSameSite(secure)

  const response = NextResponse.json(
    { ok: true },
    { headers: headers ?? undefined }
  )
  response.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure,
    sameSite,
    path: "/",
    expires: new Date(exp),
  })
  return response
}
