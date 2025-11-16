"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import EnquiryForm from "../components/EnquiryForm";

gsap.registerPlugin(ScrollTrigger);

export default function PricingPlans() {
  useEffect(() => {
    gsap.fromTo(
      ".price-card",
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      }
    );
  }, []);

  const plans = [
    {
      title: "ESSENTIAL",
      subtitle: "Ideal for startups and micro-scale businesses",
      price: "₹3,999",
      features: [
        "Static landing Page + 4 pages",
        "Contact form integration",
        "Social media integration",
        "Google Maps Integration",
        "Free SSL certificate",
        "6 months maintenance",
        "1-year hosting + domain",
        "Daily backup & security",
        "Mobile-responsive design",
        "On-page SEO setup",
        "5 business mailboxes",
      ],
      gradient: "from-cyan-600 to-blue-700",
    },
    {
      title: "GROWTH PLUS",
      subtitle: "Best for brands ready to scale",
      price: "₹4,999",
      features: [
        "Premium UI/UX",
        "Dynamic sections",
        "Admin dashboard",
        "Contact form integration",
        "Social media integration",
        "Google Maps Integration",
        "Free SSL certificate",
        "6 months maintenance",
        "1-year hosting + domain",
        "Daily backup & security",
        "Responsive design",
        "On-page SEO setup",
        "5 business mailboxes",
      ],
      gradient: "from-blue-600 to-purple-700",
    },
    {
      title: "E-COMMERCE",
      subtitle: "Best for automation & online selling",
      price: "₹7,999",
      features: [
        "Full product store",
        "Payment gateway integration",
        "Product filters",
        "Image gallery",
        "Social media integration",
        "Daily backup & security",
        "Email marketing",
        "Free CDN",
        "Free SSL certificate",
        "6 months maintenance",
        "1-year hosting + domain",
        "On-page SEO setup",
      ],
      gradient: "from-purple-600 to-pink-600",
    },
  ];

  return (
    <main className="relative min-h-screen text-white overflow-hidden py-16 px-6">

      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#020617] via-[#0b1221] to-[#030712]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(56,189,248,0.05)_1px,transparent_1px),linear-gradient(0deg,rgba(56,189,248,0.05)_1px,transparent_1px)] bg-[size:80px_80px] opacity-10" />
      </div>

      {/* Header */}
      <motion.h2
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center text-3xl md:text-5xl font-extrabold mb-14 gpu"
      >
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500">
          Website Pricing Plans
        </span>
      </motion.h2>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            className={`price-card rounded-2xl bg-gradient-to-b ${plan.gradient} p-[2px] shadow-2xl gpu`}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 180, damping: 14 }}
          >
            <div className="bg-[#0f172a]/80 backdrop-blur-xl rounded-2xl p-6 flex flex-col justify-between h-full">
              <div>
                <h3 className="text-xl font-bold mb-2 text-center text-white">{plan.title}</h3>
                <p className="text-gray-300 text-center text-xs mb-4">{plan.subtitle}</p>
                <h4 className="text-3xl font-extrabold text-center text-cyan-400 mb-5">{plan.price}</h4>

                <ul className="text-gray-300 space-y-2 text-xs leading-relaxed mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-cyan-400 mt-1.5">✔</span> {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Enquiry Form */}
              <div className="flex justify-center items-center mt-4 pt-4">
                <div className="w-full max-w-xs">
                  <EnquiryForm floating={true} position="center" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* ⭐ DIRECTLY INSERTED CODE-BASED WEBSITE SECTION (NO IMPORT NEEDED) ⭐ */}
      {/* ------------------------------------------------------------------ */}

      <section className="py-20 px-6 bg-[#010617] text-white mt-24">
        <div className="max-w-6xl mx-auto">

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold text-center mb-12 
            text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500"
          >
            Code-Based Website Development
          </motion.h2>

          {/* Intro */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-gray-300 text-center max-w-3xl mx-auto mb-12"
          >
            Crafted with precision, performance and scalable architecture —
            custom-built websites designed for speed, security and long-term growth.
          </motion.p>

          {/* All Sections */}
          <div className="space-y-16">

            {/* Technical Specs */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="bg-[#0f172a]/50 border border-white/10 p-8 rounded-2xl backdrop-blur-md"
            >
              <h3 className="text-2xl font-bold mb-4 text-cyan-400">Technical Specifications</h3>

              <div className="grid md:grid-cols-2 gap-10">
                <div>
                  <h4 className="text-lg font-semibold mb-2">Frontend Development</h4>
                  <ul className="list-disc list-inside text-gray-300 space-y-1">
                    <li>Custom UI using HTML5, CSS3, JavaScript</li>
                    <li>React / Next.js modern frameworks</li>
                    <li>Responsive design</li>
                    <li>GSAP / Framer Motion animations</li>
                    <li>Cross-browser compatibility</li>
                    <li>Optimized asset loading</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-2">Backend Development</h4>
                  <ul className="list-disc list-inside text-gray-300 space-y-1">
                    <li>Next.js / Express / Laravel </li>
                    <li>REST API / GraphQL</li>
                    <li>Secure form handling</li>
                    <li>Cloud database (MongoDB / MySQL)</li>
                    <li>Authentication </li>
                    <li>Smart caching</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Deployment */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="bg-[#0f172a]/50 border border-white/10 p-8 rounded-2xl backdrop-blur-md"
            >
              <h3 className="text-2xl font-bold mb-4 text-cyan-400">Server & Deployment</h3>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>Cloud hosting (Vercel, AWS, DigitalOcean)</li>
                <li>SSL certificate included</li>
                <li>CDN global caching</li>
                <li>Automated backups</li>
                <li>High-performance optimization</li>
              </ul>
            </motion.div>

            {/* Core Features */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="bg-[#0f172a]/50 border border-white/10 p-8 rounded-2xl backdrop-blur-md"
            >
              <h3 className="text-2xl font-bold mb-4 text-cyan-400">Core Features</h3>

              <div className="grid md:grid-cols-2 gap-8">
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li>Custom branding & UI</li>
                  <li>Fast performance</li>
                  <li>High-level security</li>
                  <li>Mobile-first design</li>
                </ul>

                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li>SEO foundation</li>
                  <li>Admin panel (optional)</li>
                  <li>API integrations</li>
                  <li>Scalable architecture</li>
                </ul>
              </div>
            </motion.div>

            {/* Add-ons */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="bg-[#0f172a]/50 border border-white/10 p-8 rounded-2xl backdrop-blur-md"
            >
              <h3 className="text-2xl font-bold mb-4 text-cyan-400">Add-on Modules</h3>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>Blog system</li>
                <li>Product catalog</li>
                <li>E-commerce engine</li>
                <li>Lead management</li>
                <li>Payment gateway / WhatsApp API</li>
              </ul>
            </motion.div>

            {/* Why Choose */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="bg-[#0f172a]/50 border border-white/10 p-8 rounded-2xl backdrop-blur-md"
            >
              <h3 className="text-2xl font-bold mb-4 text-cyan-400">Why Choose a Code-Based Website?</h3>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>100% custom build</li>
                <li>Ultra-fast performance</li>
                <li>Higher security</li>
                <li>Better SEO results</li>
                <li>Future-proof scalability</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

    </main>
  );
}
