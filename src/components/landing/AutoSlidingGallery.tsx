import React, { useState, useEffect, useRef, useCallback } from "react";

interface GalleryImage {
  src: string;
  alt: string;
}

interface AutoSlidingGalleryProps {
  interval?: number;
}

const AutoSlidingGallery: React.FC<AutoSlidingGalleryProps> = ({
  interval = 7000,
}) => {
  // Your custom images from public/images folder
  const images: GalleryImage[] = [
    {
      src: "/images/slider.jpg", // Replace with your actual image filenames
      alt: "Delicious Meals",
    },
    {
      src: "/images/slider2.jpg",
      alt: "Jollof at it's Best",
    },
    {
      src: "/images/slider3.jpg",
      alt: "Affordable Meals",
    },
    {
      src: "/images/slider4.jpg",
      alt: "Original Naija Dishes",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timeoutRef = useRef<number>();

  const resetTimeout = () => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }
  };

  const nextSlide = useCallback(() => {
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    setTimeout(() => setIsTransitioning(false), 1000);
  }, [images.length]);

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = window.setTimeout(nextSlide, interval);

    return () => {
      resetTimeout();
    };
  }, [currentIndex, interval, nextSlide]);

  if (images.length === 0) return null;

  return (
    <div className="relative w-full h-[600px] overflow-hidden rounded-xl shadow-[0_0_40px_rgba(147,51,234,0.4)] border border-purple-500/30">
      <div className="h-full relative">
        {images.map((image, idx) => (
          <div
            key={idx}
            className={`absolute w-full h-full transition-all duration-1000 ease-in-out ${
              idx === currentIndex
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-full"
            }`}
            style={{
              zIndex: idx === currentIndex ? 1 : 0,
            }}
          >
            <div className="relative w-full h-full">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1F2C] via-transparent to-transparent opacity-50" />
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white z-10">
                <h3 className="text-3xl font-bold mb-2 text-shadow-lg">
                  {image.alt}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-6 left-0 right-0 z-[3] flex justify-center gap-2">
        {images.map((_, idx) => (
          <button
            key={idx}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              idx === currentIndex
                ? "bg-bubbles-pink w-8 shadow-[0_0_10px_#FF6B9D]"
                : "bg-white/60 hover:bg-white/80 hover:shadow-[0_0_10px_rgba(255,255,255,0.5)]"
            }`}
            onClick={() => {
              resetTimeout();
              setCurrentIndex(idx);
            }}
          />
        ))}
      </div>

      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-4 rounded-full z-10 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(0,0,0,0.3)]"
        onClick={(e) => {
          e.preventDefault();
          resetTimeout();
          setCurrentIndex(
            (prevIndex) => (prevIndex - 1 + images.length) % images.length
          );
        }}
      >
        ←
      </button>
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-4 rounded-full z-10 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(0,0,0,0.3)]"
        onClick={(e) => {
          e.preventDefault();
          resetTimeout();
          nextSlide();
        }}
      >
        →
      </button>
    </div>
  );
};

export default AutoSlidingGallery;
