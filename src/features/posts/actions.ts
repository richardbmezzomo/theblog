"use server"
import { eq } from "drizzle-orm"
import type { Route } from "next"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { z } from "zod"
import { db } from "@/db"
import { posts } from "@/db/schema"
import { getSession } from "@/lib/session"

export type ActionState = { success: boolean; error?: string } | null

const createPostSchema = z.object({
  title: z.string().min(2).max(100),
  coverImageUrl: z.url().min(2).max(200),
  slug: z.string().min(2).max(100),
  excerpt: z.string().min(2).max(200),
  content: z.string().min(500).max(50000),
  published: z.boolean().default(false),
})

const updatePostSchema = z.object({
  id: z.uuid(),
  title: z.string().min(2).max(100),
  coverImageUrl: z.url().min(2).max(200),
  slug: z.string().min(2).max(100),
  excerpt: z.string().min(2).max(200),
  content: z.string().min(500).max(50000),
  published: z.boolean().default(false),
})

const deletePostSchema = z.object({
  id: z.uuid(),
})

export const createPost = async (
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> => {
  const session = await getSession()

  if (!session.isAdmin) {
    return { success: false, error: "Unauthorized." }
  }

  const result = createPostSchema.safeParse({
    title: formData.get("title"),
    coverImageUrl: formData.get("coverImageUrl"),
    slug: formData.get("slug"),
    excerpt: formData.get("excerpt"),
    content: formData.get("content"),
    published: formData.get("published") === "true",
  })

  if (!result.success) {
    return { success: false, error: result.error.issues[0].message }
  }

  await db.insert(posts).values({
    title: result.data.title,
    content: result.data.content,
    coverImageUrl: result.data.coverImageUrl,
    slug: result.data.slug,
    excerpt: result.data.excerpt,
    published: result.data.published,
  })

  redirect(`/admin/posts/${result.data.slug}` as Route)
}

export const updatePost = async (
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> => {
  const session = await getSession()

  if (!session.isAdmin) {
    return { success: false, error: "Unauthorized." }
  }

  const result = updatePostSchema.safeParse({
    id: formData.get("id"),
    title: formData.get("title"),
    coverImageUrl: formData.get("coverImageUrl"),
    slug: formData.get("slug"),
    excerpt: formData.get("excerpt"),
    content: formData.get("content"),
    published: formData.get("published") === "true",
  })

  if (!result.success) {
    return { success: false, error: result.error.issues[0].message }
  }

  await db
    .update(posts)
    .set({
      title: result.data.title,
      content: result.data.content,
      coverImageUrl: result.data.coverImageUrl,
      slug: result.data.slug,
      excerpt: result.data.excerpt,
      published: result.data.published,
    })
    .where(eq(posts.id, result.data.id))

  revalidatePath("/admin/posts")
  revalidatePath(`/admin/posts/${result.data.slug}`)

  return { success: true }
}

export const deletePost = async (
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> => {
  const session = await getSession()

  if (!session.isAdmin) {
    return { success: false, error: "Unauthorized." }
  }

  const result = deletePostSchema.safeParse({
    id: formData.get("id"),
  })

  if (!result.success) {
    return { success: false, error: result.error.issues[0].message }
  }

  await db.delete(posts).where(eq(posts.id, result.data.id))

  revalidatePath("/admin/posts")

  return { success: true }
}
