"use client"

import { motion } from "framer-motion";
import { useState } from "react";

export default function Gallery() {
  const equipmentItems = [
    {
      name: "Cable cross",
      imageUrl: "/g1.webp",
      col: "col-span-1",
      buttonText: "View Details",
    },
    {
      name: "Gym bike",
      imageUrl: "/g2.webp",
      col: "col-span-1",
      buttonText: "View Details",
    },
    {
      name: "Dumbbells",
      imageUrl: "/g3.jpg",
      col: "col-span-1",
      buttonText: "View Details",
    },
    {
      name: "Kettle bells",
      imageUrl: "/g4.webp",
      col: "col-span-1",
      buttonText: "View Details",
    },
    {
      name: "",
      imageUrl: "/g5.webp",
      col: "col-span-2",
      buttonText: "SHOP NOW",
    },
  ];

    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
        },
      },
    };

    const itemVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.5,
        },
      },
    };

  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="bg-white py-24 px-4">
      <motion.div
        className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {equipmentItems.map((item, index) => (
          <motion.div
            key={index}
            className={`relative overflow-hidden rounded-md ${
              index === 4 ? "lg:col-span-2" : ""
            } h-[250px] sm:h-[300px] lg:h-[350px]`}
            variants={itemVariants}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            whileHover={{ scale: 1.02 }}
          >
            <div className="absolute inset-0 bg-black/40 z-10"></div>

            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-20"
              animate={{
                opacity: hoveredIndex === index ? 0.9 : 0.6,
              }}
              transition={{ duration: 0.3 }}
            />

            <motion.img
              src={item.imageUrl}
              alt={item.name}
              className="absolute inset-0 w-full h-full object-cover"
              animate={{
                scale: hoveredIndex === index ? 1.1 : 1,
              }}
              transition={{ duration: 0.7 }}
            />

            <motion.div
              className="absolute bottom-6 left-6 z-30"
              animate={{
                y: hoveredIndex === index ? -5 : 0,
              }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-white text-xl sm:text-2xl font-medium">{item.name}</h3>
            </motion.div>

            <motion.button
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 
                bg-orange-500 text-white px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-medium tracking-wider rounded hover:bg-orange-600
                opacity-0 transition-opacity duration-300"
              style={{
                opacity: hoveredIndex === index ? 1 : 0,
              }}
             
              whileTap={{ scale: 0.98 }}
            >
              {item.buttonText}
            </motion.button>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}