"use client";

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import { motion } from "framer-motion";
import gsap from "gsap";
import { Code, Smartphone, Cloud, Brain } from "lucide-react";

const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

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
    desc: "Custom business software, ERP and automation systems.",
    targetId: "software",
  },
  {
    title: "Mobile Application",
    icon: <Cloud className="w-10 h-10 text-purple-400" />,
    desc: "Modern mobile apps with fluid interactions and seamless performance.",
    targetId: "mobile-app",
  },
  {
    title: "Digital Marketing",
    icon: <Brain className="w-10 h-10 text-green-400" />,
    desc: "AI-driven marketing and intelligent growth systems.",
    targetId: "digital-marketing",
  },
];

export default function SoftwareServices() {
  useEffect(() => {
    // Smooth scroll
    const lenis = new Lenis({
      smooth: true,
      lerp: isMobile ? 0.08 : 0.12,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  useEffect(() => {
    if (isMobile) return;

    // Light Sweep animation (GSAP is more efficient for infinite loops)
    gsap.to(".light-sweep", {
      x: "100%",
      duration: 8,
      repeat: -1,
      ease: "none",
    });
  }, []);

  // Smooth scroll
  const handleCardClick = (targetId) => {
    const target = document.getElementById(targetId);
    if (!target) return;

    const y = target.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <section
      id="software-services"
      className="relative flex flex-col items-center justify-center px-3 py-6 text-white overflow-hidden"
    >
      {/* Background */}
      <div className="fixed inset-0 -z-10 pointer-events-none will-change-transform">
        <div className="absolute inset-0 bg-gradient-to-br from-[#020617] via-[#0b1221] to-[#030712]" />

        {/* Neon Grid */}
        {!isMobile && (
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(56,189,248,0.05)_1px,transparent_1px),linear-gradient(0deg,rgba(56,189,248,0.05)_1px,transparent_1px)] bg-[size:80px_80px] opacity-10" />
        )}

        {/* Glows (reduced size on mobile) */}
        <div className="absolute top-[-10%] left-[5%] w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(56,189,248,0.2),transparent_70%)] blur-2xl" />
        <div className="absolute bottom-[-10%] right-[5%] w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(168,85,247,0.2),transparent_70%)] blur-2xl" />

        {/* Light Sweep */}
        <div className="light-sweep absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-20 blur-xl" />
      </div>

      {/* Heading */}
      <h1 className="relative text-4xl md:text-6xl font-extrabold mb-10 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 drop-shadow-[0_0_20px_rgba(56,189,248,0.4)] z-10">
        Services
      </h1>

      {/* Cards */}
      <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-6xl z-10">
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            whileHover={!isMobile ? { scale: 1.06 } : {}}
            onClick={() => handleCardClick(service.targetId)}
            className="relative group bg-[#0f172a]/70 rounded-2xl p-8 border border-white/10 backdrop-blur-md 
                       shadow-[0_0_25px_rgba(0,0,0,0.3)] cursor-pointer will-change-transform"
          >
            <div className="relative z-10 flex flex-col items-center text-center space-y-4">
              <div className="transition-transform duration-300 group-hover:scale-110">
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
