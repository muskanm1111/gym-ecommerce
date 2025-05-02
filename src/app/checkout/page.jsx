"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/cart-context";
import {
  Check,
  ChevronLeft,
  CreditCard,
  Lock,
  ShoppingCart,
} from "lucide-react";

const CheckoutPage = () => {
  const router = useRouter();
  const { cartItems, getCartTotal, clearCart } = useCart();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    paymentMethod: "card",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  // Calculate shipping cost (free for orders over ₹999)
  const shippingCost = getCartTotal() >= 999 ? 0 : 99;

  // Calculate total amount
  const totalAmount = getCartTotal() + shippingCost;

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    // Basic validation
    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.pincode.trim()) newErrors.pincode = "Pincode is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate processing
    setTimeout(() => {
      // Process the order (in a real app, send data to server)
      console.log("Order placed:", { ...formData, cartItems, totalAmount });

      // Clear cart
      clearCart();

      // Redirect to success page
      router.push("/checkout/success");
    }, 1500);
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
            You need to add items to your cart before proceeding to checkout.
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
        <div className="flex items-center mb-8">
          <Link
            href="/cart"
            className="text-orange-500 hover:text-orange-600 mr-2"
          >
            <ChevronLeft size={20} />
          </Link>
          <h1 className="text-3xl font-bold">Checkout</h1>
        </div>

        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          {/* Checkout form - Left side */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <form onSubmit={handleSubmit}>
                <h2 className="text-lg font-medium mb-6 pb-4 border-b">
                  Shipping Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      First Name*
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={`w-full border ${
                        errors.firstName ? "border-red-300" : "border-gray-300"
                      } rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-orange-500`}
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.firstName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Last Name*
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={`w-full border ${
                        errors.lastName ? "border-red-300" : "border-gray-300"
                      } rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-orange-500`}
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.lastName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email Address*
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full border ${
                        errors.email ? "border-red-300" : "border-gray-300"
                      } rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-orange-500`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Phone Number*
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full border ${
                        errors.phone ? "border-red-300" : "border-gray-300"
                      } rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-orange-500`}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Street Address*
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className={`w-full border ${
                      errors.address ? "border-red-300" : "border-gray-300"
                    } rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-orange-500`}
                  />
                  {errors.address && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.address}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div>
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      City*
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className={`w-full border ${
                        errors.city ? "border-red-300" : "border-gray-300"
                      } rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-orange-500`}
                    />
                    {errors.city && (
                      <p className="mt-1 text-xs text-red-500">{errors.city}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="state"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      State*
                    </label>
                    <select
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className={`w-full border ${
                        errors.state ? "border-red-300" : "border-gray-300"
                      } rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-orange-500`}
                    >
                      <option value="">Select State</option>
                      <option value="Delhi">Delhi</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Tamil Nadu">Tamil Nadu</option>
                      <option value="Uttar Pradesh">Uttar Pradesh</option>
                      <option value="Gujarat">Gujarat</option>
                      <option value="Rajasthan">Rajasthan</option>
                    </select>
                    {errors.state && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.state}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="pincode"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Pincode*
                    </label>
                    <input
                      type="text"
                      id="pincode"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      className={`w-full border ${
                        errors.pincode ? "border-red-300" : "border-gray-300"
                      } rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-orange-500`}
                    />
                    {errors.pincode && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.pincode}
                      </p>
                    )}
                  </div>
                </div>

                <h2 className="text-lg font-medium mb-6 pb-4 border-b">
                  Payment Method
                </h2>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="card"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === "card"}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-orange-500 focus:ring-orange-500"
                    />
                    <label htmlFor="card" className="ml-3">
                      <div className="flex items-center">
                        <CreditCard size={20} className="text-gray-600 mr-2" />
                        <span className="font-medium">Credit / Debit Card</span>
                      </div>
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="upi"
                      name="paymentMethod"
                      value="upi"
                      checked={formData.paymentMethod === "upi"}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-orange-500 focus:ring-orange-500"
                    />
                    <label htmlFor="upi" className="ml-3">
                      <div className="flex items-center">
                        <span className="text-sm font-medium bg-green-100 text-green-800 px-2 py-1 rounded mr-2">
                          UPI
                        </span>
                        <span className="font-medium">
                          UPI / Google Pay / PhonePe
                        </span>
                      </div>
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="cod"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === "cod"}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-orange-500 focus:ring-orange-500"
                    />
                    <label htmlFor="cod" className="ml-3">
                      <span className="font-medium">Cash on Delivery</span>
                    </label>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-8">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full bg-orange-500 text-white py-3 px-6 rounded-md font-medium flex items-center justify-center ${
                      isSubmitting
                        ? "opacity-75 cursor-not-allowed"
                        : "hover:bg-orange-600"
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      <>Place Order - ₹{totalAmount.toLocaleString()}</>
                    )}
                  </button>
                </div>

                <div className="mt-4 flex items-center justify-center text-sm text-gray-500">
                  <Lock size={14} className="mr-1" />
                  <span>Your payment information is secure</span>
                </div>
              </form>
            </div>
          </div>

          {/* Order summary - Right side */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6 sticky top-24">
              <h2 className="text-lg font-medium text-gray-900 mb-6 pb-4 border-b">
                Order Summary
              </h2>

              <div className="max-h-80 overflow-y-auto mb-6">
                {cartItems.map((item) => (
                  <div
                    key={`${item.id}-${item.size}-${item.flavor}`}
                    className="flex py-3 border-b"
                  >
                    <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 relative">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        style={{ objectFit: "cover" }}
                        className="h-full w-full object-cover object-center"
                      />
                      <div className="absolute -top-2 -right-2 bg-gray-200 rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium">
                        {item.quantity}
                      </div>
                    </div>
                    <div className="ml-3 flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {item.name}
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        {item.size && <span>Size: {item.size}</span>}
                        {item.flavor && <span> | Flavor: {item.flavor}</span>}
                      </p>
                      <p className="mt-1 text-sm font-medium text-orange-500">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

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
              </div>

              <div className="flex justify-between pt-4 text-base font-medium text-gray-900">
                <p>Total</p>
                <p>₹{totalAmount.toLocaleString()}</p>
              </div>

              <div className="mt-6 space-y-2">
                <div className="flex items-center text-green-600 text-sm">
                  <Check size={16} className="mr-2" />
                  <span>Free shipping on your order</span>
                </div>
                <div className="flex items-center text-green-600 text-sm">
                  <Check size={16} className="mr-2" />
                  <span>30-day money-back guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
