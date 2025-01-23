import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { NAVIGATION_ITEMS } from "@/lib/constants";

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
          <div className="mt-6">
            <Link
              to="/announcements"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-accent hover:bg-accent/90 transition-all duration-200 hover:scale-105"
            >
              {NAVIGATION_ITEMS.ANNOUNCEMENTS}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;