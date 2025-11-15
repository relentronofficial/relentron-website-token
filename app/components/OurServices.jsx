"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { motion } from "framer-motion";

export default function OurServices() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 100 },
      { opacity: 1, y: 0, duration: 1.4, ease: "power3.out" }
    );

    gsap.fromTo(
      cardsRef.current,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        stagger: 0.25,
        delay: 0.6,
      }
    );
  }, []);

  return (
    <section
      id="Web"
      ref={sectionRef}
      className="relative  flex flex-col items-center justify-center px-15 py-30 bg-transparent text-white overflow-hidden"
    >
      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="text-5xl md:text-6xl font-extrabold mb-16 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 drop-shadow-[0_0_25px_rgba(56,189,248,0.6)] gpu"
      >
        Website Development
      </motion.h2>

      {/* Cards */}
      <div className="relative grid md:grid-cols-3 gap-10 w-full max-w-6xl">
        {[
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
        ].map((service, i) => (
          <motion.div
            key={i}
            ref={(el) => (cardsRef.current[i] = el)}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: i * 0.2 }}
            viewport={{ once: true }}
            whileHover={{
              scale: 1.05,
              rotateX: 3,
              rotateY: -3,
              boxShadow: "0px 10px 40px rgba(56,189,248,0.25)",
            }}
            className="relative group bg-[#0f172a]/50 rounded-2xl p-8 backdrop-blur-md border border-white/10 shadow-[0_0_25px_rgba(0,0,0,0.3)] cursor-pointer transition-transform gpu"
          >
            {/* Glow on Hover */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-cyan-500/20 via-blue-500/25 to-purple-500/20 blur-2xl gpu"
              animate={{ x: ["-100%", "100%"] }}
              transition={{
                duration: 4,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "mirror",
              }}
            />
            <div className="relative z-10 text-center space-y-4">
              <h3 className="text-2xl font-semibold text-cyan-300 group-hover:text-white transition-colors duration-500">
                {service.title}
              </h3>
              <p className="text-gray-300 text-sm group-hover:text-gray-100 transition-colors duration-500">
                {service.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
