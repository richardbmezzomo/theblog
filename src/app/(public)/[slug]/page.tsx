import { notFound } from "next/navigation"
import Image from "next/image"
import { Container } from "@/components/layout/Container"
import { getPostBySlug } from "@/features/posts/queries"
import { markdownToHtml } from "@/lib/markdown"

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) notFound()

  const contentHtml = await markdownToHtml(post.content)

  return (
    <Container>
      <article className="mx-auto py-16 ">
        <header className="mb-10 flex flex-col gap-6">
          <div className="relative w-full aspect-video overflow-hidden rounded-xl">
            <Image
              src={post.coverImageUrl}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 960px"
              priority
            />
          </div>

          <h1 className="text-4xl font-semibold tracking-tight">
            {post.title}
          </h1>

          <div className="flex justify-between items-center">
            <time
              className="text-sm text-muted-foreground"
              dateTime={post.createdAt.toISOString()}
            >
              {post.createdAt.toLocaleDateString("pt-BR", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </time>
            <span className="text-sm text-muted-foreground">
              Richard B. Mezzomo
            </span>
          </div>
        </header>

        <div
          className="prose prose-neutral dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      </article>
    </Container>
  )
}
