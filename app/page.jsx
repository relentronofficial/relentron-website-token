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

  /* --------------------------------------------------
     🌀 Smooth Scroll (Optimized – No Double RAF)
  -------------------------------------------------- */
  useEffect(() => {
    let lenis;

    (async () => {
      const Lenis = (await import("@studio-freight/lenis")).default;

      lenis = new Lenis({
        smoothWheel: true,
        syncTouch: true,
        touchInertiaMultiplier: 1.2,
        duration: 1.1,
      });

      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);

      ScrollTrigger.scrollerProxy(document.body, {
        scrollTop(value) {
          return arguments.length ? lenis.scrollTo(value) : lenis.scroll;
        },
      });

      lenis.on("scroll", ScrollTrigger.update);
      ScrollTrigger.defaults({ scroller: document.body });

      ScrollTrigger.refresh();
    })();

    return () => {
      if (lenis) lenis.destroy();
    };
  }, []);

  /* --------------------------------------------------
     ⚡ Relentron text animation (lightweight)
  -------------------------------------------------- */
  useEffect(() => {
    const text = relentronRef.current;
    if (!text) return;

    const spans = text.querySelectorAll("span");
    gsap.fromTo(
      spans,
      { opacity: 0, y: 50, rotateX: -45 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 1.2,
        stagger: 0.08,
        ease: "back.out(1.6)",
      }
    );

    gsap.to(text, {
      textShadow:
        "0 0 16px rgba(56,189,248,0.8), 0 0 22px rgba(147,51,234,0.7)",
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, []);

  /* --------------------------------------------------
     JSX UI
  -------------------------------------------------- */
  return (
    <main className="relative min-h-screen text-white overflow-hidden">
      {/* 🌈 Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#020617] via-[#0b1221] to-[#030712]" />

        {/* Subtle grid */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(56,189,248,0.05)_1px,transparent_1px),linear-gradient(0deg,rgba(56,189,248,0.05)_1px,transparent_1px)] bg-[size:80px_80px] opacity-10" />

        {/* Soft glow blobs */}
        <div className="absolute top-[-15%] left-[5%] w-[700px] h-[700px] bg-[radial-gradient(circle,rgba(56,189,248,0.2),transparent_70%)] blur-3xl" />
        <div className="absolute bottom-[-10%] right-[5%] w-[900px] h-[900px] bg-[radial-gradient(circle,rgba(168,85,247,0.25),transparent_70%)] blur-3xl" />

        {/* Light sweep */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-20 blur-2xl gpu"
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* 🧠 HERO SECTION */}
      <motion.section
        ref={heroRef}
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, ease: "easeOut" }}
        className="relative flex flex-col items-center justify-center min-h-[70vh] text-center px-6 z-10"
      >
        {/* HERO TEXT */}
        <motion.h2
          ref={relentronRef}
          initial={{ opacity: 0, rotateX: -45, scale: 0.85 }}
          animate={{ opacity: 1, rotateX: 0, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight drop-shadow-[0_0_20px_rgba(56,189,248,0.6)] gpu"
        >
          Digital{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500">
            Upgrading
          </span>{" "}
          Partner
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.3, delay: 0.3 }}
          className="mt-6 text-gray-300 text-base md:text-xl max-w-2xl mx-auto"
        >
          We craft world-class digital experiences with technology, design, and
          innovation.
        </motion.p>

        {/* CTA BUTTON */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-8 px-8 py-3 rounded-full font-semibold text-lg bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 hover:shadow-purple-500/40 text-white shadow-lg transition-all duration-300 gpu"
          onClick={() => router.push("/PricingPlans")}
        >
          Get Quote
        </motion.button>
      </motion.section>

      {/* 🌐 SECTIONS */}
      <SoftwareFlow />
      <OurServices />
      <SoftwareDevelopmentSection />
      <MobileAppDevelopmentSection />
      <DigitalMarketingSection />
      <EnquiryForm />
      <CookieConsent />
    </main>
  );
}