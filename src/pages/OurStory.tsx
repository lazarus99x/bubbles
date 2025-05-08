
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const OurStory: React.FC = () => {
  return (
    <div className="min-h-screen pt-16">
      <Navbar />
      
      <section className="py-16 bg-gradient-to-b from-[#1A1F2C]/10 to-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-bubbles-pink mb-12">
            Our Story
          </h1>
          
          <div className="space-y-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-full md:w-1/2">
                <p className="text-gray-700 mb-4 text-lg">
                  At Bubbles, we serve fresh, flavorful dishes made just for you—order online for quick delivery or pickup, or stop by our cozy spot to grab tasty snacks like flaky meat pies, creamy parfaits, and more. 
                </p>
                <p className="text-gray-700 text-lg">
                  While we don't offer dine-in, every bite is packed with the same care and quality you'd expect from a full-service restaurant.
                </p>
              </div>
              <div className="w-full md:w-1/2 h-72">
                <img 
                  src="https://images.unsplash.com/photo-1624181981585-08c0bd1b4e56?q=80&w=1470&auto=format&fit=crop" 
                  alt="Nigerian cuisine" 
                  className="w-full h-full object-cover rounded-lg shadow-lg"
                  loading="lazy"
                />
              </div>
            </div>
            
            <div className="flex flex-col-reverse md:flex-row items-center gap-8">
              <div className="w-full md:w-1/2 h-72">
                <img 
                  src="https://images.unsplash.com/photo-1626778679441-4483ebdab11a?q=80&w=1474&auto=format&fit=crop" 
                  alt="Nigerian cuisine preparation" 
                  className="w-full h-full object-cover rounded-lg shadow-lg"
                  loading="lazy"
                />
              </div>
              <div className="w-full md:w-1/2">
                <p className="text-gray-700 mb-4 text-lg">
                  Whether you're picking up a family feast or grabbing a quick treat on the go, Bubbles brings great food to your day, hassle-free.
                </p>
                <p className="text-gray-700 text-lg">
                  Our dedication to authentic Nigerian cuisine means we never compromise on flavor, quality, or tradition.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-full md:w-1/2">
                <p className="text-gray-700 mb-4 text-lg">
                  From our kitchen to your table, we take pride in creating dishes that bring comfort and joy. Our recipes have been passed down through generations, each with its own story and significance.
                </p>
                <p className="text-gray-700 text-lg">
                  Order online, swing by, and enjoy the ease of great meals made simple. 🍽✨
                </p>
              </div>
              <div className="w-full md:w-1/2 h-72">
                <img 
                  src="https://images.unsplash.com/photo-1591486083988-61401adc0f8f?q=80&w=1374&auto=format&fit=crop" 
                  alt="Nigerian cuisine closeup" 
                  className="w-full h-full object-cover rounded-lg shadow-lg"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default OurStory;
