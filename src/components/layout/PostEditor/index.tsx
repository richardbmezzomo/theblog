"use client"

import { RiLoader2Fill } from "@remixicon/react"
import { useActionState, useEffect, useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { updatePost } from "@/features/posts/actions"
import { MarkdownEditor } from "../MarkdownEditor"
import type { Post } from "../PostList"

interface PostEditorProps {
  post: Post
}

export const PostEditor = ({ post }: PostEditorProps) => {
  const [state, formAction, isPending] = useActionState(updatePost, null)
  const [published, setPublished] = useState(post.published)

  useEffect(() => {
    setPublished(post.published)
  }, [post.published])

  useEffect(() => {
    if (!state) return
    if (state.success) {
      toast.success("Post saved successfully.")
    } else if (state.error) {
      toast.error("Failed to save post.", { description: state.error })
    }
  }, [state])

  return (
    <form
      action={formAction}
      className="flex flex-col h-full overflow-hidden p-4 gap-4"
    >
      <input type="hidden" name="id" value={post.id} />
      <input type="hidden" name="published" value={String(published)} />

      <div className="flex flex-col gap-1">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          placeholder="Post title"
          defaultValue={post.title}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <Label htmlFor="coverImageUrl">Cover Image URL</Label>
          <Input
            id="coverImageUrl"
            name="coverImageUrl"
            placeholder="https://..."
            defaultValue={post.coverImageUrl ?? ""}
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label htmlFor="excerpt">Excerpt</Label>
          <Input
            id="excerpt"
            name="excerpt"
            placeholder="Short description..."
            defaultValue={post.excerpt ?? ""}
          />
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <MarkdownEditor postContent={post.content} />
      </div>

      <div className="flex items-center justify-between">
        <FieldGroup className="w-56">
          <Field orientation="horizontal">
            <Checkbox
              id="published"
              checked={published}
              onCheckedChange={(checked) => setPublished(checked === true)}
            />
            <FieldLabel htmlFor="published">Published</FieldLabel>
          </Field>
        </FieldGroup>

        <div className="flex items-center gap-3">
          <Button
            type="submit"
            disabled={isPending}
            className="flex items-center gap-2"
          >
            {isPending ? (
              <>
                <RiLoader2Fill className="size-4 animate-spin" />
                Saving
              </>
            ) : (
              "Save Post"
            )}
          </Button>
        </div>
      </div>
    </form>
  )
}
