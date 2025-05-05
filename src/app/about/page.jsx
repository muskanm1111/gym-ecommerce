"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import {
  ArrowRight,
  Dumbbell,
  Users,
  Award,
  Clock,
  ChevronRight,
} from "lucide-react";

export default function AboutPage() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const teamMembers = [
    {
      name: "Rajiv Sharma",
      position: "Founder & CEO",
      image: "/placeholder.svg?height=400&width=400",
      bio: "Fitness enthusiast with over 15 years of experience in the supplement industry.",
    },
    {
      name: "Priya Patel",
      position: "Nutrition Expert",
      image: "/placeholder.svg?height=400&width=400",
      bio: "Certified nutritionist with a passion for helping people achieve their fitness goals.",
    },
    {
      name: "Amit Kumar",
      position: "Product Development",
      image: "/placeholder.svg?height=400&width=400",
      bio: "Biochemist with expertise in creating effective and safe supplement formulations.",
    },
    {
      name: "Neha Singh",
      position: "Marketing Director",
      image: "/placeholder.svg?height=400&width=400",
      bio: "Digital marketing specialist with a background in fitness and wellness promotion.",
    },
  ];

  return (
    <>
      <main className="">
        {/* Hero Section */}
        {/* <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative h-[400px] md:h-[500px] bg-gradient-to-r from-orange-600 to-orange-500 overflow-hidden"
        >
          <div className="absolute inset-0 bg-black/40 z-10"></div>
          <Image
            src="/placeholder.svg?height=800&width=1920"
            alt="Gym Equipment"
            width={1920}
            height={800}
            className="object-cover h-full w-full"
            priority
          />
          <div className="container mx-auto px-4 relative z-20 h-full flex flex-col justify-center">
            <motion.h1
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-5xl md:text-7xl font-bold text-white mb-4"
            >
              ABOUT US
            </motion.h1>
            <motion.p
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-xl text-white max-w-2xl"
            >
              India&apos;s Premium Fitness Nutrition Brand
            </motion.p>
          </div>
        </motion.section> */}

        {/* Our Story Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl  sm:px-6 lg:px-8 mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeIn}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-orange-500 rounded-tl-3xl z-0"></div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-orange-500 rounded-br-3xl z-0"></div>
                <div className="relative z-10">
                  <Image
                    src="/videobanner.webp,"
                    alt="PowerFuel Story"
                    width={600}
                    height={600}
                    className="rounded-lg shadow-xl"
                  />
                </div>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeIn}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-6"
              >
                <div className="inline-block px-4 py-2 bg-orange-100 text-orange-600 rounded-full font-medium text-sm">
                  Our Journey
                </div>
                <h2 className="text-4xl font-bold">Our Story</h2>
                <p className="text-gray-600">
                  Founded in 2015, PowerFuel began with a simple mission: to
                  provide high-quality, science-backed nutritional supplements
                  to fitness enthusiasts across India. What started as a small
                  operation in Noida has grown into one of India&apos;s most
                  trusted fitness nutrition brands.
                </p>
                <p className="text-gray-600">
                  Our founder, Rajiv Sharma, a fitness enthusiast himself, was
                  frustrated with the lack of premium quality supplements in the
                  Indian market. He set out to create products that met
                  international standards while being affordable for Indian
                  consumers.
                </p>
                <p className="text-gray-600">
                  Today, PowerFuel offers a comprehensive range of supplements,
                  from protein powders to pre-workouts, all manufactured in
                  state-of-the-art facilities with rigorous quality control
                  measures.
                </p>
                <motion.div
                  whileHover={{ x: 5 }}
                  className="inline-flex items-center text-orange-500 font-medium"
                >
                  <Link href="/products" className="flex items-center">
                    Explore our products <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <div className="inline-block px-4 py-2 bg-orange-100 text-orange-600 rounded-full font-medium text-sm mb-4">
                Why PowerFuel
              </div>
              <h2 className="text-4xl font-bold mb-6">Why Choose Us</h2>
              <p className="text-gray-600">
                At PowerFuel, we&apos;re committed to quality, transparency, and
                results. Here&apos;s what sets us apart from other supplement
                brands in the market.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              <motion.div
                variants={fadeIn}
                className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="bg-orange-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                  <Dumbbell className="h-8 w-8 text-orange-500" />
                </div>
                <h3 className="text-xl font-bold mb-4">Premium Quality</h3>
                <p className="text-gray-600">
                  All our products are manufactured in certified facilities with
                  the highest quality standards.
                </p>
              </motion.div>

              <motion.div
                variants={fadeIn}
                className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="bg-orange-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                  <Award className="h-8 w-8 text-orange-500" />
                </div>
                <h3 className="text-xl font-bold mb-4">Certified Products</h3>
                <p className="text-gray-600">
                  Our supplements are tested by third-party labs to ensure
                  purity, potency, and safety.
                </p>
              </motion.div>

              <motion.div
                variants={fadeIn}
                className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="bg-orange-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                  <Users className="h-8 w-8 text-orange-500" />
                </div>
                <h3 className="text-xl font-bold mb-4">Expert Formulations</h3>
                <p className="text-gray-600">
                  Developed by nutrition experts and fitness professionals for
                  maximum effectiveness.
                </p>
              </motion.div>

              <motion.div
                variants={fadeIn}
                className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="bg-orange-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                  <Clock className="h-8 w-8 text-orange-500" />
                </div>
                <h3 className="text-xl font-bold mb-4">Fast Delivery</h3>
                <p className="text-gray-600">
                  Quick shipping across India with free delivery on orders above
                  ₹999.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

      

        {/* Our Values */}
        <section className="py-20 bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <div className="inline-block px-4 py-2 bg-orange-500 text-white rounded-full font-medium text-sm mb-4">
                Our Philosophy
              </div>
              <h2 className="text-4xl font-bold mb-6">Our Core Values</h2>
              <p className="text-gray-300">
                The principles that guide everything we do at PowerFuel, from
                product development to customer service.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-gray-800 p-8 rounded-lg"
              >
                <h3 className="text-2xl font-bold mb-4 text-orange-400">
                  Quality
                </h3>
                <p className="text-gray-300 mb-4">
                  We never compromise on the quality of our ingredients or
                  manufacturing processes. Every product that bears the
                  PowerFuel name meets the highest standards of purity and
                  potency.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <ChevronRight className="h-5 w-5 text-orange-400 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Premium sourced ingredients</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="h-5 w-5 text-orange-400 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Rigorous testing protocols</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="h-5 w-5 text-orange-400 mt-0.5 mr-2 flex-shrink-0" />
                    <span>State-of-the-art manufacturing</span>
                  </li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-gray-800 p-8 rounded-lg"
              >
                <h3 className="text-2xl font-bold mb-4 text-orange-400">
                  Transparency
                </h3>
                <p className="text-gray-300 mb-4">
                  We believe in complete transparency about what goes into our
                  products. Our labels clearly list all ingredients and their
                  amounts, with no proprietary blends hiding the details.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <ChevronRight className="h-5 w-5 text-orange-400 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Clear, honest labeling</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="h-5 w-5 text-orange-400 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Published test results</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="h-5 w-5 text-orange-400 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Educational content about ingredients</span>
                  </li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-gray-800 p-8 rounded-lg"
              >
                <h3 className="text-2xl font-bold mb-4 text-orange-400">
                  Innovation
                </h3>
                <p className="text-gray-300 mb-4">
                  We&apos;re constantly researching and developing new
                  formulations based on the latest scientific findings in
                  nutrition and sports performance.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <ChevronRight className="h-5 w-5 text-orange-400 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Research-backed formulations</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="h-5 w-5 text-orange-400 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Continuous product improvement</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="h-5 w-5 text-orange-400 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Adaptation to emerging nutrition science</span>
                  </li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-gray-800 p-8 rounded-lg"
              >
                <h3 className="text-2xl font-bold mb-4 text-orange-400">
                  Customer Focus
                </h3>
                <p className="text-gray-300 mb-4">
                  Our customers are at the heart of everything we do. We&apos;re
                  committed to providing exceptional service, education, and
                  support to help you achieve your fitness goals.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <ChevronRight className="h-5 w-5 text-orange-400 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Responsive customer service</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="h-5 w-5 text-orange-400 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Educational resources and guidance</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="h-5 w-5 text-orange-400 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Community building and support</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-orange-500 text-white">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto"
            >
              <h2 className="text-4xl font-bold mb-6">
                Ready to Fuel Your Fitness Journey?
              </h2>
              <p className="text-xl mb-8">
                Join thousands of satisfied customers who trust PowerFuel for
                their nutrition needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/products"
                    className="bg-white text-orange-500 px-8 py-4 rounded-lg font-bold text-lg inline-block"
                  >
                    Shop Products
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/contact"
                    className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg inline-block"
                  >
                    Contact Us
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
     
    </>
  );
}
