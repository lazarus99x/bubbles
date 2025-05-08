
import React from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface DishFeaturedToggleProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export const DishFeaturedToggle: React.FC<DishFeaturedToggleProps> = ({ 
  checked, 
  onCheckedChange 
}) => {
  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="featured"
        checked={checked}
        onCheckedChange={onCheckedChange}
      />
      <Label htmlFor="featured">Featured Dish</Label>
    </div>
  );
};
