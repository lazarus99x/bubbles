
interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

interface MenuCategory {
  id: string;
  name: string;
  items: MenuItem[];
}

export const menuData: MenuCategory[] = [
  {
    id: "drinks",
    name: "Drinks",
    items: [
      {
        id: "zobo",
        name: "Zobo",
        description: "Traditional Nigerian hibiscus drink with a sweet and tangy flavor, infused with pineapple and ginger.",
        price: 500,
        image: "https://images.unsplash.com/photo-1558857563-c0c6b32a3d60?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      },
      {
        id: "chapman",
        name: "Chapman",
        description: "Refreshing cocktail made with Fanta, Sprite, blackcurrant, and a medley of citrus fruits.",
        price: 900,
        image: "https://images.unsplash.com/photo-1605270012917-bf157c5a9541?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80"
      },
      {
        id: "fruit-smoothie",
        name: "Tropical Fruit Smoothie",
        description: "Blend of fresh tropical fruits like mango, pineapple, and banana with yogurt.",
        price: 1200,
        image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      }
    ]
  },
  {
    id: "pastries",
    name: "Pastries",
    items: [
      {
        id: "meat-pie",
        name: "Meat Pie",
        description: "Flaky pastry filled with seasoned minced beef, potatoes and carrots.",
        price: 800,
        image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1022&q=80"
      },
      {
        id: "shawarma",
        name: "Chicken Shawarma",
        description: "Grilled chicken wrapped in flat bread with vegetables and special sauce.",
        price: 1500,
        image: "https://images.unsplash.com/photo-1550401780-47d39215e97b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      },
      {
        id: "scotch-egg",
        name: "Scotch Egg",
        description: "Hard-boiled egg wrapped in seasoned sausage meat, breaded and deep-fried.",
        price: 600,
        image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80"
      }
    ]
  },
  {
    id: "cakes",
    name: "Cakes",
    items: [
      {
        id: "red-velvet",
        name: "Red Velvet Cake",
        description: "Moist, rich red cake with a hint of cocoa, layered with cream cheese frosting.",
        price: 1800,
        image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1078&q=80"
      },
      {
        id: "fruit-cake",
        name: "Fruit Cake",
        description: "Dense, moist cake filled with dried fruits and nuts, topped with fruit glaze.",
        price: 1500,
        image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      },
      {
        id: "chocolate-cake",
        name: "Chocolate Cake",
        description: "Decadent chocolate sponge cake with rich chocolate ganache frosting.",
        price: 1700,
        image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      }
    ]
  },
  {
    id: "finger-foods",
    name: "Finger Foods",
    items: [
      {
        id: "corn-dogs",
        name: "Corn Dogs",
        description: "Sausages on sticks, dipped in corn batter and deep-fried until golden.",
        price: 700,
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      },
      {
        id: "waffles",
        name: "Belgian Waffles",
        description: "Crispy on the outside, fluffy on the inside waffles served with syrup and fruits.",
        price: 1200,
        image: "https://images.unsplash.com/photo-1504973960431-1c467e159aa4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      },
      {
        id: "puff-puff",
        name: "Puff Puff",
        description: "Traditional Nigerian deep-fried dough balls, lightly sweetened.",
        price: 500,
        image: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      }
    ]
  },
  {
    id: "rice-dishes",
    name: "Rice Dishes",
    items: [
      {
        id: "jollof-rice",
        name: "Jollof Rice",
        description: "Aromatic rice cooked in tomato sauce with a blend of spices. Served with chicken.",
        price: 2000,
        image: "https://images.unsplash.com/photo-1624181981585-08c0bd1b4e56?q=80&w=1470&auto=format&fit=crop"
      },
      {
        id: "fried-rice",
        name: "Nigerian Fried Rice",
        description: "Rice stir-fried with vegetables, shrimp, and chicken in a savory sauce.",
        price: 2200,
        image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      },
      {
        id: "pineapple-rice",
        name: "Pineapple Rice",
        description: "Sweet and savory rice dish with chunks of pineapple, vegetables, and protein.",
        price: 2500,
        image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      }
    ]
  },
  {
    id: "proteins",
    name: "Proteins",
    items: [
      {
        id: "suya",
        name: "Suya",
        description: "Spicy skewered meat, grilled and coated with a blend of ground peanuts and spices.",
        price: 1800,
        image: "https://images.unsplash.com/photo-1626778679441-4483ebdab11a?q=80&w=1474&auto=format&fit=crop"
      },
      {
        id: "grilled-chicken",
        name: "Grilled Chicken",
        description: "Tender chicken marinated in herbs and spices, then perfectly grilled.",
        price: 2000,
        image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80"
      },
      {
        id: "peppered-snail",
        name: "Peppered Snail",
        description: "Large land snails cooked in a spicy pepper sauce with bell peppers and onions.",
        price: 3000,
        image: "https://images.unsplash.com/photo-1504973960431-1c467e159aa4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      }
    ]
  },
  {
    id: "soups-swallows",
    name: "Soups & Swallows",
    items: [
      {
        id: "egusi",
        name: "Egusi Soup",
        description: "Thick soup made with ground melon seeds, vegetables, and assorted meat.",
        price: 2500,
        image: "https://images.unsplash.com/photo-1591813144877-663dc17460fa?q=80&w=1374&auto=format&fit=crop"
      },
      {
        id: "fufu",
        name: "Fufu",
        description: "Soft, dough-like swallow made from cassava, served with any soup of your choice.",
        price: 500,
        image: "https://images.unsplash.com/photo-1591813144877-663dc17460fa?q=80&w=1374&auto=format&fit=crop"
      },
      {
        id: "banga-soup",
        name: "Banga Soup",
        description: "Traditional Niger-Delta soup made with palm fruit extract, spices, and fish.",
        price: 2800,
        image: "https://images.unsplash.com/photo-1591486083988-61401adc0f8f?q=80&w=1374&auto=format&fit=crop"
      }
    ]
  }
];

export default menuData;
