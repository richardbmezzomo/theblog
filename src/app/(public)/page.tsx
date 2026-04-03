import { Container } from "@/components/layout/Container"
import PostsList from "@/components/layout/PostList"
import { getAllPublishedPosts } from "@/features/posts/queries"

export default async function Home() {
  const posts = await getAllPublishedPosts()
  return (
    <Container>
      <PostsList posts={posts} />
    </Container>
  )
}
