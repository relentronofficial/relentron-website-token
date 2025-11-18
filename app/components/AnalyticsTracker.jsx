"use client";

import { useEffect } from "react";

export default function AnalyticsTracker() {
  useEffect(() => {
    if (!window.gtag) return;

    // Track scroll depth
    const handleScroll = () => {
      const scrolled =
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) *
        100;

      window.gtag("event", "scroll_depth", {
        event_category: "Engagement",
        value: Math.round(scrolled),
      });
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return null;
}
