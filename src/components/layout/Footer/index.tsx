import Link from "next/link"

export const Footer = () => {
  return (
    <footer className="border-t bg-background px-16 py-10 flex justify-between items-center">
      <Link href="/" className="font-black text-xl">The Blog.</Link>
      <p className="text-sm text-muted-foreground">
        © 2026 Richard B. Mezzomo
      </p>
    </footer>
  )
}
