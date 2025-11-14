"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lottie from "lottie-react";
import marketingAnimation from "../assets/ass-marketing.json"; // ✅ Adjust path if needed

gsap.registerPlugin(ScrollTrigger);

export default function DigitalMarketingSection() {
  const sectionRef = useRef(null);
  const glowRef = useRef(null);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const section = sectionRef.current;

    // ✨ Fade + scale animation
    const ctx = gsap.context(() => {
      gsap.fromTo(
        section,
        { opacity: 0, scale: 0.96 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, section);

    // 🌌 Floating particles
    const N = 25;
    const generated = Array.from({ length: N }).map((_, i) => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 2}s`,
      duration: `${2 + Math.random() * 2}s`,
      id: `p-${i}-${Date.now()}`,
    }));
    setParticles(generated);

    // 💫 Glowing sweep
    if (glowRef.current) {
      gsap.to(glowRef.current, {
        xPercent: 100,
        repeat: -1,
        duration: 6,
        ease: "power1.inOut",
        yoyo: true,
      });
    }

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="digital-marketing"
      className="relative min-h-screen flex flex-col items-center justify-center py-24 px-6 text-white overflow-hidden bg-[#010617]"
    >
      {/* 💫 Moving glow sweep */}
      <div
        ref={glowRef}
        className="absolute top-0 left-[-40%] w-[40%] h-full bg-gradient-to-r from-blue-500/20 via-pink-500/20 to-transparent blur-[120px]"
        style={{ mixBlendMode: "screen" }}
      />

      {/* 🌈 Heading */}
      <h1 className="text-5xl md:text-6xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-pink-400 text-center drop-shadow-[0_0_25px_rgba(56,189,248,0.6)]">
        Digital Marketing Services
      </h1>

      {/* 📜 Description */}
      <p className="max-w-2xl text-center text-gray-300 mb-16">
        Unlock your brand’s full potential with data-driven strategies that
        combine creativity, analytics, and automation for maximum impact.
      </p>

      {/* 💼 Main Layout */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-10 w-full max-w-7xl mx-auto">
        {/* 🎬 LEFT — Lottie Animation */}
        <div className="flex items-center justify-center w-full md:w-[45%] lg:w-[45%] -ml-10">
          <Lottie
            animationData={marketingAnimation}
            loop
            autoplay
            className="w-[400px] md:w-[550px] lg:w-[700px] drop-shadow-[0_0_30px_rgba(56,189,248,0.4)]"
          />
        </div>

        {/* 📈 RIGHT — Service Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 w-full md:w-[55%] justify-items-center">
          {[
            {
              title: "Social Media Marketing",
              desc: "Build brand awareness and engagement with creative campaigns across Instagram, Facebook, and LinkedIn.",
              gradient: "from-blue-400 to-cyan-400",
            },
            {
              title: "Google Ads (PPC Management)",
              desc: "Drive targeted traffic and maximize ROI through strategic keyword bidding and audience segmentation.",
              gradient: "from-yellow-400 to-orange-500",
            },
            {
              title: "Email Marketing",
              desc: "Automate and personalize email campaigns to nurture leads, boost sales, and retain loyal customers.",
              gradient: "from-pink-400 to-fuchsia-500",
            },
            {
              title: "SEO Optimization",
              desc: "Enhance your website’s visibility and ranking with technical SEO, backlinks, and content optimization.",
              gradient: "from-green-400 to-emerald-500",
            },
            {
              title: "Content Marketing",
              desc: "Craft compelling content that connects with your audience and strengthens your online authority.",
              gradient: "from-purple-400 to-indigo-500",
              center: true,
            },
          ].map((item, i) => (
            <div
              key={i}
              className={`relative w-full max-w-[320px] sm:max-w-[360px] rounded-2xl p-[1px] bg-gradient-to-r ${item.gradient} 
                shadow-[0_0_25px_rgba(56,189,248,0.3)] hover:shadow-[0_0_40px_rgba(56,189,248,0.5)] 
                transition-all duration-700 ${
                  item.center ? "sm:col-span-2 sm:justify-self-center" : ""
                }`}
            >
              <div className="bg-[#0b0f1a] rounded-2xl p-6 h-full flex flex-col justify-center hover:translate-y-[-5px] transition-transform duration-700">
                <h3 className="text-2xl font-bold text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 🌠 Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((p) => (
          <span
            key={p.id}
            className="absolute w-1.5 h-1.5 rounded-full opacity-70 animate-ping"
            style={{
              top: p.top,
              left: p.left,
              background:
                "linear-gradient(90deg, rgba(59,130,246,1) 0%, rgba(236,72,153,1) 100%)",
              animationDelay: p.delay,
              animationDuration: p.duration,
            }}
          />
        ))}
      </div>
    </section>
  );
}
