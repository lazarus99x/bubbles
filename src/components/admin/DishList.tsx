import { Dish } from "@/types/dish";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
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
        <TableHeader className="bg-gray-100 border-b-2 border-gray-200">
          <TableRow className="hover:bg-gray-100">
            <TableHead className="w-12 font-bold text-black bg-gray-100 border-b border-gray-300 py-3">
              Image
            </TableHead>
            <TableHead className="font-bold text-black bg-gray-100 border-b border-gray-300 py-3">
              Name
            </TableHead>
            <TableHead className="font-bold text-black bg-gray-100 border-b border-gray-300 py-3">
              Category
            </TableHead>
            <TableHead className="text-right font-bold text-black bg-gray-100 border-b border-gray-300 py-3">
              Price
            </TableHead>
            <TableHead className="w-24 font-bold text-black bg-gray-100 border-b border-gray-300 py-3">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow className="bg-white/80 backdrop-blur-sm">
              <TableCell
                colSpan={5}
                className="text-center py-4 text-gray-900 font-medium"
              >
                Loading...
              </TableCell>
            </TableRow>
          ) : dishes.length === 0 ? (
            <TableRow className="bg-white/80 backdrop-blur-sm">
              <TableCell
                colSpan={5}
                className="text-center py-4 text-gray-700 font-medium"
              >
                No dishes found
              </TableCell>
            </TableRow>
          ) : (
            dishes.map((dish) => (
              <TableRow
                key={dish.id}
                className="hover:bg-gray-50 bg-white/80 backdrop-blur-sm"
              >
                <TableCell>
                  {dish.image_url ? (
                    <img
                      src={dish.image_url}
                      alt={dish.name}
                      className="w-10 h-10 object-cover rounded-md"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-gray-200 rounded-md flex items-center justify-center text-gray-400">
                      No img
                    </div>
                  )}
                </TableCell>
                <TableCell className="font-medium text-gray-900">
                  {dish.name}
                  {dish.is_featured && (
                    <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full">
                      Featured
                    </span>
                  )}
                </TableCell>
                <TableCell className="text-gray-900">{dish.category}</TableCell>
                <TableCell className="text-right text-gray-900 font-medium">
                  ₦{dish.price.toLocaleString()}
                </TableCell>
                <TableCell className="flex gap-1">
                  <Button
                    size="icon"
                    onClick={() => onEdit(dish)}
                    className="bg-blue-500 hover:bg-blue-600 text-white border-blue-500 hover:border-blue-600 transition-colors"
                  >
                    <Edit size={18} />
                  </Button>
                  <Button
                    size="icon"
                    onClick={() => onDelete(dish.id)}
                    className="bg-red-500 hover:bg-red-600 text-white border-red-500 hover:border-red-600 transition-colors"
                  >
                    <Trash size={18} />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
