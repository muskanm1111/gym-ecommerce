"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";

const sortOptions = [
  { id: "featured", name: "Featured" },
  { id: "price-asc", name: "Price: Low to High" },
  { id: "price-desc", name: "Price: High to Low" },
  { id: "newest", name: "Newest" },
  { id: "rating", name: "Highest Rated" },
];

const ProductSort = ({ sortBy, setSortBy }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (optionId) => {
    setSortBy(optionId);
    setIsOpen(false);
  };

  // Find the current sort option name
  const currentOption = sortOptions.find((option) => option.id === sortBy);

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center justify-between w-full md:w-48 px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span>Sort by: {currentOption?.name}</span>
        <ChevronDown
          size={16}
          className={`transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
            role="listbox"
          >
            {sortOptions.map((option) => (
              <li
                key={option.id}
                onClick={() => handleSelect(option.id)}
                className={`cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-orange-50 ${
                  sortBy === option.id
                    ? "text-orange-600 bg-orange-50"
                    : "text-gray-900"
                }`}
                role="option"
                aria-selected={sortBy === option.id}
              >
                <span className="block truncate">{option.name}</span>

                {sortBy === option.id && (
                  <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-orange-600">
                    <Check size={16} />
                  </span>
                )}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductSort;
