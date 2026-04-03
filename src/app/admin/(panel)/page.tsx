import {
  RiAddLine,
  RiArticleLine,
  RiEyeLine,
  RiEyeOffLine,
} from "@remixicon/react"
import Link from "next/link"
import { PostsTable } from "@/components/layout/PostsTable"
import { Button } from "@/components/ui/button"
import { getAllPosts } from "@/features/posts/queries"

export default async function AdminPage() {
  const posts = await getAllPosts()

  const published = posts.filter((p) => p.published).length
  const drafts = posts.filter((p) => !p.published).length

  const stats = [
    {
      label: "Total",
      value: posts.length,
      icon: RiArticleLine,
      accent: "border-border",
      iconClass: "text-muted-foreground",
      iconBg: "bg-muted",
    },
    {
      label: "Published",
      value: published,
      icon: RiEyeLine,
      accent: "border-emerald-500/30",
      iconClass: "text-emerald-400",
      iconBg: "bg-emerald-500/10",
    },
    {
      label: "Drafts",
      value: drafts,
      icon: RiEyeOffLine,
      accent: "border-amber-500/30",
      iconClass: "text-amber-400",
      iconBg: "bg-amber-500/10",
    },
  ]

  return (
    <div className="px-8 py-6 h-full flex flex-col gap-6 overflow-y-auto">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-[0.2em] mb-2">
            Content Management
          </p>
          <h1 className="text-5xl font-black tracking-tight leading-none">
            Posts
          </h1>
        </div>
        <Button asChild>
          <Link href="/admin/posts/new">
            <RiAddLine className="size-4" />
            New Post
          </Link>
        </Button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-3 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`rounded-xl border ${stat.accent} bg-card p-5 flex items-center gap-4 transition-colors`}
          >
            <div
              className={`size-11 rounded-lg ${stat.iconBg} flex items-center justify-center shrink-0`}
            >
              <stat.icon className={`size-5 ${stat.iconClass}`} />
            </div>
            <div>
              <p className="font-mono text-3xl font-bold tracking-tight tabular-nums">
                {stat.value}
              </p>
              <p className="text-xs text-muted-foreground uppercase tracking-widest mt-0.5">
                {stat.label}
              </p>
            </div>
          </div>
        ))}
      </div>

      <PostsTable posts={posts} />
    </div>
  )
}
