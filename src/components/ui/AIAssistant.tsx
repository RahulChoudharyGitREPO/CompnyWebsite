"use client";

import { motion } from "framer-motion";
import { Sparkles, MessageSquare } from "lucide-react";
import { useState } from "react";

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 flex items-center justify-center">
        {/* Glowing aura */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 bg-indigo-500 rounded-full blur-xl"
        />

        {/* Floating AI Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          className="relative flex items-center justify-center w-14 h-14 bg-black border border-white/20 rounded-full shadow-[0_0_15px_rgba(99,102,241,0.5)] overflow-hidden group"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0_340deg,rgba(255,255,255,0.4)_360deg)] opacity-0 group-hover:opacity-100 mix-blend-overlay"
          />
          <Sparkles className="text-white w-6 h-6 z-10" />
        </motion.button>
      </div>

      {/* AI Chat Window Mock (conditional) */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="fixed bottom-24 right-6 z-50 w-80 h-96 bg-black border border-white/10 rounded-2xl flex flex-col shadow-[0_0_30px_rgba(99,102,241,0.15)] overflow-hidden"
        >
          <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/5">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span className="font-semibold text-sm">Agency AI</span>
            </div>
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          </div>
          <div className="flex-1 p-4 flex flex-col gap-4 overflow-y-auto">
            <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl rounded-tl-sm text-sm text-gray-300">
              Hello! I'm the Agency AI. How can I help you automate your workflows today?
            </div>
            {/* Thinking animation */}
            <div className="flex gap-1 items-center px-2">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
                  className="w-1.5 h-1.5 bg-gray-500 rounded-full"
                />
              ))}
            </div>
          </div>
          <div className="p-3 border-t border-white/10 bg-[#0a0a0a]">
            <div className="flex items-center gap-2 px-3 py-2 bg-[#111] border border-white/10 rounded-xl text-gray-500 text-sm">
              <MessageSquare className="w-4 h-4" />
              Ask me anything...
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
}
