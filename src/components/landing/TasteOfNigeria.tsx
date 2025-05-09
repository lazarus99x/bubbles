import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

interface GalleryItem {
  image: string;
  name: string;
  description: string;
}

const galleryItems: GalleryItem[] = [
  {
    image: "https://images.unsplash.com/photo-1624181981585-08c0bd1b4e56?q=80&w=1470&auto=format&fit=crop",
    name: "Jollof Rice",
    description: "Golden"
  },
  {
    image: "https://images.unsplash.com/photo-1626778679441-4483ebdab11a?q=80&w=1474&auto=format&fit=crop",
    name: "Suya",
    description: "Sizzling"
  },
  {
    image: "https://images.unsplash.com/photo-1591813144877-663dc17460fa?q=80&w=1374&auto=format&fit=crop",
    name: "Pounded Yam & Egusi",
    description: "Artistic"
  },
  {
    image: "https://images.unsplash.com/photo-1591486083988-61401adc0f8f?q=80&w=1374&auto=format&fit=crop",
    name: "Akara",
    description: "Crispy close-up"
  },
];

const TasteOfNigeria: React.FC = () => {
  return (
    <section className="py-12 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-8 text-center text-[#1A1F2C]">Taste of Nigeria</h2>
        
        <Carousel className="w-full max-w-5xl mx-auto">
          <CarouselContent>
            {galleryItems.map((item, index) => (
              <CarouselItem key={index} className="md:basis-1/1">
                <div className="relative h-[70vh] overflow-hidden rounded-lg shadow-lg">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover transform transition-transform hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
                    <h3 className="text-2xl font-bold text-white mb-2 text-shadow-lg">{item.name}</h3>
                    <p className="text-white text-lg font-medium drop-shadow-md">{item.description}</p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4 bg-white/90 hover:bg-white text-[#1A1F2C] border-none" />
          <CarouselNext className="right-4 bg-white/90 hover:bg-white text-[#1A1F2C] border-none" />
        </Carousel>
      </div>
    </section>
  );
};

export default TasteOfNigeria;
