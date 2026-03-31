"use client"

import { useTheme } from "next-themes"
import { ThemeToggleIcon } from "@/components/icons/ThemeToggle"
import { Button } from "@/components/ui/button"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <Button variant="ghost" size="icon" onClick={toggleTheme}>
      <ThemeToggleIcon />
    </Button>
  )
}
