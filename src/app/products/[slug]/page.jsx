"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  ShoppingCart,
  Heart,
  ChevronLeft,
  ChevronRight,
  Check,
  Minus,
  Plus,
  TruckIcon,
  ShieldCheck,
  ArrowLeft,
  Share2,
} from "lucide-react";
import { gymSupplements } from "@/lib/data";
import { useCart } from "@/context/cart-context";

const ProductDetail = ({ params }) => {
  const { slug } = params;
  const { addToCart, toggleWishlist, isInWishlist } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedFlavor, setSelectedFlavor] = useState("");
  const [activeTab, setActiveTab] = useState("description");
  const [selectedImage, setSelectedImage] = useState(0);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  // Fetch product data
  useEffect(() => {
    const foundProduct = gymSupplements.find((item) => item.slug === slug);

    if (foundProduct) {
      setProduct(foundProduct);
      // Set default selections
      if (foundProduct.sizes.length > 0) {
        setSelectedSize(foundProduct.sizes[0]);
      }
      if (foundProduct.flavors.length > 0) {
        setSelectedFlavor(foundProduct.flavors[0]);
      }
    }

    setLoading(false);
  }, [slug]);

  // Check if product is in wishlist
  const productInWishlist = product ? isInWishlist(product.id) : false;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      </div> 
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="mb-8">
          The product you&apos;re looking for doesn&apos;t exist or has been removed.
        </p>
        <Link href="/products">
          <div className="inline-flex items-center px-5 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors">
            <ArrowLeft size={16} className="mr-2" />
            Back to Products
          </div>
        </Link>
      </div>
    );
  }

  // Quantity handlers
  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  // Add to cart handler
  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, selectedFlavor);

    setIsAddedToCart(true);
    setTimeout(() => {
      setIsAddedToCart(false);
    }, 2000);
  };

  // Toggle wishlist handler
  const handleToggleWishlist = () => {
    toggleWishlist(product);
  };

  // Image navigation
  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % 4); // Assuming 4 images per product
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + 4) % 4); // Assuming 4 images per product
  };

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumbs */}
        <nav className="flex mb-8 text-sm text-gray-500">
          <Link href="/" className="hover:text-orange-500">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/products" className="hover:text-orange-500">
            Products
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800">{product.name}</span>
        </nav>

        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
          {/* Product images */}
          <div className="relative mb-8 lg:mb-0">
            {/* Main image */}
            <div className="relative h-96 sm:h-[500px] rounded-lg overflow-hidden bg-gray-100 mb-4">
              <motion.div
                key={selectedImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full relative"
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  style={{ objectFit: "contain" }}
                  className="w-full h-full object-center"
                />
              </motion.div>

              {/* Image navigation buttons */}
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 shadow-md text-gray-800 hover:bg-white"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 shadow-md text-gray-800 hover:bg-white"
              >
                <ChevronRight size={20} />
              </button>

              {/* Sale badge */}
              {product.sale && (
                <span className="absolute top-4 left-4 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded z-10">
                  SALE
                </span>
              )}
            </div>

            {/* Thumbnail images */}
            <div className="grid grid-cols-4 gap-2">
              {[...Array(4)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`relative h-20 rounded-md overflow-hidden ${
                    selectedImage === i
                      ? "ring-2 ring-orange-500"
                      : "ring-1 ring-gray-200"
                  }`}
                >
                  <Image
                    src={product.image}
                    alt={`${product.name} thumbnail ${i + 1}`}
                    fill
                    style={{ objectFit: "cover" }}
                    className="w-full h-full object-center"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product info */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

            {/* Ratings */}
            <div className="mt-2 flex items-center space-x-2">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    fill={
                      i < Math.floor(product.rating) ? "currentColor" : "none"
                    }
                    className={
                      i < Math.floor(product.rating)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500">
                {product.rating.toFixed(1)} ({product.reviews} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="mt-4 flex items-end">
              <p className="text-2xl font-bold text-orange-500">
                ₹{product.price.toLocaleString()}
              </p>
              {product.originalPrice > product.price && (
                <p className="ml-2 text-base text-gray-500 line-through">
                  ₹{product.originalPrice.toLocaleString()}
                </p>
              )}
              {product.sale && (
                <p className="ml-2 text-sm font-medium text-green-600">
                  Save ₹
                  {(product.originalPrice - product.price).toLocaleString()}
                </p>
              )}
            </div>

            {/* Description */}
            <div className="mt-4">
              <p className="text-base text-gray-600">{product.description}</p>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 my-6"></div>

            {/* Size selection */}
            {product.sizes.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-900">Size</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 text-sm font-medium rounded-md transition-colors
                        ${
                          selectedSize === size
                            ? "bg-orange-500 text-white"
                            : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                        }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Flavor selection */}
            {product.flavors.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-900">Flavor</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {product.flavors.map((flavor) => (
                    <button
                      key={flavor}
                      onClick={() => setSelectedFlavor(flavor)}
                      className={`px-4 py-2 text-sm font-medium rounded-md transition-colors
                        ${
                          selectedFlavor === flavor
                            ? "bg-orange-500 text-white"
                            : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                        }`}
                    >
                      {flavor}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity selector */}
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-900">Quantity</h3>
              <div className="mt-2 flex items-center">
                <button
                  onClick={decreaseQuantity}
                  className="p-2 rounded-l-md bg-gray-100 text-gray-600 hover:bg-gray-200"
                >
                  <Minus size={16} />
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                  }
                  className="w-16 py-2 text-center border-y border-gray-200 text-gray-900"
                  min="1"
                />
                <button
                  onClick={increaseQuantity}
                  className="p-2 rounded-r-md bg-gray-100 text-gray-600 hover:bg-gray-200"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Add to cart and wishlist buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                className={`flex-1 py-3 px-6 rounded-md font-medium flex items-center justify-center transition-colors ${
                  isAddedToCart
                    ? "bg-green-500 text-white"
                    : "bg-orange-500 hover:bg-orange-600 text-white"
                }`}
              >
                {isAddedToCart ? (
                  <>
                    <Check size={18} className="mr-2" />
                    Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingCart size={18} className="mr-2" />
                    Add to Cart
                  </>
                )}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleToggleWishlist}
                className={`py-3 px-6 rounded-md font-medium flex items-center justify-center ${
                  productInWishlist
                    ? "bg-red-50 text-red-500 border border-red-200"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                }`}
              >
                <Heart
                  size={18}
                  className={`mr-2 ${productInWishlist ? "fill-red-500" : ""}`}
                />
                {productInWishlist ? "In Wishlist" : "Add to Wishlist"}
              </motion.button>
            </div>

            {/* Feature list */}
            <div className="mt-8 border-t border-gray-200 pt-6">
              <ul className="space-y-3">
                <li className="flex items-center text-sm text-gray-600">
                  <TruckIcon size={16} className="mr-2 text-orange-500" />
                  Free shipping for orders over ₹999
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <ShieldCheck size={16} className="mr-2 text-orange-500" />
                  100% authentic products
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <Share2 size={16} className="mr-2 text-orange-500" />
                  Share with friends to earn rewards
                </li>
              </ul>
            </div>

            {/* Tabs for description, reviews, etc. */}
            <div className="mt-8 border-t border-gray-200 pt-6">
              <div className="flex border-b border-gray-200">
                <button
                  onClick={() => setActiveTab("description")}
                  className={`pb-4 px-1 text-sm font-medium ${
                    activeTab === "description"
                      ? "text-orange-500 border-b-2 border-orange-500"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Description
                </button>
                <button
                  onClick={() => setActiveTab("reviews")}
                  className={`ml-8 pb-4 px-1 text-sm font-medium ${
                    activeTab === "reviews"
                      ? "text-orange-500 border-b-2 border-orange-500"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Reviews ({product.reviews})
                </button>
                <button
                  onClick={() => setActiveTab("shipping")}
                  className={`ml-8 pb-4 px-1 text-sm font-medium ${
                    activeTab === "shipping"
                      ? "text-orange-500 border-b-2 border-orange-500"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Shipping & Returns
                </button>
              </div>

              <div className="mt-6">
                {activeTab === "description" && (
                  <div className="prose prose-sm text-gray-600 max-w-none">
                    <p>{product.description}</p>
                    <p className="mt-4">
                      Our {product.name} is sourced from the highest quality
                      ingredients to ensure maximum effectiveness and safety.
                      Each batch undergoes rigorous testing to maintain our
                      quality standards.
                    </p>
                    <ul className="mt-4 list-disc pl-5 space-y-2">
                      <li>Premium quality ingredients</li>
                      <li>Manufactured in certified facilities</li>
                      <li>Formulated by expert nutritionists</li>
                      <li>Free from banned substances</li>
                    </ul>
                  </div>
                )}

                {activeTab === "reviews" && (
                  <div className="text-gray-600">
                    <p>Customer reviews will be displayed here.</p>
                  </div>
                )}

                {activeTab === "shipping" && (
                  <div className="text-gray-600">
                    <h4 className="font-medium text-gray-900 mb-2">
                      Shipping Policy
                    </h4>
                    <p>
                      We offer free shipping on all orders above ₹999. Standard
                      delivery takes 3-5 business days depending on your
                      location. Express shipping options are available at
                      checkout.
                    </p>

                    <h4 className="font-medium text-gray-900 mt-4 mb-2">
                      Return Policy
                    </h4>
                    <p>
                      We accept returns within 30 days of delivery if the
                      product is unused and in its original packaging. Please
                      contact our customer service to initiate a return.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
