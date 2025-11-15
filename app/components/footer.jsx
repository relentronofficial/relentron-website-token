"use client";
import { motion } from "framer-motion";
import {
  Mail,
  MapPin,
  Phone,
  Linkedin,
} from "lucide-react";

const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

export default function Footer() {
  return (
    <motion.footer
      initial={!isMobile ? { opacity: 0, y: 80 } : {}}
      whileInView={!isMobile ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.2, ease: "easeOut" }}
      viewport={{ once: true }}
      className="relative overflow-hidden bg-[#010617] text-gray-300 border-t border-white/10"
    >
      {/* 🌌 Desktop Only Heavy Effects */}
      {!isMobile && (
        <>
          {/* Radial Aura */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.15),transparent_70%)] blur-3xl opacity-70 animate-[pulse_6s_ease-in-out_infinite]" />

          {/* Conic Glow */}
          <div className="absolute inset-0 before:absolute before:inset-0 before:animate-[borderflow_12s_linear_infinite] before:bg-[conic-gradient(from_0deg,rgba(56,189,248,0.6),rgba(147,51,234,0.6),rgba(59,130,246,0.6),rgba(56,189,248,0.6))] before:blur-3xl before:opacity-40"></div>

          {/* Sweeping light */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.5, 0] }}
            transition={{ repeat: Infinity, duration: 8 }}
            className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent"
          />
        </>
      )}

      {/* 🌟 Lightweight MOBILE Background */}
      {isMobile && (
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-[#0b1221] to-[#020617] opacity-60" />
      )}

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 py-20 flex flex-col md:flex-row justify-between gap-14">
        
        {/* Brand */}
        <div className="space-y-4">
          <h2 className="text-4xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
            Relentron
          </h2>
          <p className="max-w-sm text-gray-400 text-sm leading-relaxed">
            Crafting visionary digital ecosystems with AI, design, and engineering excellence.
          </p>
        </div>

        {/* Links + Contact */}
        <div className="flex flex-col md:flex-row gap-10 md:gap-20">
          
          {/* Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-3 text-sm">
              {["About", "Services", "Projects", "Contact"].map((link, i) => (
                <li key={i}>
                  <a href={`#${link.toLowerCase()}`} className="hover:text-cyan-400 transition">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Connect</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Mail size={16} /> relentronofficial@gmail.com
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} /> +91 7010834661
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={16} /> Perambalur, India
              </li>
            </ul>
          </div>
        </div>

        {/* Social */}
        <div className="space-y-6">
          <h4 className="text-lg font-semibold text-white">Follow Us</h4>
          <div className="flex gap-5">
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/relentron-ai-39a947395"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-blue-600 hover:scale-110 transition-transform"
            >
              <Linkedin className="text-white" size={18} />
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/relentron"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-gradient-to-r from-pink-500 to-yellow-400 hover:scale-110 transition-transform"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.5 2h9A5.5 5.5 0 0122 7.5v9a5.5 5.5 0 01-5.5 5.5h-9A5.5 5.5 0 012 16.5v-9A5.5 5.5 0 017.5 2zM15 11.25a3 3 0 11-6 0 3 3 0 016 0zm3.75-4.5h.008v.008H18.75V6.75z"
                />
              </svg>
            </a>

            {/* Facebook */}
            <a
              href="https://www.facebook.com/share/1AZr3juTfZ/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-blue-700 hover:scale-110 transition-transform"
            >
              <svg
                fill="currentColor"
                className="w-5 h-5 text-white"
                viewBox="0 0 24 24"
              >
                <path d="M22.675 0h-21.35C.597 0 0 .597 0 1.325v21.351C0 23.403.597 24 1.325 24h11.49v-9.294H9.692v-3.622h3.123V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.464.099 2.795.143v3.24l-1.918.001c-1.504 0-1.794.715-1.794 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.403 24 24 23.403 24 22.675V1.325C24 .597 23.403 0 22.675 0z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="relative z-20 border-t border-white/10 py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} <span className="text-cyan-400 font-semibold">Relentron</span>.  
        All rights reserved.
        <div className="mt-3 flex justify-center gap-6 text-gray-400 text-xs">
          <a href="/privacy-policy" className="hover:text-cyan-400">Privacy Policy</a>
          <a href="/terms-and-conditions" className="hover:text-cyan-400">Terms & Conditions</a>
        </div>
      </div>

      {/* CSS Keyframes */}
      {!isMobile && (
        <style jsx>{`
          @keyframes borderflow {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
          @keyframes pulse {
            0%, 100% {
              opacity: 0.7;
              transform: scale(1);
            }
            50% {
              opacity: 0.9;
              transform: scale(1.05);
            }
          }
        `}</style>
      )}
    </motion.footer>
  );
}
