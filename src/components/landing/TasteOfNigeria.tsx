import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface GalleryItem {
  image: string;
  name: string;
  description: string;
}

const galleryItems: GalleryItem[] = [
  {
    image:
      "https://www.tastingtable.com/img/gallery/akara-the-nigerian-breakfast-fritter-you-should-know-about/intro-1664227983.jpg",
    name: "Akara",
    description: "Crispy close-up",
  },
  {
    image:
      "https://images.timbu.com/contents-c1516465224d4fa898e2b4ec26e8de27/97948c06-9c83-492e-9e5f-3631a9d1ef95.png",
    name: "Suya",
    description: "Sizzling",
  },
  {
    image: "https://foodsturvs.ca/wp-content/uploads/2024/01/35_file.png",
    name: "Pounded Yam & Egusi",
    description: "Authentic",
  },
  {
    image: "https://dailytrust.com/wp-content/uploads/2023/04/School-3.jpg",
    name: "AGBARHO COMMUNITY DEVELOPMENT ",
    description: "Golden",
  },
];

const TasteOfNigeria: React.FC = () => {
  return (
    <section className="py-12 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-8 text-center text-[#1A1F2C]">
          Taste of Nigeria
        </h2>

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
                    <h3 className="text-2xl font-bold text-white mb-2 text-shadow-lg">
                      {item.name}
                    </h3>
                    <p className="text-white text-lg font-medium drop-shadow-md">
                      {item.description}
                    </p>
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
