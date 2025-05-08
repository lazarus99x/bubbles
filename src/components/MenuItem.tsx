import React, { useState } from "react";
import { Heart, Bookmark } from "lucide-react";
import WhatsAppButton from "./WhatsAppButton";
import { useAuth } from "@/contexts/AuthContext";

interface MenuItemProps {
  name: string;
  description: string;
  price: number;
  image: string;
}

const MenuItem: React.FC<MenuItemProps> = ({
  name,
  description,
  price,
  image,
}) => {
  const { user } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (user) {
      setIsFavorite(!isFavorite);
    } else {
      alert("Please login to save favorites");
    }
  };

  const handleToggleSaved = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (user) {
      setIsSaved(!isSaved);
    } else {
      alert("Please login to save items for later");
    }
  };

  return (
    <div className="glass-dark border border-[#333333]/20 rounded-xl overflow-hidden h-full flex flex-col transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] group backdrop-blur-sm">
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute top-2 right-2 flex gap-2">
          <button
            onClick={handleToggleFavorite}
            className="bg-[#1A1F2C]/80 p-1.5 rounded-full hover:bg-[#1A1F2C] transition-colors"
          >
            <Heart
              className={`w-5 h-5 ${isFavorite ? "fill-bubbles-pink text-bubbles-pink" : "text-white"}`}
            />
          </button>
          <button
            onClick={handleToggleSaved}
            className="bg-[#1A1F2C]/80 p-1.5 rounded-full hover:bg-[#1A1F2C] transition-colors"
          >
            <Bookmark
              className={`w-5 h-5 ${isSaved ? "fill-bubbles-pink text-bubbles-pink" : "text-white"}`}
            />
          </button>
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow bg-gradient-to-b from-[#1A1F2C] to-[#1A1F2C]/95">
        <div className="flex justify-between items-start gap-4 mb-3">
          <h3 className="text-xl font-semibold text-white group-hover:text-bubbles-pink transition-colors">
            {name}
          </h3>
          <span className="text-bubbles-pink font-bold text-lg">
            ₦{price.toLocaleString()}
          </span>
        </div>
        <p className="text-white/70 mb-6 flex-grow text-sm">{description}</p>
        <WhatsAppButton
          text="Order Now"
          dishName={name}
          className="bg-bubbles-pink text-white hover:bg-bubbles-pink/90 transition-all duration-300 shadow-[0_0_10px_rgba(255,107,157,0.3)] hover:shadow-[0_0_20px_rgba(255,107,157,0.5)]"
        />
      </div>
    </div>
  );
};

export default MenuItem;
