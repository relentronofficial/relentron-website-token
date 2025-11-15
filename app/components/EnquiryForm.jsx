"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import ReCAPTCHA from "react-google-recaptcha";
import { usePathname } from "next/navigation";

export default function EnquiryForm({ floating = true, position: propPosition = "right" }) {
  const [isOpen, setIsOpen] = useState(false);
  const [recaptchaReady, setRecaptchaReady] = useState(false);
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

  const pathname = usePathname();
  const position = propPosition || (pathname.includes("pricing") ? "center" : "right");

  // ✅ Wait for reCAPTCHA to load
  useEffect(() => {
    const checkReady = () => {
      if (typeof window !== "undefined" && window.grecaptcha) {
        setRecaptchaReady(true);
      } else {
        setTimeout(checkReady, 500);
      }
    };
    checkReady();
  }, []);

  // ✅ Expose window function to open popup externally
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.openEnquiryForm = () => setIsOpen(true);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Real-time validation
    if (name === "name") {
      if (/[^a-zA-Z\s]/.test(value)) return; // Prevent numbers/symbols
    }
    if (name === "phone") {
      if (!/^\d*$/.test(value)) return; // Allow only numbers
      if (value.length > 10) return; // Max 10 digits
    }

    setForm({ ...form, [name]: value });
  };

  const handleRecaptchaChange = (token) => {
    setForm((prev) => ({ ...prev, recaptchaToken: token }));
  };

  // ✅ Validation before submission
  const validateForm = () => {
    let newErrors = {};

    if (!form.name.trim()) newErrors.name = "Name is required";
    else if (form.name.length < 2) newErrors.name = "Name must be at least 2 characters";

    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Invalid email format";

    if (!form.phone.trim()) newErrors.phone = "Phone is required";
    else if (!/^\d{10}$/.test(form.phone)) newErrors.phone = "Enter a valid 10-digit number";

    if (!form.service) newErrors.service = "Please select a service";

    if (!form.message.trim()) newErrors.message = "Message is required";

    if (!form.recaptchaToken) newErrors.recaptcha = "Please complete reCAPTCHA";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");

    if (!validateForm()) {
      setStatus("❌ Please fix the highlighted errors!");
      return;
    }

    setStatus("Submitting...");

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("✅ Enquiry submitted successfully!");
        setForm({
          name: "",
          email: "",
          phone: "",
          service: "",
          message: "",
          recaptchaToken: "",
        });
        setErrors({});
        if (floating) setTimeout(() => setIsOpen(false), 1500);
      } else {
        setStatus(data.message || "❌ Something went wrong!");
      }
    } catch (error) {
      console.error("Submit error:", error);
      setStatus("❌ Network or server error!");
    }
  };

  const InputError = ({ message }) =>
    message && <p className="text-xs text-red-400 mt-1">{message}</p>;

  const FormFields = (
    <>
      {/* Name */}
      <div>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          placeholder="Name"
          className={`w-full px-4 py-2 rounded-lg bg-[#0f152d] border ${
            errors.name ? "border-red-500" : "border-white/10"
          } text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500`}
        />
        <InputError message={errors.name} />
      </div>

      {/* Email */}
      <div>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
          placeholder="Email"
          className={`w-full px-4 py-2 rounded-lg bg-[#0f152d] border ${
            errors.email ? "border-red-500" : "border-white/10"
          } text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500`}
        />
        <InputError message={errors.email} />
      </div>

      {/* Phone */}
      <div>
        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          required
          placeholder="Phone (10 digits)"
          className={`w-full px-4 py-2 rounded-lg bg-[#0f152d] border ${
            errors.phone ? "border-red-500" : "border-white/10"
          } text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500`}
        />
        <InputError message={errors.phone} />
      </div>

      {/* Service */}
      <div>
        <select
          name="service"
          value={form.service}
          onChange={handleChange}
          required
          className={`w-full px-4 py-2 rounded-lg bg-[#0f152d] border ${
            errors.service ? "border-red-500" : "border-white/10"
          } text-white focus:outline-none focus:ring-2 focus:ring-cyan-500`}
        >
          <option value="">Select a service</option>
          <option value="Website Development">Website</option>
          <option value="Mobile App Development">Mobile App</option>
          <option value="Software Development">Software</option>
          <option value="Digital Marketing">Digital Marketing</option>
          <option value="Others">Others</option>
        </select>
        <InputError message={errors.service} />
      </div>

      {/* Message */}
      <div>
        <textarea
          name="message"
          rows="3"
          value={form.message}
          onChange={handleChange}
          required
          placeholder="Message..."
          className={`w-full px-4 py-2 rounded-lg bg-[#0f152d] border ${
            errors.message ? "border-red-500" : "border-white/10"
          } text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500`}
        />
        <InputError message={errors.message} />
      </div>

      {/* reCAPTCHA */}
      {recaptchaReady && (
        <div className="flex justify-center my-3">
          <ReCAPTCHA
            sitekey="6LfXbwssAAAAAEBQvv_hYtHm36-zlr8Z9AUS9Cqh"
            onChange={handleRecaptchaChange}
            theme="dark"
          />
        </div>
      )}
      <InputError message={errors.recaptcha} />
    </>
  );

  // ======================================
  // 🧱 Embedded version
  // ======================================
  if (!floating) {
    return (
      <form
        onSubmit={handleSubmit}
        className="space-y-3 text-white bg-[#0a0f24] border border-cyan-400/30 rounded-2xl p-5 w-full max-w-sm mx-auto shadow-[0_0_30px_rgba(56,189,248,0.1)]"
      >
        <h2 className="text-lg font-semibold text-center mb-3 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
          Get in Touch
        </h2>
        {FormFields}
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          className="w-full py-2 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 rounded-lg text-white font-semibold text-sm shadow-lg transition gpu"
        >
          Submit
        </motion.button>
        {status && <p className="text-center text-xs mt-2 gpu">{status}</p>}
      </form>
    );
  }

  // ======================================
  // 💬 Floating button + popup form
  // ======================================
  return (
    <>
      <motion.button
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className={`fixed bottom-6 z-50 px-5 py-3 rounded-full text-white font-semibold shadow-lg transition gpu 
          ${
            position === "center"
              ? "left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 hover:shadow-purple-500/50"
              : "right-6 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 hover:shadow-cyan-500/50"
          }`}
      >
        Enquire Now
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md gpu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative bg-[#0a0f24] border border-cyan-400/30 rounded-2xl shadow-[0_0_50px_rgba(56,189,248,0.2)] p-8 w-[90%] max-w-md gpu"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-3 right-3 text-gray-400 hover:text-white transition"
              >
                <X size={20} />
              </button>

              <h2 className="text-2xl font-bold text-white mb-6 text-center bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                Get in Touch
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                {FormFields}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  className="w-full py-3 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 rounded-lg text-white font-semibold shadow-lg transition gpu"
                >
                  Submit Enquiry
                </motion.button>
                {status && <p className="text-center text-white mt-2">{status}</p>}
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
