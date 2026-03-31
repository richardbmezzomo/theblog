import Link from "next/link"
import { ModeToggle } from "../ModeToggle"

export const NavBar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-header flex justify-between items-center border bg-background px-8">
      <ul>
        <li>
          <Link href="/" className="font-black text-3xl">
            The Blog.
          </Link>
        </li>
      </ul>
      <div>
        <ModeToggle />
      </div>
    </nav>
  )
}
