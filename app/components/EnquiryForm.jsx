"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import dynamic from "next/dynamic";

const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

// Lazy load Recaptcha
const LazyReCAPTCHA = dynamic(() => import("react-google-recaptcha"), {
  ssr: false,
});

export default function EnquiryForm({ floating = true, position: propPosition = "right" }) {
  const [isOpen, setIsOpen] = useState(false);
  const [loadRecaptcha, setLoadRecaptcha] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
    recaptchaToken: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");

  // ⭐ Position Classes (NEW)
  const positionClasses = {
    right: "right-6 bottom-6",
    left: "left-6 bottom-6",
    center: "left-1/2 -translate-x-1/2 bottom-6", // ← Center floating button
  };

  const handleOpen = () => {
    setIsOpen(true);
    setTimeout(() => setLoadRecaptcha(true), 300);
  };

  const handleClose = () => setIsOpen(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleRecaptchaChange = (token) =>
    setForm((prev) => ({ ...prev, recaptchaToken: token }));

  const validate = () => {
    let err = {};
    if (!form.name.trim()) err.name = "Name is required";
    if (!form.email.trim()) err.email = "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      err.email = "Invalid email";
    if (!/^\d{10}$/.test(form.phone)) err.phone = "10-digit number needed";
    if (!form.service) err.service = "Select service";
    if (!form.message.trim()) err.message = "Message required";
    if (!form.recaptchaToken) err.recaptcha = "Complete reCAPTCHA";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("Submitting…");

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("Success! We'll contact you shortly 🎉");
        setTimeout(() => setIsOpen(false), 1200);
      } else {
        setStatus(data.message || "Something went wrong.");
      }
    } catch {
      setStatus("Network error.");
    }
  };

  return (
    <>
      {/* 🌐 Floating Button — NOW CENTERABLE */}
      {floating && (
        <motion.button
          onClick={handleOpen}
          whileHover={!isMobile && { scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className={`
            fixed z-50 
            ${positionClasses[propPosition]} 
            px-5 py-3 rounded-full text-white
            bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600
            shadow-lg shadow-cyan-500/30
          `}
        >
          Enquire Now
        </motion.button>
      )}

      {/* Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`fixed inset-0 z-50 flex items-center justify-center 
              ${isMobile ? "bg-black/75" : "bg-black/60 backdrop-blur-md"}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 40, scale: isMobile ? 1 : 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.35 }}
              className="relative bg-[#0a0f24] border border-cyan-400/30 rounded-2xl p-8 w-[90%] max-w-md shadow-xl"
            >
              <button
                onClick={handleClose}
                className="absolute top-3 right-3 text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>

              <h2 className="text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 mb-6">
                Get in Touch
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Inputs */}
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={form.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg bg-[#0f152d] border ${
                    errors.name ? "border-red-500" : "border-white/10"
                  } text-white`}
                />
                {errors.name && <p className="text-xs text-red-400">{errors.name}</p>}

                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg bg-[#0f152d] border ${
                    errors.email ? "border-red-500" : "border-white/10"
                  } text-white`}
                />
                {errors.email && <p className="text-xs text-red-400">{errors.email}</p>}

                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone (10 digits)"
                  value={form.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg bg-[#0f152d] border ${
                    errors.phone ? "border-red-500" : "border-white/10"
                  } text-white`}
                />
                {errors.phone && <p className="text-xs text-red-400">{errors.phone}</p>}

                {/* Service dropdown */}
                <select
                  name="service"
                  value={form.service}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg bg-[#0f152d] border ${
                    errors.service ? "border-red-500" : "border-white/10"
                  } text-white`}
                >
                  <option value="">Select a service</option>
                  <option value="Website">Website</option>
                  <option value="Mobile App">Mobile App</option>
                  <option value="Software">Software</option>
                  <option value="Digital Marketing">Digital Marketing</option>
                </select>

                {errors.service && <p className="text-xs text-red-400">{errors.service}</p>}

                <textarea
                  name="message"
                  rows="3"
                  placeholder="Message"
                  value={form.message}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg bg-[#0f152d] border ${
                    errors.message ? "border-red-500" : "border-white/10"
                  } text-white`}
                />
                {errors.message && <p className="text-xs text-red-400">{errors.message}</p>}

                {/* Recaptcha */}
                {loadRecaptcha && (
                  <div className="flex justify-center my-3">
                    <LazyReCAPTCHA
                      sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                      onChange={handleRecaptchaChange}
                      theme="dark"
                      size={isMobile ? "compact" : "normal"}
                    />
                  </div>
                )}

                {errors.recaptcha && (
                  <p className="text-xs text-red-400">{errors.recaptcha}</p>
                )}

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 rounded-lg text-white font-semibold shadow-lg"
                >
                  Submit
                </button>

                {status && (
                  <p className="text-center text-sm text-white mt-2">{status}</p>
                )}
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
