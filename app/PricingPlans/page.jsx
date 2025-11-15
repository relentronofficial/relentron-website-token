"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import EnquiryForm from "../components/EnquiryForm";
import { Center } from "@react-three/drei";

gsap.registerPlugin(ScrollTrigger);

export default function PricingPlans() {
  useEffect(() => {
    gsap.fromTo(
      ".price-card",
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      }
    );
  }, []);

  const plans = [
    {
      title: "ESSENTIAL",
      subtitle: "Ideal for startups and micro-scale businesses",
      price: "₹3,999",
      features: [
        "Static landing Page + 4 pages",
        "Contact form integration",
        "Social media integration",
        "Google Maps Integration",
        "Free SSL certificate for secure browsing",
        "6 months free maintenance & performance check",
        "1-year Domain & hosting included",
        "Daily backup & site security",
        "Mobile-responsive design for all devices",
        "Free on-page SEO setup",
        "5 branded business mailboxes",
      ],
      gradient: "from-cyan-600 to-blue-700",
    },
    {
      title: "GROWTH PLUS",
      subtitle: "Best for brands ready to scale and expand",
      price: "₹4,999",
      features: [
        "Premium UI/UX with modern layout",
        "Dynamic editable website sections",
        "Admin dashboard for easy updates",
        "Contact form integration",
        "Social media integration",
        "Google Maps Integration",
        "Free SSL certificate for secure browsing",
        "6 months maintenance & performance check",
        "1-year domain & hosting included",
        "Daily backup & site security",
        "Fully responsive design for all devices",
        "Free on-page SEO setup",
        "5 branded business mailboxes",
      ],
      gradient: "from-blue-600 to-purple-700",
    },
    {
      title: "E-COMMERCE",
      subtitle: "Perfect for enterprises aiming for automation",
      price: "₹7,999",
      features: [
        "End-to-end product store setup",
        "Secured payment gateway integration",
        "Product categories & filters",
        "Product image gallery",
        "Social media integration",
        "Daily backup & site security",
        "Email Marketing",
        "Free CDN",
        "Free SSL certificate for secure browsing",
        "6 months maintenance & performance check",
        "1-year domain & hosting included",
        "Free on-page SEO setup",
      ],
      gradient: "from-purple-600 to-pink-600",
    },
  ];

  return (
    <main className="relative min-h-screen text-white overflow-hidden py-16 px-6">
      {/* 🌈 Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#020617] via-[#0b1221] to-[#030712]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(56,189,248,0.05)_1px,transparent_1px),linear-gradient(0deg,rgba(56,189,248,0.05)_1px,transparent_1px)] bg-[size:80px_80px] opacity-10" />
        <div className="absolute top-[10%] left-[5%] w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(56,189,248,0.25),transparent_70%)] blur-3xl animate-pulse" />
        <div className="absolute bottom-[10%] right-[5%] w-[700px] h-[700px] bg-[radial-gradient(circle,rgba(168,85,247,0.25),transparent_70%)] blur-3xl animate-pulse" />
      </div>

      {/* 💎 Header */}
      <motion.h2
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center text-3xl md:text-5xl font-extrabold mb-14 gpu"
      >
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500">
          Website Pricing Plans
        </span>
      </motion.h2>

      {/* 💳 Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            className={`price-card rounded-2xl bg-gradient-to-b ${plan.gradient} p-[2px] shadow-2xl gpu`}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 180, damping: 14 }}
          >
            <div className="bg-[#0f172a]/80 backdrop-blur-xl rounded-2xl p-6 flex flex-col justify-between h-full">
              <div>
                <h3 className="text-xl font-bold mb-2 text-center text-white">
                  {plan.title}
                </h3>
                <p className="text-gray-300 text-center text-xs mb-4">
                  {plan.subtitle}
                </p>
                <h4 className="text-3xl font-extrabold text-center text-cyan-400 mb-5">
                  {plan.price}
                </h4>
                <ul className="text-gray-300 space-y-2 text-xs leading-relaxed mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-cyan-400 mt-1.5">✔</span> {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* 🧩 Centered Enquiry Form */}
              <div className="flex justify-center items-center mt-4 pt-4">
                <div className="w-full max-w-xs">
                  <EnquiryForm floating={true} position="center" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
