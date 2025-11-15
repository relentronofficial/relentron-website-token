"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");

    if (!consent) {
      // Delay the popup until the main animations finish
      const timer = setTimeout(() => setIsVisible(true), isMobile ? 1800 : 1000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "true");
    setIsVisible(false);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{
            duration: isMobile ? 0.35 : 0.45,
            ease: "easeOut",
          }}
          className="
            fixed bottom-5 right-5 z-[90]
            w-[90%] md:w-[420px]
            bg-gray-900/95 text-white
            rounded-xl 
            border border-gray-700 
            shadow-[0_0_20px_rgba(0,0,0,0.4)]
            p-5 
            will-change-transform will-change-opacity
          "
        >
          <div className="flex justify-between items-start">
            <h2 className="text-lg font-semibold text-white">We use cookies 🍪</h2>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-white transition"
            >
              <X size={18} />
            </button>
          </div>

          <p className="text-sm text-gray-300 mt-2 leading-relaxed">
            We use cookies to improve your experience. By clicking "Accept",
            you agree to our cookie policy. Read more in our{" "}
            <a
              href="/privacy-policy"
              className="text-blue-400 underline hover:text-blue-300"
            >
              Privacy Policy
            </a>.
          </p>

          <div className="flex justify-end mt-4">
            <button
              onClick={handleAccept}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 
                         text-white text-sm rounded-lg transition"
            >
              Accept
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
