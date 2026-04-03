"use client"

import { RiLoader2Fill } from "@remixicon/react"
import { useActionState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { login } from "@/features/auth/actions"

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(login, null)

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-3xl font-black">The Blog.</CardTitle>
          <CardDescription>
            Enter your admin password to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                name="password"
                placeholder="••••••••"
                className="border border-border rounded px-3 py-2 bg-background text-foreground w-full"
                aria-describedby={state?.error ? "password-error" : undefined}
              />
              {state?.error && (
                <p id="password-error" className="text-sm text-destructive">
                  {state.error}
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={pending}
              className="bg-primary text-primary-foreground rounded px-3 py-2 w-full disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {pending ? (
                <div className="flex items-center justify-center">
                  <RiLoader2Fill className="animate-spin mr-2 size-5" />
                  Verifying
                </div>
              ) : (
                "Enter"
              )}
            </button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
