import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import WhatsAppButton from "./WhatsAppButton";

interface FeaturedDishBannerProps {
  dish: {
    name: string;
    description: string;
    price: number;
    discount_price: number;
    image_url: string;
    currency: string;
  };
}

export default function FeaturedDishBanner({ dish }: FeaturedDishBannerProps) {
  const discount = ((dish.price - dish.discount_price) / dish.price) * 100;

  return (
    <Card className="w-full overflow-hidden bg-gradient-to-r from-bubbles-pink/20 to-bubbles-white border-none">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="h-64 md:h-full">
          <img
            src={dish.image_url}
            alt={dish.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-6 flex flex-col justify-center">
          <CardHeader className="px-0">
            <CardTitle className="text-3xl font-bold text-bubbles-pink mb-2">
              Today's Special
            </CardTitle>
          </CardHeader>
          <CardContent className="px-0">
            <h3 className="text-2xl font-semibold mb-2">{dish.name}</h3>
            <p className="text-gray-600 mb-4">{dish.description}</p>
            <div className="mb-6">
              <div className="flex items-center gap-4">
                <span className="text-2xl font-bold text-bubbles-pink">
                  {dish.currency}
                  {dish.discount_price.toLocaleString()}
                </span>
                <span className="text-lg line-through text-gray-400">
                  {dish.currency}
                  {dish.price.toLocaleString()}
                </span>
                <span className="bg-bubbles-pink text-white px-2 py-1 rounded-full text-sm">
                  {Math.round(discount)}% OFF
                </span>
              </div>
            </div>
            <WhatsAppButton text="Order Special" dishName={dish.name} />
          </CardContent>
        </div>
      </div>
    </Card>
  );
}
