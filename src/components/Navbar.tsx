import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import ProfileIcon from "./profile/ProfileIcon";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm px-6 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img
            src="/images/logo.png"
            alt="Bubbles Logo"
            className="h-12 w-auto hover:opacity-90 transition-opacity"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-12">
          <Link
            to="/menu"
            className="text-white hover:text-pink-500 transition-colors font-medium"
          >
            Menu
          </Link>
          <Link
            to="/our-story"
            className="text-white hover:text-pink-500 transition-colors font-medium"
          >
            Our Story
          </Link>

          <Link
            to="/order"
            className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-full font-medium transition-colors"
          >
            Place Order
          </Link>
          <ProfileIcon />
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-4">
          <Link
            to="/order"
            className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-full font-medium transition-colors text-sm"
          >
            Place Order
          </Link>
          <button className="text-white" onClick={toggleMenu}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black/95 absolute top-16 left-0 right-0 p-4">
          <div className="flex flex-col space-y-4">
            <Link
              to="/menu"
              className="text-white hover:text-pink-500 transition-colors"
              onClick={toggleMenu}
            >
              Menu
            </Link>
            <Link
              to="/our-story"
              className="text-white hover:text-pink-500 transition-colors"
              onClick={toggleMenu}
            >
              Our Story
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
