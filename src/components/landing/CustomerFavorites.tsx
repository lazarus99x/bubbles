import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import WhatsAppButton from "../WhatsAppButton";
import { supabase } from "@/integrations/supabase/client";
import { Dish } from "@/types/dish";
import { motion } from "framer-motion";
import Link from "next/link";

const CustomerFavorites: React.FC = () => {
  const [favorites, setFavorites] = useState<Dish[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("dishes")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(6);

        if (error) throw error;
        setFavorites(data || []);
      } catch (error) {
        console.error("Error fetching customer favorites:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16  ">
        <h2 className="text-3xl font-bold mb-8 text-center text-bubbles-black">
          Customer Favorites
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card
              key={i}
              className="border border-[#E5E7EB] bg-white animate-pulse h-72"
            >
              <CardContent className="p-0"></CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <section className="group relative p-6 rounded-xl inset-0 bg-gradient-to-b from-transparent to-black/25 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-8 text-center text-[#ffffff]">
          Customer Favorites
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((dish) => (
            <Card
              key={dish.id}
              className="border border-[#E5E7EB] bg-white overflow-hidden group transition-all hover:shadow-lg hover:border-bubbles-pink/30"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={dish.image_url || "/placeholder.svg"}
                  alt={dish.name}
                  className="w-full h-full object-cover transform transition-transform group-hover:scale-105"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-[#1A1F2C]">
                  {dish.name}
                </h3>
                <p className="text-gray-700 text-sm mb-4 line-clamp-2">
                  {dish.description}
                </p>
                <div className="flex justify-between items-center">
                  <p className="font-bold text-bubbles-pink text-lg">
                    {dish.currency}
                    {dish.price.toFixed(2)}
                  </p>
                  <WhatsAppButton
                    text="Order Now"
                    dishName={dish.name}
                    className="bg-white text-bubbles-pink border border-bubbles-pink text-sm px-4 py-2 rounded-md hover:bg-bubbles-pink hover:text-white transition-all duration-300"
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <a href="/menu">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="text-center mt-12"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-bubbles-pink text-white px-8 py-3 rounded-full font-semibold hover:shadow-[0_0_15px_#FF6B9D] transition-shadow duration-300"
            >
              Explore Our Kitchen
            </motion.button>
          </motion.div>
        </a>
      </div>
    </section>
  );
};

export default CustomerFavorites;
