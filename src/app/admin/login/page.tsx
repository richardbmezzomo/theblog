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
          <form action={login} className="flex flex-col gap-4">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              name="password"
              placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
              className="border border-border rounded px-3 py-2 bg-background text-foreground w-full"
            />
            <button
              type="submit"
              className="bg-primary text-primary-foreground rounded px-3 py-2 w-full"
            >
              Enter
            </button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
