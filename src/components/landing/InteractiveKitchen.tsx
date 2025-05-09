import React from "react";
import { motion } from "framer-motion";

const InteractiveKitchen = () => {
  const kitchenSteps = [
    {
      title: "Fresh Ingredients",
      description: "We source the finest ingredients daily",
      gifUrl:
        "https://images.pexels.com/photos/1192031/pexels-photo-1192031.jpeg?cs=srgb&dl=pexels-mike-468229-1192031.jpg&fm=jpg",
      color: "from-pink-500/40 to-purple-500/40", // Increased opacity for better contrast
    },
    {
      title: "Expert Preparation",
      description: "Our chefs bring years of experience",
      gifUrl:
        "https://www.bellanaija.com/wp-content/uploads/2015/06/dreamstime_xl_32896684.jpg",
      color: "from-purple-500/40 to-blue-500/40",
    },
    {
      title: "Perfect Plating",
      description: "Every dish is a work of art mixed with our culture",
      gifUrl:
        "https://trueafricanart.com/cdn/shop/products/peddlers.jpg?v=1610881880",
      color: "from-blue-500/40 to-green-500/40",
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
    <section className="group relative p-6 rounded-xl bg-[#1A1F2C]/50 backdrop-blur-sm ">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
            From Kitchen to Table
          </h2>
          <p className="text-gray-200 max-w-2xl mx-auto text-lg">
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
                className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 transition-opacity duration-300 rounded-xl`}
              />
              <div className="relative bg-black/60 backdrop-blur-sm border border-white/20 rounded-xl p-6 transition-all duration-300 hover:-translate-y-2 shadow-lg">
                <div className="aspect-video rounded-lg overflow-hidden mb-6 bg-black/40">
                  <motion.img
                    src={step.gifUrl}
                    alt={step.title}
                    className="w-full h-full object-cover"
                    initial={{ scale: 1.1 }}
                    whileHover={{ scale: 1.15 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-3 drop-shadow-md">
                  {step.title}
                </h3>
                <p className="text-gray-200 text-lg leading-relaxed">
                  {step.description}
                </p>
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
