"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CalendlyEmbed({ url }: { url: string }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="h-[700px] w-full bg-zinc-900/50 animate-pulse rounded-2xl" />;

  const separator = url.includes('?') ? '&' : '?';
  // Standard params plus some additional ones to try and help the native embed
  const embedUrl = `${url}${separator}hide_landing_page_details=1&hide_gdpr_banner=1&background_color=000000&text_color=ffffff&primary_color=6366f1`;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="w-full h-[700px] rounded-2xl overflow-hidden border border-white/5 bg-black relative"
    >
      {/* 
        NOTE: Since Calendly Free accounts often ignore style parameters,
        we use CSS inversion to force a dark aesthetic. 
        This flips the white background to black and keeps brand colors relatively stable.
      */}
      <iframe
        src={embedUrl}
        width="100%"
        height="100%"
        frameBorder="0"
        title="Schedule a Call"
        style={{ filter: "invert(0.9) hue-rotate(180deg)" }}
        className="block"
      ></iframe>
    </motion.div>
  );
}
