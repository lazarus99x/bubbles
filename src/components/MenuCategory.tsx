import React from "react";
import MenuItem from "./MenuItem";

interface MenuCategoryProps {
  name: string;
  items: {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
  }[];
}

const MenuCategory: React.FC<MenuCategoryProps> = ({ name, items }) => {
  return (
    <div className="mb-16">
      <h2 className="text-3xl font-bold text-bubbles-pink mb-8 text-center">
        {name}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((item) => (
          <MenuItem
            key={item.id}
            name={item.name}
            description={item.description}
            price={item.price}
            image={item.image}
          />
        ))}
      </div>
    </div>
  );
};

export default MenuCategory;
