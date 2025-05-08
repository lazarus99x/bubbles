
import { Button } from '@/components/ui/button';

interface CategoryFilterProps {
  categories: string[];
  activeCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

export function CategoryFilter({ categories, activeCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="mb-4 flex flex-wrap gap-2">
      <Button 
        variant={activeCategory === null ? "default" : "outline"}
        onClick={() => onCategoryChange(null)}
      >
        All
      </Button>
      {categories.map(cat => (
        <Button 
          key={cat}
          variant={activeCategory === cat ? "default" : "outline"}
          onClick={() => onCategoryChange(cat)}
        >
          {cat}
        </Button>
      ))}
    </div>
  );
}
