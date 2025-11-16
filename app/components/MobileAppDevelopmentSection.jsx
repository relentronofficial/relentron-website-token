"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function MobileAppDevelopmentSection() {
  const sectionRef = useRef(null);
  const phoneRefs = useRef([]);
  const stageTextRef = useRef(null);
  const [activePhone, setActivePhone] = useState(null);
  const [isDesktop, setIsDesktop] = useState(true);

  const phones = [
    {
      title: "iOS Brilliance",
      desc: "Premium iOS apps built with SwiftUI and the latest Apple design principles.",
      gradient: "from-blue-400 to-cyan-500",
      content: [
        "Immersive animations and micro-interactions.",
        "Sleek UI patterns optimized for engagement.",
        "Next-gen performance for smooth operation.",
      ],
    },
    {
      title: "Android Innovation",
      desc: "Scalable Android experiences leveraging Jetpack Compose and Material 3.",
      gradient: "from-green-400 to-emerald-500",
      content: [
        "Smart integrations with modern APIs.",
        "Fluid interactive transitions and motion.",
        "Responsive layouts for all devices.",
      ],
    },
    {
      title: "Cross-Platform Vision",
      desc: "Unified apps across platforms with high fidelity and visually stunning interfaces.",
      gradient: "from-purple-400 to-pink-500",
      content: [
        "Seamless experience across platforms.",
        "Premium motion and interactive feedback.",
        "Consistent UI/UX across devices.",
      ],
    },
  ];

  // used to store timeline so we can pause/resume
  const stageTlRef = useRef(null);

  useEffect(() => {
    const mm = ScrollTrigger.matchMedia();

    // Desktop (>= 768px)
    mm.add("(min-width: 768px)", () => {
      setIsDesktop(true);

      const section = sectionRef.current;
      const phonesEls = phoneRefs.current;

      // Entrance for whole section
      gsap.fromTo(
        section,
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 85%" },
        }
      );

      // Phones pop-in & float
      gsap.fromTo(
        phonesEls,
        { rotateY: 45, y: 100, opacity: 0, scale: 0.85 },
        {
          rotateY: 0,
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.4,
          ease: "power3.out",
          stagger: 0.2,
          scrollTrigger: { trigger: section, start: "top 70%" },
        }
      );

      phonesEls.forEach((phone, i) => {
        // slow y bob (light)
        gsap.to(phone, {
          y: "+=10",
          duration: 3 + i,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          overwrite: true,
        });
      });

      // mousemove parallax (desktop only)
      const handleMouseMove = (e) => {
        const { innerWidth, innerHeight } = window;
        const x = (e.clientX / innerWidth - 0.5) * 2;
        const y = (e.clientY / innerHeight - 0.5) * 2;

        phonesEls.forEach((phone, i) => {
          gsap.to(phone, {
            rotationY: x * 10,
            rotationX: -y * 8,
            x: x * 30 * (i - 1),
            y: y * 10,
            transformPerspective: 1000,
            duration: 0.6,
            ease: "power2.out",
            overwrite: true,
          });
        });
      };

      section.addEventListener("mousemove", handleMouseMove);

      // Stage text (looping words) — use timeline stored in ref
      const words = ["Ideate", "Design", "Develop", "Launch"];
      let idx = 0;
      const stageEl = stageTextRef.current;
      if (stageEl) {
        stageTlRef.current = gsap.timeline({ repeat: -1 });
        stageTlRef.current.to(stageEl, { opacity: 1, y: 0, scale: 1, duration: 0.9 });
        stageTlRef.current.to(stageEl, { opacity: 0, y: -30, scale: 0.9, duration: 0.9, delay: 1.2 });
        // We'll manually update text on repeat
        stageTlRef.current.eventCallback("onRepeat", () => {
          idx = (idx + 1) % words.length;
          stageEl.textContent = words[idx];
        });
        // Initialize text content
        stageEl.textContent = words[0];
        gsap.set(stageEl, { opacity: 0, y: 30, scale: 0.95 });
      }

      // Pause/resume stage timeline based on visibility
      const obs = new IntersectionObserver(
        (entries) => {
          const e = entries[0];
          if (stageTlRef.current) {
            if (e.isIntersecting) stageTlRef.current.play();
            else stageTlRef.current.pause();
          }
        },
        { root: null, threshold: 0.2 }
      );
      if (stageTextRef.current) obs.observe(stageTextRef.current);

      // clean-up for desktop
      return () => {
        section.removeEventListener("mousemove", handleMouseMove);
        if (stageTlRef.current) {
          stageTlRef.current.kill();
          stageTlRef.current = null;
        }
        obs.disconnect();
        // kill ScrollTrigger instances attached to this section
        ScrollTrigger.getAll().forEach((t) => {
          if (t.trigger === section || phonesEls.includes(t.trigger)) t.kill();
        });
      };
    });

    // Mobile (< 768px) — lightweight, carousel + reduced effects
    mm.add("(max-width: 767px)", () => {
      setIsDesktop(false);

      const section = sectionRef.current;

      // entrance (lighter)
      gsap.fromTo(
        section,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: { trigger: section, start: "top 90%" },
        }
      );

      // Keep stage text simple fade (no looping heavy timeline)
      if (stageTextRef.current) {
        gsap.fromTo(stageTextRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.9 });
      }

      // No mousemove, no floating infinite GSAP loops on mobile.
      // If any ScrollTrigger created for mobile it can be killed on cleanup.

      return () => {
        ScrollTrigger.getAll().forEach((t) => {
          if (t.trigger === section) t.kill();
        });
      };
    });

    // global cleanup of matchMedia
    return () => mm.revert();
  }, []);

  // Small helper: render phone card content (kept same markup as before)
  const PhoneCard = ({ item, index, mobileSize = false }) => (
    <div
      key={index}
      ref={(el) => (phoneRefs.current[index] = el)}
      className={`relative flex-shrink-0 ${mobileSize ? "w-[260px] h-[520px]" : "w-[300px] h-[600px]"} flex items-center justify-center transition-transform`}
    >
      <svg
        viewBox="0 0 260 520"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full z-20 pointer-events-none select-none"
      >
        <rect x="10" y="10" width="240" height="500" rx="35" ry="35" stroke="rgba(255,255,255,0.08)" strokeWidth="3" fill="none" />
        <circle cx="130" cy="25" r="4" fill="rgba(255,255,255,0.2)" />
      </svg>

      <div className="absolute top-[7%] left-[7%] w-[86%] h-[86%] rounded-[1.2rem] bg-gradient-to-b from-gray-900 to-gray-800 border border-gray-700 shadow-[0_0_30px_rgba(0,0,0,0.5)] overflow-hidden backdrop-blur-md flex flex-col items-center justify-center text-center p-4">
        <div className={`absolute inset-0 rounded-[1.2rem] bg-gradient-to-br ${item.gradient} opacity-20 blur-sm`} />
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-3">
          <h3 className="text-2xl font-bold mb-2 text-white">{item.title}</h3>
          <p className="text-gray-300 text-sm leading-relaxed mb-4">{item.desc}</p>
          <button
            className="px-4 py-2 text-sm font-semibold rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 hover:shadow-[0_0_12px_rgba(147,51,234,0.25)] transition-all"
            onClick={() => setActivePhone(index)}
          >
            Explore
          </button>
        </div>
      </div>

      {activePhone === index && (
        <div className="absolute inset-0 z-30 bg-gray-900/95 rounded-[1.4rem] p-6 flex flex-col justify-center items-center text-white">
          {item.content.map((c, idx) => (
            <p key={idx} className="text-center text-lg mb-3">
              {c}
            </p>
          ))}
          <button onClick={() => setActivePhone(null)} className="mt-4 px-4 py-2 rounded-full bg-gray-700/80">
            Close
          </button>
        </div>
      )}
    </div>
  );

  return (
    <section
      ref={sectionRef}
      id="mobile-app"
      className="relative flex flex-col items-center justify-center overflow-visible pt-8 pb-20 bg-[#010617]"
    >
      {/* Header */}
      <div className="z-20 text-center mt-2 mb-4 px-4">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 drop-shadow-[0_0_18px_rgba(56,189,248,0.45)]">
          Mobile App Development
        </h1>
        <p className="max-w-3xl mx-auto text-gray-300 text-sm sm:text-base leading-relaxed">
          Build futuristic apps that fuse design, intelligence, and performance — crafted for the next generation of digital experiences.
        </p>
      </div>

      {/* Desktop layout: side-by-side; Mobile: carousel */}
      <div className="relative z-10 w-full flex items-center justify-center pt-8">
        {/* Desktop grid (shown on md+) */}
        <div className="hidden md:flex flex-nowrap items-center justify-center gap-10">
          {phones.map((item, i) => (
            <div key={i}>{PhoneCard({ item, index: i, mobileSize: false })}</div>
          ))}
        </div>

        {/* Mobile carousel (smaller, swipeable) */}
        <div className="md:hidden w-full overflow-hidden">
          <motion.div
            className="flex gap-6 px-6 pb-6"
            drag="x"
            dragConstraints={{ left: -((phones.length - 1) * (260 + 24)), right: 0 }}
            dragElastic={0.15}
            whileTap={{ cursor: "grabbing" }}
            // snap to each card after drag end (soft snap)
            onDragEnd={(event, info) => {
              // simple snap: calculate index by x offset
              const cardWidth = 260 + 24; // card + gap
              const x = info.point.x - info.offset.x; // use offset for rough snap
              // we will not attempt perfect snap logic here; framer-snap not required
            }}
          >
            {phones.map((item, i) => (
              <div key={i}>{PhoneCard({ item, index: i, mobileSize: true })}</div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Soft decorative orbs (reduced intensity on mobile via tailwind) */}
      <div className="absolute top-24 left-6 w-36 h-36 bg-cyan-400/16 rounded-full blur-2xl animate-pulse hidden sm:block" />
      <div className="absolute bottom-20 right-6 w-48 h-48 bg-purple-500/12 rounded-full blur-2xl animate-pulse hidden sm:block" />
    </section>
  );
}
