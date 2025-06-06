"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useRouter } from "next/navigation";
import {
  Facebook, Twitter, Instagram, Search, Heart, 
  ShoppingCart, Menu, X, ChevronDown, User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet, SheetContent, SheetHeader, 
  SheetTitle, SheetTrigger
} from "@/components/ui/sheet";
import {
  NavigationMenu, NavigationMenuContent,
  NavigationMenuItem, NavigationMenuLink,
  NavigationMenuList, NavigationMenuTrigger
} from "@/components/ui/navigation-menu";

 const navItems = [
   {
     name: "Home",
     path: "/",
     badge: null,
     megaMenu: null,
   },
   {
     name: "Products",
     path: "/products",
     badge: "NEW",
     megaMenu: {
       categories: [
         {
           name: "Categories",
           items: [
             {
               name: "Protein Supplements",
               path: "/products?category=protein",
             },
             { name: "Pre-Workout", path: "/products?category=pre-workout" },
             { name: "Amino Acids", path: "/products?category=amino-acids" },
             {
               name: "Weight Gainers",
               path: "/products?category=weight-gain",
             },
           ],
         },
         {
           name: "Brands",
           items: [
             { name: "MuscleGain", path: "/products?brand=MuscleGain" },
             { name: "ExtremeEnergy", path: "/products?brand=ExtremeEnergy" },
             { name: "RecoveryPlus", path: "/products?brand=RecoveryPlus" },
             { name: "PowerMax", path: "/products?brand=PowerMax" },
           ],
         },
         {
           name: "Special Collections",
           items: [
             { name: "New Arrivals", path: "/products?sort=newest" },
             { name: "Best Sellers", path: "/products?sort=rating" },
             { name: "Sale Items", path: "/products?sale=true" },
           ],
         },
       ],
       featured: [
         {
           name: "Whey Protein",
           image: "/supplements/protein1.jpg",
           path: "/products/whey-protein-powder",
         },
         {
           name: "Pre-Workout",
           image: "/supplements/preworkout1.jpg",
           path: "/products/pre-workout-energy-booster",
         },
       ],
     },
   },
   {
     name: "Categories",
     path: "/products?category=protein",
     megaMenu: null,
   },
   {
     name: "About ",
     path: "/about",
     megaMenu: null,
   },
   {
     name: "Contact",
     path: "/contact",
     megaMenu: null,
   },
 ];

