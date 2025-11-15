"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function OurServices() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
        }
      );

      gsap.fromTo(
        cardsRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power2.out",
          stagger: 0.2,
          delay: 0.2,
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const services = [
    {
      title: "Modern UI/UX Design",
      desc: "We craft visually stunning, responsive websites that blend art with functionality — designed to convert and captivate.",
    },
    {
      title: "Custom Web Solutions",
      desc: "From business websites to advanced web applications, we build tailored solutions powered by modern tech stacks — ensuring speed, security, and scalability.",
    },
    {
      title: "Interactive Animations",
      desc: "We bring your brand to life with cinematic motion, fluid transitions, and immersive interactions that feel alive and intuitive.",
    },
  ];

  return (
    <section
      id="Web"
      ref={sectionRef}
      className="relative flex flex-col items-center justify-center px-10 py-24 text-white overflow-hidden"
    >
      {/* Title */}
      <h2
        className="text-5xl md:text-6xl font-extrabold mb-16 
        text-transparent bg-clip-text 
        bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500
        drop-shadow-[0_0_25px_rgba(56,189,248,0.6)] gpu"
      >
        Website Development
      </h2>

      {/* Cards */}
      <div className="relative grid md:grid-cols-3 gap-10 w-full max-w-6xl">
        {services.map((service, i) => (
          <div
            key={i}
            ref={(el) => (cardsRef.current[i] = el)}
            className="relative group bg-[#0f172a]/50 rounded-2xl p-8 
            backdrop-blur-sm md:backdrop-blur-md 
            border border-white/10 
            shadow-xl cursor-pointer 
            transition-all duration-300 gpu 
            hover:scale-[1.03]"
          >
            {/* Glow Effect */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-80 
              bg-gradient-to-r from-cyan-500/20 via-blue-500/25 to-purple-500/20 
              blur-lg transition-all duration-500 pointer-events-none"
            />

            <div className="relative z-10 text-center space-y-4">
              <h3 className="text-2xl font-semibold text-cyan-300 
                group-hover:text-white transition-colors duration-300">
                {service.title}
              </h3>

              <p className="text-gray-300 text-sm 
                group-hover:text-gray-100 transition-colors duration-300">
                {service.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
