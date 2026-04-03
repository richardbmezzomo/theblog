"use client"

import { RiLoader2Fill } from "@remixicon/react"
import { useActionState, useEffect, useState } from "react"
import { toast } from "sonner"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { deletePost } from "@/features/posts/actions"

interface DeletePostButtonProps {
  postId: string
}

export const DeletePostButton = ({ postId }: DeletePostButtonProps) => {
  const [open, setOpen] = useState(false)
  const [state, formAction, isPending] = useActionState(deletePost, null)

  useEffect(() => {
    if (!state) return
    if (state.success) {
      setOpen(false)
    } else if (state.error) {
      toast.error("Failed to delete post.", { description: state.error })
    }
  }, [state])

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <DropdownMenuItem
          variant="destructive"
          onSelect={(e) => e.preventDefault()}
        >
          Delete
        </DropdownMenuItem>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete post?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. The post will be permanently deleted.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <form action={formAction}>
            <input type="hidden" name="id" value={postId} />
            <Button
              type="submit"
              variant="destructive"
              disabled={isPending}
              className="w-full"
            >
              {isPending ? (
                <>
                  <RiLoader2Fill className="size-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </Button>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
