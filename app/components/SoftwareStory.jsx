"use client";

import React, { useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Html, Stars } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";

// 🌟 Glowing animated center sphere
function GlowingCore() {
  const mesh = useRef();

  useEffect(() => {
    gsap.to(mesh.current.scale, {
      x: 1.2,
      y: 1.2,
      z: 1.2,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, []);

  return (
    <mesh ref={mesh}>
      <sphereGeometry args={[0.8, 64, 64]} />
      <meshStandardMaterial
        emissive={"#00ffff"}
        emissiveIntensity={3}
        metalness={0.9}
        roughness={0.2}
      />
    </mesh>
  );
}

// 💫 Orbit rings around the glowing core
function OrbitRings() {
  const ringCount = 4;
  const rings = Array.from({ length: ringCount });

  return rings.map((_, i) => (
    <mesh rotation={[Math.random(), Math.random(), 0]} key={i}>
      <torusGeometry args={[2 + i * 0.5, 0.01, 16, 100]} />
      <meshBasicMaterial color="#00ffff" transparent opacity={0.15} />
    </mesh>
  ));
}

// 🧊 Floating software cards with deterministic positioning
function FloatingCard({ text, color, delay, index }) {
  const ref = useRef();

  // ✅ Deterministic pseudo-random generator
  const pseudoRandom = (seed) => (Math.sin(seed * 9999) * 10000) % 1;

  // Generate consistent positions
  const posX = pseudoRandom(index * 2) * 6 - 3;
  const posZ = pseudoRandom(index * 2 + 1) * 6 - 3;

  useEffect(() => {
    gsap.to(ref.current.position, {
      y: 2,
      duration: 3 + delay,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay,
    });
    gsap.to(ref.current.rotation, {
      y: "+=6.283",
      duration: 12 + delay,
      repeat: -1,
      ease: "none",
    });
  }, [delay]);

  return (
    <mesh ref={ref} position={[posX, 0, posZ]}>
      <planeGeometry args={[1.8, 1.1]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={1.8}
        metalness={0.8}
        roughness={0.3}
      />
      <Html center>
        <div
          className="text-white text-sm font-semibold px-3 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 shadow-[0_0_25px_rgba(0,255,255,0.7)]"
          style={{
            whiteSpace: "nowrap",
            textShadow: "0 0 8px rgba(255,255,255,0.8)",
          }}
        >
          {text}
        </div>
      </Html>
    </mesh>
  );
}

// 🌌 The full 3D animation scene
function SoftwareScene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 0, 5]} intensity={2} color={"#00ffff"} />
      <Stars radius={60} depth={80} count={5000} factor={4} saturation={0} />
      <GlowingCore />
      <OrbitRings />

      {/* 🧠 Software Cards */}
      <FloatingCard text="CRM" color="#3b82f6" delay={0.2} index={1} />
      <FloatingCard text="HMS" color="#8b5cf6" delay={0.4} index={2} />
      <FloatingCard text="LMS" color="#06b6d4" delay={0.6} index={3} />
      <FloatingCard text="Billing Software" color="#f43f5e" delay={0.8} index={4} />
      <FloatingCard text="ERP" color="#14b8a6" delay={1.0} index={5} />
      <FloatingCard text="Inventory System" color="#a855f7" delay={1.2} index={6} />
      <FloatingCard text="E-Commerce Platform" color="#22d3ee" delay={1.4} index={7} />
    </>
  );
}

// 🚀 Main Component Section
export default function SoftwareDevelopment() {
  const containerRef = useRef();

  useEffect(() => {
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 80 },
      { opacity: 1, y: 0, duration: 2, ease: "power3.out" }
    );
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full bg-gradient-to-b from-black via-gray-900 to-gray-950 overflow-hidden flex flex-col justify-center items-center text-center"
    >
      <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 drop-shadow-[0_0_25px_rgba(0,255,255,0.7)] mb-4">
        Software Development
      </h1>
      <p className="text-gray-300 max-w-3xl px-6 text-lg mb-10">
        We build smart and scalable software solutions — CRM, HMS, LMS, ERP, Billing, and
        more — that streamline business workflows, automate processes, and boost
        productivity with the power of innovation.
      </p>

      <div className="w-full h-[70vh]">
        <Canvas camera={{ position: [0, 0, 7] }}>
          <SoftwareScene />
        </Canvas>
      </div>
    </section>
  );
}
