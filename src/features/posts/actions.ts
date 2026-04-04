"use server"
import { and, eq, ne } from "drizzle-orm"
import type { Route } from "next"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { z } from "zod"
import { db } from "@/db"
import { posts } from "@/db/schema"
import { createSlug } from "@/lib/createSlug"
import { getSession } from "@/lib/session"

export type ActionState = { success: boolean; error?: string } | null

const createPostSchema = z.object({
  title: z.string().min(2).max(100),
  coverImageUrl: z.url().min(2).max(200),
  slug: z.string().min(2).max(100),
  excerpt: z.string().min(2).max(200),
  content: z.string().min(2).max(50000),
  published: z.boolean().default(false),
})

const updatePostSchema = z.object({
  id: z.uuid(),
  title: z.string().min(2).max(100),
  coverImageUrl: z.url().min(2).max(200),
  slug: z.string().min(2).max(100),
  excerpt: z.string().min(2).max(200),
  content: z.string().min(2).max(50000),
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
    slug: createSlug(formData.get("title") as string),
    excerpt: formData.get("excerpt"),
    content: formData.get("content"),
    published: formData.get("published") === "true",
  })

  if (!result.success) {
    return { success: false, error: result.error.issues[0].message }
  }

  const existingSlug = await db
    .select()
    .from(posts)
    .where(eq(posts.slug, result.data.slug))

  if (existingSlug.length > 0) {
    return { success: false, error: "Slug already exists. Change the title." }
  }

  await db.insert(posts).values({
    title: result.data.title,
    content: result.data.content,
    coverImageUrl: result.data.coverImageUrl,
    slug: result.data.slug,
    excerpt: result.data.excerpt,
    published: result.data.published,
  })

  revalidatePath("/")
  revalidatePath("/admin/posts")
  revalidatePath(`/${result.data.slug}`)

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
    slug: createSlug(formData.get("title") as string),
    excerpt: formData.get("excerpt"),
    content: formData.get("content"),
    published: formData.get("published") === "true",
  })

  if (!result.success) {
    return { success: false, error: result.error.issues[0].message }
  }

  const existingSlug = await db
    .select({ id: posts.id })
    .from(posts)
    .where(and(eq(posts.slug, result.data.slug), ne(posts.id, result.data.id)))

  if (existingSlug.length > 0) {
    return { success: false, error: "Slug already exists. Change the title." }
  }

  const currentPost = await db
    .select({ slug: posts.slug })
    .from(posts)
    .where(eq(posts.id, result.data.id))
    .limit(1)

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

  revalidatePath(`/admin/posts/${currentPost[0].slug}`)
  revalidatePath(`/admin/posts/${result.data.slug}`)
  revalidatePath(`/${currentPost[0].slug}`)
  revalidatePath(`/${result.data.slug}`)
  revalidatePath("/admin/posts")

  redirect(`/admin/posts/${result.data.slug}` as Route)
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

  const deletedPost = await db
    .select({ slug: posts.slug })
    .from(posts)
    .where(eq(posts.id, result.data.id))
    .limit(1)

  await db.delete(posts).where(eq(posts.id, result.data.id))

  if (deletedPost[0]) {
    revalidatePath(`/admin/posts/${deletedPost[0].slug}`)
    revalidatePath(`/${deletedPost[0].slug}`)
  }

  revalidatePath("/admin/posts")
  revalidatePath("/")

  return { success: true }
}
