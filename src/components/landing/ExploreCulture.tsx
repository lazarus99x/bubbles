
import React from 'react';

const ExploreCulture: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Left: Short video loop */}
          <div className="w-full md:w-1/2 overflow-hidden rounded-lg">
            <video 
              autoPlay 
              loop 
              muted 
              playsInline
              className="w-full h-[400px] object-cover"
            >
              <source 
                src="https://assets.mixkit.co/videos/preview/mixkit-chef-garnishing-a-dish-at-a-restaurant-35651-large.mp4" 
                type="video/mp4" 
              />
              Your browser does not support the video tag.
            </video>
          </div>
          
          {/* Right: Text about Nigerian culinary heritage */}
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl font-bold mb-4 text-bubbles-black">Explore Our Culture</h2>
            <p className="text-gray-700 mb-4">
              Nigerian cuisine is a vibrant celebration of flavors, colors, and cultural heritage. Our dishes 
              tell stories of traditions passed down through generations, with each region contributing unique 
              culinary signatures.
            </p>
            <p className="text-gray-700 mb-6">
              From the spicy depths of Jollof rice to the comforting warmth of pounded yam and egusi soup, 
              our menu invites you on a journey through Nigeria's diverse culinary landscape. Every bite 
              connects you to centuries of tradition and culinary excellence.
            </p>
            <p className="text-gray-700">
              At Bubbles, we honor these traditions while adding our own contemporary touch, creating 
              an experience that bridges the past and present of Nigerian gastronomy.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExploreCulture;
