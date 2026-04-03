"use client"

import { RiArticleLine, RiMoreLine, RiSearchLine } from "@remixicon/react"
import type { Route } from "next"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DeletePostButton } from "../DeletePostButton"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { Post } from "../PostList"

const statusItems = [
  { label: "All", value: "all" },
  { label: "Published", value: "true" },
  { label: "Draft", value: "false" },
]

export interface PostsTableProps {
  posts: Post[]
}

export const PostsTable = ({ posts }: PostsTableProps) => {
  const [selectedStatus, setSelectedStatus] = useState<string>("all")

  const selectedStatusLabel =
    statusItems.find((item) => item.value === selectedStatus)?.label ?? "Status"

  const filteredPosts = posts.filter((post) => {
    if (selectedStatus === "all") return true
    if (selectedStatus === "true") return post.published === true
    if (selectedStatus === "false") return post.published === false
    return true
  })

  return (
    <div className="flex flex-col gap-3 flex-1 min-h-0">
      {/* Filters row */}
      <div className="flex items-center gap-3">
        <InputGroup className="max-w-xs">
          <InputGroupInput id="search" placeholder="Search posts..." />
          <InputGroupAddon align="inline-start">
            <RiSearchLine className="text-muted-foreground size-4" />
          </InputGroupAddon>
        </InputGroup>

        <Select onValueChange={setSelectedStatus} value={selectedStatus}>
          <SelectTrigger className="w-36">
            <SelectValue>{selectedStatusLabel}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {statusItems.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <span className="ml-auto font-mono text-xs text-muted-foreground tabular-nums">
          {posts.length} posts
        </span>
      </div>

      {/* Table */}
      <div className="border rounded-xl overflow-hidden">
        <div className="overflow-y-auto max-h-[calc(100vh-26rem)]">
          <Table>
            <TableHeader className="sticky top-0 bg-card z-10 shadow-[0_1px_0_0_hsl(var(--border))]">
              <TableRow className="border-none hover:bg-transparent">
                <TableHead className="w-12 pl-4"></TableHead>
                <TableHead className="font-semibold text-xs uppercase tracking-widest text-muted-foreground">
                  Title
                </TableHead>
                <TableHead className="w-32 font-semibold text-xs uppercase tracking-widest text-muted-foreground">
                  Status
                </TableHead>
                <TableHead className="hidden lg:table-cell font-semibold text-xs uppercase tracking-widest text-muted-foreground">
                  Slug
                </TableHead>
                <TableHead className="w-32 font-semibold text-xs uppercase tracking-widest text-muted-foreground">
                  Updated
                </TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredPosts.map((post) => (
                <TableRow
                  key={post.id}
                  className="group border-b border-border/40 transition-colors hover:bg-muted/30 last:border-none"
                >
                  {/* Thumbnail */}
                  <TableCell className="pl-4 py-2.5">
                    <div className="size-10 rounded-lg overflow-hidden bg-muted relative shrink-0 ring-1 ring-border/50">
                      {post.coverImageUrl ? (
                        <Image
                          src={post.coverImageUrl}
                          alt={post.title}
                          fill
                          className="object-cover"
                          sizes="40px"
                        />
                      ) : (
                        <div className="size-full flex items-center justify-center">
                          <RiArticleLine className="size-4 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                  </TableCell>

                  {/* Title */}
                  <TableCell className="py-3 pr-6">
                    <p className="font-medium line-clamp-1 leading-snug">
                      {post.title}
                    </p>
                  </TableCell>

                  {/* Status badge */}
                  <TableCell>
                    {post.published ? (
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
                        <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Published
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 ring-1 ring-inset ring-amber-500/20">
                        <span className="size-1.5 rounded-full bg-amber-400" />
                        Draft
                      </span>
                    )}
                  </TableCell>

                  {/* Slug */}
                  <TableCell className="hidden lg:table-cell">
                    <code className="text-xs text-muted-foreground font-mono bg-muted/60 px-2 py-1 rounded-md">
                      /{post.slug}
                    </code>
                  </TableCell>

                  {/* Date */}
                  <TableCell className="text-sm text-muted-foreground font-mono tabular-nums">
                    {new Date(post.updatedAt).toLocaleDateString("pt-BR")}
                  </TableCell>

                  {/* Actions */}
                  <TableCell className="pr-3">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-8 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <RiMoreLine className="size-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/posts/${post.slug}` as Route}>
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DeletePostButton postId={post.id} />
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
