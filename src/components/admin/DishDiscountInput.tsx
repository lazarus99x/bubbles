
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface DishDiscountInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const DishDiscountInput: React.FC<DishDiscountInputProps> = ({ value, onChange }) => {
  return (
    <div>
      <Label htmlFor="discountPrice">Discount Price (₦)</Label>
      <Input
        id="discountPrice"
        type="number"
        step="0.01"
        min="0"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};
