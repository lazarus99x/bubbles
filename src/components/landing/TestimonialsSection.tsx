import React from "react";
import { Star } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Food Blogger",
      comment:
        "The flavors at Bubbles are absolutely incredible! Their attention to detail and authentic Nigerian cuisine keeps me coming back for more.",
      rating: 5,
      avatar: "/images/avatar1.jpg",
    },
    {
      name: "Michael Chen",
      role: "Regular Customer",
      comment:
        "Best Nigerian restaurant in town! The customer service is exceptional, and the food is always fresh and delicious.",
      rating: 5,
      avatar: "/images/avatar2.jpg",
    },
    {
      name: "Emma Williams",
      role: "Food Critic",
      comment:
        "Bubbles brings authentic Nigerian flavors with a modern twist. Their innovative approach to traditional dishes is refreshing.",
      rating: 5,
      avatar: "/images/avatar3.jpg",
    },
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-shadow-lg">
            What Our Customers Say
          </h2>
          <p className="text-gray-200 max-w-2xl mx-auto text-lg">
            Don't just take our word for it - hear from our satisfied customers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group relative p-6 rounded-xl bg-[#1A1F2C]/80 backdrop-blur-sm border border-white/10 hover:border-bubbles-pink/50 transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(155,135,245,0.15)]"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-bubbles-pink mr-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src =
                        "https://api.dicebear.com/7.x/avataaars/svg?seed=" +
                        testimonial.name;
                    }}
                  />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-shadow-sm">
                    {testimonial.name}
                  </h4>
                  <p className="text-gray-300 text-sm">{testimonial.role}</p>
                </div>
              </div>

              <div className="flex mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-yellow-400 fill-yellow-400 drop-shadow-glow"
                  />
                ))}
              </div>

              <p className="text-gray-100 italic leading-relaxed">
                "{testimonial.comment}"
              </p>

              <div className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-bubbles-pink via-purple-500 to-bubbles-pink opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
