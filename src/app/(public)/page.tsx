import { Container } from "@/components/layout/Container"
import PostsList from "@/components/layout/PostList"

const mockPosts = [
  {
    id: "1",
    title: "Como o React Server Components muda tudo",
    slug: "react-server-components",
    coverImageUrl:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&q=80",
    excerpt:
      "Uma análise profunda sobre como os RSC alteram a forma como pensamos em renderização e estado no frontend.",
    content: "",
    published: true,
    createdAt: new Date("2026-03-28T22:00:00"),
    updatedAt: new Date("2026-03-28T22:00:00"),
  },
  {
    id: "2",
    title: "TypeScript avançado: tipos condicionais na prática",
    slug: "typescript-tipos-condicionais",
    coverImageUrl:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
    excerpt: "Explorando inferência, mapped types e como evitar repetição de código com tipos condicionais.",
    content: "",
    published: true,
    createdAt: new Date("2026-03-20T18:00:00"),
    updatedAt: new Date("2026-03-20T18:00:00"),
  },
  {
    id: "3",
    title: "Drizzle ORM vs Prisma: qual escolher em 2026?",
    slug: "drizzle-vs-prisma",
    coverImageUrl:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
    excerpt: "Comparativo honesto entre os dois ORMs mais populares do ecossistema Node.js.",
    content: "",
    published: true,
    createdAt: new Date("2026-03-15T10:00:00"),
    updatedAt: new Date("2026-03-15T10:00:00"),
  },
  {
    id: "4",
    title: "CSS Grid ainda em 2026: por que continua relevante",
    slug: "css-grid-2026",
    coverImageUrl:
      "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&q=80",
    excerpt: "Grid é uma das ferramentas mais poderosas do CSS e continua sendo subutilizada por muitos devs.",
    content: "",
    published: true,
    createdAt: new Date("2026-03-10T14:00:00"),
    updatedAt: new Date("2026-03-10T14:00:00"),
  },
]

export default function Home() {
  return (
    <Container>
      <PostsList posts={mockPosts} />
    </Container>
  )
}
