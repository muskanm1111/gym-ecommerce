"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  MapPin,
  Mail,
  Phone,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  ChevronRight,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 },
  },
};

export default function Footer() {
  // Product categories for protein supplements
  const categories = [
    "Whey Protein",
    "Plant-Based Protein",
    "Casein Protein",
    "Mass Gainers",
    "Protein Bars",
    "Pre-Workout",
    "Post-Workout",
    "BCAA & EAA",
  ];

  const moreCategories = [
    "Creatine & HMB",
    "Glutamine",
    "Protein Foods",
    "Weight Loss Support",
    "Multivitamins",
    "Omega 3 Fatty Acids",
    "Workout Accessories",
    "Gym Clothing",
  ];

  return (
    <footer className="w-full bg-gradient-to-b from-slate-800 to-slate-900 text-white">
      {/* Newsletter Section */}
      {/* <div className="bg-orange-600 py-8">
        <motion.div
          className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold mb-2">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-white/90">
              Get the latest offers, fitness tips and supplement news
            </p>
          </div>
          <div className="flex w-full md:w-auto flex-col sm:flex-row gap-3">
            <Input
              type="email"
              placeholder="Your email address"
              className="bg-white/10 border-white/20 placeholder:text-white/60 text-white h-12"
            />
            <Button
              size="lg"
              className="bg-white text-orange-600 hover:bg-white/90 font-semibold"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              Subscribe
            </Button>
          </div>
        </motion.div>
      </div> */}

      {/* Main Footer Content */}
      <motion.div
        className="container mx-auto px-4 md:px-6 py-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <motion.div className="flex flex-col gap-4" variants={itemVariants}>
            <h3 className="text-xl font-bold mb-1">About PowerFuel</h3>
            <Separator className="bg-orange-500 w-16 h-1 mb-3" />

            <Link href="/" className="flex-shrink-0  mb-4">
              {/* <Image
                src="/placeholder.svg?height=60&width=200"
                alt="PowerFuel Logo"
                width={200}
                height={60}
                className="w-auto h-12"
                priority
              /> */}
              <Image
                src="/logo3.png"
                alt=" "
                width={200}
                height={100}
                className="bg-white rounded-lg p-3"
              />
            </Link>

            <p className="text-gray-300 text-sm leading-relaxed">
              PowerFuel is India&apos;s premium fitness nutrition brand,
              dedicated to providing high-quality supplements and nutritional
              products to help you achieve your fitness goals.
            </p>

            <div className="flex gap-3 mt-2">
              <TooltipProvider>
                {[
                  { icon: <Instagram size={18} />, name: "Instagram" },
                  { icon: <Facebook size={18} />, name: "Facebook" },
                  { icon: <Twitter size={18} />, name: "Twitter" },
                  { icon: <Youtube size={18} />, name: "YouTube" },
                ].map((social, index) => (
                  <Tooltip key={index}>
                    <TooltipTrigger asChild>
                      <motion.a
                        href="#"
                        className="flex items-center justify-center w-9 h-9 rounded-full bg-slate-700 hover:bg-orange-600 transition-colors"
                        whileHover={{ y: -3 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        {social.icon}
                      </motion.a>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Follow us on {social.name}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </TooltipProvider>
            </div>
          </motion.div>

          {/* Product Categories */}
          <motion.div className="flex flex-col gap-3" variants={itemVariants}>
            <h3 className="text-xl font-bold mb-1">Product Categories</h3>
            <Separator className="bg-orange-500 w-16 h-1 mb-3" />

            {categories.map((category) => (
              <motion.div key={category} whileHover={{ x: 5 }}>
                <Link
                  href={`/products?category=${encodeURIComponent(category)}`}
                  className="flex items-center gap-2 group"
                >
                  <ChevronRight className="text-orange-500 h-4 w-4 group-hover:text-orange-300 transition-colors" />
                  <span className="text-gray-300 group-hover:text-white transition-colors">
                    {category}
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* More Categories */}
          <motion.div className="flex flex-col gap-3" variants={itemVariants}>
            <h3 className="text-xl font-bold mb-1">More Products</h3>
            <Separator className="bg-orange-500 w-16 h-1 mb-3" />

            {moreCategories.map((category) => (
              <motion.div key={category} whileHover={{ x: 5 }}>
                <Link
                  href={`/products?category=${encodeURIComponent(category)}`}
                  className="flex items-center gap-2 group"
                >
                  <ChevronRight className="text-orange-500 h-4 w-4 group-hover:text-orange-300 transition-colors" />
                  <span className="text-gray-300 group-hover:text-white transition-colors">
                    {category}
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Contact Information */}
          <motion.div className="flex flex-col gap-4" variants={itemVariants}>
            <h3 className="text-xl font-bold mb-1">Contact Us</h3>
            <Separator className="bg-orange-500 w-16 h-1 mb-3" />

            <motion.div className="flex gap-3" whileHover={{ x: 5 }}>
              <MapPin
                size={20}
                className="text-orange-500 flex-shrink-0 mt-1"
              />
              <p className="text-sm text-gray-300">
                A-36, Sector 83, Noida - 201305, Uttar Pradesh (India)
              </p>
            </motion.div>

            <motion.div whileHover={{ x: 5 }}>
              <Link
                href="mailto:support@powerfuel.in"
                className="flex gap-3 items-center group"
              >
                <Mail size={20} className="text-orange-500 flex-shrink-0" />
                <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                  support@powerfuel.in
                </span>
              </Link>
            </motion.div>

            <motion.div whileHover={{ x: 5 }}>
              <Link
                href="tel:+918800123456"
                className="flex gap-3 items-center group"
              >
                <Phone size={20} className="text-orange-500 flex-shrink-0" />
                <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                  +91 8800 123 456
                </span>
              </Link>
            </motion.div>

            <motion.div className="flex gap-3" whileHover={{ x: 5 }}>
              <Clock size={20} className="text-orange-500 flex-shrink-0 mt-1" />
              <div>
                <p className="text-sm text-gray-300">Open Hours:</p>
                <p className="text-sm text-gray-300">
                  Mon - Sat: 9:00 AM - 8:00 PM
                </p>
              </div>
            </motion.div>

            {/* Quick Links */}
            <div className="mt-4 pt-4 border-t border-slate-700">
              <h4 className="font-semibold mb-3">Quick Links</h4>
              <div className="grid grid-cols-2 gap-2">
                {[
                  "About Us",
                  "Blog",
                  "Careers",
                  "FAQs",
                  "Privacy Policy",
                  "Terms & Conditions",
                ].map((link) => (
                  <motion.div key={link} whileHover={{ x: 3 }}>
                    <Link
                      href={`/${link.toLowerCase().replace(/\s+/g, "-")}`}
                      className="text-sm text-gray-300 hover:text-white transition-colors"
                    >
                      {link}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Payment Methods */}
      <div className="border-t border-slate-700/50">
        <div className="container mx-auto px-4 md:px-6 py-6">
          <div className="flex flex-col md:flex-row justify-center items-center gap-4">
            {/* <motion.div
              className="flex flex-wrap gap-3 justify-center md:justify-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <span className="text-sm text-gray-400">We Accept:</span>
              {["Visa", "Mastercard", "PayPal", "UPI", "GPay", "Paytm"].map(
                (payment) => (
                  <div
                    key={payment}
                    className="bg-slate-700 px-3 py-1 rounded text-xs"
                  >
                    {payment}
                  </div>
                )
              )}
            </motion.div> */}

            <motion.div
              className="text-sm text-gray-400 text-center md:text-right"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              © PowerFuel {new Date().getFullYear()} | All Rights Reserved
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
}
