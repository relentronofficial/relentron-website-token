"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/60 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl font-bold text-blue-400 gpu"
        >
          <Link href="/">Relentron</Link>
        </motion.h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 text-lg font-medium text-white">
          {navItems.map((item, index) => (
            <motion.li
              key={item.name}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ scale: 1.1 }}
              className="cursor-pointer hover:text-blue-400 transition-colors gpu"
            >
              <Link href={item.path}>{item.name}</Link>
            </motion.li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none transition-colors"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-black/90 border-t border-gray-800 gpu"
        >
          <ul className="flex flex-col items-center gap-6 py-6 text-lg font-medium text-white">
            {navItems.map((item) => (
              <li
                key={item.name}
                onClick={() => setIsOpen(false)}
                className="cursor-pointer hover:text-blue-400 transition-colors"
              >
                <Link href={item.path}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </nav>
  );
}
