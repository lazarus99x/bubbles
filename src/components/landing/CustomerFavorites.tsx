
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import WhatsAppButton from "../WhatsAppButton";
import { supabase } from '@/integrations/supabase/client';
import { Dish } from '@/types/dish';

const CustomerFavorites: React.FC = () => {
  const [favorites, setFavorites] = useState<Dish[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('dishes')
          .select('*')
          .order('created_at', { ascending: false })
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
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8 text-center text-bubbles-black">Customer Favorites</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <Card key={i} className="border border-[#E5E7EB] bg-white animate-pulse h-72">
              <CardContent className="p-0"></CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center text-bubbles-black">Customer Favorites</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((dish) => (
            <Card 
              key={dish.id}
              className="border border-[#E5E7EB] bg-white overflow-hidden group transition-all"
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={dish.image_url || "/placeholder.svg"} 
                  alt={dish.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">{dish.name}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{dish.description}</p>
                <div className="flex justify-between items-center">
                  <p className="font-bold">{dish.currency}{dish.price.toFixed(2)}</p>
                  <WhatsAppButton 
                    text="Order Now" 
                    dishName={dish.name} 
                    className="bg-white text-bubbles-pink border border-bubbles-pink text-sm px-3 py-1.5 rounded hover:bg-bubbles-pink hover:text-white transition-colors group-hover:shadow-[0_0_15px_rgba(255,107,157,0.5)]"
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerFavorites;
