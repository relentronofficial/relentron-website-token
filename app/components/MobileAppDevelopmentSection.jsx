"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function MobileAppDevelopmentSection() {
  const sectionRef = useRef(null);
  const phoneRefs = useRef([]);
  const textRef = useRef(null);
  const stageTextRef = useRef(null);
  const gridRef = useRef(null);
  const [activePhone, setActivePhone] = useState(null);

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

  useEffect(() => {
    const section = sectionRef.current;
    const phonesEls = phoneRefs.current;
    const stageText = stageTextRef.current;

    gsap.fromTo(
      section,
      { opacity: 0, y: 80 },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 85%" },
      }
    );

    gsap.fromTo(
      phonesEls,
      { rotateY: 45, y: 100, opacity: 0, scale: 0.8 },
      {
        rotateY: 0,
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: "power3.out",
        stagger: 0.25,
        scrollTrigger: { trigger: section, start: "top 70%" },
      }
    );

    phonesEls.forEach((phone, i) => {
      gsap.to(phone, {
        y: "+=12",
        duration: 3 + i,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });

    const words = ["Ideate", "Design", "Develop", "Launch"];
    let currentIndex = 0;
    gsap.set(stageText, { opacity: 0, scale: 0.9, y: 30 });

    const animateText = () => {
      const nextWord = words[currentIndex % words.length];
      stageText.textContent = nextWord;

      gsap
        .timeline()
        .to(stageText, { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: "power3.out" })
        .to(stageText, {
          opacity: 0,
          scale: 0.9,
          y: -30,
          delay: 1.5,
          duration: 1.2,
          ease: "power3.in",
          onComplete: () => {
            currentIndex++;
            animateText();
          },
        });
    };
    animateText();

    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2;
      const y = (e.clientY / innerHeight - 0.5) * 2;

      phonesEls.forEach((phone, i) => {
        gsap.to(phone, {
          rotationY: x * 12,
          rotationX: -y * 12,
          x: x * 40 * (i - 1),
          y: y * 15,
          transformPerspective: 1000,
          duration: 0.6,
          ease: "power2.out",
        });
      });
    };

    section.addEventListener("mousemove", handleMouseMove);
    return () => section.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleExplore = (index) => setActivePhone(index);
  const handleClose = () => setActivePhone(null);

  return (
    <section
      ref={sectionRef}
      id="mobile-app"
      className="relative flex flex-col items-center justify-center overflow-visible pt-0 pb-20 bg-[#010617] min-h-[180vh] sm:min-h-[160vh] md:min-h-[140vh]"
    >
      {/* Ambient lights */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.25),transparent_70%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px] opacity-10" />
      <div
        ref={gridRef}
        className="absolute bottom-0 left-0 right-0 h-[400px] bg-[repeating-linear-gradient(transparent,transparent_25px,rgba(56,189,248,0.06)_26px),repeating-linear-gradient(90deg,transparent,transparent_25px,rgba(56,189,248,0.06)_26px)] transform rotateX-60 scale-150 origin-bottom opacity-25 pointer-events-none"
        style={{
          transformStyle: "preserve-3d",
          transformOrigin: "bottom",
          boxShadow: "0 0 50px rgba(56,189,248,0.06)",
        }}
      />

      {/* Header */}
      <div ref={textRef} className="z-20 text-center mt-2 mb-4">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 drop-shadow-[0_0_25px_rgba(56,189,248,0.5)]">
          Mobile App Development
        </h1>
        <p className="max-w-3xl mx-auto text-gray-300 text-lg leading-relaxed">
          Build futuristic apps that fuse design, intelligence, and performance — crafted for the next generation of digital experiences.
        </p>
      </div>

      {/* Looping Text */}
      <h2
        ref={stageTextRef}
        className="absolute top-[10%] sm:top-[14%] md:top-[18%] lg:top-[22%] text-4xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-500 drop-shadow-[0_0_25px_rgba(56,189,248,0.5)] opacity-0 pointer-events-none select-none z-30"
      >
        Ideate
      </h2>

      {/* Phones with SVG mockup frame */}
      <div className="relative flex flex-wrap md:flex-nowrap items-center justify-center gap-14 md:gap-24 z-10 perspective-[1000px] pt-20">
        {phones.map((item, i) => (
          <div
            key={i}
            ref={(el) => (phoneRefs.current[i] = el)}
            className="relative w-[300px] h-[600px] scale-65 md:scale-80 flex items-center justify-center transition-transform hover:scale-100"
          >
            {/* SVG Frame */}
            <svg
              viewBox="0 0 260 520"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute inset-0 w-full h-full z-20 pointer-events-none select-none"
            >
              <rect
                x="10"
                y="10"
                width="240"
                height="500"
                rx="35"
                ry="35"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="3"
                fill="none"
              />
              <circle cx="130" cy="25" r="4" fill="rgba(255,255,255,0.3)" />
            </svg>

            {/* Content area fits inside SVG screen */}
            <div className="absolute top-[7%] left-[7%] w-[86%] h-[86%] rounded-[1.4rem] bg-gradient-to-b from-gray-900 to-gray-800 border border-gray-700 shadow-[0_0_40px_rgba(0,0,0,0.5)] overflow-hidden backdrop-blur-md flex flex-col items-center justify-center text-center p-5">
              <div className={`absolute inset-0 rounded-[1.4rem] bg-gradient-to-br ${item.gradient} opacity-20 blur-2xl`} />
              <div className="relative z-10 flex flex-col items-center justify-center h-full px-3">
                <h3 className="text-2xl font-bold mb-3 text-white">{item.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-6">{item.desc}</p>
                <button
                  className="px-5 py-2 text-sm font-semibold rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 hover:shadow-[0_0_20px_rgba(147,51,234,0.4)] transition-all duration-500"
                  onClick={() => handleExplore(i)}
                >
                  Explore
                </button>
              </div>
            </div>

            {/* Expanded content */}
            {activePhone === i && (
              <div className="absolute inset-0 z-30 bg-gray-900/95 rounded-[2rem] p-6 flex flex-col justify-center items-center text-white">
                {item.content.map((c, idx) => (
                  <p key={idx} className="text-center text-lg mb-3">
                    {c}
                  </p>
                ))}
                <button
                  onClick={handleClose}
                  className="mt-4 px-5 py-2 text-sm font-semibold rounded-full bg-gradient-to-r from-gray-700 via-gray-900 to-black hover:shadow-[0_0_15px_rgba(255,255,255,0.4)] transition-all duration-500"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Glow Orbs */}
      <div className="absolute top-20 left-10 w-40 h-40 bg-cyan-400/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-24 right-10 w-56 h-56 bg-purple-500/25 rounded-full blur-3xl animate-pulse" />
    </section>
  );
}
