import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MenuCategory from "../components/MenuCategory";
import FeaturedDishBanner from "../components/FeaturedDishBanner";

const Menu: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("");
  const [categories, setCategories] = useState<string[]>([]);

  const { data: dishes = [], isLoading: dishesLoading } = useQuery({
    queryKey: ["dishes"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("dishes")
        .select("*")
        .order("category");

      if (error) throw error;
      return data || [];
    },
  });

  const { data: featuredDish } = useQuery({
    queryKey: ["featuredDish"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("dishes")
        .select("*")
        .eq("is_featured", true)
        .single();

      if (error) {
        console.error("Error fetching featured dish:", error);
        return null;
      }
      return data;
    },
  });

  useEffect(() => {
    if (dishes.length > 0) {
      const uniqueCategories = Array.from(
        new Set(dishes.map((dish) => dish.category))
      );
      setCategories(uniqueCategories);
      if (!activeCategory && uniqueCategories.length > 0) {
        setActiveCategory(uniqueCategories[0]);
      }
    }
  }, [dishes, activeCategory]);

  if (dishesLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-bubbles-pink"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16">
      <Navbar />

      <div className="bg-gradient-to-b from-bubbles-pink/30 to-bubbles-white py-12">
        <div className="container mx-auto px-4">
          {featuredDish && featuredDish.discount_price && (
            <div className="mb-12">
              <FeaturedDishBanner dish={featuredDish} />
            </div>
          )}

          <h1 className="text-4xl md:text-5xl font-bold text-center text-bubbles-pink mb-2">
            Our Menu
          </h1>
          <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
            Explore our delicious offerings crafted with love and care.
          </p>

          <div className="flex flex-nowrap overflow-x-auto py-4 mb-8 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 mx-2 rounded-full whitespace-nowrap transition-colors ${
                  activeCategory === category
                    ? "bg-bubbles-pink text-white"
                    : "bg-white/50 text-bubbles-black hover:bg-bubbles-pink/20"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="pb-12">
            {activeCategory && (
              <MenuCategory
                name={activeCategory}
                items={dishes
                  .filter((dish) => dish.category === activeCategory)
                  .map((dish) => ({
                    id: dish.id,
                    name: dish.name,
                    description: dish.description || "",
                    price: dish.price,
                    image: dish.image_url || "/placeholder.svg",
                  }))}
              />
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Menu;
