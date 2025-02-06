import { Newspaper } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="w-full bg-transparent py-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center">
          <Link 
            to="/news" 
            className="flex items-center gap-2 text-white hover:text-gray-200 transition-colors"
          >
            <Newspaper className="w-8 h-8" />
            <span className="text-2xl font-semibold">Naujienos</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;