import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Plus, Minus, MessageCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useSiteSettings } from "@/contexts/useSiteSettings";

interface Dish {
  id: string;
  name: string;
  price: number;
  category: string;
  description?: string;
  image_url?: string;
}

interface OrderItem {
  dish: Dish;
  quantity: number;
}

const Order: React.FC = () => {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [selectedItems, setSelectedItems] = useState<OrderItem[]>([]);
  const [customerName, setCustomerName] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [customerNotes, setCustomerNotes] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { settings } = useSiteSettings();

  useEffect(() => {
    fetchDishes();
  }, []);

  const fetchDishes = async () => {
    try {
      const { data, error } = await supabase
        .from("dishes")
        .select("*")
        .order("category", { ascending: true })
        .order("name", { ascending: true });

      if (error) throw error;
      setDishes(data || []);
    } catch (error: unknown) {
      console.error("Error fetching dishes:", error);
      toast.error("Failed to load menu items");
    } finally {
      setLoading(false);
    }
  };

  const addToOrder = (dish: Dish) => {
    setSelectedItems((prev) => {
      const existing = prev.find((item) => item.dish.id === dish.id);
      if (existing) {
        return prev.map((item) =>
          item.dish.id === dish.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { dish, quantity: 1 }];
    });
  };

  const removeFromOrder = (dishId: string) => {
    setSelectedItems((prev) => {
      const existing = prev.find((item) => item.dish.id === dishId);
      if (existing && existing.quantity > 1) {
        return prev.map((item) =>
          item.dish.id === dishId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
      return prev.filter((item) => item.dish.id !== dishId);
    });
  };

  const getTotalPrice = () => {
    return selectedItems.reduce(
      (total, item) => total + item.dish.price * item.quantity,
      0
    );
  };

  const handleWhatsAppOrder = () => {
    if (selectedItems.length === 0) {
      toast.error("Please select at least one item");
      return;
    }

    if (!customerName.trim() || !customerAddress.trim()) {
      toast.error("Please fill in your name and address");
      return;
    }

    const orderDetails = selectedItems
      .map(
        (item) =>
          `${item.quantity}x ${item.dish.name} - ₦${(item.dish.price * item.quantity).toLocaleString()}`
      )
      .join("\n");

    const totalAmount = getTotalPrice();

    const message = `Hi! I want to order:

📋 ORDER DETAILS:
${orderDetails}

💰 Total: ₦${totalAmount.toLocaleString()}

👤 Customer: ${customerName}
📍 Address: ${customerAddress}${customerNotes ? `\n📝 Notes: ${customerNotes}` : ""}

Please confirm availability and delivery fee. Thank you!`;

    const whatsappNumber = settings?.whatsapp_number || "2348000000000";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank");
  };

  const getItemQuantity = (dishId: string) => {
    const item = selectedItems.find((item) => item.dish.id === dishId);
    return item ? item.quantity : 0;
  };

  const groupedDishes = dishes.reduce(
    (acc, dish) => {
      if (!acc[dish.category]) {
        acc[dish.category] = [];
      }
      acc[dish.category].push(dish);
      return acc;
    },
    {} as Record<string, Dish[]>
  );

  if (loading) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-bubbles-pink mx-auto mb-4"></div>
          <p>Loading menu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16">
      <Navbar />

      <div className="section-padding">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-bubbles-pink mb-2">
              Place Your Order
            </h1>
            <p className="text-gray-600">
              Select your favorite items and order via WhatsApp
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Menu Items */}
            <div className="lg:col-span-2">
              {Object.entries(groupedDishes).map(
                ([category, categoryDishes]) => (
                  <div key={category} className="mb-8">
                    <h2 className="text-2xl font-bold text-bubbles-pink mb-4 capitalize">
                      {category}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {categoryDishes.map((dish) => {
                        const quantity = getItemQuantity(dish.id);
                        return (
                          <div
                            key={dish.id}
                            className="bg-white rounded-lg shadow-md p-4 border"
                          >
                            {dish.image_url && (
                              <img
                                src={dish.image_url}
                                alt={dish.name}
                                className="w-full h-32 object-cover rounded-md mb-3"
                              />
                            )}
                            <h3 className="font-semibold text-lg mb-1">
                              {dish.name}
                            </h3>
                            {dish.description && (
                              <p className="text-gray-600 text-sm mb-2">
                                {dish.description}
                              </p>
                            )}
                            <div className="flex justify-between items-center">
                              <span className="text-lg font-bold text-bubbles-pink">
                                ₦{dish.price.toLocaleString()}
                              </span>
                              <div className="flex items-center gap-2">
                                {quantity > 0 && (
                                  <>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => removeFromOrder(dish.id)}
                                      className="h-8 w-8 p-0"
                                    >
                                      <Minus className="h-4 w-4" />
                                    </Button>
                                    <Badge
                                      variant="secondary"
                                      className="min-w-[2rem] text-center"
                                    >
                                      {quantity}
                                    </Badge>
                                  </>
                                )}
                                <Button
                                  size="sm"
                                  onClick={() => addToOrder(dish)}
                                  className="h-8 w-8 p-0 bg-bubbles-pink hover:bg-bubbles-pink/80"
                                >
                                  <Plus className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )
              )}
            </div>

            {/* Order Summary & Customer Details */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="bg-white rounded-lg shadow-lg p-6 border">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <ShoppingCart className="h-5 w-5" />
                    Your Order
                  </h3>

                  {selectedItems.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">
                      No items selected yet
                    </p>
                  ) : (
                    <div className="space-y-3 mb-4">
                      {selectedItems.map((item) => (
                        <div
                          key={item.dish.id}
                          className="flex justify-between items-center py-2 border-b"
                        >
                          <div className="flex-1">
                            <p className="font-medium">{item.dish.name}</p>
                            <p className="text-sm text-gray-600">
                              {item.quantity}x ₦
                              {item.dish.price.toLocaleString()}
                            </p>
                          </div>
                          <p className="font-bold">
                            ₦
                            {(item.dish.price * item.quantity).toLocaleString()}
                          </p>
                        </div>
                      ))}
                      <div className="flex justify-between items-center pt-2 text-lg font-bold">
                        <span>Total:</span>
                        <span className="text-bubbles-pink">
                          ₦{getTotalPrice().toLocaleString()}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Customer Details Form */}
                  <div className="space-y-4 mb-6">
                    <h4 className="font-semibold">Customer Details</h4>
                    <Input
                      placeholder="Your Name"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                    />
                    <Textarea
                      placeholder="Delivery Address"
                      value={customerAddress}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                      rows={3}
                    />
                    <Textarea
                      placeholder="Special requests or notes (optional)"
                      value={customerNotes}
                      onChange={(e) => setCustomerNotes(e.target.value)}
                      rows={2}
                    />
                  </div>

                  {/* Delivery Note */}
                  <div className="bg-blue-50 p-4 rounded-lg mb-4">
                    <p className="text-sm text-blue-800">
                      <strong>Delivery:</strong> Fees calculated based on
                      location. We'll confirm availability and total cost via
                      WhatsApp.
                    </p>
                  </div>

                  {/* Order Button */}
                  <Button
                    onClick={handleWhatsAppOrder}
                    disabled={
                      selectedItems.length === 0 ||
                      !customerName.trim() ||
                      !customerAddress.trim()
                    }
                    className="w-full bg-green-600 hover:bg-green-700 flex items-center gap-2"
                    size="lg"
                  >
                    <MessageCircle className="h-5 w-5" />
                    Order via WhatsApp
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Order;
