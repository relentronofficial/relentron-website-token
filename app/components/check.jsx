"use client";

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import { motion } from "framer-motion";
import { Code, Smartphone, Cloud, Brain } from "lucide-react";

const services = [
  {
    title: "Web Development",
    icon: <Code className="w-10 h-10 text-blue-400" />,
    desc: "High-performance, SEO-friendly web applications with clean UI and scalable architecture.",
    targetId: "Web",
  },
  {
    title: "Software",
    icon: <Smartphone className="w-10 h-10 text-pink-400" />,
    desc: "Custom business software, ERP, and automation solutions crafted to streamline operations and enhance productivity.",
    targetId: "software",
  },
  {
    title: "Mobile Application",
    icon: <Cloud className="w-10 h-10 text-purple-400" />,
    desc: "Next-generation mobile experiences with seamless performance, fluid interactions, and modern, intuitive design.",
    targetId: "mobile-app",
  },
  {
    title: "Digital Marketing",
    icon: <Brain className="w-10 h-10 text-green-400" />,
    desc: "AI-driven process automation and intelligent systems for smarter business decisions.",
    targetId: "digital-marketing",
  },
];

export default function SoftwareServices() {
  useEffect(() => {
    // ✅ Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      smooth: true,
      lerp: 0.1, // Lower = smoother
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // 🧭 Smooth scroll handler
  const handleCardClick = (targetId) => {
    const target = document.getElementById(targetId);
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80, // adjust offset for header if needed
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="software-services"
      className="relative  flex flex-col items-center justify-center overflow-hidden px-2 py-2 text-white"
    >
      
      {/* 🌈 ONE GLOBAL DYNAMIC BACKGROUND */}
      <div className="fixed inset-0 -z-10">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#020617] via-[#0b1221] to-[#030712]" />

        {/* Subtle neon grid */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(56,189,248,0.05)_1px,transparent_1px),linear-gradient(0deg,rgba(56,189,248,0.05)_1px,transparent_1px)] bg-[size:80px_80px] opacity-10" />

        {/* Cyan glow (top-left) */}
        <div className="absolute top-[-15%] left-[5%] w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(56,189,248,0.25),transparent_70%)] blur-3xl animate-pulse" />

        {/* Purple glow (bottom-right) */}
        <div className="absolute bottom-[-10%] right-[5%] w-[1000px] h-[1000px] bg-[radial-gradient(circle,rgba(168,85,247,0.25),transparent_70%)] blur-3xl animate-pulse" />

        {/* Moving light sweep */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-30 blur-2xl"
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Heading */}
      <h1 className="relative text-5xl md:text-6xl font-extrabold mb-15 mt-1 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 drop-shadow-[0_0_25px_rgba(56,189,248,0.5)] z-10">
        Services
      </h1>

      {/* Service Cards */}
      <div className="relative grid md:grid-cols-2 lg:grid-cols-4 gap-10 w-full max-w-7xl z-10">
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            whileHover={{
              scale: 1.05,
              rotateX: 5,
              rotateY: -5,
              boxShadow: "0px 10px 40px rgba(0,0,0,0.4)",
            }}
            onClick={() => handleCardClick(service.targetId)}
            className="relative group bg-[#0f172a]/70 rounded-2xl p-8 backdrop-blur-md border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.4)] overflow-hidden cursor-pointer transition-transform"
          >
            {/* Soft moving light effect */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-blue-500/20 via-purple-500/30 to-pink-500/20 blur-2xl"
              animate={{ x: ["-100%", "100%"] }}
              transition={{
                duration: 4,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "mirror",
              }}
            />

            {/* Icon and text */}
            <div className="relative z-10 flex flex-col items-center text-center space-y-4">
              <div className="transform transition-transform duration-500 group-hover:scale-110">
                {service.icon}
              </div>
              <h3 className="text-2xl font-semibold">{service.title}</h3>
              <p className="text-gray-300 text-sm">{service.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
