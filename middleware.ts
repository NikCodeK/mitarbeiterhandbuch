import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

import { verify } from "./lib/auth"

const COOKIE_NAME = "admin_session"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (!pathname.startsWith("/admin")) {
    return NextResponse.next()
  }

  if (pathname.startsWith("/admin/login")) {
    return NextResponse.next()
  }

  const cookie = request.cookies.get(COOKIE_NAME)?.value
  const payload = cookie ? await verify(cookie) : null
  if (!payload) {
    const url = request.nextUrl.clone()
    url.pathname = "/admin/login"
    url.searchParams.set("next", pathname)
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