const Header = () => {
   const router = useRouter();
   const [isSearchOpen, setIsSearchOpen] = useState(false);
   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
   const [cartItems, setCartItems] = useState([]);
   const [searchQuery, setSearchQuery] = useState("");
   const [wishlistCount, setWishlistCount] = useState(0);
   const [cartItemCount, setCartItemCount] = useState(0);
   const isMobile = useMediaQuery("(max-width: 768px)");

   // Load cart and wishlist data on client-side
   useEffect(() => {
     // Load from localStorage if available
     const storedCart = localStorage.getItem("cart");
     const storedWishlist = localStorage.getItem("wishlist");

     if (storedCart) {
       try {
         const parsedCart = JSON.parse(storedCart);
         setCartItems(parsedCart);

         // Check if parsedCart is an array before using reduce
         if (Array.isArray(parsedCart)) {
           setCartItemCount(
             parsedCart.reduce((total, item) => total + item.quantity, 0)
           );
         } else {
           console.error("Parsed cart is not an array:", parsedCart);
           // Reset the cart in localStorage and state
           localStorage.setItem("cart", JSON.stringify([]));
           setCartItems([]);
           setCartItemCount(0);
         }
       } catch (error) {
         console.error("Error parsing cart from localStorage", error);
         // Reset the cart in localStorage and state
         localStorage.setItem("cart", JSON.stringify([]));
         setCartItems([]);
         setCartItemCount(0);
       }
     }

     if (storedWishlist) {
       try {
         const parsedWishlist = JSON.parse(storedWishlist);

         // Check if parsedWishlist is an array
         if (Array.isArray(parsedWishlist)) {
           setWishlistCount(parsedWishlist.length);
         } else {
           console.error("Parsed wishlist is not an array:", parsedWishlist);
           // Reset the wishlist in localStorage and state
           localStorage.setItem("wishlist", JSON.stringify([]));
           setWishlistCount(0);
         }
       } catch (error) {
         console.error("Error parsing wishlist from localStorage", error);
         // Reset the wishlist in localStorage and state
         localStorage.setItem("wishlist", JSON.stringify([]));
         setWishlistCount(0);
       }
     }
   }, []);

   const toggleSearch = () => {
     setIsSearchOpen(!isSearchOpen);
   };

   const toggleMobileMenu = () => {
     setIsMobileMenuOpen(!isMobileMenuOpen);
   };

   const closeMobileMenu = () => {
     setIsMobileMenuOpen(false);
   };

   const handleSearch = (e) => {
     e.preventDefault();
     if (searchQuery.trim()) {
       router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
       setIsSearchOpen(false);
       setSearchQuery("");
     }
   };

   const calculateCartTotal = () => {
     return cartItems.reduce(
       (total, item) => total + item.price * item.quantity,
       0
     );
   };


  return (
    <header className="w-full sticky top-0 z-40">
      {/* Top bar */}
      <div className="bg-orange-500 text-white py-2 px-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="hidden md:flex space-x-4">
            {/* Social Icons */}
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
          <div className="hidden md:block">
            <p className="text-sm">Free shipping on all orders over ₹999</p>
          </div>
          <div className="flex items-center space-x-2">
            <Link
              href="/auth"
              className="hover:text-orange-200 transition-colors"
            >
              <User size={16} />
              <span className="hidden md:inline ml-1">Login / Register</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-3">
          {/* Mobile Header */}
          <div className="md:hidden flex items-center justify-between">
            <Button variant="ghost" onClick={toggleMobileMenu} className="p-1">
              <Menu size={24} />
            </Button>

            <Link href="/" className="absolute left-1/2 -translate-x-1/2">
              <Image
                src="/logo3.png"
                alt="Logo"
                width={120}
                height={40}
                className="h-8 w-auto"
              />
            </Link>

            <div className="flex items-center space-x-3">
              <Link href="/auth">
                <User size={20} />
              </Link>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <ShoppingCart size={20} />
                    {cartItemCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {cartItemCount}
                      </span>
                    )}
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
                          className="mx-auto mb-4 text-gray-400"
                          size={50}
                          strokeWidth={1}
                        />
                        <h3 className="text-lg font-medium">
                          Your cart is empty
                        </h3>
                        <p className="text-sm text-gray-500 mt-2">
                          Add some items to your cart to see them here.
                        </p>
                        <Button
                          className="mt-4 bg-orange-500 hover:bg-orange-600"
                          onClick={() => router.push("/products")}
                        >
                          Browse Products
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {cartItems.map((item) => (
                          <div
                            key={`${item.id}-${item.size}-${item.flavor}`}
                            className="flex gap-4 py-2 border-b"
                          >
                            <div className="h-16 w-16 relative flex-shrink-0">
                              <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                style={{ objectFit: "cover" }}
                                className="rounded-md"
                              />
                            </div>
                            <div className="flex-grow">
                              <h4 className="text-sm font-medium">
                                {item.name}
                              </h4>
                              <div className="text-xs text-gray-500 mt-1">
                                {item.size && <span>Size: {item.size}</span>}
                                {item.flavor && (
                                  <span> | Flavor: {item.flavor}</span>
                                )}
                              </div>
                              <div className="flex justify-between items-center mt-2">
                                <div className="text-sm">
                                  ₹{item.price.toLocaleString()} ×{" "}
                                  {item.quantity}
                                </div>
                                <div className="text-sm font-medium">
                                  ₹
                                  {(
                                    item.price * item.quantity
                                  ).toLocaleString()}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}

                        <div className="border-t border-gray-200 pt-4 space-y-2">
                          <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span className="font-medium">
                              ₹{calculateCartTotal().toLocaleString()}
                            </span>
                          </div>
                          <div className="text-xs text-gray-500">
                            Shipping and taxes calculated at checkout
                          </div>
                        </div>

                        <div className="pt-2 space-y-2">
                          <Button
                            className="w-full bg-orange-500 hover:bg-orange-600"
                            onClick={() => router.push("/checkout")}
                          >
                            Checkout
                          </Button>
                          <Button
                            variant="outline"
                            className="w-full border-orange-500 text-orange-500 hover:bg-orange-50"
                            onClick={() => router.push("/cart")}
                          >
                            View Cart
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Desktop Header */}
          <div className="hidden md:flex justify-between items-center">
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/logo3.png"
                alt="Logo"
                width={180}
                height={60}
                className="h-12 w-auto"
              />
            </Link>

            <NavigationMenu className="mx-4">
              <NavigationMenuList>
                {navItems.map((item) => (
                  <NavigationMenuItem key={item.name}>
                    {item.megaMenu ? (
                      <>
                        <NavigationMenuTrigger className="bg-transparent hover:bg-orange-50 hover:text-orange-500 text-black">
                          <span className="flex items-center text-black">
                            {item.name}
                            {item.badge && (
                              <span
                                className={`ml-2 text-xs px-1.5 py-0.5 rounded bg-green-500 text-white`}
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
                                        <li
                                          key={
                                            typeof subItem === "string"
                                              ? subItem
                                              : subItem.name
                                          }
                                        >
                                          <Link
                                            href={
                                              typeof subItem === "string"
                                                ? "#"
                                                : subItem.path
                                            }
                                            className="text-gray-800 hover:text-orange-500 transition-colors"
                                          >
                                            {typeof subItem === "string"
                                              ? subItem
                                              : subItem.name}
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
                                        href={feature.path || "#"}
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
                        <NavigationMenuLink className="bg-transparent hover:bg-orange-50 text-black p-2 flex items-center">
                          {item.name}
                          {item.badge && (
                            <span className="ml-2 text-xs px-1.5 py-0.5 rounded bg-green-500 text-white">
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

            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={toggleSearch}>
                <Search size={20} />
              </Button>
              <Link href="/wishlist" className="relative">
                <Heart size={20} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <ShoppingCart size={20} />
                    {cartItemCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {cartItemCount}
                      </span>
                    )}
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
                          className="mx-auto mb-4 text-gray-400"
                          size={50}
                          strokeWidth={1}
                        />
                        <h3 className="text-lg font-medium">
                          Your cart is empty
                        </h3>
                        <p className="text-sm text-gray-500 mt-2">
                          Add some items to your cart to see them here.
                        </p>
                        <Button
                          className="mt-4 bg-orange-500 hover:bg-orange-600"
                          onClick={() => router.push("/products")}
                        >
                          Browse Products
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {cartItems.map((item) => (
                          <div
                            key={`${item.id}-${item.size}-${item.flavor}`}
                            className="flex gap-4 py-2 border-b"
                          >
                            <div className="h-16 w-16 relative flex-shrink-0">
                              <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                style={{ objectFit: "cover" }}
                                className="rounded-md"
                              />
                            </div>
                            <div className="flex-grow">
                              <h4 className="text-sm font-medium">
                                {item.name}
                              </h4>
                              <div className="text-xs text-gray-500 mt-1">
                                {item.size && <span>Size: {item.size}</span>}
                                {item.flavor && (
                                  <span> | Flavor: {item.flavor}</span>
                                )}
                              </div>
                              <div className="flex justify-between items-center mt-2">
                                <div className="text-sm">
                                  ₹{item.price.toLocaleString()} ×{" "}
                                  {item.quantity}
                                </div>
                                <div className="text-sm font-medium">
                                  ₹
                                  {(
                                    item.price * item.quantity
                                  ).toLocaleString()}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}

                        <div className="border-t border-gray-200 pt-4 space-y-2">
                          <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span className="font-medium">
                              ₹{calculateCartTotal().toLocaleString()}
                            </span>
                          </div>
                          <div className="text-xs text-gray-500">
                            Shipping and taxes calculated at checkout
                          </div>
                        </div>

                        <div className="pt-2 space-y-2">
                          <Button
                            className="w-full bg-orange-500 hover:bg-orange-600"
                            onClick={() => router.push("/checkout")}
                          >
                            Checkout
                          </Button>
                          <Button
                            variant="outline"
                            className="w-full border-orange-500 text-orange-500 hover:bg-orange-50"
                            onClick={() => router.push("/cart")}
                          >
                            View Cart
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>

        {/* Search Bar (Mobile) */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-t border-gray-200"
            >
              <div className="container mx-auto px-4 py-3">
                <form onSubmit={handleSearch} className="flex">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    className="w-full p-2 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <button
                    type="submit"
                    className="bg-orange-500 text-white px-4 rounded-r-lg"
                  >
                    <Search size={20} />
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobile && isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 left-0 w-[80%] h-screen bg-white shadow-xl z-50 overflow-y-auto"
            >
              <div className="p-4">
                <Button
                  variant="ghost"
                  onClick={closeMobileMenu}
                  className="mb-4"
                >
                  <X size={24} />
                </Button>

                <div className="mb-6">
                  <form onSubmit={handleSearch} className="flex">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search products..."
                      className="w-full p-2 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                    <button
                      type="submit"
                      className="bg-orange-500 text-white px-4 rounded-r-lg"
                    >
                      <Search size={20} />
                    </button>
                  </form>
                </div>

                <nav className="space-y-4">
                  {navItems.map((item) => (
                    <div
                      key={item.name}
                      className="border-b border-gray-100 pb-4"
                    >
                      {item.megaMenu ? (
                        <details className="group">
                          <summary className="flex justify-between items-center cursor-pointer list-none">
                            <span className="text-lg">{item.name}</span>
                            <ChevronDown
                              size={16}
                              className="transform group-open:rotate-180 transition-transform"
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
                                    <li
                                      key={
                                        typeof subItem === "string"
                                          ? subItem
                                          : subItem.name
                                      }
                                    >
                                      <Link
                                        href={
                                          typeof subItem === "string"
                                            ? "#"
                                            : subItem.path
                                        }
                                        className="text-gray-700 hover:text-orange-500 transition-colors"
                                        onClick={closeMobileMenu}
                                      >
                                        {typeof subItem === "string"
                                          ? subItem
                                          : subItem.name}
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
                          className="text-lg hover:text-orange-500"
                          onClick={closeMobileMenu}
                        >
                          {item.name}
                        </Link>
                      )}
                    </div>
                  ))}
                </nav>

                {/* Social Links in Mobile Menu */}
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <h3 className="text-sm font-medium mb-3">Follow Us</h3>
                  <div className="flex space-x-4">
                    <Link
                      href="#"
                      className="text-gray-600 hover:text-orange-500"
                    >
                      <Facebook size={20} />
                    </Link>
                    <Link
                      href="#"
                      className="text-gray-600 hover:text-orange-500"
                    >
                      <Twitter size={20} />
                    </Link>
                    <Link
                      href="#"
                      className="text-gray-600 hover:text-orange-500"
                    >
                      <Instagram size={20} />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={closeMobileMenu}
            />
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;