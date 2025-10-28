import { NextResponse } from "next/server"

import { createSessionToken } from "@/lib/auth"

const DEFAULT_USERNAME = "AD"
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

export async function POST(request: Request) {
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
      { status: 401 }
    )
  }

  let tokenData
  try {
    tokenData = await createSessionToken(expectedUsername)
  } catch (error) {
    console.error("Failed to create admin session:", error)
    return NextResponse.json(
      { error: "Serverkonfiguration fehlt. Bitte APP_SECRET setzen." },
      { status: 500 }
    )
  }
  const { token, exp } = tokenData
  const secure = isSecure()
  const sameSite = resolveSameSite(secure)

  const response = NextResponse.json({ ok: true })
  response.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure,
    sameSite,
    path: "/",
    expires: new Date(exp),
  })
  return response
}
