import { Footer } from "@/components/layout/Footer"
import { NavBar } from "@/components/layout/NavBar"

export default async function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="pt-header">
      <NavBar />
      {children}
      <Footer />
    </div>
  )
}
