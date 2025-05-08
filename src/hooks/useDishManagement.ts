
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Dish } from '@/types/dish';

export const useDishManagement = (filterCategory: string | null) => {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDishes = async () => {
    setLoading(true);
    try {
      let query = supabase.from('dishes').select('*');
      
      if (filterCategory) {
        query = query.eq('category', filterCategory);
      }
      
      const { data, error } = await query.order('updated_at', { ascending: false });
      
      if (error) throw error;
      
      setDishes(data || []);
    } catch (error: any) {
      toast.error("Error fetching dishes: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this dish?")) return;
    
    try {
      const { error } = await supabase
        .from('dishes')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      toast.success("Dish deleted successfully");
      fetchDishes();
    } catch (error: any) {
      toast.error("Error deleting dish: " + error.message);
    }
  };

  useEffect(() => {
    fetchDishes();
    
    // Subscribe to real-time updates
    const channel = supabase
      .channel('dishes-changes')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'dishes' 
      }, () => {
        fetchDishes();
      })
      .subscribe();
    
    return () => {
      supabase.removeChannel(channel);
    };
  }, [filterCategory]);

  return {
    dishes,
    loading,
    handleDelete,
    fetchDishes
  };
};
