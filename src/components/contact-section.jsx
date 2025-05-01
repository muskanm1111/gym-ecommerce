"use client"
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Send,
  MapPin,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Twitter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300 } },
};

export default function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    console.log({ name, email, message });
    // Handle form submission logic here
  };

  return (
    <div className="bg-orange-500 text-white py-16">
      <div className="max-w-7xl  mx-auto px-4">
        {/* <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-2 text-orange-500">
            GET IN TOUCH
          </h2>
          <p className="text-gray-300 max-w-lg mx-auto">
            Have questions about our protein supplements? We&apos;re here to help you
            reach your fitness goals.
          </p>
        </motion.div> */}

        {/* Contact Form
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-slate-800 p-8 rounded-lg shadow-xl"
          >
            <h3 className="text-2xl font-bold mb-6 text-orange-400">
              Send Us a Message
            </h3>
            <div className="space-y-5">
              <div>
                <Input
                  type="text"
                  placeholder="Your Name"
                  className="bg-slate-700 border-slate-600 text-white"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <Input
                  type="email"
                  placeholder="Your Email"
                  className="bg-slate-700 border-slate-600 text-white"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <Textarea
                  placeholder="Your Message"
                  className="bg-slate-700 border-slate-600 text-white min-h-32"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
              <Button
                className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                onClick={handleSubmit}
              >
                <Send className="mr-2 h-4 w-4" /> Send Message
              </Button>
            </div>
          </motion.div> */}

        {/* Contact Info */}

        <div className="grid  lg:grid-cols-3 gap-16">
          <motion.div variants={item}>
            <Card className="bg-slate-800 border-slate-700  overflow-hidden">
              <CardContent className="p-6 ">
                <div className="flex items-center">
                  <div className="bg-orange-500 p-3 rounded-lg mr-4">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1 text-gray-200">
                      Our Location
                    </h4>
                    <p className="text-gray-300">7882 Fitness Complex</p>
                    <p className="text-gray-300">Power Plaza, New York</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card className="bg-slate-800 border-slate-700 overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="bg-orange-500 p-3 rounded-lg mr-4">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1 text-gray-200">
                      Call Us
                    </h4>
                    <p className="text-gray-300">+1 800 PRO TEIN</p>
                    <p className="text-gray-300">+1 888 MUSCLE UP</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card className="bg-slate-800 border-slate-700 overflow-hidden">
              <CardContent className="p-6">
                <div className="flex  items-center">
                  <div className="bg-orange-500 p-3 rounded-lg mr-4">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1 text-gray-200">
                      Email Us
                    </h4>
                    <p className="text-gray-300">support@proteinsupps.com</p>
                    <p className="text-gray-300">orders@proteinsupps.com</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* <motion.div variants={item} className="pt-4">
              <h4 className="font-bold text-lg mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  href="#"
                  className="bg-slate-700 p-3 rounded-full hover:bg-orange-500 transition-colors duration-300"
                >
                  <Instagram className="h-5 w-5" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  href="#"
                  className="bg-slate-700 p-3 rounded-full hover:bg-orange-500 transition-colors duration-300"
                >
                  <Facebook className="h-5 w-5" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  href="#"
                  className="bg-slate-700 p-3 rounded-full hover:bg-orange-500 transition-colors duration-300"
                >
                  <Twitter className="h-5 w-5" />
                </motion.a>
              </div>
            </motion.div> */}
      </div>
    </div>
  );
}
