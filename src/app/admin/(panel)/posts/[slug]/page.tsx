import { PostEditor } from "@/components/layout/PostEditor"
import { getPostBySlug } from "@/features/posts/queries"

export default async function EditPost({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  return <PostEditor post={post} />
}