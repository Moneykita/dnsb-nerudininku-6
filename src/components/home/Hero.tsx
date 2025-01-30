import { NAVIGATION_ITEMS } from "@/lib/constants";
import { Newspaper } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative min-h-[600px] bg-gray-700">
      {/* Background Image */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: 'url("/lovable-uploads/e7f959a6-6c14-4d12-9d7f-514aeef86ae2.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full py-16 sm:py-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl animate-fade-in">
            Sveiki atvykę į <span className="text-white">Nerūdininkų 6</span>
          </h1>
        </div>

        {/* News Button */}
        <div className="absolute left-8 top-1/2 transform -translate-y-1/2">
          <Link 
            to="/news" 
            className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-all duration-300 backdrop-blur-sm animate-fade-in"
          >
            <Newspaper className="w-5 h-5" />
            <span>Naujienos</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;