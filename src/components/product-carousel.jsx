"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { ShoppingCart, Heart, Eye } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";

const products = [
  {
    id: 1,
    name: "Floor mats",
    image: "/product1.webp",
    currentPrice: 37.0,
    originalPrice: 40.0,
    sale: false,
  },
  {
    id: 2,
    name: "Utility bench",
    image: "/product2.webp",
    currentPrice: 36.0,
    originalPrice: 39.0,
    sale: false,
  },
  {
    id: 3,
    name: "Motorized treadmill",
    image: "/product3.webp",
    currentPrice: 25.0,
    originalPrice: 29.0,
    sale: true,
  },
  {
    id: 4,
    name: "Dumbbells Set",
    image: "/product2.webp",
    currentPrice: 45.0,
    originalPrice: 55.0,
    sale: true,
  },
  {
    id: 5,
    name: "Yoga Mat",
    image: "/product1.webp",
    currentPrice: 19.99,
    originalPrice: 24.99,
    sale: false,
  },
  {
    id: 6,
    name: "Resistance Bands",
    image: "/product3.webp",
    currentPrice: 15.99,
    originalPrice: 19.99,
    sale: true,
  },
  {
    id: 7,
    name: "Kettlebell",
    image: "/product2.webp",
    currentPrice: 29.99,
    originalPrice: 34.99,
    sale: false,
  },
  {
    id: 8,
    name: "Exercise Ball",
    image: "/product1.webp",
    currentPrice: 22.99,
    originalPrice: 26.99,
    sale: false,
  },
];

export default function ProductCarousel() {
  const [api, setApi] = useState(null);
  const autoplayRef = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  const addToCart = (productId, e) => {
    e.stopPropagation();
    console.log(`Added product ${productId} to cart`);
    // Implement your cart functionality here
  };

  const addToWishlist = (productId, e) => {
    e.stopPropagation();
    console.log(`Added product ${productId} to wishlist`);
    // Implement your wishlist functionality here
  };

  const quickView = (productId, e) => {
    e.stopPropagation();
    console.log(`Quick view for product ${productId}`);
    // Implement your quick view functionality here
  };

  return (
    <div className="w-full py-16 px-4 bg-zinc-50">
      <div className="max-w-7xl mx-auto">
        {/* Heading with orange underline */}
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-2">
            Our Products
          </h2>
          <div className="h-1 w-48 bg-orange-500 mx-auto"></div>
        </div>

        {/* Carousel container */}
        <Carousel
          setApi={setApi}
          plugins={[autoplayRef.current]}
          className="w-full"
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent className="-ml-4">
            {products.map((product) => (
              <CarouselItem
                key={product.id}
                className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
              >
                <div className="p-1">
                  <Card className="rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                    <div className="relative pt-4 px-4">
                      {product.sale && (
                        <span className="absolute top-6 left-6 bg-orange-500 text-white text-xs font-semibold px-2 py-1 rounded z-10">
                          SALE
                        </span>
                      )}

                      <div className="absolute top-6 right-6 flex flex-col gap-2 z-10">
                        <Button
                          variant="outline"
                          size="icon"
                          className="rounded-md border-orange-500 bg-white text-orange-500 hover:bg-orange-50"
                          onClick={(e) => addToWishlist(product.id, e)}
                        >
                          <Heart className="h-5 w-5" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="rounded-md border-orange-500 bg-white text-orange-500 hover:bg-orange-50"
                          onClick={(e) => quickView(product.id, e)}
                        >
                          <Eye className="h-5 w-5" />
                        </Button>
                      </div>

                      <div className="flex justify-center items-center h-64 overflow-hidden group relative">
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={300}
                          height={300}
                          className="object-contain h-full transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
                      </div>
                    </div>

                    <CardContent className="p-6">
                      <h3 className="text-xl font-medium mb-2 text-gray-800">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-orange-500 font-bold">
                          ${product.currentPrice.toFixed(2)}
                        </span>
                        {product.originalPrice > product.currentPrice && (
                          <span className="text-gray-400 line-through text-sm">
                            ${product.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                      <Button
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white transition-colors duration-300"
                        onClick={(e) => addToCart(product.id, e)}
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex items-center justify-center mt-8 gap-2">
            <CarouselPrevious className=" static left-auto right-auto translate-y-0 bg-orange-500 text-white hover:bg-orange-600 hover:text-white" />
            <CarouselNext className=" static left-auto right-auto translate-y-0 bg-orange-500 text-white hover:bg-orange-600 hover:text-white" />
          </div>
        </Carousel>

        {/* See more button */}
        <div className="flex justify-center mt-12">
          <Link href="/products">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white transition-colors duration-300">
              See More Products
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
