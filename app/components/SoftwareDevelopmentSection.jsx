"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SoftwareDevelopment() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  const isMobile =
    typeof window !== "undefined" && window.innerWidth <= 768;

  // ------------------------------------------------------------
  // SOFT MOBILE OPTIMIZATION BEFORE ANYTHING RUNS
  // ------------------------------------------------------------
  useEffect(() => {
    if (!isMobile) return;

    const section = sectionRef.current;
    if (!section) return;

    // Remove blur (biggest lag reason)
    const bg = section.querySelector(".bg-waves");
    if (bg) bg.style.filter = "blur(0px)";

    // Light static gradient instead of animated
    if (bg) {
      bg.style.background =
        "linear-gradient(135deg, rgba(0,255,255,0.1), rgba(147,51,234,0.1))";
      bg.style.backgroundSize = "100% 100%";
    }

    // Remove hover scale transitions entirely
    cardsRef.current.forEach((card) => {
      card.style.transition = "none";
    });
  }, []);

  // ------------------------------------------------------------
  // Background Animation (DISABLED ON MOBILE!)
  // ------------------------------------------------------------
  useEffect(() => {
    if (isMobile) return; // no background animations on mobile

    const bg = sectionRef.current.querySelector(".bg-waves");
    if (!bg) return;

    gsap.to(bg, {
      backgroundPosition: "200% 0",
      duration: 20,
      repeat: -1,
      ease: "none",
    });
  }, []);

  // ------------------------------------------------------------
  // Cards + Heading Animation
  // ------------------------------------------------------------
  useEffect(() => {
    const section = sectionRef.current;
    const heading = section.querySelector("h1");

    if (isMobile) {
      // Light animation — no scroll trigger
      gsap.fromTo(
        heading,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power1.out" }
      );

      cardsRef.current.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            delay: i * 0.08,
            duration: 0.5,
            ease: "power1.out",
          }
        );
      });

      return;
    }

    // DESKTOP — full animations
    gsap.fromTo(
      heading,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
        },
      }
    );

    cardsRef.current.forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          delay: i * 0.15,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
          },
        }
      );
    });
  }, []);

  // ------------------------------------------------------------
  // List
  // ------------------------------------------------------------
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
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#010617] text-white py-24 px-6"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="bg-waves absolute inset-0 opacity-50"
          style={{
            background:
              "linear-gradient(120deg, rgba(0,255,255,0.15), rgba(147,51,234,0.15), rgba(59,130,246,0.15))",
            backgroundSize: "200% 200%",
            filter: "blur(50px)", // removed on mobile
            willChange: "transform",
          }}
        />

        {/* Desktop-only particles */}
        {!isMobile && (
          <div className="absolute inset-0">
            {[...Array(18)].map((_, i) => (
              <span
                key={i}
                className="absolute w-1.5 h-1.5 rounded-full bg-cyan-400/40 animate-ping"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDuration: `${2 + Math.random() * 3}s`,
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Heading */}
      <h1 className="text-5xl md:text-6xl font-extrabold mb-16 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-pink-500 relative z-20">
        Software Development
      </h1>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-10 max-w-6xl relative z-20">
        {softwares.map((item, i) => (
          <div
            key={i}
            ref={(el) => (cardsRef.current[i] = el)}
            className="relative bg-[#0f172a]/50 backdrop-blur-sm border border-white/10 rounded-3xl p-7 text-center shadow-lg"
            style={{
              willChange: "opacity, transform",
            }}
          >
            <h3 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-400">
              {item.title}
            </h3>
            <p className="text-gray-300">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
