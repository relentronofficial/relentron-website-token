"use client";

import React, { useRef, useEffect, Suspense, memo } from "react";
import { Canvas } from "@react-three/fiber";
import { Html, Stars } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";

/* ------------------------------
   GlowingCore (lowered segments)
   ------------------------------ */
function GlowingCore() {
  const mesh = useRef();

  useEffect(() => {
    if (!mesh.current) return;
    const tween = gsap.to(mesh.current.scale, {
      x: 1.15,
      y: 1.15,
      z: 1.15,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
    return () => tween.kill();
  }, []);

  return (
    <mesh ref={mesh}>
      {/* lowered geometry detail for perf */}
      <sphereGeometry args={[0.8, 32, 32]} />
      <meshStandardMaterial
        emissive={"#00ffff"}
        emissiveIntensity={2.2}
        metalness={0.85}
        roughness={0.25}
      />
    </mesh>
  );
}

/* ------------------------------
   OrbitRings (fewer segments)
   ------------------------------ */
function OrbitRings() {
  const ringCount = 3;
  return Array.from({ length: ringCount }).map((_, i) => (
    <mesh rotation={[Math.random(), Math.random(), 0]} key={i}>
      <torusGeometry args={[2 + i * 0.45, 0.012, 8, 64]} />
      <meshBasicMaterial color="#00ffff" transparent opacity={0.12} />
    </mesh>
  ));
}

/* -----------------------------------------------
   FloatingCard - memoized and deterministic pos
   ----------------------------------------------- */
const FloatingCard = memo(function FloatingCard({ text, color, delay, index }) {
  const ref = useRef();

  // deterministic pseudo-random generator (stable)
  const pseudoRandom = (seed) => {
    const x = Math.sin(seed * 9999) * 10000;
    return x - Math.floor(x);
  };

  const posX = pseudoRandom(index * 2) * 6 - 3;
  const posZ = pseudoRandom(index * 2 + 1) * 6 - 3;

  useEffect(() => {
    if (!ref.current) return;
    const t1 = gsap.to(ref.current.position, {
      y: 1.8,
      duration: 3 + delay,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay,
    });
    const t2 = gsap.to(ref.current.rotation, {
      y: "+=6.283",
      duration: 12 + delay,
      repeat: -1,
      ease: "none",
    });
    return () => {
      t1.kill();
      t2.kill();
    };
  }, [delay]);

  return (
    <mesh ref={ref} position={[posX, 0, posZ]}>
      <planeGeometry args={[1.6, 0.95]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.9}
        metalness={0.7}
        roughness={0.35}
      />
      <Html center>
        <div
          className="text-white text-sm font-semibold px-3 py-2 rounded-full"
          style={{
            whiteSpace: "nowrap",
            background:
              "linear-gradient(90deg, rgba(16,185,129,0.08), rgba(59,130,246,0.08))",
            backdropFilter: "blur(4px)",
            boxShadow: "0 6px 18px rgba(0,0,0,0.45)",
          }}
        >
          {text}
        </div>
      </Html>
    </mesh>
  );
});

/* ------------------------------
   Scene content
   ------------------------------ */
function SoftwareScene() {
  return (
    <>
      <ambientLight intensity={0.28} />
      <pointLight position={[0, 0, 5]} intensity={1.6} color={"#00ffff"} />

      {/* reduced stars for perf */}
      <Stars radius={50} depth={30} count={400} factor={2} saturation={0} fade={true} />

      <GlowingCore />
      <OrbitRings />

      <FloatingCard text="CRM" color="#3b82f6" delay={0.2} index={1} />
      <FloatingCard text="HMS" color="#8b5cf6" delay={0.5} index={2} />
      <FloatingCard text="LMS" color="#06b6d4" delay={0.8} index={3} />
      <FloatingCard text="Billing" color="#f43f5e" delay={1.1} index={4} />
      <FloatingCard text="ERP" color="#14b8a6" delay={1.4} index={5} />
      {/* fewer cards keeps scene lighter */}
    </>
  );
}

/* ------------------------------
   Main Component (responsive)
   ------------------------------ */
export default function SoftwareDevelopment() {
  const containerRef = useRef();

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full bg-gradient-to-b from-black via-gray-900 to-gray-950 overflow-hidden flex flex-col justify-center items-center text-center py-12"
    >
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 mb-3 drop-shadow-[0_0_18px_rgba(0,255,255,0.12)]">
        Software Development
      </h1>

      <p className="text-gray-300 max-w-3xl px-6 text-sm md:text-base mb-8">
        We build smart and scalable software — CRM, HMS, LMS, ERP, Billing, and more —
        that streamline processes and boost productivity.
      </p>

      <div className="w-full h-[70vh] md:h-[64vh] lg:h-[68vh] max-w-6xl">
        <Canvas
          camera={{ position: [0, 0, 7], fov: 45 }}
          dpr={[1, Math.min(typeof window !== "undefined" ? window.devicePixelRatio : 1.5, 1.5)]}
          gl={{
            antialias: false, // off for mobile perf
            powerPreference: "high-performance",
            toneMapping: THREE.ACESFilmicToneMapping,
          }}
          style={{ width: "100%", height: "100%" }}
        >
          <Suspense fallback={null}>
            <SoftwareScene />
          </Suspense>
        </Canvas>
      </div>
    </section>
  );
}
