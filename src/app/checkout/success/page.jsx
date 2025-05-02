"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle, ShoppingBag, ArrowRight, Home } from "lucide-react";

const CheckoutSuccessPage = () => {
  const router = useRouter();

  // Redirect if user navigates directly to this page without checkout
  useEffect(() => {
    const hasCompletedCheckout = localStorage.getItem("orderCompleted");

    if (!hasCompletedCheckout) {
      router.push("/products");
    } else {
      // Reset the flag after displaying the success page
      localStorage.removeItem("orderCompleted");
    }
  }, [router]);

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="max-w-3xl mx-auto px-4">
        <motion.div
          className="bg-white rounded-lg shadow-sm p-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
          >
            <CheckCircle className="mx-auto h-24 w-24 text-green-500" />
          </motion.div>

          <h1 className="mt-6 text-3xl font-bold text-gray-900">
            Order Successful!
          </h1>
          <p className="mt-3 text-lg text-gray-600">
            Thank you for your purchase. Your order has been successfully
            placed.
          </p>

          <div className="mt-8 p-6 bg-gray-50 rounded-lg">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              What happens next?
            </h2>
            <ol className="space-y-4 text-left">
              <li className="flex">
                <span className="flex-shrink-0 h-6 w-6 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center mr-3">
                  1
                </span>
                <span>
                  <span className="font-medium">Order Confirmation:</span>{" "}
                  You'll receive an email with your order details shortly.
                </span>
              </li>
              <li className="flex">
                <span className="flex-shrink-0 h-6 w-6 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center mr-3">
                  2
                </span>
                <span>
                  <span className="font-medium">Processing:</span> We'll process
                  your order and prepare it for shipping.
                </span>
              </li>
              <li className="flex">
                <span className="flex-shrink-0 h-6 w-6 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center mr-3">
                  3
                </span>
                <span>
                  <span className="font-medium">Shipping:</span> Once your order
                  ships, you'll receive tracking information via email.
                </span>
              </li>
              <li className="flex">
                <span className="flex-shrink-0 h-6 w-6 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center mr-3">
                  4
                </span>
                <span>
                  <span className="font-medium">Delivery:</span> Sit back and
                  relax as your order makes its way to you!
                </span>
              </li>
            </ol>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="flex items-center justify-center bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-50 transition-colors w-full sm:w-auto"
            >
              <Home size={18} className="mr-2" />
              Return to Home
            </Link>
            <Link
              href="/products"
              className="flex items-center justify-center bg-orange-500 text-white px-6 py-3 rounded-md hover:bg-orange-600 transition-colors w-full sm:w-auto"
            >
              <ShoppingBag size={18} className="mr-2" />
              Continue Shopping
            </Link>
          </div>

          <div className="mt-8 border-t border-gray-200 pt-6">
            <p className="text-sm text-gray-500">
              Order Reference: #
              {Math.random().toString(36).substring(2, 10).toUpperCase()}
            </p>
            <p className="mt-2 text-sm text-gray-500">
              Have questions about your order?{" "}
              <Link
                href="/contact"
                className="text-orange-500 hover:text-orange-600"
              >
                Contact our support team
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CheckoutSuccessPage;
