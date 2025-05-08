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
    <nav className="fixed top-0 left-0 right-0 z-50 glass px-6 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img
            src="/images/logo.png"
            alt="Bubbles Logo"
            className="h-12 w-auto hover:opacity-90 transition-opacity"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <Link
            to="/menu"
            className="text-bubbles-black hover:text-bubbles-pink transition-colors"
          >
            Menu
          </Link>
          <Link
            to="/our-story"
            className="text-bubbles-black hover:text-bubbles-pink transition-colors"
          >
            Our Story
          </Link>
          <a
            href="/#location"
            className="text-bubbles-black hover:text-bubbles-pink transition-colors"
          >
            Location
          </a>
          <a
            href="/#contact"
            className="text-bubbles-black hover:text-bubbles-pink transition-colors"
          >
            Contact
          </a>

          <ProfileIcon />
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <ProfileIcon />
          <button className="text-bubbles-black" onClick={toggleMenu}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden glass absolute top-16 left-0 right-0 p-4">
          <div className="flex flex-col space-y-4">
            <Link
              to="/menu"
              className="text-bubbles-black hover:text-bubbles-pink transition-colors"
              onClick={toggleMenu}
            >
              Menu
            </Link>
            <Link
              to="/our-story"
              className="text-bubbles-black hover:text-bubbles-pink transition-colors"
              onClick={toggleMenu}
            >
              Our Story
            </Link>
            <a
              href="/#location"
              className="text-bubbles-black hover:text-bubbles-pink transition-colors"
              onClick={toggleMenu}
            >
              Location
            </a>
            <a
              href="/#contact"
              className="text-bubbles-black hover:text-bubbles-pink transition-colors"
              onClick={toggleMenu}
            >
              Contact
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
