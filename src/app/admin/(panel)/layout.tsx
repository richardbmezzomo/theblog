import { AppSidebar } from "@/components/layout/AppSidebar"
import { NavBar } from "@/components/layout/NavBar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"

export default async function PanelLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <TooltipProvider>
        <SidebarProvider>
          <NavBar />
          <AppSidebar />
          <div className="pt-header h-screen w-full overflow-hidden bg-background text-foreground">
            {children}
          </div>
        </SidebarProvider>
      </TooltipProvider>
    </div>
  )
}
