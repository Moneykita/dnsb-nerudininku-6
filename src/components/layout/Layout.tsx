import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import Navigation from "./Navigation"
import Footer from "./Footer"
import { AppSidebar } from "./AppSidebar"

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col bg-gray-700 text-white w-full">
        <Navigation />
        <div className="flex flex-1">
          <AppSidebar />
          <main className="flex-grow">
            <div className="p-4">
              <SidebarTrigger />
            </div>
            {children}
          </main>
        </div>
        <Footer />
      </div>
    </SidebarProvider>
  )
}

export default Layout