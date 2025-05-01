"use client"
import { motion } from "framer-motion";
import { Truck, Gift, Shield } from "lucide-react";

export default function Feature() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
  };

  // Benefits data
  const benefits = [
    {
      icon: <Truck size={24} />,
      title: "Free shipping",
      description: "Delivery within 5 to 7 days",
    },
    {
      icon: <Gift size={24} />,
      title: "Gift voucher",
      description: "Surprise coupon voucher",
    },
    {
      icon: <Shield size={24} />,
      title: "Safe payment",
      description: "100% secure with us",
    },
  ];

  return (
    <div className="w-full   bg-gradient-to-b from-slate-800 to-slate-900 text-white py-16 px-4">
      <motion.div
        className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {benefits.map((benefit, index) => (
          <motion.div
            key={index}
            className="flex items-center gap-8 w-full md:w-auto"
            variants={itemVariants}
            whileHover="hover"
          >
            <div className="bg-gray-800 p-6 rotate-45 flex items-center justify-center">
              <div className="-rotate-45 text-orange-500  ">{benefit.icon}</div>
            </div>
            <div>
              <h3 className="text-orange-500 font-medium text-xl">
                {benefit.title}
              </h3>
              <p className="text-gray-300 text-sm">{benefit.description}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
