import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { NAVIGATION_ITEMS } from "@/lib/constants";

const Hero = () => {
  return (
    <div className="relative bg-primary py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl tracking-tight font-extrabold text-accent sm:text-5xl md:text-6xl animate-fade-in">
            Sveiki atvykę į <span className="text-accent">Nerūdininkų 6</span>
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
        
        <div className="flex justify-center">
          <div className="w-full max-w-2xl rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-[1.02]">
            <img
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wY8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
              alt="Daugiabutis namas"
              className="w-full h-[400px] object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;