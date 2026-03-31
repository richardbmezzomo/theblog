import { desc, eq } from "drizzle-orm"
import { db } from "@/db"
import { posts } from "@/db/schema"

// fetch all the posts created and published
export async function getAllPosts() {
  return await db
    .select()
    .from(posts)
    .where(eq(posts.published, true))
    .orderBy(desc(posts.createdAt))
}

// fetch a single post by slug
export async function getPostBySlug(slug: string) {
  const post = await db
    .select()
    .from(posts)
    .where(eq(posts.slug, slug))
    .limit(1)
  return post[0]
}
