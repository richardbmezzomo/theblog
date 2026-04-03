import { RiLogoutBoxRLine, RiEditBoxLine } from "@remixicon/react"
import Link from "next/link"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { logout } from "@/features/auth/actions"
import { NavItems } from "./NavItems"

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="flex-row items-center gap-2.5 px-3 py-3">
        <SidebarTrigger className="shrink-0" />
        <Link
          href="/admin"
          className="flex items-center gap-2 truncate group-data-[collapsible=icon]:hidden"
        >
          <div className="size-6 rounded-md bg-amber-500 flex items-center justify-center shrink-0">
            <RiEditBoxLine className="size-3.5 text-black" />
          </div>
          <span className="font-black text-sm tracking-tight leading-none">
            The Blog.
          </span>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <NavItems />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <form action={logout}>
              <SidebarMenuButton
                type="submit"
                tooltip="Sair"
                className="text-destructive hover:bg-destructive/10 hover:text-destructive"
              >
                <RiLogoutBoxRLine />
                <span>Sair</span>
              </SidebarMenuButton>
            </form>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
