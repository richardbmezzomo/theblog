import Link from "next/link"
import { cn } from "@/lib/utils"

type PostHeadingProps = {
  children: React.ReactNode
  as: "h1" | "h2"
}

export const PostHeading = ({ children, as: Tag = "h1" }: PostHeadingProps) => {
  const baseClass = "font-extrabold"
  const headingClassesMap = {
    h1: "text-2xl/tight sm:text-4xl",
    h2: "text-xl/tight sm:text-2xl",
  }
  return (
    <Tag className={cn(headingClassesMap[Tag], baseClass)}>
      <Link href="#">{children}</Link>
    </Tag>
  )
}
