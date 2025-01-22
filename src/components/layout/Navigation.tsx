import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Home, Bell, FileText, Phone, Info, Building, AlertTriangle } from "lucide-react";
import { NAVIGATION_ITEMS } from "@/lib/constants";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { path: "/", label: NAVIGATION_ITEMS.HOME, icon: <Home className="w-5 h-5" /> },
    { path: "/announcements", label: NAVIGATION_ITEMS.ANNOUNCEMENTS, icon: <Bell className="w-5 h-5" /> },
    { path: "/legal", label: NAVIGATION_ITEMS.LEGAL, icon: <FileText className="w-5 h-5" /> },
    { path: "/renovation", label: NAVIGATION_ITEMS.RENOVATION, icon: <Building className="w-5 h-5" /> },
    { path: "/emergency", label: NAVIGATION_ITEMS.EMERGENCY, icon: <AlertTriangle className="w-5 h-5" /> },
    { path: "/contacts", label: NAVIGATION_ITEMS.CONTACTS, icon: <Phone className="w-5 h-5" /> },
    { path: "/about", label: NAVIGATION_ITEMS.ABOUT, icon: <Info className="w-5 h-5" /> },
  ];

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-bold text-accent">
              DNSB NERŪDININKŲ 6
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-accent hover:bg-primary focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-accent hover:bg-primary transition-colors duration-200"
              >
                {item.icon}
                <span className="ml-2">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center px-3 py-2 rounded-md text-base font-medium text-accent hover:bg-primary block transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                {item.icon}
                <span className="ml-2">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;