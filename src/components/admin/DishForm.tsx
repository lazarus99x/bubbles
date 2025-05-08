
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dish } from '@/types/dish';
import ImageUpload from './ImageUpload';
import { DishFeaturedToggle } from './DishFeaturedToggle';
import { DishDiscountInput } from './DishDiscountInput';
import { useDishForm } from '@/hooks/useDishForm';

interface DishFormProps {
  dish?: Dish;
  onSubmit: () => void;
  categories: string[];
}

export default function DishForm({ dish, onSubmit, categories }: DishFormProps) {
  const {
    formData: {
      name,
      description,
      price,
      category,
      imagePreview,
      loading,
      isFeatured,
      discountPrice,
    },
    setters: {
      setName,
      setDescription,
      setPrice,
      setCategory,
      setIsFeatured,
      setDiscountPrice,
    },
    handleImageSelected,
    handleSubmit,
  } = useDishForm({ dish, onSubmit });

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="name">Dish Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />
      </div>
      
      <div>
        <Label htmlFor="price">Price (₦)</Label>
        <Input
          id="price"
          type="number"
          step="0.01"
          min="0"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>

      <DishFeaturedToggle 
        checked={isFeatured}
        onCheckedChange={setIsFeatured}
      />

      {isFeatured && (
        <DishDiscountInput
          value={discountPrice}
          onChange={setDiscountPrice}
        />
      )}
      
      <div>
        <Label htmlFor="category">Category</Label>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <ImageUpload
        onImageSelected={handleImageSelected}
        imagePreview={imagePreview}
      />
      
      <Button 
        type="submit" 
        className="w-full bg-bubbles-pink hover:bg-bubbles-pink/80 hover:shadow-[0_0_15px_#FF6B9D] transition-all animation-pulse"
        disabled={loading}
      >
        {loading ? 'Saving...' : dish ? 'Update Dish' : 'Add Dish'}
      </Button>
    </form>
  );
}
