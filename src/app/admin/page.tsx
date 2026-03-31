import { getSession } from "@/lib/session"

export default async function AdminPage() {
  const session = await getSession()

  return (
    <div className="h-screen p-8">
      <h1>Admin Panel</h1>
      <pre>{JSON.stringify({ isAdmin: session.isAdmin }, null, 2)}</pre>
    </div>
  )
}
