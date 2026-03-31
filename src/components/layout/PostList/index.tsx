import Image from "next/image"
import Link from "next/link"
import { PostHeading } from "@/components/layout/PostHeading"
import type { getAllPosts } from "@/features/posts/queries"

type Post = Awaited<ReturnType<typeof getAllPosts>>[number]

type PostListProps = {
  posts: Post[]
}

const PostsList = ({ posts }: PostListProps) => {
  if (posts.length === 0) return null

  const [latest, ...rest] = posts

  return (
    <div className="flex flex-col gap-12">
      {/* Post em destaque */}
      <section className="grid grid-cols-1 gap-8 sm:grid-cols-2 group">
        <Link
          className="relative w-full overflow-hidden rounded-xl aspect-video"
          href={`/${latest.slug}`}
        >
          <Image
            src={latest.coverImageUrl}
            alt={latest.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 50vw"
          />
        </Link>
        <div className="flex flex-col gap-4 sm:justify-center">
          <time
            className="text-muted-foreground block text-sm/tight"
            dateTime={latest.createdAt.toISOString()}
          >
            {latest.createdAt.toLocaleDateString("pt-BR")}
          </time>
          <PostHeading as="h1">{latest.title}</PostHeading>
          <p className="text-muted-foreground">{latest.excerpt}</p>
        </div>
      </section>

      {/* Grid com os restantes */}
      {rest.length > 0 && (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((post) => (
            <article key={post.id} className="flex flex-col gap-3">
              <Link
                className="relative overflow-hidden rounded-lg aspect-video block"
                href={`/${post.slug}`}
              >
                <Image
                  src={post.coverImageUrl}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </Link>
              <time
                className="text-muted-foreground block text-xs/tight"
                dateTime={post.createdAt.toISOString()}
              >
                {post.createdAt.toLocaleDateString("pt-BR")}
              </time>
              <PostHeading as="h2">{post.title}</PostHeading>
              <p className="text-muted-foreground text-sm">{post.excerpt}</p>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}

export default PostsList
