import React from "react";
import { motion } from "framer-motion";

const InteractiveKitchen = () => {
  const kitchenSteps = [
    {
      title: "Fresh Ingredients",
      description: "We source the finest ingredients daily",
      gifUrl: "/placeholder.svg", // Using placeholder until cooking GIFs are provided
      color: "from-pink-500/20 to-purple-500/20",
    },
    {
      title: "Expert Preparation",
      description: "Our chefs bring years of experience",
      gifUrl: "/placeholder.svg",
      color: "from-purple-500/20 to-blue-500/20",
    },
    {
      title: "Perfect Plating",
      description: "Every dish is a work of art",
      gifUrl: "/placeholder.svg",
      color: "from-blue-500/20 to-green-500/20",
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            From Kitchen to Table
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Watch our culinary magic unfold before your eyes
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {kitchenSteps.map((step, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative group"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl`}
              />
              <div className="relative bg-[#1A1F2C]/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 transition-all duration-300 hover:-translate-y-2">
                <div className="aspect-video rounded-lg overflow-hidden mb-6 bg-black/20">
                  <motion.img
                    src={step.gifUrl}
                    alt={step.title}
                    className="w-full h-full object-cover"
                    initial={{ scale: 1.1 }}
                    whileHover={{ scale: 1.15 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-400">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-bubbles-pink text-white px-8 py-3 rounded-full font-semibold hover:shadow-[0_0_15px_#FF6B9D] transition-shadow duration-300"
          >
            Explore Our Kitchen
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default InteractiveKitchen;
