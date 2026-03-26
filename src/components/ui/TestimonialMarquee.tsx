"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import ScrambleText from "@/components/ui/ScrambleText";

const testimonialsRow1 = [
  { text: "The team delivered our complex architecture a month ahead of schedule. The scaling capabilities are phenomenal.", author: "Sarah Jenkins", role: "CTO at NexTier" },
  { text: "Incredible attention to detail and zero technical debt. The AI integrations they built revolutionized our workflow.", author: "Marcus V.", role: "Founder of DataSync" },
  { text: "Their mobile app engineering is state-of-the-art. We saw a 300% increase in user retention after they redesigned our platform.", author: "Elena R.", role: "Product Lead" },
  { text: "Best outsourcing agency we've ever partnered with. They don't just write code; they build scalable businesses.", author: "David Chen", role: "CEO of CloudForge" }
];

const testimonialsRow2 = [
  { text: "They handled our chaotic legacy system migration flawlessly and built us a highly robust serverless framework.", author: "Amira K.", role: "VP of Engineering" },
  { text: "The UI design and Framer Motion interactions they provided made our website look like a million bucks.", author: "John T.", role: "Marketing Director" },
  { text: "Communication was stellar. They integrated perfectly as an extension of our own internal engineering teams.", author: "Lisa M.", role: "Operations Head" },
  { text: "A truly intelligence-first agency. Their understanding of LLMs and system design is unmatched in the industry.", author: "Robert B.", role: "Technical Founder" },
];

export default function TestimonialMarquee() {
  return (
    <section className="py-32 bg-black relative z-10 overflow-hidden border-t border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
        <h2 className="text-sm font-bold tracking-[0.2em] text-indigo-400 mb-4 uppercase">
          Client Feedback
        </h2>
        <h3 className="text-4xl md:text-5xl font-black text-white">
          <ScrambleText text="TRUSTED BY PIONEERS" />
        </h3>
      </div>

      <div className="relative flex flex-col gap-8">
        {/* Fading Edges */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

        {/* Row 1 - Moves Left */}
        <div className="flex w-[200%] md:w-max">
          <motion.div
            className="flex gap-8 px-4"
            animate={{ x: [0, -1000] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
          >
            {[...testimonialsRow1, ...testimonialsRow1, ...testimonialsRow1].map((t, i) => (
              <div key={i} className="w-[350px] md:w-[450px] flex-shrink-0 bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 hover:bg-[#111] transition-colors">
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} size={16} className="fill-indigo-500 text-indigo-500" />
                  ))}
                </div>
                <p className="text-gray-300 text-lg mb-8 leading-relaxed">"{t.text}"</p>
                <div>
                  <h4 className="font-bold text-white">{t.author}</h4>
                  <p className="text-gray-500 text-sm">{t.role}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Row 2 - Moves Right */}
        <div className="flex w-[200%] md:w-max mt-4">
          <motion.div
            className="flex gap-8 px-4"
            animate={{ x: [-1000, 0] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
          >
            {[...testimonialsRow2, ...testimonialsRow2, ...testimonialsRow2].map((t, i) => (
              <div key={i} className="w-[350px] md:w-[450px] flex-shrink-0 bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 hover:bg-[#111] transition-colors">
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} size={16} className="fill-purple-500 text-purple-500" />
                  ))}
                </div>
                <p className="text-gray-300 text-lg mb-8 leading-relaxed">"{t.text}"</p>
                <div>
                  <h4 className="font-bold text-white">{t.author}</h4>
                  <p className="text-gray-500 text-sm">{t.role}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
