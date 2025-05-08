
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import DishForm from './DishForm';
import { CategoryFilter } from './CategoryFilter';
import { DishList } from './DishList';
import { useDishManagement } from '@/hooks/useDishManagement';
import { Dish } from '@/types/dish';

interface DishManagerProps {
  categories: string[];
}

export default function DishManager({ categories }: DishManagerProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingDish, setEditingDish] = useState<Dish | null>(null);
  const [filterCategory, setFilterCategory] = useState<string | null>(null);

  const { dishes, loading, handleDelete, fetchDishes } = useDishManagement(filterCategory);

  const handleOpenForm = (dish: Dish | null = null) => {
    setEditingDish(dish);
    setDialogOpen(true);
  };

  const handleFormSubmit = () => {
    setDialogOpen(false);
    fetchDishes();
  };

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold">Menu Items</h2>
        <Button 
          onClick={() => handleOpenForm(null)} 
          className="bg-[#6A0DAD] hover:bg-[#6A0DAD]/80 hover:shadow-[0_0_15px_#6A0DAD] transition-all"
        >
          <Plus size={18} className="mr-1" /> Add Dish
        </Button>
      </div>

      <CategoryFilter 
        categories={categories}
        activeCategory={filterCategory}
        onCategoryChange={setFilterCategory}
      />

      <DishList 
        dishes={dishes}
        loading={loading}
        onEdit={handleOpenForm}
        onDelete={handleDelete}
      />

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[500px] max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>{editingDish ? "Edit Dish" : "Add New Dish"}</DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[70vh] pr-4">
            <DishForm 
              dish={editingDish || undefined}
              onSubmit={handleFormSubmit}
              categories={categories}
            />
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
}
