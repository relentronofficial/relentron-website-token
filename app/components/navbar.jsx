"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

// ⭐ Google Analytics Event Sender
const gaEvent = (action, category, label) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
    });
  }
};


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hideNav, setHideNav] = useState(false);
  const [lastScroll, setLastScroll] = useState(0);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Contact", path: "/contact" },
  ];

  // ✅ Smart scroll-based navbar
  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY;
      if (current > lastScroll && current > 50) setHideNav(true);
      else setHideNav(false);
      setLastScroll(current);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastScroll]);

   // ⭐ Track Mobile Menu Toggle
  const toggleMobileMenu = () => {
    gaEvent("mobile_menu_toggle", "Navigation", isOpen ? "Closed" : "Opened");
    setIsOpen(!isOpen);
  };


  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: hideNav ? -80 : 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full z-50 border-b border-gray-800 
                 bg-black/50 backdrop-blur-sm md:backdrop-blur-md 
                 transition-colors duration-300 gpu"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold text-blue-400 gpu"
        >
          <Link href="/">Relentron</Link>
        </motion.h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 text-lg font-medium text-white">
          {navItems.map((item, index) => (
            <motion.li
              key={item.name}
              whileHover={{ scale: 1.08 }}
              transition={{ type: "spring", stiffness: 250 }}
              className="cursor-pointer hover:text-blue-400 transition-colors gpu"
            >
              <Link href={item.path}>{item.name}</Link>
            </motion.li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white focus:outline-none transition"
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown (Framer optimized) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="md:hidden bg-black/95 border-t border-gray-800 gpu"
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
      </AnimatePresence>
    </motion.nav>
  );
}
