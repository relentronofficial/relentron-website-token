"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setTimeout(() => setIsVisible(true), 1000); // delay popup by 1 sec
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
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.5 }}
          className="fixed bottom-6 right-6 z-50 w-[90%] md:w-[420px] bg-gray-900/95 text-white rounded-2xl shadow-lg border border-gray-700 backdrop-blur-md p-5 gpu"
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
            We use cookies to improve your browsing experience, analyze site traffic, 
            and enhance functionality. By clicking "Accept", you agree to our use of cookies. 
            Learn more in our{" "}
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
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition"
            >
              Accept
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
