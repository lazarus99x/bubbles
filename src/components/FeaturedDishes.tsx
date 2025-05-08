
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import WhatsAppButton from "./WhatsAppButton";
import { Dish } from "@/types/dish";
import { supabase } from "@/integrations/supabase/client";

interface DishProps {
  name: string;
  description: string;
  image: string;
}

const FeaturedDish: React.FC<DishProps> = ({ name, description, image }) => {
  return (
    <div className="glass flex flex-col h-full">
      <div className="overflow-hidden rounded-t-2xl h-48">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold text-bubbles-black mb-2">{name}</h3>
        <p className="text-gray-600 mb-6 flex-grow">{description}</p>
        <WhatsAppButton text="Order Now" dishName={name} />
      </div>
    </div>
  );
};

const FeaturedDishes: React.FC = () => {
  const [featuredDishes, setFeaturedDishes] = useState<Dish[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedDishes();

    // Subscribe to realtime updates
    const channel = supabase
      .channel('dishes-changes')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'dishes' 
      }, () => {
        fetchFeaturedDishes();
      })
      .subscribe();
    
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchFeaturedDishes = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('dishes')
        .select('*')
        .eq('is_featured', true)
        .order('updated_at', { ascending: false })
        .limit(3);
      
      if (error) throw error;
      
      setFeaturedDishes(data || []);
    } catch (error) {
      console.error("Error fetching featured dishes:", error);
    } finally {
      setLoading(false);
    }
  };

  // If no featured dishes in database, show a message to add some
  if (!loading && featuredDishes.length === 0) {
    return (
      <section className="section-padding bg-bubbles-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-bubbles-pink mb-4">
            Featured Dishes
          </h2>
          <div className="glass p-8 max-w-2xl mx-auto">
            <p className="text-gray-600 mb-6">
              No featured dishes available yet. If you're an admin, please add some featured dishes from the admin panel.
            </p>
            <Link to="/admin" className="btn-outline">
              Go to Admin Panel
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding bg-bubbles-white">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-bubbles-pink mb-4">
          Featured Dishes
        </h2>
        <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
          Explore our most loved and unique creations that keep our customers coming back for more.
        </p>
        
        {loading ? (
          <div className="flex justify-center">
            <p>Loading featured dishes...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredDishes.map((dish) => (
              <FeaturedDish 
                key={dish.id}
                name={dish.name}
                description={dish.description || 'A delicious dish from our kitchen.'}
                image={dish.image_url || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80'}
              />
            ))}
          </div>
        )}
        
        <div className="text-center mt-12">
          <Link to="/menu" className="btn-outline">
            View Full Menu
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedDishes;
