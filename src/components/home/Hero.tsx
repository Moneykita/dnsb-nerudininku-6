
import { NAVIGATION_ITEMS } from "@/lib/constants";
import { Newspaper } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative w-screen h-[80vh] -ml-[50vw] left-[50%] bg-gray-700">
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
      <div className="relative z-10 container mx-auto h-full flex flex-col items-center justify-center gap-16 px-4 sm:px-6 lg:px-8">
        {/* News Button */}
        <Link 
          to="/news" 
          className="flex items-center gap-2 text-white transition-all duration-300 animate-fade-in"
        >
          <Newspaper className="w-8 h-8" />
          <span className="text-4xl tracking-tight font-extrabold sm:text-5xl md:text-6xl">Naujienos</span>
        </Link>

        {/* Welcome Text */}
        <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl text-center animate-fade-in">
          Sveiki atvykę į <span className="text-white">Nerūdininkų 6</span>
        </h1>
      </div>
    </div>
  );
};

export default Hero;
