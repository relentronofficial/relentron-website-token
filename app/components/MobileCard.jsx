// "use client";
// import { useEffect, useRef } from "react";
// import gsap from "gsap";

// export default function MobileCard() {
//   const cardRef = useRef(null);

//   useEffect(() => {
//     const card = cardRef.current;

//     // Initial float-in animation
//     gsap.fromTo(
//       card,
//       { y: 100, opacity: 0, rotateY: -45 },
//       { y: 0, opacity: 1, rotateY: 0, duration: 2, ease: "power3.out" }
//     );

//     // Floating effect
//     gsap.to(card, {
//       y: "-=15",
//       duration: 2.5,
//       repeat: -1,
//       yoyo: true,
//       ease: "sine.inOut",
//     });

//     // Mouse tilt 3D effect
//     const handleMouseMove = (e) => {
//       const rect = card.getBoundingClientRect();
//       const x = e.clientX - rect.left - rect.width / 2;
//       const y = e.clientY - rect.top - rect.height / 2;
//       const rotateX = (y / rect.height) * -20;
//       const rotateY = (x / rect.width) * 20;

//       gsap.to(card, {
//         rotateX,
//         rotateY,
//         transformPerspective: 1000,
//         transformOrigin: "center",
//         duration: 0.3,
//         ease: "power2.out",
//       });
//     };

//     const resetTilt = () => {
//       gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.6, ease: "elastic.out(1, 0.3)" });
//     };

//     card.addEventListener("mousemove", handleMouseMove);
//     card.addEventListener("mouseleave", resetTilt);

//     return () => {
//       card.removeEventListener("mousemove", handleMouseMove);
//       card.removeEventListener("mouseleave", resetTilt);
//     };
//   }, []);

//   return (
//     <div
//       ref={cardRef}
//       className="relative w-[260px] h-[500px] rounded-[2rem] bg-gradient-to-br from-[#1e293b] via-[#0f172a] to-[#020617] shadow-[0_0_40px_rgba(0,0,0,0.6)] border border-gray-700 transition-all duration-700"
//       style={{
//         transformStyle: "preserve-3d",
//       }}
//     >
//       {/* Top Notch */}
//       <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-4 bg-gray-700 rounded-full" />

//       {/* Mobile Content */}
//       <div className="relative z-10 flex flex-col items-center justify-center text-center h-full p-6">
//         <h2 className="text-xl font-bold text-white mb-2">Social Media Marketing</h2>
//         <p className="text-gray-300 text-sm mb-4">
//           Create viral social media campaigns that attract followers and boost
//           engagement across all major platforms.
//         </p>
//         <button className="mt-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-5 py-2 rounded-full text-sm shadow-lg hover:shadow-[0_0_15px_#db2777] transition">
//           Explore More
//         </button>
//       </div>

//       {/* Highlight Overlay */}
//       <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-tr from-transparent to-white/10 pointer-events-none" />
//     </div>
//   );
// }
