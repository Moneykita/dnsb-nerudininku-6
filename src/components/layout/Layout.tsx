import Navigation from "./Navigation";
import Footer from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-700 text-white">
      <Navigation />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;