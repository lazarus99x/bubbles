
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, X } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface CategoryManagerProps {
  categories: string[];
  onAddCategory: (category: string) => Promise<void>;
  onRemoveCategory: (category: string) => Promise<void>;
}

export default function CategoryManager({
  categories,
  onAddCategory,
  onRemoveCategory
}: CategoryManagerProps) {
  const [newCategory, setNewCategory] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategory.trim()) return;

    setLoading(true);
    try {
      await onAddCategory(newCategory.trim());
      setNewCategory('');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveCategory = async (category: string) => {
    if (window.confirm(`Are you sure you want to delete the "${category}" category? This will affect all dishes in this category.`)) {
      setLoading(true);
      try {
        await onRemoveCategory(category);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleAddCategory} className="flex gap-2">
        <Input
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="New category name"
          disabled={loading}
        />
        <Button 
          type="submit"
          disabled={loading || !newCategory.trim()}
          className="bg-bubbles-pink hover:bg-bubbles-pink/80"
        >
          <Plus size={18} className="mr-1" /> Add
        </Button>
      </form>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Category Name</TableHead>
            <TableHead className="w-24">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.length === 0 && (
            <TableRow>
              <TableCell colSpan={2} className="text-center py-4 text-gray-500">
                No categories found
              </TableCell>
            </TableRow>
          )}
          {categories.map((category) => (
            <TableRow key={category}>
              <TableCell>{category}</TableCell>
              <TableCell>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => handleRemoveCategory(category)}
                  disabled={loading}
                >
                  <X size={18} className="text-red-500" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
