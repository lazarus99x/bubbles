import React from "react";
import Hero from "../components/Hero";
import TasteOfNigeria from "../components/landing/TasteOfNigeria";
import CustomerFavorites from "../components/landing/CustomerFavorites";
import ExploreCulture from "../components/landing/ExploreCulture";
import LocationSection from "../components/landing/LocationSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import AutoSlidingGallery from "../components/landing/AutoSlidingGallery";
import CreativeFeatures from "../components/landing/CreativeFeatures";
import TestimonialsSection from "../components/landing/TestimonialsSection";
import InteractiveJourney from "../components/landing/InteractiveJourney";
import InteractiveKitchen from "../components/landing/InteractiveKitchen";
import FloatingBubbles from "../components/FloatingBubbles";

const Index: React.FC = () => {
  const galleryImages = [
    { src: "/images/hero.jpg", alt: "Bubbles Featured Image" },
    { src: "/images/logo.png", alt: "Bubbles Logo" },
  ];

  return (
    <div className="min-h-screen relative">
      {/* Add FloatingBubbles with higher z-index */}
      <div className="fixed inset-0 z-0">
        <FloatingBubbles />
      </div>

      {/* Main content */}
      <div className="relative z-10">
        <Navbar />
        <Hero />
      </div>

      {/* Scrolling content sections with alternating transparency */}
      <div className="relative z-10 space-y-12">
        <section className="bg-transparent">
          <div className="w-full max-w-6xl mx-auto px-4">
            <AutoSlidingGallery images={galleryImages} />
          </div>
        </section>

        <section className="bg-[#1A1F2C]/30 backdrop-blur-sm">
          <CreativeFeatures />
        </section>

        <section className="bg-transparent">
          <InteractiveKitchen />
        </section>

        <section className="bg-[#1A1F2C]/30 backdrop-blur-sm">
          <InteractiveJourney />
        </section>

        <section className="bg-transparent">
          <TasteOfNigeria />
        </section>

        <section className="bg-[#1A1F2C]/30 backdrop-blur-sm">
          <CustomerFavorites />
        </section>

        <section className="bg-transparent">
          <ExploreCulture />
        </section>

        <section className="bg-[#1A1F2C]/30 backdrop-blur-sm">
          <TestimonialsSection />
        </section>

        <section className="bg-transparent">
          <LocationSection />
        </section>

        <section className="bg-[#1A1F2C]/30 backdrop-blur-sm">
          <ContactSection />
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Index;
