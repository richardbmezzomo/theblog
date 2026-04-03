"use server"

import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { checkRateLimit, resetRateLimit } from "@/lib/rate-limit"
import { getSession } from "@/lib/session"

export async function login(
  _prevState: { error?: string } | null,
  formData: FormData
): Promise<{ error: string }> {
  const headersList = await headers()
  const ip = headersList.get("x-forwarded-for") ?? "unknown"

  const { allowed, retryAfterSeconds } = checkRateLimit(ip)

  if (!allowed) {
    const minutes = Math.ceil((retryAfterSeconds ?? 0) / 60)
    return { error: `Too many attempts. Try again in ${minutes} minute${minutes !== 1 ? "s" : ""}.` }
  }

  const password = formData.get("password") as string

  await new Promise((resolve) => setTimeout(resolve, 500))

  if (password !== process.env.ADMIN_PASSWORD) {
    return { error: "Incorrect password. Please try again." }
  }

  resetRateLimit(ip)

  const session = await getSession()
  session.isAdmin = true
  await session.save()

  redirect("/admin")
}

export async function logout() {
  const session = await getSession()
  session.destroy()
  redirect("/login")
}
