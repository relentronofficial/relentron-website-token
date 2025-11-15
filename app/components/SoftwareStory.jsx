"use client";

import React, { useRef, useEffect, Suspense, useState, memo } from "react";
import { Canvas } from "@react-three/fiber";
import { Html, Stars } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";

/* -------------------------
   Device & perf helpers
   ------------------------- */
const isBrowser = typeof window !== "undefined";

const isMobile = () =>
  isBrowser && /Mobi|Android|iPhone|iPad|iPod|Opera Mini|IEMobile/i.test(navigator.userAgent);

const prefersReducedMotion = () =>
  isBrowser && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const saveDataMode = () =>
  isBrowser && navigator.connection && (navigator.connection.saveData || navigator.connection.saveData === true);

/* -------------------------
   Glowing core (lightweight)
   ------------------------- */
function GlowingCore() {
  const mesh = useRef();

  useEffect(() => {
    if (!mesh.current || prefersReducedMotion()) return;
    const tween = gsap.to(mesh.current.scale, {
      x: 1.12,
      y: 1.12,
      z: 1.12,
      duration: 2.2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
    return () => tween.kill();
  }, []);

  return (
    <mesh ref={mesh}>
      <sphereGeometry args={[0.75, isMobile() ? 20 : 32, isMobile() ? 20 : 32]} />
      <meshStandardMaterial
        emissive={"#00eaff"}
        emissiveIntensity={isMobile() ? 1.6 : 2.2}
        metalness={0.55}
        roughness={0.28}
      />
    </mesh>
  );
}

/* -------------------------
   Orbit rings (simple)
   ------------------------- */
function OrbitRings() {
  const rings = [0, 1, 2];
  return rings.map((i) => (
    <mesh rotation={[Math.random(), Math.random(), 0]} key={i}>
      <torusGeometry args={[2 + i * 0.45, 0.012, 8, 64]} />
      <meshBasicMaterial color="#00ffff" transparent opacity={0.08} />
    </mesh>
  ));
}

/* -------------------------
   FloatingCard (memo)
   ------------------------- */
const FloatingCard = memo(function FloatingCard({ text, color, delay, index }) {
  const ref = useRef();

  // deterministic pseudo-random consistent positions
  const prng = (seed) => {
    const x = Math.sin(seed * 98765.4321) * 10000;
    return x - Math.floor(x);
  };

  const posX = prng(index * 1.23) * 5 - 2.4;
  const posZ = prng(index * 2.17 + 0.5) * 5 - 2.4;

  useEffect(() => {
    if (!ref.current || prefersReducedMotion()) return;
    const float = gsap.to(ref.current.position, {
      y: 1.6,
      duration: 3 + delay,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay,
    });
    const rot = gsap.to(ref.current.rotation, {
      y: "+=6.283",
      duration: 12 + delay,
      repeat: -1,
      ease: "none",
    });
    return () => {
      float.kill();
      rot.kill();
    };
  }, [delay]);

  return (
    <mesh ref={ref} position={[posX, 0, posZ]}>
      <planeGeometry args={[1.55, 0.95]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} metalness={0.6} roughness={0.33} />
      <Html center>
        <div
          className="text-white text-sm font-semibold px-3 py-2 rounded-full"
          style={{
            whiteSpace: "nowrap",
            background: "linear-gradient(90deg, rgba(16,185,129,0.06), rgba(59,130,246,0.06))",
            backdropFilter: "blur(4px)",
            boxShadow: "0 6px 18px rgba(0,0,0,0.35)",
          }}
        >
          {text}
        </div>
      </Html>
    </mesh>
  );
});

/* -------------------------
   3D Scene
   ------------------------- */
function FuturisticScene() {
  return (
    <>
      <ambientLight intensity={0.26} />
      <pointLight position={[0, 0, 5]} intensity={1.4} color={"#00eaff"} />

      <Stars
        radius={50}
        depth={30}
        count={isMobile() ? 160 : 420}
        factor={2}
        saturation={0}
        fade
      />

      <GlowingCore />
      <OrbitRings />

      <FloatingCard text="CRM" color="#3b82f6" delay={0.2} index={1} />
      <FloatingCard text="HMS" color="#a855f7" delay={0.5} index={2} />
      <FloatingCard text="LMS" color="#06b6d4" delay={0.8} index={3} />
      <FloatingCard text="Billing" color="#f43f5e" delay={1.1} index={4} />
      <FloatingCard text="ERP" color="#14b8a6" delay={1.4} index={5} />
    </>
  );
}

/* -------------------------
   Main Component
   ------------------------- */
export default function SoftwareDevelopment() {
  const containerRef = useRef();
  const [mount3D, setMount3D] = useState(false);

  // lazy mount canvas when section is near viewport
  useEffect(() => {
    if (!isBrowser) {
      setMount3D(false);
      return;
    }

    // If user requests reduced motion or save-data, skip heavy 3D
    if (prefersReducedMotion() || saveDataMode() || isMobile()) {
      setMount3D(false);
      return;
    }

    const el = containerRef.current;
    if (!el) {
      setMount3D(true);
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setMount3D(true);
          obs.disconnect();
        }
      },
      { rootMargin: "300px" } // pre-mount slightly before visible
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // small entrance animation for the wrapper (lightweight)
  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.1, ease: "power3.out" }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  // fallback image path (place in /public)
  const fallbackSrc = "/software-fallback.png";

  return (
    <section
      ref={containerRef}
      id="software"
      className="relative min-h-screen w-full bg-gradient-to-b from-black via-gray-900 to-gray-950 overflow-hidden flex flex-col justify-center items-center text-center py-16"
    >
      <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 mb-4">
        Software Development
      </h1>

      <p className="text-gray-300 max-w-3xl px-6 text-sm md:text-base mb-10">
        We build smart and scalable software — CRM, HMS, LMS, ERP, Billing, and more —
        engineered for speed, automation, and high performance.
      </p>

      <div className="w-full h-[70vh] md:h-[64vh] lg:h-[72vh] max-w-6xl">
        {mount3D ? (
          <Canvas
            camera={{ position: [0, 0, 7], fov: 45 }}
            dpr={
              isMobile()
                ? 1
                : [1, Math.min(isBrowser ? window.devicePixelRatio || 1 : 1, 1.4)]
            }
            gl={{
              antialias: false, // simpler for perf
              powerPreference: "high-performance",
              toneMapping: THREE.ACESFilmicToneMapping,
            }}
            style={{ width: "100%", height: "100%" }}
          >
            <Suspense fallback={null}>
              <FuturisticScene />
            </Suspense>
          </Canvas>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <img
              src={fallbackSrc}
              alt="Software illustration"
              className="w-56 md:w-80 opacity-80 select-none pointer-events-none"
            />
          </div>
        )}
      </div>
    </section>
  );
}
