
export interface Dish {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  category: string;
  created_at: string;
  updated_at: string;
  is_featured: boolean;
  discount_price: number | null;
  currency: string;
}
