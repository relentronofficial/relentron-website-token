"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SoftwareDevelopment() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const globeRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;

    // ----------------------------
    //  THREE.js Scene Setup
    // ----------------------------
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      40,
      window.innerWidth / window.innerHeight,
      0.1,
      500
    );
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    globeRef.current.appendChild(renderer.domElement);

    // Globe
    const globe = new THREE.Mesh(
      new THREE.SphereGeometry(2, 48, 48),
      new THREE.MeshPhongMaterial({
        color: 0x00ffff,
        emissive: 0x0088ff,
        emissiveIntensity: 0.0,
        transparent: true,
        opacity: 0.35,
        wireframe: true,
      })
    );
    globe.scale.set(0, 0, 0);
    scene.add(globe);

    // Rings
    const rings = [];
    for (let i = 0; i < 3; i++) {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(2.3 + i * 0.3, 0.01, 16, 90),
        new THREE.MeshBasicMaterial({
          color: 0x00ffff,
          transparent: true,
          opacity: 0,
        })
      );
      ring.rotation.x = Math.random() * Math.PI;
      ring.rotation.y = Math.random() * Math.PI;
      ring.scale.set(0, 0, 0);
      rings.push(ring);
      scene.add(ring);
    }

    // Soft lighting
    const ambient = new THREE.AmbientLight(0x66ffff, 0);
    const point = new THREE.PointLight(0x00ffff, 0);
    point.position.set(5, 5, 5);
    scene.add(ambient, point);

    // Particles
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(500 * 3);
    for (let i = 0; i < positions.length; i++) {
      positions[i] = (Math.random() - 0.5) * 14;
    }
    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0x00ffff,
      size: 0.035,
      transparent: true,
      opacity: 0,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // ----------------------------
    //  Mouse / Touch Controls
    // ----------------------------
    let mouseX = 0, mouseY = 0;
    let targetX = 0, targetY = 0;

    const moveHandler = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      targetX = x * 0.5;
      targetY = y * 0.3;
    };

    window.addEventListener("mousemove", moveHandler);

    // ----------------------------
    //  Animate (Optimized RAF)
    // ----------------------------
    const animate = () => {
      // Smooth rotation
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      globe.rotation.y = mouseX;
      globe.rotation.x = mouseY * 0.7;

      rings.forEach((r, i) => {
        r.rotation.y += 0.001 + i * 0.0005;
      });

      particles.rotation.y += 0.0006;

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    // ----------------------------
    //  GSAP Scroll Reveal
    // ----------------------------
    ScrollTrigger.create({
      trigger: section,
      start: "top 80%",
      once: true,
      onEnter: () => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.to(globe.scale, { x: 1, y: 1, z: 1, duration: 1.6 })
          .to(globe.material, { emissiveIntensity: 0.7, opacity: 0.55 }, "-=1")
          .to(ambient, { intensity: 0.6 }, "-=1")
          .to(point, { intensity: 1.2 }, "-=1");

        rings.forEach((ring, i) => {
          tl.to(
            ring.scale,
            { x: 1, y: 1, z: 1, duration: 1.2 },
            i * 0.2 + 0.2
          ).to(ring.material, { opacity: 0.4 }, i * 0.2 + 0.2);
        });

        tl.to(particleMat, { opacity: 0.6, duration: 1.4 }, "-=1");
      },
    });

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", moveHandler);
      renderer.dispose();
    };
  }, []);

  // ----------------------------
  //  Text + Cards Entry Animation
  // ----------------------------
  useEffect(() => {
    const section = sectionRef.current;

    gsap.fromTo(
      section.querySelector("h1"),
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1.4,
        ease: "power2.out",
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
          duration: 1.1,
          delay: i * 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 90%" },
        }
      );
    });
  }, []);

  // ----------------------------
  //  UI Content
  // ----------------------------
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
      <div ref={globeRef} className="absolute inset-0 z-0 opacity-80 pointer-events-none" />

      <h1 className="text-5xl md:text-6xl font-extrabold mb-16 -mt-20 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-pink-500 drop-shadow-[0_0_30px_rgba(56,189,248,0.8)] relative z-20">
        Software Development
      </h1>

      <div className="grid md:grid-cols-3 gap-12 max-w-7xl relative z-20 mt-15">
        {softwares.map((item, i) => (
          <div
            key={i}
            ref={(el) => (cardsRef.current[i] = el)}
            className="relative group bg-[#0f172a]/50 backdrop-blur-md border border-white/10 rounded-3xl p-8 text-center shadow-lg transition-all duration-500 hover:scale-105 hover:-translate-y-3"
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
