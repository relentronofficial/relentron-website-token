// app/contact/ContactPageClient.jsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function ContactPageClient() {
  return (
    <div className="min-h-screen bg-[#0a0f1c] text-white flex flex-col items-center py-20 px-6">
      {/* Title */}
      <motion.h1
        className="text-4xl md:text-5xl font-bold mb-10 text-center text-cyan-400 gpu"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Contact Us
      </motion.h1>

      {/* Contact Cards */}
      <div className="grid md:grid-cols-3 gap-10 w-full max-w-6xl mb-16">
        {/* Email */}
        <motion.div
          className="bg-[#111a2e] rounded-2xl p-8 shadow-lg hover:shadow-[0_0_20px_rgba(56,189,248,0.3)] transition w-full gpu"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-cyan-400 text-2xl font-semibold mb-3 flex items-center gap-2">
            <FaEnvelope /> Email
          </h3>
          <p className="text-gray-300 text-lg break-all">
            relentronofficial@gmail.com
          </p>
        </motion.div>

        {/* Phone */}
        <motion.div
          className="bg-[#111a2e] rounded-2xl p-8 shadow-lg hover:shadow-[0_0_20px_rgba(56,189,248,0.3)] transition w-full gpu"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h3 className="text-cyan-400 text-2xl font-semibold mb-3 flex items-center gap-2">
            <FaPhone /> Phone
          </h3>
          <p className="text-gray-300 text-lg">+91 7010834661</p>
        </motion.div>

        {/* Address */}
        <motion.div
          className="bg-[#111a2e] rounded-2xl p-8 shadow-lg hover:shadow-[0_0_20px_rgba(56,189,248,0.3)] transition w-full gpu"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-cyan-400 text-2xl font-semibold mb-3 flex items-center gap-2">
            <FaMapMarkerAlt /> Address
          </h3>
          <p className="text-gray-300 text-lg leading-relaxed">
            2/356, Main Road, Senjeri, Perambalur Dt, Tamil Nadu, India
          </p>
        </motion.div>
      </div>


      <p className="text-gray-400 text-center mt-10 max-w-2xl">
        We’re always excited to collaborate with startups, businesses, and entrepreneurs.
        Let’s connect to build something impactful together.
      </p>
    </div>
  );
}
