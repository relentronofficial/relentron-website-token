"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import dynamic from "next/dynamic";

const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

// ✅ Load reCAPTCHA only when needed
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

  const handleOpen = () => {
    setIsOpen(true);
    setTimeout(() => setLoadRecaptcha(true), 300); // Load after animation starts
  };

  const handleClose = () => {
    setIsOpen(false);
  };

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

  const Input = ({ name, placeholder, type = "text" }) => (
    <div>
      <input
        type={type}
        name={name}
        value={form[name]}
        onChange={handleChange}
        placeholder={placeholder}
        className={`w-full px-4 py-2 rounded-lg bg-[#0f152d] border ${
          errors[name] ? "border-red-500" : "border-white/10"
        } text-white placeholder-gray-500 focus:ring-2 focus:ring-cyan-500`}
      />
      {errors[name] && <p className="text-xs text-red-400">{errors[name]}</p>}
    </div>
  );

  const FormFields = (
    <>
      <Input name="name" placeholder="Name" />
      <Input name="email" type="email" placeholder="Email" />
      <Input name="phone" placeholder="Phone (10 digits)" type="tel" />

      {/* Service */}
      <div>
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
        {errors.service && (
          <p className="text-xs text-red-400">{errors.service}</p>
        )}
      </div>

      {/* Message */}
      <div>
        <textarea
          name="message"
          rows="3"
          value={form.message}
          onChange={handleChange}
          placeholder="Message"
          className={`w-full px-4 py-2 rounded-lg bg-[#0f152d] border ${
            errors.message ? "border-red-500" : "border-white/10"
          } text-white placeholder-gray-500 focus:ring-2 focus:ring-cyan-500`}
        />
        {errors.message && (
          <p className="text-xs text-red-400">{errors.message}</p>
        )}
      </div>

      {/* reCAPTCHA (only loaded when popup is open) */}
      {loadRecaptcha && (
        <div className="flex justify-center my-3">
          <LazyReCAPTCHA
            sitekey="6LfXbwssAAAAAEBQvv_hYtHm36-zlr8Z9AUS9Cqh"
            onChange={handleRecaptchaChange}
            theme="dark"
            size={isMobile ? "compact" : "normal"}
          />
        </div>
      )}
      {errors.recaptcha && (
        <p className="text-xs text-red-400">{errors.recaptcha}</p>
      )}
    </>
  );

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={handleOpen}
        whileHover={!isMobile && { scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 px-5 py-3 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 text-white rounded-full shadow-lg"
      >
        Enquire Now
      </motion.button>

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
              initial={{
                opacity: 0,
                y: 40,
                scale: isMobile ? 1 : 0.9,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 40,
              }}
              transition={{ duration: 0.35 }}
              className="relative bg-[#0a0f24] border border-cyan-400/30 rounded-2xl p-8 w-[90%] max-w-md shadow-xl"
            >
              {/* Close button */}
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
                {FormFields}

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
