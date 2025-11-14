export const revalidate = 86400;

import "./globals.css";
import Navbar from "../app/components/navbar";
import Footer from "../app/components/footer";
import Script from "next/script";


export const metadata = {
  title: "Relentron",
  description: "Building the Future of Tech",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* ✅ Google reCAPTCHA global script */}
        <Script
          src="https://www.google.com/recaptcha/api.js"
          strategy="afterInteractive"
          async
          defer
        />
      </head>
      <body className="bg-black text-white">
        <Navbar />
        <div className="pt-20">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
