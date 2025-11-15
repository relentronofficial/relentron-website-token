"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRouter } from "next/navigation";

import OurServices from "../app/components/OurServices";
import DigitalMarketingSection from "../app/components/DigitalMarketingSection";
import MobileAppDevelopmentSection from "../app/components/MobileAppDevelopmentSection";
import SoftwareDevelopmentSection from "../app/components/SoftwareDevelopmentSection";
import SoftwareFlow from "../app/components/check";
import EnquiryForm from "../app/components/EnquiryForm";
import CookieConsent from "../app/components/CookieConsent";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const heroRef = useRef(null);
  const relentronRef = useRef(null);
  const router = useRouter();

  // 🌀 Smooth Scroll + GSAP (OPTIMIZED)
  useEffect(() => {
    let lenis;

    (async () => {
      const Lenis = (await import("@studio-freight/lenis")).default;

      lenis = new Lenis({
        smoothWheel: true,
        syncTouch: false,
        duration: 1.2,
      });

      // GSAP ScrollTrigger sync with Lenis
      ScrollTrigger.scrollerProxy(document.body, {
        scrollTop(value) {
          return arguments.length
            ? lenis.scrollTo(value)
            : lenis.scroll;
        },
      });

      function raf(time) {
        lenis.raf(time);
        ScrollTrigger.update(); // sync GSAP once per frame
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);
    })();

    return () => {
      if (lenis) lenis.destroy();
    };
  }, []);

  // ⚡ Relentron Title Animation
  useEffect(() => {
    const text = relentronRef.current;
    if (text) {
      gsap.fromTo(
        text.querySelectorAll("span"),
        { opacity: 0, y: 60, rotateX: -90 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1.2,
          ease: "back.out(1.7)",
          stagger: 0.08,
        }
      );

      gsap.to(text, {
        textShadow:
          "0 0 20px rgba(56,189,248,0.8), 0 0 40px rgba(147,51,234,0.6)",
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }
  }, []);

  return (
    <main className="relative min-h-screen text-white overflow-hidden">
      {/* 🌈 Dynamic Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#020617] via-[#0b1221] to-[#030712]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(56,189,248,0.05)_1px,transparent_1px),linear-gradient(0deg,rgba(56,189,248,0.05)_1px,transparent_1px)] bg-[size:80px_80px] opacity-10" />
        <div className="absolute top-[-15%] left-[5%] w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(56,189,248,0.25),transparent_70%)] blur-3xl animate-pulse" />
        <div className="absolute bottom-[-10%] right-[5%] w-[1000px] h-[1000px] bg-[radial-gradient(circle,rgba(168,85,247,0.25),transparent_70%)] blur-3xl animate-pulse" />

        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-30 blur-2xl gpu"
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* 🧠 Hero Section */}
      <motion.section
        ref={heroRef}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="relative flex flex-col items-center justify-center min-h-[70vh] text-center px-4 md:px-8 z-10 gpu"
      >
        {/* 🪩 3D Hero Text */}
        <motion.h2
          ref={relentronRef}
          initial={{ opacity: 0, scale: 0.8, rotateX: -45 }}
          animate={{ opacity: 1, scale: 1, rotateX: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight drop-shadow-[0_0_20px_rgba(56,189,248,0.6)] text-center px-2 sm:px-4 break-words gpu"
        >
          Digital{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500">
            Upgrading
          </span>{" "}
          Partner
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.3, delay: 0.3 }}
          className="mt-6 text-gray-300 text-base sm:text-lg md:text-xl max-w-2xl gpu"
        >
          We craft world-class digital experiences with technology, design,
          and innovation.
        </motion.p>

        {/* ✨ CTA Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-8 px-8 py-3 rounded-full font-semibold text-lg bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 hover:from-cyan-400 hover:via-blue-400 hover:to-purple-500 text-white shadow-lg shadow-blue-500/30 hover:shadow-purple-500/40 transition-all duration-300 ease-in-out backdrop-blur-md gpu"
          onClick={() => router.push("/PricingPlans")}
        >
          Get Quote
        </motion.button>
      </motion.section>

      {/* 🌐 Content Sections */}
      <SoftwareFlow />
      <OurServices id="Web" />
      <SoftwareDevelopmentSection id="software" />
      <MobileAppDevelopmentSection id="mobile-app" />
      <DigitalMarketingSection id="digital-marketing" />
      <EnquiryForm />
      <CookieConsent />
    </main>
  );
}
