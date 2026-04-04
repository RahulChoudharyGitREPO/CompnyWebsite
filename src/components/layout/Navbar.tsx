"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Schedule a Call", href: "#booking" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-black/50 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-1.5 focus:outline-none">
          <span className="text-xl font-semibold tracking-tight text-white font-[family-name:var(--font-geist-sans)]">
            Gigtech<span className="text-white/40 font-normal">Orbit</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm tracking-wide transition-colors ${
                pathname === link.href ? "text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="https://wa.me/919693975542?text=Hello%20GigtechOrbit%2C%20I'd%20like%20to%20discuss%20a%20new%20project."
            className="px-5 py-2.5 text-sm bg-white text-black font-medium hover:bg-gray-200 transition-colors rounded-2xl"
          >
            Get in touch
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-20 left-0 w-full bg-black border-b border-white/10 flex flex-col items-center py-6 gap-6"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`text-lg tracking-wide ${
                  pathname === link.href ? "text-white" : "text-gray-400"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
