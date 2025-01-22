import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { BUTTON_LABELS, NAVIGATION_ITEMS } from "@/lib/constants";

const Hero = () => {
  return (
    <div className="relative bg-primary py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
            <h1 className="text-4xl tracking-tight font-extrabold text-accent sm:text-5xl md:text-6xl">
              Sveiki atvykę į <span className="text-accent">Nerūdininkų 6</span>
            </h1>
            <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left">
              <Link
                to="/announcements"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-accent hover:bg-accent/90 transition-colors duration-200"
              >
                {NAVIGATION_ITEMS.ANNOUNCEMENTS}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
          <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
            <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
              <div className="relative block w-full bg-secondary rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wY8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                  alt="Daugiabutis namas"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;