import React from "react";
import { Link } from "react-router-dom";
import { useSiteSettings } from "@/contexts/useSiteSettings";

const Footer: React.FC = () => {
  const { settings } = useSiteSettings();
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
              {settings.restaurant_slogan ||
                "Authentic Nigerian cuisine on Old Ughelli/Warri Road"}
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
              <p className="mb-2">
                {settings.address_line1 ||
                  "Old Ughelli/Warri Road, opposite former Ecoban"}
              </p>
              <p className="mb-2">
                {settings.address_line2 || "Agbarho, Delta State"}
              </p>
              <p className="mb-2">
                Phone: {settings.contact_phone || "+2347088081689"}
              </p>
              <p>
                Email:{" "}
                {settings.contact_email || "contact@bubblesrestaurant.pro"}
              </p>
            </address>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
