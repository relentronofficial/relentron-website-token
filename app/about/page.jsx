"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;

    gsap.fromTo(
      section.querySelectorAll(".fade-up"),
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        stagger: 0.25,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
        },
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative min-h-screen flex flex-col items-center justify-center py-24 px-6 bg-[#0A0E17] text-white overflow-hidden"
    >
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-800/10 via-blue-900/10 to-gray-900/10 blur-[120px] opacity-40 pointer-events-none"></div>

      {/* Page Wrapper */}
      <div className="max-w-6xl mx-auto flex flex-col gap-24 md:gap-28">
        {/* Company Overview */}
        <div className="fade-up text-center md:text-left">
          <h1 className="text-5xl md:text-6xl font-bold mb-8 text-gray-100 text-center">
            Company Overview
          </h1>
          <div className="max-w-4xl mx-auto text-gray-300 text-lg md:text-xl leading-relaxed tracking-wide text-justify">
            <p className="mb-6">
              Relentron is a forward-thinking IT solutions company that provides
              comprehensive services in web development, software development,
              mobile app development, and digital marketing. We are a team of
              experienced professionals with diverse expertise across multiple
              domains, delivering end-to-end technology solutions that enable
              businesses to scale efficiently.
            </p>
            <p>
              Our goal is to empower organizations through innovation,
              automation, and strategic digital transformation. By combining
              strong technical knowledge with a results-driven approach, we help
              our clients achieve measurable business growth and long-term
              success.
            </p>
          </div>
        </div>

        {/* Mission */}
        <div className="fade-up text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-semibold mb-8 text-gray-100 text-center">
            Our Mission
          </h2>
          <div className="max-w-4xl mx-auto text-gray-300 text-lg md:text-xl leading-relaxed tracking-wide text-justify">
            <p className="mb-6">
              Our mission is to help businesses grow by leveraging the latest
              technologies and creative problem-solving to deliver impactful
              digital solutions. We strive to simplify complex challenges and
              create high-quality, scalable systems that drive performance,
              efficiency, and innovation.
            </p>
            <p>
              We are committed to building lasting relationships based on trust,
              transparency, and excellence — ensuring that every project we
              deliver adds tangible value to our clients and their customers.
            </p>
          </div>
        </div>

        {/* Vision */}
        <div className="fade-up text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-semibold mb-8 text-gray-100 text-center">
            Our Vision
          </h2>
          <div className="max-w-4xl mx-auto text-gray-300 text-lg md:text-xl leading-relaxed tracking-wide text-justify">
            <p className="mb-6">
              Our vision is to create a world where every business — regardless
              of size or industry — can harness the full potential of technology
              to innovate, compete, and thrive. We aspire to become a globally
              recognized technology partner, delivering reliable, secure, and
              future-ready solutions.
            </p>
            <p>
              Through continuous innovation and dedication to quality, we aim to
              redefine how businesses adopt digital transformation — ensuring
              our clients stay ahead in a rapidly evolving technological
              landscape.
            </p>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="fade-up w-40 h-[2px] mt-20 bg-gray-600 rounded-full"></div>
    </section>
  );
}
