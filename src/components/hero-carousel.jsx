"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

const slides = [
  {
    id: 1,
    title: "FITNESS",
    subtitle: "Premium Equipment for Your Workout",
    image: "/slider-1.webp",
    cta: "BUY NOW",
  },
  {
    id: 2,
    title: "STRENGTH",
    subtitle: "Build Your Power with Quality Gear",
    image: "/slider-2.webp",
    cta: "SHOP NOW",
  },
  {
    id: 3,
    title: "WELLNESS",
    subtitle: "Complete Solutions for a Healthier Life",
    image: "/slider-3.webp",
    cta: "EXPLORE",
  },
];

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward
  const intervalRef = useRef(null);
  const constraintsRef = useRef(null);

  const startAutoPlay = () => {
    intervalRef.current = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 2000);
  };

  useEffect(() => {
    startAutoPlay();
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const handleDragEnd = (e, { offset, }) => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    const swipeThreshold = 50;

    if (offset.x < -swipeThreshold) {
      // Swiped left, go to next slide
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    } else if (offset.x > swipeThreshold) {
      // Swiped right, go to previous slide
      setDirection(-1);
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    }

    startAutoPlay();
  };

  const handleIndicatorClick = (index) => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);

    startAutoPlay();
  };

  const variants = {
    enter: (direction) => ({
      y: direction > 0 ? 500 : -500,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
      },
    },
    exit: (direction) => ({
      y: direction > 0 ? -500 : 500,
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.5,
      },
    }),
  };

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div
      className="relative h-[calc(100vh-132px)] overflow-hidden bg-gradient-to-t from-black/40 to-orange-200"
      ref={constraintsRef}
    >
      <motion.div
        drag="x"
        dragConstraints={constraintsRef}
        onDragEnd={handleDragEnd}
        className="h-full w-full cursor-grab active:cursor-grabbing"
      >
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0"
          >
            <div className="relative h-full w-full">
              <Image
                src={slides[currentSlide].image}
                alt={slides[currentSlide].title}
                fill
                className="object-cover "
                priority
              />
              <div className="absolute inset-0 flex flex-col justify-center items-start p-8 md:p-16 lg:p-24">
                <motion.div
                  variants={textVariants}
                  initial="hidden"
                  animate="visible"
                  className="max-w-xl"
                >
                  <motion.h1
                    variants={itemVariants}
                    className="text-6xl md:text-8xl font-bold text-white mb-4"
                  >
                    {slides[currentSlide].title}
                  </motion.h1>
                  <motion.p
                    variants={itemVariants}
                    className="text-xl md:text-2xl text-gray-200 mb-8"
                  >
                    {slides[currentSlide].subtitle}
                  </motion.p>
                  <motion.div variants={itemVariants}>
                    <Button
                      size="lg"
                      className="bg-orange-500 hover:bg-orange-600 text-white"
                    >
                      {slides[currentSlide].cta}
                    </Button>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Slide indicators */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-4">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => handleIndicatorClick(index)}
            className={`w-8 h-8 flex items-center justify-center text-sm font-medium rounded-full transition-colors ${
              currentSlide === index
                ? "bg-orange-500 text-white"
                : "bg-gray-800/50 text-gray-400 hover:bg-gray-700/70"
            }`}
          >
            {String(index + 1).padStart(2, "0")}
          </button>
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
