import React from "react";
import { Link } from "react-router-dom";
import WhatsAppButton from "./WhatsAppButton";

const Hero: React.FC = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 w-full h-full bg-center bg-cover bg-no-repeat bg-fixed z-0"
        style={{ backgroundImage: 'url("/images/hero.jpg")' }}
      />
      <div className="absolute inset-0 bg-[#0a0a0a]/80 z-10" />

      <div className="container mx-auto px-6 relative z-20">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-6xl md:text-8xl font-bold text-bubbles-pink mb-12 text-center animate-pulse drop-shadow-[0_0_15px_rgba(255,107,157,0.4)]">
            Bubbles
          </h1>

          <WhatsAppButton
            text="Order Now"
            dishName="Customer Favorite"
            className="text-xl px-8 py-4 bg-bubbles-pink text-white hover:bg-bubbles-pink/90 transition-all duration-300"
          />

          <Link
            to="/menu"
            className="mt-8 text-white/90 underline hover:text-bubbles-pink transition-colors"
          >
            Explore Menu
          </Link>
        </div>
      </div>

      <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 animate-float">
        <svg
          width="60"
          height="60"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 5L12 19M12 19L19 12M12 19L5 12"
            stroke="#FF6B9D"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
};

export default Hero;
