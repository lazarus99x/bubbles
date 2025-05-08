
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();

  // Check if user is already logged in
  useEffect(() => {
    if (user) {
      if (isAdmin) {
        navigate("/admin");
      } else {
        navigate("/");
      }
    }
  }, [navigate, user, isAdmin]);

  return (
    <div className="min-h-screen pt-16">
      <Navbar />
      
      <div className="section-padding">
        <div className="container mx-auto px-4">
          <div className="max-w-lg mx-auto glass p-8 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold text-bubbles-pink text-center mb-8">Choose Login Type</h1>
            
            <div className="flex flex-col space-y-6">
              <div className="glass-dark p-6 rounded-lg">
                <h2 className="text-2xl font-semibold mb-4">Customer Access</h2>
                <p className="mb-4 text-gray-700">
                  Browse our menu and place orders through our customer portal.
                </p>
                <Button 
                  onClick={() => navigate("/customer-login")}
                  className="w-full bg-bubbles-pink hover:bg-bubbles-pink/80"
                >
                  Customer Login
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Login;
