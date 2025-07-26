import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
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
  onRemoveCategory,
}: CategoryManagerProps) {
  const [newCategory, setNewCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategory.trim()) return;

    setLoading(true);
    try {
      await onAddCategory(newCategory.trim());
      setNewCategory("");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveCategory = async (category: string) => {
    if (
      window.confirm(
        `Are you sure you want to delete the "${category}" category? This will affect all dishes in this category.`
      )
    ) {
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
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">
          Menu Categories
        </h2>
      </div>
      <form onSubmit={handleAddCategory} className="flex gap-2 mb-6">
        <Input
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="New category name"
          disabled={loading}
          className="bg-white dark:bg-gray-800 text-black dark:text-white"
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
          <TableRow className="bg-gray-100 dark:bg-gray-800">
            <TableHead className="font-bold text-black dark:text-white">
              Category Name
            </TableHead>
            <TableHead className="w-24 font-bold text-black dark:text-white">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={2}
                className="text-center py-4 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300"
              >
                No categories found
              </TableCell>
            </TableRow>
          )}
          {categories.map((category) => (
            <TableRow
              key={category}
              className="bg-white dark:bg-gray-900 border-b hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <TableCell className="font-medium text-black dark:text-white py-4">
                {category}
              </TableCell>
              <TableCell>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => handleRemoveCategory(category)}
                  disabled={loading}
                  className="bg-red-500 hover:bg-red-600 text-white"
                >
                  <X size={18} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
