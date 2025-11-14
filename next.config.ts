import type { NextConfig } from "next";
import withPWA from "next-pwa";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  async headers() {
    return [
      // ✅ Cache static assets long-term
      {
        source: "/_next/static/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },

      // ✅ Secure headers for all routes
      {
        source: "/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=3600, stale-while-revalidate=59",
          },
          {
            key: "Content-Security-Policy",
            value: `
              default-src 'self';
              script-src 
                'self' 
                'unsafe-inline' 
                'unsafe-eval' 
                https://www.google.com 
                https://www.gstatic.com 
                https://www.recaptcha.net 
                https://www.googletagmanager.com 
                https://www.google-analytics.com 
                https://connect.facebook.net 
                https://static.xx.fbcdn.net;
              style-src 'self' 'unsafe-inline' https:;
              img-src 
                'self' 
                data: 
                blob: 
                https://www.google.com 
                https://www.gstatic.com 
                https://www.google-analytics.com 
                https://www.googletagmanager.com 
                https://connect.facebook.net 
                https://static.xx.fbcdn.net;
              frame-src 
                https://www.google.com 
                https://www.gstatic.com 
                https://www.recaptcha.net 
                https://www.googletagmanager.com 
                https://connect.facebook.net;
              font-src 'self' data: https:;
              connect-src 
                'self' 
                https://www.google.com 
                https://www.gstatic.com 
                https://www.recaptcha.net 
                https://api.whatsapp.com 
                https://graph.facebook.com 
                https://*.googleapis.com 
                https://*.vercel-insights.com 
                https://www.google-analytics.com 
                https://www.googletagmanager.com 
                https://connect.facebook.net;
            `.replace(/\s{2,}/g, " "),
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // ✅ SAMEORIGIN needed for Google reCAPTCHA and analytics iframes
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
        ],
      },
    ];
  },

  poweredByHeader: false,
  compress: true,

  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  },
};

export default withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development", // Disable PWA in dev mode
})(nextConfig);
