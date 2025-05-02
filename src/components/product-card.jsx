"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingCart, Heart, Eye } from "lucide-react";
import { useCart } from "@/context/cart-context";

const ProductCard = ({ product }) => {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // Show visual feedback
    setIsAddingToCart(true);

    // Add to cart with default size and flavor if available
    const size = product.sizes.length > 0 ? product.sizes[0] : null;
    const flavor = product.flavors.length > 0 ? product.flavors[0] : null;

    addToCart(product, 1, size, flavor);

    // Reset state after animation
    setTimeout(() => {
      setIsAddingToCart(false);
    }, 1000);
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // In a complete implementation, this could show a modal with product details
    console.log(`Quick view for ${product.name}`);
  };

  return (
    <Link href={`/products/${product.slug}`}>
      <motion.div
        className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col"
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative">
          {product.sale && (
            <span className="absolute top-2 left-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded z-10">
              SALE
            </span>
          )}

          <div className="h-56 overflow-hidden relative">
            <Image
              src={product.image}
              alt={product.name}
              fill
              style={{ objectFit: "cover" }}
              className="transition-transform duration-300 hover:scale-105"
            />
          </div>

          <div className="absolute top-2 right-2 flex flex-col gap-2">
            <motion.button
              className={`p-2 rounded-full shadow-md ${
                isWishlisted
                  ? "bg-red-50 text-red-500"
                  : "bg-white text-orange-500 hover:bg-orange-50"
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleToggleWishlist}
            >
              <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
            </motion.button>
            <motion.button
              className="bg-white p-2 rounded-full shadow-md text-orange-500 hover:bg-orange-50"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleQuickView}
            >
              <Eye size={18} />
            </motion.button>
          </div>
        </div>

        <div className="p-4 flex-grow flex flex-col">
          <h3 className="text-lg font-semibold text-gray-800 mb-1">
            {product.name}
          </h3>

          <div className="flex items-center mb-1">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-xs text-gray-500 ml-1">
              ({product.reviews})
            </span>
          </div>

          <div className="mt-auto">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-orange-500 font-bold">
                ₹{product.price.toLocaleString()}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-gray-400 line-through text-sm">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            <motion.button
              className={`w-full py-2 px-4 rounded flex items-center justify-center ${
                isAddingToCart
                  ? "bg-green-500 text-white"
                  : "bg-orange-500 hover:bg-orange-600 text-white"
              }`}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
            >
              <ShoppingCart size={16} className="mr-2" />
              {isAddingToCart ? "Added!" : "Add to Cart"}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default ProductCard;
