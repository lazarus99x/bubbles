
import React from 'react';

const LocationSection: React.FC = () => {
  const handleGetDirections = () => {
    // Open Google Maps directions in a new tab
    window.open(
      'https://www.google.com/maps/dir/?api=1&destination=Old+Ughelli%2FWarri+Road+Agbarho+Delta+State&travelmode=driving',
      '_blank'
    );
  };

  return (
    <section className="py-16 bg-bubbles-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-4 text-center text-bubbles-black">Find Us</h2>
        <p className="text-center text-gray-700 mb-8 max-w-2xl mx-auto">
          Visit us at our location in Agbarho, Delta State. We're located on Old Ughelli/Warri Road, opposite former Ecobank.
        </p>
        
        <div className="rounded-lg overflow-hidden shadow-lg max-w-4xl mx-auto">
          <div className="relative">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3971.783629079731!2d5.893079!3d5.447838!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1041add70290001%3A0xb5289da6da32db6f!2sOld%20Ughelli%2FWarri%20Road%2C%20Agbarho!5e0!3m2!1sen!2sng!4v1714517234127!5m2!1sen!2sng"
              width="100%" 
              height="450" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Bubbles Location"
            ></iframe>
            
            <div className="absolute bottom-0 left-0 right-0 bg-white p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-lg">Bubbles</h3>
                  <p className="text-gray-600">Old Ughelli/Warri Road, Agbarho, Delta State</p>
                </div>
                <button 
                  onClick={handleGetDirections}
                  className="bg-bubbles-pink text-white px-4 py-2 rounded hover:opacity-90 transition-opacity"
                >
                  Get Directions
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
