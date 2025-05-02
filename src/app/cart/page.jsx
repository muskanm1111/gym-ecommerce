"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useCart } from "@/context/cart-context";
import {
  Trash2,
  Minus,
  Plus,
  ShoppingCart,
  ArrowRight,
  RefreshCw,
} from "lucide-react";

const CartPage = () => {
  const router = useRouter();
  const { cartItems, updateQuantity, removeFromCart, clearCart, getCartTotal } =
    useCart();
  const [isUpdating, setIsUpdating] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSuccess] = useState("");

  // Calculate shipping cost (free for orders over ₹999)
  const shippingCost = getCartTotal() >= 999 ? 0 : 99;

  // Calculate total amount including shipping and discount
  const totalAmount = getCartTotal() + shippingCost - discountAmount;

  // Update animation
  useEffect(() => {
    if (isUpdating) {
      const timer = setTimeout(() => {
        setIsUpdating(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isUpdating]);

  // Handle quantity change
  const handleQuantityChange = (productId, size, flavor, newQuantity) => {
    setIsUpdating(true);
    if (newQuantity >= 1) {
      updateQuantity(productId, size, flavor, newQuantity);
    }
  };

  // Handle coupon code submission
  const handleApplyCoupon = (e) => {
    e.preventDefault();

    // Reset previous messages
    setCouponError("");
    setCouponSuccess("");

    // Example coupon logic
    if (couponCode.trim() === "WELCOME10") {
      const discount = Math.round(getCartTotal() * 0.1); // 10% discount
      setDiscountAmount(discount);
      setCouponSuccess("10% discount applied successfully!");
    } else if (couponCode.trim() === "GYMFUEL20") {
      const discount = Math.round(getCartTotal() * 0.2); // 20% discount
      setDiscountAmount(discount);
      setCouponSuccess("20% discount applied successfully!");
    } else {
      setCouponError("Invalid coupon code. Please try again.");
    }
  };

  // If cart is empty
  if (cartItems.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <ShoppingCart
            className="mx-auto mb-6 text-gray-400"
            size={64}
            strokeWidth={1}
          />
          <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
          <p className="text-gray-500 mb-6">
            Looks like you haven't added any products to your cart yet.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center bg-orange-500 text-white px-6 py-3 rounded-md hover:bg-orange-600 transition-colors"
          >
            <ShoppingCart size={18} className="mr-2" />
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          {/* Cart items - Left side */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flow-root">
                <ul className="divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <li
                      key={`${item.id}-${item.size}-${item.flavor}`}
                      className="py-6 flex"
                    >
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 relative">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          style={{ objectFit: "cover" }}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>
                              <Link
                                href={`/products/${item.slug}`}
                                className="hover:text-orange-500"
                              >
                                {item.name}
                              </Link>
                            </h3>
                            <motion.p
                              animate={
                                isUpdating ? { scale: [1, 1.05, 1] } : {}
                              }
                              className="ml-4 font-medium text-orange-500"
                            >
                              ₹{(item.price * item.quantity).toLocaleString()}
                            </motion.p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">
                            {item.size && <span>Size: {item.size}</span>}
                            {item.flavor && (
                              <span> | Flavor: {item.flavor}</span>
                            )}
                          </p>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <div className="flex items-center border rounded-md">
                            <button
                              type="button"
                              className="p-2 text-gray-600 hover:text-orange-500"
                              onClick={() =>
                                handleQuantityChange(
                                  item.id,
                                  item.size,
                                  item.flavor,
                                  item.quantity - 1
                                )
                              }
                              disabled={item.quantity <= 1}
                            >
                              <Minus size={16} />
                            </button>
                            <span className="px-4 py-2 text-gray-900 select-none">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              className="p-2 text-gray-600 hover:text-orange-500"
                              onClick={() =>
                                handleQuantityChange(
                                  item.id,
                                  item.size,
                                  item.flavor,
                                  item.quantity + 1
                                )
                              }
                            >
                              <Plus size={16} />
                            </button>
                          </div>

                          <div className="flex">
                            <button
                              type="button"
                              onClick={() =>
                                removeFromCart(item.id, item.size, item.flavor)
                              }
                              className="font-medium text-red-600 hover:text-red-500 flex items-center"
                            >
                              <Trash2 size={16} className="mr-1" />
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 flex justify-between">
                <button
                  type="button"
                  onClick={() => router.push("/products")}
                  className="text-sm font-medium text-orange-500 hover:text-orange-600 flex items-center"
                >
                  <RefreshCw size={16} className="mr-1" />
                  Continue Shopping
                </button>

                <button
                  type="button"
                  onClick={clearCart}
                  className="text-sm font-medium text-gray-500 hover:text-red-500"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>

          {/* Summary - Right side */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Order Summary
              </h2>

              <div className="space-y-3 border-b border-gray-200 pb-4">
                <div className="flex justify-between text-sm">
                  <p className="text-gray-600">Subtotal</p>
                  <p className="font-medium text-gray-900">
                    ₹{getCartTotal().toLocaleString()}
                  </p>
                </div>

                <div className="flex justify-between text-sm">
                  <p className="text-gray-600">Shipping</p>
                  <p className="font-medium text-gray-900">
                    {shippingCost === 0 ? "Free" : `₹${shippingCost}`}
                  </p>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <p>Discount</p>
                    <p className="font-medium">
                      -₹{discountAmount.toLocaleString()}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex justify-between pt-4 text-base font-medium text-gray-900">
                <p>Total</p>
                <p>₹{totalAmount.toLocaleString()}</p>
              </div>

              <div className="mt-6">
                <button
                  type="button"
                  onClick={() => router.push("/checkout")}
                  className="w-full flex items-center justify-center bg-orange-500 text-white px-6 py-3 rounded-md hover:bg-orange-600 transition-colors"
                >
                  Checkout
                  <ArrowRight size={16} className="ml-2" />
                </button>
              </div>

              {/* Coupon code */}
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-900 mb-2">
                  Have a coupon?
                </h3>
                <form onSubmit={handleApplyCoupon} className="mt-1 flex">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 min-w-0 border border-gray-300 rounded-l-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
                    placeholder="Enter coupon code"
                  />
                  <button
                    type="submit"
                    className="bg-gray-100 border border-l-0 border-gray-300 text-gray-700 rounded-r-md px-3 py-2 text-sm font-medium hover:bg-gray-200"
                  >
                    Apply
                  </button>
                </form>
                {couponError && (
                  <p className="mt-1 text-xs text-red-500">{couponError}</p>
                )}
                {couponSuccess && (
                  <p className="mt-1 text-xs text-green-500">{couponSuccess}</p>
                )}
              </div>

              {/* Additional info */}
              <div className="mt-6 text-xs text-gray-500">
                <p className="mb-1">• Free shipping on orders over ₹999</p>
                <p className="mb-1">• Secure checkout powered by Stripe</p>
                <p>• 30-day money-back guarantee</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
