"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import TrustedBy from "@/components/ui/TrustedBy";
import ParallaxSection from "@/components/ui/ParallaxSection";
import SectionHeading from "@/components/ui/SectionHeading";
import ProjectCard from "@/components/ui/ProjectCard";
import TestimonialMarquee from "@/components/ui/TestimonialMarquee";
import ScrambleText from "@/components/ui/ScrambleText";
import MagneticWrapper from "@/components/ui/MagneticWrapper";
import TiltCard from "@/components/ui/TiltCard";
import { IProject } from "@/models/Project";
import { useEffect, useState } from "react";
import { Sparkles, BrainCircuit, Globe, Smartphone, Hexagon, Cloud, Compass } from "lucide-react";

export default function HomeClient({ projects }: { projects: IProject[] }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="flex flex-col w-full overflow-hidden">
      
      {/* Interactive Dynamic Background */}
      <motion.div 
        className="pointer-events-none fixed inset-0 z-0 opacity-40 mix-blend-screen"
        animate={{
             background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(200, 200, 210, 0.15), transparent 40%)`
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0 }}
      />

      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Animated grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px]">
          <div className="absolute inset-0 bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black_80%)]"></div>
        </div>

        <div className="z-10 text-center px-4 max-w-[90vw] mx-auto flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="mb-8 px-5 py-2 rounded-full border border-white/20 bg-white/5 text-gray-300 text-sm font-medium flex items-center gap-2 backdrop-blur-md"
          >
            <Sparkles size={16} className="text-gray-300 animate-pulse" />
            AI-Powered Digital Agency
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="text-5xl md:text-[5rem] lg:text-[6rem] xl:text-[7rem] font-black tracking-[-0.02em] mb-8 leading-[1.05] relative w-full"
          >
            WE BUILD <span className="text-transparent bg-clip-text bg-gradient-to-br from-zinc-100 via-gray-400 to-zinc-700 animate-gradient-x"><ScrambleText text="INTELLIGENT" /></span> EXPERIENCES
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-xl md:text-2xl text-gray-400 max-w-2xl mb-12 relative z-10"
          >
            A premier outsourcing agency delivering modern architectures, smart automation, and state-of-the-art web applications.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex gap-4 relative z-10"
          >
            <MagneticWrapper>
              <Link
                href="#projects"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-black font-bold uppercase tracking-wider text-sm rounded-sm hover:-translate-y-1 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.1)]"
              >
                Our Work
              </Link>
            </MagneticWrapper>
            <MagneticWrapper>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-white/20 text-white font-bold uppercase tracking-wider text-sm rounded-sm hover:bg-white/5 transition-colors"
              >
                <BrainCircuit size={18} /> Let's Innovate
              </Link>
            </MagneticWrapper>
          </motion.div>
        </div>
      </section>

      {/* Trusted By Marquee */}
      <div className="relative z-10 bg-black">
        <TrustedBy />
      </div>

      {/* Offerings Bento Grid */}
      <section className="py-32 px-6 max-w-7xl mx-auto w-full relative z-10">
        <div className="mb-12">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight uppercase text-white">
            <ScrambleText text="OFFERINGS" />
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[320px]">
          {/* Card 01: Web Systems */}
          <TiltCard className="md:col-span-2">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#1b1b1b] rounded-sm p-10 flex flex-col justify-between group hover:bg-[#222] transition-colors h-full"
            >
              <div className="flex justify-between items-start">
                <Globe className="w-8 h-8 text-white/90" />
                <span className="text-gray-500 text-sm font-medium">01</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2 tracking-wide uppercase">WEB SYSTEMS</h3>
                <p className="text-gray-400 text-sm font-medium">High-performance architecture built for scale and SEO supremacy.</p>
              </div>
            </motion.div>
          </TiltCard>

          {/* Card 02: Mobile */}
          <TiltCard className="md:col-span-1">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-[#1b1b1b] rounded-sm p-10 flex flex-col justify-between group hover:bg-[#222] transition-colors h-full"
            >
              <div className="flex justify-between items-start">
                <Smartphone className="w-8 h-8 text-white/90 fill-white/90" />
                <span className="text-gray-500 text-sm font-medium">02</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white tracking-wide uppercase relative top-2">MOBILE</h3>
              </div>
            </motion.div>
          </TiltCard>

          {/* Card 03: Intelligent Agents */}
          <TiltCard className="md:col-span-1 md:row-span-2">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-sm p-10 flex flex-col justify-between group hover:bg-gray-100 transition-colors h-full"
            >
               <div className="flex justify-between items-start">
                 <Hexagon className="w-8 h-8 text-black fill-black/90 scale-110" />
                 <span className="text-gray-400 text-sm font-medium">03</span>
               </div>
               <div>
                 <h3 className="text-[28px] font-black text-black mb-4 tracking-[-0.02em] leading-[1.1] uppercase">INTELLIGENT<br/>AGENTS</h3>
                 <p className="text-gray-600 text-sm font-medium leading-relaxed">Deploying LLMs and custom ML models into existing enterprise workflows.</p>
               </div>
            </motion.div>
          </TiltCard>

          {/* Card 04: Cloud Ops */}
          <TiltCard className="md:col-span-2">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-[#1b1b1b] rounded-sm p-10 flex flex-col justify-between group hover:bg-[#222] transition-colors h-full"
            >
              <div className="flex justify-between items-start">
                <Cloud className="w-8 h-8 text-white/90 fill-white/90" />
                <span className="text-gray-500 text-sm font-medium">04</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2 tracking-wide uppercase">CLOUD OPS</h3>
                <p className="text-gray-400 text-sm font-medium">Serverless, distributed systems engineered for 99.99% uptime.</p>
              </div>
            </motion.div>
          </TiltCard>

           {/* Card 05: UX Audits */}
          <TiltCard className="md:col-span-1">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-black rounded-sm p-10 flex flex-col justify-between group hover:bg-[#070707] transition-colors relative h-full"
            >
              {/* Very faint grid border to separate black from super black */}
              <div className="absolute inset-0 border border-white/[0.03] pointer-events-none rounded-sm" />
              
              <div className="flex justify-between items-start relative z-10">
                <Compass className="w-8 h-8 text-white/90" />
                <span className="text-gray-600 text-sm font-medium shadow-none">05</span>
              </div>
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-white tracking-wide uppercase relative top-2">UX AUDITS</h3>
              </div>
            </motion.div>
          </TiltCard>
        </div>
      </section>

      {/* Testimonials Marquee */}
      <TestimonialMarquee />

      {/* Projects Section on the Home Page */}
      <section id="projects" className="py-32 px-6 max-w-7xl mx-auto w-full relative z-10">
        <div className="mb-12">
          <SectionHeading 
            title="Selected Projects" 
            subtitle="A live showcase of our recent digital products directly from our database."
          />
        </div>
        
        <div className="mt-12">
          {projects.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-500">
              <h3 className="text-2xl font-semibold mb-2">No projects yet.</h3>
              <p>Admin hasn't uploaded any projects to the database.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
              {projects.map((project, index) => (
                <ProjectCard key={project._id as unknown as string} project={project} index={index} />
              ))}
            </div>
          )}
        </div>
        
        <div className="mt-16 text-center">
          <Link href="/projects" className="inline-block border-b border-indigo-500/50 text-indigo-400 hover:text-indigo-300 transition-colors pb-1 font-medium tracking-wide">
            View All Projects
          </Link>
        </div>
      </section>

      {/* Parallax Why Choose Us */}
      <ParallaxSection className="relative z-20 bg-white text-black py-40 px-6 rounded-t-[4rem] md:rounded-t-[6rem]" offset={80}>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center mb-8"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 rotate-12 animate-pulse flex items-center justify-center text-white">
              <BrainCircuit size={32} className="-rotate-12" />
            </div>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-black tracking-tighter mb-10"
          >
            WHY PARTNER WITH US?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-700 leading-relaxed max-w-3xl mx-auto font-medium"
          >
            We don't just write code. We build smart, scalable businesses. Our team integrates seamlessly with yours, delivering high-velocity development without technical debt.
          </motion.p>
        </div>
      </ParallaxSection>

      {/* CTA Section */}
      <section className="relative z-10 py-32 px-6 text-center bg-black">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-6xl font-bold mb-8"
        >
          <ScrambleText text="Ready to initiate sequences?" />
        </motion.h2>
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 0.5, delay: 0.2 }}
        >
          <MagneticWrapper>
            <Link href="/contact" className="relative group inline-flex items-center justify-center px-10 py-5 bg-white text-black font-bold uppercase tracking-wider rounded-sm text-lg hover:bg-gray-200 transition-colors overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
              <span className="relative z-10">Start Your Project</span>
            </Link>
          </MagneticWrapper>
        </motion.div>
      </section>

      <style jsx global>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
        @keyframes gradient-x {
          0%, 100% { background-size: 200% 200%; background-position: left center; }
          50% { background-size: 200% 200%; background-position: right center; }
        }
        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }
      `}</style>
    </div>
  );
}
