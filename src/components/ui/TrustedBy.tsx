"use client";

import { motion } from "framer-motion";

const companies = [
  "Google", "Amazon", "Microsoft", "Meta", "Apple", "Netflix", "Tesla", "Adobe"
];

export default function TrustedBy() {
  return (
    <div className="py-20 border-y border-white/5 bg-black overflow-hidden relative">
      <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-black to-transparent z-10" />
      <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-black to-transparent z-10" />

      <div className="flex flex-col items-center mb-10">
        <p className="text-gray-500 uppercase tracking-widest text-sm font-semibold">
          Trusted by innovative companies
        </p>
      </div>

      <div className="flex w-full overflow-hidden">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
          className="flex gap-20 items-center whitespace-nowrap px-10"
        >
          {/* Double the list to make the loop seamless */}
          {[...companies, ...companies, ...companies].map((company, i) => (
            <div key={i} className="text-3xl font-bold text-gray-700/50 mix-blend-screen select-none">
              {company}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
