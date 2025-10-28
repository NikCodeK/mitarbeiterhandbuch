import { NextResponse } from "next/server"

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

export async function POST() {
  const secure = isSecure()
  const response = NextResponse.json({ ok: true })
  response.cookies.set(COOKIE_NAME, "", {
    httpOnly: true,
    secure,
    sameSite: resolveSameSite(secure),
    path: "/",
    expires: new Date(0),
  })
  return response
}
