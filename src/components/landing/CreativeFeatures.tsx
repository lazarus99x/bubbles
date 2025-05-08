import React from "react";
import { ArrowRight, Utensils, Clock, ThumbsUp, Gift } from "lucide-react";

const CreativeFeatures = () => {
  const features = [
    {
      icon: <Utensils className="w-8 h-8" />,
      title: "Fresh Ingredients",
      description: "We use only the freshest ingredients sourced locally",
      color: "from-pink-500/20 to-purple-500/20",
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Quick Delivery",
      description: "Fast delivery right to your doorstep",
      color: "from-blue-500/20 to-cyan-500/20",
    },
    {
      icon: <ThumbsUp className="w-8 h-8" />,
      title: "Quality Assured",
      description: "Every dish is prepared with love and care",
      color: "from-green-500/20 to-emerald-500/20",
    },
    {
      icon: <Gift className="w-8 h-8" />,
      title: "Special Offers",
      description: "Regular promotions and special deals",
      color: "from-orange-500/20 to-red-500/20",
    },
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Why Choose Bubbles?
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Experience the perfect blend of taste and service
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative rounded-xl p-6 bg-gradient-to-br border border-white/10 hover:border-bubbles-pink/50 transition-all duration-300"
            >
              <div
                className={`absolute inset-0 rounded-xl bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              />

              <div className="relative z-10">
                <div className="mb-4 text-bubbles-pink">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400 mb-4">{feature.description}</p>
                <div className="flex items-center text-bubbles-pink font-medium group-hover:translate-x-2 transition-transform duration-300">
                  Learn more <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CreativeFeatures;
