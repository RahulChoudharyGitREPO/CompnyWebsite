"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export default function AIAssistant() {
  const whatsappLink = "https://wa.me/919693975542?text=Hello%20GigtechOrbit%2C%20I%20have%20a%20question%20about%20your%20services.";

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center justify-center">
      {/* Glowing aura */}
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute inset-0 bg-green-500/20 rounded-full blur-2xl"
      />

      {/* Floating WhatsApp FAB */}
      <motion.a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        className="relative flex items-center justify-center w-16 h-16 bg-[#25D366] text-white rounded-full shadow-[0_10px_30px_rgba(37,211,102,0.3)] border-2 border-white/20 transition-all group overflow-hidden"
      >
        {/* Shimmer effect */}
        <motion.div
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -rotate-45"
        />
        <MessageCircle className="w-8 h-8 z-10" />
      </motion.a>
    </div>
  );
}
