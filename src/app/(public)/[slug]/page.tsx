import Image from "next/image"
import { Container } from "@/components/layout/Container"
import { getPostBySlug } from "@/features/posts/queries"
import { markdownToHtml } from "@/lib/markdown"

const mockPost = {
  id: "1",
  title: "Como o React Server Components muda tudo",
  slug: "react-server-components",
  coverImageUrl:
    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&q=80",
  excerpt:
    "Uma análise profunda sobre como os RSC alteram a forma como pensamos em renderização e estado no frontend.",
  content: `
## Introdução

React Server Components mudaram a forma como pensamos sobre renderização. Em vez de enviar toda a lógica para o browser, agora você pode manter operações pesadas no servidor.

## O que muda?

Antes dos RSC, todo componente rodava no cliente. Agora há uma separação clara:

- **Server Components** rodam apenas no servidor
- **Client Components** rodam no browser
- **Shared Components** podem rodar nos dois

## Um exemplo simples

\`\`\`ts
// isso roda apenas no servidor — nunca chega ao browser
import { db } from "@/db"

export default async function Page() {
  const posts = await db.select().from(posts)
  return <PostList posts={posts} />
}
\`\`\`

## Quando usar \`"use client"\`

Adicione \`"use client"\` apenas quando precisar de:

1. APIs do browser como \`localStorage\`
2. Event listeners como \`onClick\`
3. Hooks do React como \`useState\` ou \`useEffect\`

> Regra de ouro: comece como Server Component e só mova para cliente quando tiver um motivo.

## Conclusão

Server Components não substituem Client Components — eles são complementares. Use a ferramenta certa para cada trabalho.
  `,
  published: true,
  createdAt: new Date("2026-03-28T22:00:00"),
  updatedAt: new Date("2026-03-28T22:00:00"),
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = (await getPostBySlug(slug)) ?? mockPost
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
              sizes="(max-width: 768px) 100vw, 680px"
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
