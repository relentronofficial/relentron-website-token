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

    // === 3D Scene Setup ===
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 8);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    globeRef.current.appendChild(renderer.domElement);

    const globeGeo = new THREE.SphereGeometry(2, 64, 64);
    const globeMat = new THREE.MeshPhongMaterial({
      color: 0x00ffff,
      emissive: 0x00ccff,
      emissiveIntensity: 0.0,
      transparent: true,
      opacity: 0.3,
      wireframe: true,
    });
    const globe = new THREE.Mesh(globeGeo, globeMat);
    globe.scale.set(0, 0, 0);
    scene.add(globe);

    const rings = [];
    for (let i = 0; i < 4; i++) {
      const ringGeo = new THREE.TorusGeometry(2.4 + i * 0.3, 0.008, 16, 100);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x00ffff,
        wireframe: true,
        transparent: true,
        opacity: 0,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.random() * Math.PI;
      ring.rotation.y = Math.random() * Math.PI;
      ring.scale.set(0, 0, 0);
      scene.add(ring);
      rings.push(ring);
    }

    const ambientLight = new THREE.AmbientLight(0x66ffff, 0);
    const pointLight = new THREE.PointLight(0x00ffff, 0);
    pointLight.position.set(5, 5, 5);
    scene.add(ambientLight, pointLight);

    const particleGeo = new THREE.BufferGeometry();
    const particleCount = 700;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 14;
    }
    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x00ffff,
      size: 0.05,
      transparent: true,
      opacity: 0,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // === Interaction Logic ===
    let isDragging = false;
    let prevMouse = { x: 0, y: 0 };
    let velocity = { x: 0, y: 0 };
    let cursorRotation = { x: 0, y: 0 };

    const handleMouseMove = (e) => {
      if (isDragging) {
        const dx = e.clientX - prevMouse.x;
        const dy = e.clientY - prevMouse.y;
        globe.rotation.y += dx * 0.005;
        globe.rotation.x += dy * 0.005;
        velocity.x = dx;
        velocity.y = dy;
        prevMouse = { x: e.clientX, y: e.clientY };
      } else {
        const normalizedX = (e.clientX / window.innerWidth) * 2 - 1;
        const normalizedY = (e.clientY / window.innerHeight) * 2 - 1;
        cursorRotation.x = normalizedY * 0.4;
        cursorRotation.y = normalizedX * 0.6;
      }
    };

    const handleMouseDown = (e) => {
      isDragging = true;
      prevMouse = { x: e.clientX, y: e.clientY };
    };
    const handleMouseUp = () => (isDragging = false);
    const handleTouchStart = (e) => {
      isDragging = true;
      prevMouse = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };
    const handleTouchMove = (e) => {
      if (!isDragging) return;
      const dx = e.touches[0].clientX - prevMouse.x;
      const dy = e.touches[0].clientY - prevMouse.y;
      globe.rotation.y += dx * 0.005;
      globe.rotation.x += dy * 0.005;
      velocity.x = dx;
      velocity.y = dy;
      prevMouse = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };
    const handleTouchEnd = () => (isDragging = false);

    const animate = () => {
      globe.rotation.y += velocity.x * 0.01;
      globe.rotation.x += velocity.y * 0.01;
      velocity.x *= 0.95;
      velocity.y *= 0.95;
      if (!isDragging) {
        globe.rotation.x += (cursorRotation.x - globe.rotation.x) * 0.05;
        globe.rotation.y += (cursorRotation.y - globe.rotation.y) * 0.05;
      }
      rings.forEach((r, i) => {
        r.rotation.y += 0.0015 + i * 0.0004;
        r.rotation.x += 0.0008;
      });
      particles.rotation.y += 0.0008;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    ScrollTrigger.create({
      trigger: section,
      start: "top 80%",
      once: true,
      onEnter: () => {
        const tl = gsap.timeline();
        tl.to(globe.scale, { x: 1, y: 1, z: 1, duration: 1.8, ease: "power4.out" })
          .to(globeMat, { emissiveIntensity: 0.8, opacity: 0.6, duration: 1.2 }, "-=1")
          .to(ambientLight, { intensity: 0.8, duration: 1.2 }, "-=1")
          .to(pointLight, { intensity: 1.4, duration: 1.2 }, "-=1");

        rings.forEach((ring, i) => {
          tl.to(
            ring.scale,
            { x: 1, y: 1, z: 1, duration: 1.3, ease: "back.out(1.7)" },
            i * 0.2 + 0.3
          ).to(
            ring.material,
            { opacity: 0.5, duration: 1, ease: "sine.inOut" },
            i * 0.2 + 0.3
          );
        });

        tl.to(particleMat, { opacity: 0.8, duration: 1.5, ease: "sine.inOut" }, "-=1");
      },
    });

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      renderer.dispose();
    };
  }, []);

  // === Text and Cards Animation ===
  useEffect(() => {
    const section = sectionRef.current;
    gsap.fromTo(
      section.querySelector("h1"),
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 2,
        ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 85%" },
      }
    );

    cardsRef.current.forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 100, scale: 0.8, rotateY: 45 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateY: 0,
          duration: 1.4,
          delay: i * 0.25,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 90%" },
        }
      );
    });
  }, []);

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
      {/* Background Layers */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.15),transparent_70%)] blur-3xl" />
      <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:60px_60px] opacity-10" />

      {/* Top and Bottom Blending Gradients */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/40 via-black/10 to-transparent z-10 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/40 via-black/10 to-transparent z-10 pointer-events-none"></div>

      <div ref={globeRef} className="absolute inset-0 z-0 flex items-center justify-center pointer-events-auto opacity-80" />

      <h1 className="text-5xl md:text-6xl font-extrabold mb-16 -mt-20 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-pink-500 drop-shadow-[0_0_30px_rgba(56,189,248,0.8)] relative z-20">
        Software Development
      </h1>

      <div className="grid md:grid-cols-3 gap-12 max-w-7xl relative z-20 mt-15">
        {softwares.map((item, i) => (
          <div
            key={i}
            ref={(el) => (cardsRef.current[i] = el)}
            className="relative group bg-[#0f172a]/50 backdrop-blur-md border border-white/10 rounded-3xl p-8 text-center shadow-[0_0_40px_rgba(0,0,0,0.4)] transition-all duration-700 hover:scale-110 hover:-translate-y-4 hover:shadow-[0_0_80px_rgba(56,189,248,0.5)]"
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-600 via-cyan-400 to-pink-500 opacity-0 group-hover:opacity-40 blur-2xl transition-all duration-700"></div>
            <h3 className="relative text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-400">
              {item.title}
            </h3>
            <p className="relative text-gray-300 group-hover:text-white leading-relaxed transition-all duration-500">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
