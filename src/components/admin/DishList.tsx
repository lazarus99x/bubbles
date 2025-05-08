
import { Dish } from '@/types/dish';
import { Button } from '@/components/ui/button';
import { Edit, Trash } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DishListProps {
  dishes: Dish[];
  loading: boolean;
  onEdit: (dish: Dish) => void;
  onDelete: (id: string) => void;
}

export function DishList({ dishes, loading, onEdit, onDelete }: DishListProps) {
  return (
    <div className="rounded-md border shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="w-24">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-4">
                Loading...
              </TableCell>
            </TableRow>
          ) : dishes.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-4 text-gray-500">
                No dishes found
              </TableCell>
            </TableRow>
          ) : dishes.map((dish) => (
            <TableRow key={dish.id} className="hover:bg-gray-50">
              <TableCell>
                {dish.image_url ? (
                  <img src={dish.image_url} alt={dish.name} className="w-10 h-10 object-cover rounded-md" />
                ) : (
                  <div className="w-10 h-10 bg-gray-200 rounded-md flex items-center justify-center text-gray-400">
                    No img
                  </div>
                )}
              </TableCell>
              <TableCell className="font-medium">
                {dish.name}
                {dish.is_featured && (
                  <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full">
                    Featured
                  </span>
                )}
              </TableCell>
              <TableCell>{dish.category}</TableCell>
              <TableCell className="text-right">₦{dish.price.toLocaleString()}</TableCell>
              <TableCell className="flex gap-1">
                <Button variant="ghost" size="icon" onClick={() => onEdit(dish)}>
                  <Edit size={18} />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => onDelete(dish.id)}>
                  <Trash size={18} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
