"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SoftwareDevelopment() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  // Detect mobile once
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  // ----------------------------------------------------
  // Background animation (Ultra light on mobile)
  // ----------------------------------------------------
  useEffect(() => {
    const bg = sectionRef.current.querySelector(".bg-waves");

    if (isMobile) {
      // Light mode – slow animation, less GPU usage
      gsap.to(bg, {
        backgroundPosition: "120% 0",
        duration: 30,
        repeat: -1,
        ease: "none",
      });
    } else {
      // Desktop – full animation
      gsap.to(bg, {
        backgroundPosition: "200% 0",
        duration: 18,
        repeat: -1,
        ease: "linear",
      });
    }
  }, []);

  // ----------------------------------------------------
  // Scroll animations — DISABLED ON MOBILE
  // ----------------------------------------------------
  useEffect(() => {
    const section = sectionRef.current;

    if (!isMobile) {
      // Desktop full scroll animations
      gsap.fromTo(
        section.querySelector("h1"),
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 85%" },
        }
      );

      cardsRef.current.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: i * 0.15,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 90%" },
          }
        );
      });
    } else {
      // MOBILE VERSION – simple fade-in (no ScrollTrigger)
      gsap.fromTo(
        section.querySelector("h1"),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      );

      cardsRef.current.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: i * 0.1,
            ease: "power2.out",
          }
        );
      });
    }
  }, []);

  // ----------------------------------------------------
  // LIST OF SOFTWARES (unchanged)
  // ----------------------------------------------------
  const softwares = [
    { title: "CRM Software", desc: "AI-powered CRM for tracking leads and automating workflows." },
    { title: "Hospital Management System", desc: "Streamline operations and patient records digitally." },
    { title: "LMS Platform", desc: "Empowering e-learning with AI and real-time insights." },
    { title: "Billing & POS Software", desc: "Smart, cloud-connected billing with analytics." },
    { title: "ERP Suite", desc: "Unified control over finance, HR, and logistics." },
    { title: "Custom Cloud Solutions", desc: "Tailored systems built for scale and reliability." },
  ];

  return (
    <section
      id="software"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#010617] text-white py-24 px-8"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="bg-waves absolute inset-0 opacity-70"
          style={{
            background:
              "linear-gradient(120deg, rgba(0,255,255,0.15), rgba(147,51,234,0.15), rgba(59,130,246,0.15))",
            backgroundSize: "200% 200%",
            filter: "blur(90px)",
          }}
        />

        {/* MOBILE: remove particles completely */}
        {!isMobile && (
          <div className="absolute inset-0">
            {[...Array(30)].map((_, i) => (
              <span
                key={i}
                className="absolute w-1.5 h-1.5 rounded-full bg-cyan-400/40 animate-ping"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDuration: `${2 + Math.random() * 3}s`,
                  animationDelay: `${Math.random() * 2}s`,
                }}
              ></span>
            ))}
          </div>
        )}
      </div>

      {/* Heading */}
      <h1 className="text-5xl md:text-6xl font-extrabold mb-16 -mt-20 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-pink-500 drop-shadow-[0_0_30px_rgba(56,189,248,0.8)] relative z-20">
        Software Development
      </h1>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-12 max-w-7xl relative z-20 mt-15">
        {softwares.map((item, i) => (
          <div
            key={i}
            ref={(el) => (cardsRef.current[i] = el)}
            className="relative group bg-[#0f172a]/50 backdrop-blur-sm border border-white/10 rounded-3xl p-8 text-center shadow-lg transition-all duration-500 hover:scale-105 hover:-translate-y-3"
          >
            <h3 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-400">
              {item.title}
            </h3>
            <p className="text-gray-300 group-hover:text-white transition-colors duration-400">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
