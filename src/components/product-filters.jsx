"use client";

import React from "react";
import { motion } from "framer-motion";
import { Filter, X } from "lucide-react";
import { categories, brands } from "@/lib/data";

const ProductFilters = ({
  selectedCategory,
  setSelectedCategory,
  selectedBrand,
  setSelectedBrand,
  priceRange,
  setPriceRange,
  showFilters,
  setShowFilters,
}) => {
  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleBrandChange = (brandId) => {
    setSelectedBrand(brandId);
  };

  const handlePriceChange = (e) => {
    setPriceRange({
      ...priceRange,
      [e.target.name]: parseInt(e.target.value),
    });
  };

  const handleClearFilters = () => {
    setSelectedCategory("all");
    setSelectedBrand("all");
    setPriceRange({ min: 0, max: 5000 });
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <>
      {/* Mobile filter toggle button */}
      <div className="flex justify-between items-center mb-4 lg:hidden">
        <h2 className="text-xl font-bold">Filters</h2>
        <button
          onClick={toggleFilters}
          className="bg-orange-500 text-white px-3 py-2 rounded-md flex items-center"
        >
          <Filter size={18} className="mr-2" />
          {showFilters ? "Hide Filters" : "Show Filters"}
        </button>
      </div>

      {/* Filter sidebar */}
      <motion.div
        className={`bg-white p-4 rounded-lg shadow-md mb-6 ${
          showFilters ? "block" : "hidden lg:block"
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Filters</h2>
          <button
            onClick={handleClearFilters}
            className="text-sm text-orange-500 hover:text-orange-600"
          >
            Clear All
          </button>

          {/* Close filter button on mobile */}
          <button onClick={toggleFilters} className="lg:hidden text-gray-500">
            <X size={20} />
          </button>
        </div>

        {/* Category filter */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2 text-gray-700">Categories</h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center">
                <input
                  type="radio"
                  id={`category-${category.id}`}
                  name="category"
                  checked={selectedCategory === category.id}
                  onChange={() => handleCategoryChange(category.id)}
                  className="w-4 h-4 text-orange-500 border-gray-300 focus:ring-orange-500"
                />
                <label
                  htmlFor={`category-${category.id}`}
                  className="ml-2 text-sm text-gray-700 cursor-pointer hover:text-orange-500"
                >
                  {category.name}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Brand filter */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2 text-gray-700">Brands</h3>
          <div className="space-y-2">
            {brands.map((brand) => (
              <div key={brand.id} className="flex items-center">
                <input
                  type="radio"
                  id={`brand-${brand.id}`}
                  name="brand"
                  checked={selectedBrand === brand.id}
                  onChange={() => handleBrandChange(brand.id)}
                  className="w-4 h-4 text-orange-500 border-gray-300 focus:ring-orange-500"
                />
                <label
                  htmlFor={`brand-${brand.id}`}
                  className="ml-2 text-sm text-gray-700 cursor-pointer hover:text-orange-500"
                >
                  {brand.name}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Price range filter */}
        <div>
          <h3 className="font-semibold mb-2 text-gray-700">Price Range</h3>
          <div className="space-y-3">
            <div className="flex justify-between text-sm text-gray-600">
              <span>₹{priceRange.min.toLocaleString()}</span>
              <span>₹{priceRange.max.toLocaleString()}</span>
            </div>
            <input
              type="range"
              name="min"
              min="0"
              max="5000"
              step="100"
              value={priceRange.min}
              onChange={handlePriceChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
            />
            <input
              type="range"
              name="max"
              min="0"
              max="5000"
              step="100"
              value={priceRange.max}
              onChange={handlePriceChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
            />
            <div className="flex gap-2">
              <div className="relative rounded-md shadow-sm flex-1">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                  ₹
                </span>
                <input
                  type="number"
                  name="min"
                  value={priceRange.min}
                  onChange={handlePriceChange}
                  min="0"
                  max={priceRange.max}
                  className="block w-full rounded-md border-gray-300 pl-7 pr-2 py-1.5 text-sm focus:border-orange-500 focus:ring-orange-500"
                />
              </div>
              <div className="relative rounded-md shadow-sm flex-1">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                  ₹
                </span>
                <input
                  type="number"
                  name="max"
                  value={priceRange.max}
                  onChange={handlePriceChange}
                  min={priceRange.min}
                  max="5000"
                  className="block w-full rounded-md border-gray-300 pl-7 pr-2 py-1.5 text-sm focus:border-orange-500 focus:ring-orange-500"
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default ProductFilters;
