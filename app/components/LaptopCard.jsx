// "use client";
// import { useEffect, useRef } from "react";
// import gsap from "gsap";

// export default function LaptopCard({ title, description }) {
//   const laptopRef = useRef(null);

//   useEffect(() => {
//     const el = laptopRef.current;

//     // Subtle entrance animation
//     gsap.fromTo(
//       el,
//       { opacity: 0, y: 80, rotateX: 25 },
//       { opacity: 1, y: 0, rotateX: 0, duration: 1.5, ease: "power3.out" }
//     );

//     // Floating animation
//     gsap.to(el, {
//       y: "-=10",
//       duration: 2,
//       repeat: -1,
//       yoyo: true,
//       ease: "sine.inOut",
//     });

//     // 3D Tilt effect
//     const handleMouseMove = (e) => {
//       const rect = el.getBoundingClientRect();
//       const x = e.clientX - rect.left - rect.width / 2;
//       const y = e.clientY - rect.top - rect.height / 2;
//       const rotateX = (y / rect.height) * -15;
//       const rotateY = (x / rect.width) * 15;

//       gsap.to(el, {
//         rotateX,
//         rotateY,
//         transformPerspective: 1000,
//         transformOrigin: "center",
//         duration: 0.4,
//         ease: "power2.out",
//       });
//     };

//     const resetTilt = () => {
//       gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.6, ease: "elastic.out(1, 0.3)" });
//     };

//     el.addEventListener("mousemove", handleMouseMove);
//     el.addEventListener("mouseleave", resetTilt);

//     return () => {
//       el.removeEventListener("mousemove", handleMouseMove);
//       el.removeEventListener("mouseleave", resetTilt);
//     };
//   }, []);

//   return (
//     <div
//       ref={laptopRef}
//       className="relative w-[320px] h-[220px] bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700 shadow-[0_0_40px_rgba(0,0,0,0.5)] transition-all duration-700"
//       style={{
//         transformStyle: "preserve-3d",
//       }}
//     >
//       {/* Screen Content */}
//       <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-indigo-600/10 to-purple-500/10 backdrop-blur-md p-6">
//         <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
//         <p className="text-gray-300 text-sm">{description}</p>
//       </div>

//       {/* Laptop Base */}
//       <div className="absolute bottom-[-12px] left-1/2 -translate-x-1/2 w-[90%] h-3 bg-gray-700 rounded-b-lg shadow-inner" />
//     </div>
//   );
// }
