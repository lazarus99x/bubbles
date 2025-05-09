import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-black to-gray-800 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col items-center md:items-start">
            <Link to="/">
              <img
                src="/images/logo.png"
                alt="Bubbles Logo"
                className="h-16 w-auto mb-4"
              />
            </Link>
            <p className="text-gray-400 text-sm text-center md:text-left">
              Bringing you the best taste of Nigeria
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="hover:text-bubbles-pink transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/menu"
                  className="hover:text-bubbles-pink transition-colors"
                >
                  Menu
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="hover:text-bubbles-pink transition-colors"
                >
                  Admin Login
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <address className="not-italic">
              <p className="mb-2">123 Bubble Street</p>
              <p className="mb-2">Foodie City, FC 12345</p>
              <p className="mb-2">Phone: (123) 456-7890</p>
              <p>Email: hello@bubblesrestaurant.com</p>
            </address>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
