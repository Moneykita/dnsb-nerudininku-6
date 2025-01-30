import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import Navigation from "./Navigation"
import Footer from "./Footer"

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col bg-gray-700 text-white w-full">
        <Navigation />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </div>
    </SidebarProvider>
  )
}

export default Layout