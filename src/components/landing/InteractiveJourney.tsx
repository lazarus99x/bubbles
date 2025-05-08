import React from "react";

const InteractiveJourney = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Your Journey with Bubbles
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              From idea to reality, we're here to make your experience
              exceptional
            </p>
          </div>

          <div className="relative">
            {/* Circle background with gradient */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-bubbles-pink/20 via-purple-500/20 to-bubbles-pink/20 blur-3xl" />

            {/* Main circular journey */}
            <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-center">
              {/* The Gumroad Way */}
              <div className="group text-center p-6">
                <div className="mb-4 w-16 h-16 rounded-full bg-bubbles-pink/20 flex items-center justify-center mx-auto">
                  <span className="text-2xl text-bubbles-pink">1</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  The Bubbles Way
                </h3>
                <p className="text-gray-400">
                  Experience our unique approach to Nigerian cuisine
                </p>
                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-bubbles-pink">→</span>
                </div>
              </div>

              {/* Start Small */}
              <div className="group text-center p-6">
                <div className="mb-4 w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto">
                  <span className="text-2xl text-purple-500">2</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Start Small
                </h3>
                <p className="text-gray-400">
                  Try our signature dishes and customer favorites
                </p>
                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-purple-500">→</span>
                </div>
              </div>

              {/* Learn Quickly */}
              <div className="group text-center p-6">
                <div className="mb-4 w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto">
                  <span className="text-2xl text-blue-500">3</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Learn Quickly
                </h3>
                <p className="text-gray-400">
                  Discover the rich flavors of Nigerian cuisine
                </p>
                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-blue-500">→</span>
                </div>
              </div>

              {/* Get Better Together */}
              <div className="group text-center p-6">
                <div className="mb-4 w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto">
                  <span className="text-2xl text-green-500">4</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Get Better Together
                </h3>
                <p className="text-gray-400">
                  Join our community and share your experiences
                </p>
                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-green-500">→</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveJourney;
