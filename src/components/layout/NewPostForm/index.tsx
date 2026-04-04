"use client"

import { RiLoader2Fill } from "@remixicon/react"
import { useActionState, useEffect, useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createPost } from "@/features/posts/actions"
import { MarkdownEditor } from "../MarkdownEditor"

export const NewPostForm = () => {
  const [state, formAction, isPending] = useActionState(createPost, null)
  const [published, setPublished] = useState(false)

  useEffect(() => {
    if (state?.error) {
      toast.error("Failed to create post.", { description: state.error })
    }
  }, [state])

  return (
    <form
      action={formAction}
      className="flex flex-col h-full overflow-hidden p-4 gap-4"
    >
      <div className="flex flex-col gap-1">
        <Label htmlFor="title">Title</Label>
        <Input id="title" name="title" placeholder="Post title" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <Label htmlFor="coverImageUrl">Cover Image URL</Label>
          <Input
            id="coverImageUrl"
            name="coverImageUrl"
            placeholder="https://..."
          />
        </div>
        <div className="flex flex-col gap-1">
          <Label htmlFor="excerpt">Excerpt</Label>
          <Input
            id="excerpt"
            name="excerpt"
            placeholder="Short description..."
          />
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <MarkdownEditor />
      </div>

      <div className="flex items-center justify-between">
        <input type="hidden" name="published" value={String(published)} />
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
                Creating...
              </>
            ) : (
              "Create Post"
            )}
          </Button>
        </div>
      </div>
    </form>
  )
}
