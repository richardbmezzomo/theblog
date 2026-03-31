import { getIronSession } from "iron-session"
import { cookies } from "next/headers"

export interface SessionData {
  isAdmin: boolean
}

export async function getSession() {
  const secret = process.env.SESSION_SECRET

  if (!secret) {
    throw new Error("SESSION_SECRET is not defined")
  }

  const session = await getIronSession<SessionData>(await cookies(), {
    password: secret,
    cookieName: "blog_session",
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
    },
  })

  return session
}
