"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
  Facebook,
  Twitter,
  Instagram,
  Search,
  Heart,
  ShoppingCart,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Sample navigation data
  const navItems = [
    {
      name: "Home",
      path: "/",
      badge: "HOT",
      megaMenu: null,
    },
    {
      name: "Shop",
      path: "/shop",
      badge: "SALE",
      megaMenu: {
        categories: [
          { name: "Men", items: ["T-Shirts", "Shorts", "Hoodies", "Joggers"] },
          {
            name: "Women",
            items: ["Sports Bras", "Leggings", "Tops", "Shorts"],
          },
          {
            name: "Equipment",
            items: [
              "Dumbbells",
              "Kettlebells",
              "Resistance Bands",
              "Yoga Mats",
            ],
          },
          {
            name: "Accessories",
            items: ["Water Bottles", "Gym Bags", "Gloves", "Towels"],
          },
        ],
        featured: [
          {
            name: "New Arrivals",
            image: "/placeholder.svg?height=100&width=100",
          },
          {
            name: "Best Sellers",
            image: "/placeholder.svg?height=100&width=100",
          },
          {
            name: "Sale Items",
            image: "/placeholder.svg?height=100&width=100",
          },
        ],
      },
    },
    {
      name: "Product",
      path: "/product",
      megaMenu: {
        categories: [
          {
            name: "Fitness Trackers",
            items: ["Smart Watches", "Bands", "Heart Rate Monitors"],
          },
          {
            name: "Supplements",
            items: ["Protein", "Pre-Workout", "Vitamins", "Recovery"],
          },
          { name: "Nutrition", items: ["Meal Plans", "Recipes", "Guides"] },
        ],
        featured: [
          {
            name: "Featured Products",
            image: "/placeholder.svg?height=100&width=100",
          },
          { name: "Top Rated", image: "/placeholder.svg?height=100&width=100" },
        ],
      },
    },
    {
      name: "Collection",
      path: "/collection",
      megaMenu: null,
    },
    {
      name: "Blog",
      path: "/blog",
      megaMenu: null,
    },
    {
      name: "Pages",
      path: "/pages",
      badge: "NEW",
      megaMenu: {
        categories: [
          { name: "About Us", items: ["Our Story", "Team", "Careers"] },
          { name: "Contact", items: ["Support", "Locations", "Feedback"] },
          { name: "Policies", items: ["Terms", "Privacy", "Returns"] },
        ],
      },
    },
  ];

  return (
    <header className="w-full">
      {/* Top bar */}
      <div className="bg-orange-500 text-white py-2 px-6">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex space-x-4">
            <Link href="#" className="hover:text-orange-200 transition-colors">
              <Facebook size={18} />
            </Link>
            <Link href="#" className="hover:text-orange-200 transition-colors">
              <Twitter size={18} />
            </Link>
            <Link href="#" className="hover:text-orange-200 transition-colors">
              <Instagram size={18} />
            </Link>
          </div>
          <div>
            <Link
              href="/login"
              className="hover:text-orange-200 transition-colors"
            >
              LOG IN / REGISTER
            </Link>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="bg-white text-black   py-4 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="text-orange-500 font-bold text-3xl">
            <Image src="/logo3.png" alt=" " width={200} height={100} />
          </Link>

          {/* Desktop Navigation */}
          {!isMobile && (
            <NavigationMenu className="hidden md:flex">
              <NavigationMenuList>
                {navItems.map((item) => (
                  <NavigationMenuItem key={item.name}>
                    {item.megaMenu ? (
                      <>
                        <NavigationMenuTrigger className="bg-transparent hover:bg-orange-500 text-black">
                          <span className="flex items-center">
                            {item.name}
                            {item.badge && (
                              <span
                                className={`ml-2 text-xs px-1.5 py-0.5 rounded ${
                                  item.badge === "HOT"
                                    ? "bg-green-500"
                                    : item.badge === "SALE"
                                    ? "bg-green-500 text-white"
                                    : "bg-green-500 text-white"
                                }`}
                              >
                                {item.badge}
                              </span>
                            )}
                          </span>
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2 }}
                            className="w-[500px] lg:w-[600px] p-4 bg-white text-black"
                          >
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                {item.megaMenu.categories.map((category) => (
                                  <div key={category.name} className="mb-4">
                                    <h3 className="font-bold text-orange-500 mb-2">
                                      {category.name}
                                    </h3>
                                    <ul className="space-y-1">
                                      {category.items.map((subItem) => (
                                        <li key={subItem}>
                                          <Link
                                            href="#"
                                            className="text-gray-800 hover:text-white transition-colors"
                                          >
                                            {subItem}
                                          </Link>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                ))}
                              </div>
                              {item.megaMenu.featured && (
                                <div>
                                  <h3 className="font-bold text-orange-500 mb-2">
                                    Featured
                                  </h3>
                                  <div className="grid grid-cols-2 gap-2">
                                    {item.megaMenu.featured.map((feature) => (
                                      <Link
                                        href="#"
                                        key={feature.name}
                                        className="group"
                                      >
                                        <div className="relative overflow-hidden rounded-md">
                                          <Image
                                            src={
                                              feature.image ||
                                              "/placeholder.svg"
                                            }
                                            alt={feature.name}
                                            width={100}
                                            height={100}
                                            className="w-full h-auto group-hover:scale-110 transition-transform duration-300"
                                          />
                                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                                            <span className="text-white text-sm">
                                              {feature.name}
                                            </span>
                                          </div>
                                        </div>
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        </NavigationMenuContent>
                      </>
                    ) : (
                      <Link href={item.path} legacyBehavior passHref>
                        <NavigationMenuLink className="bg-transparent hover:bg-gray-800 text-white p-2 flex items-center">
                          {item.name}
                          {item.badge && (
                            <span
                              className={`ml-2 text-xs px-1.5 py-0.5 rounded ${
                                item.badge === "HOT"
                                  ? "bg-green-500"
                                  : item.badge === "SALE"
                                  ? "bg-rose-500"
                                  : "bg-blue-500"
                              }`}
                            >
                              {item.badge}
                            </span>
                          )}
                        </NavigationMenuLink>
                      </Link>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          )}

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <Button variant="ghost" size="icon" onClick={toggleSearch}>
                <Search size={20} />
              </Button>
              <AnimatePresence>
                {isSearchOpen && (
                  <motion.div
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "200px" }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute right-0 top-full mt-2 z-50"
                  >
                    <input
                      type="text"
                      placeholder="Search..."
                      className="w-full p-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Wishlist */}
            <Link href="/wishlist" className="relative">
              <Heart size={20} />
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </Link>

            {/* Cart */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingCart size={20} />
                  <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    0
                  </span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[350px] sm:w-[450px]">
                <SheetHeader>
                  <SheetTitle>Your Cart</SheetTitle>
                </SheetHeader>
                <div className="py-6">
                  {cartItems.length === 0 ? (
                    <div className="text-center py-10">
                      <ShoppingCart
                        className="mx-auto mb-4"
                        size={50}
                        strokeWidth={1}
                      />
                      <h3 className="text-lg font-medium">
                        Your cart is empty
                      </h3>
                      <p className="text-sm text-muted-foreground mt-2">
                        Add some items to your cart to see them here.
                      </p>
                    </div>
                  ) : (
                    <div>{/* Cart items would go here */}</div>
                  )}
                </div>
                <div className="border-t pt-4">
                  <Button className="w-full bg-orange-500 hover:bg-orange-600">
                    Checkout
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobile && isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-900 overflow-hidden"
          >
            <div className="container mx-auto py-4 px-4">
              <ul className="space-y-4">
                {navItems.map((item) => (
                  <li key={item.name} className="border-b border-gray-800 pb-2">
                    {item.megaMenu ? (
                      <details className="group">
                        <summary className="flex justify-between items-center cursor-pointer list-none">
                          <div className="flex items-center">
                            {item.name}
                            {item.badge && (
                              <span
                                className={`ml-2 text-xs px-1.5 py-0.5 rounded ${
                                  item.badge === "HOT"
                                    ? "bg-green-500"
                                    : item.badge === "SALE"
                                    ? "bg-rose-500"
                                    : "bg-blue-500"
                                }`}
                              >
                                {item.badge}
                              </span>
                            )}
                          </div>
                          <ChevronDown
                            size={16}
                            className="transition-transform group-open:rotate-180"
                          />
                        </summary>
                        <div className="mt-2 ml-4 space-y-2">
                          {item.megaMenu.categories.map((category) => (
                            <div key={category.name} className="mb-2">
                              <h4 className="font-medium text-orange-500">
                                {category.name}
                              </h4>
                              <ul className="ml-2 mt-1 space-y-1">
                                {category.items.map((subItem) => (
                                  <li key={subItem}>
                                    <Link
                                      href="#"
                                      className="text-gray-400 hover:text-white transition-colors"
                                      onClick={closeMobileMenu}
                                    >
                                      {subItem}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </details>
                    ) : (
                      <Link
                        href={item.path}
                        className="flex items-center"
                        onClick={closeMobileMenu}
                      >
                        {item.name}
                        {item.badge && (
                          <span
                            className={`ml-2 text-xs px-1.5 py-0.5 rounded ${
                              item.badge === "HOT"
                                ? "bg-green-500"
                                : item.badge === "SALE"
                                ? "bg-rose-500"
                                : "bg-blue-500"
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
