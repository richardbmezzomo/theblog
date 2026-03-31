"use server"

import { redirect } from "next/navigation"
import { getSession } from "@/lib/session"

export async function login(formData: FormData) {
  const password = formData.get("password") as string

  await new Promise((resolve) => setTimeout(resolve, 500))

  if (password !== process.env.ADMIN_PASSWORD) {
    return
  }

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
