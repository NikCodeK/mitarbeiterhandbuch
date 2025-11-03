import { NextResponse } from "next/server"

import { corsHeaders, preflightHeaders } from "@/lib/cors"

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

  const secure = isSecure()
  const response = NextResponse.json(
    { ok: true },
    { headers: headers ?? undefined }
  )
  response.cookies.set(COOKIE_NAME, "", {
    httpOnly: true,
    secure,
    sameSite: resolveSameSite(secure),
    path: "/",
    expires: new Date(0),
  })
  return response
}
