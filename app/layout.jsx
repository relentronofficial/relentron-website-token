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
        {/* reCAPTCHA */}
        <Script
          src="https://www.google.com/recaptcha/api.js"
          strategy="afterInteractive"
          async
          defer
        />

        {/* Google Analytics Loader */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="afterInteractive"
        />

        {/* Google Analytics Config */}
        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
              send_page_view: true
            });
          `}
        </Script>
      </head>

      <body className="bg-black text-white">
        <Navbar />
        <div className="pt-20">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
