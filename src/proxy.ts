import { type NextRequest, NextResponse } from "next/server"
import { getSession } from "./lib/session"

export async function proxy(request: NextRequest) {
  const session = await getSession()
  console.log("Session", session)

  if (!session.isAdmin) {
    return NextResponse.redirect(new URL("/admin/login", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin", "/admin/((?!login).*)"],
}
