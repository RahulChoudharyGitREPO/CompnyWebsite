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
import { Sparkles, BrainCircuit, Globe, Smartphone, Hexagon, Cloud, Compass, Code, Video, ImageIcon, PlusCircle } from "lucide-react";
import Counter from "@/components/ui/Counter";
import CalendlyEmbed from "@/components/ui/CalendlyEmbed";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import toast from "react-hot-toast";

export default function HomeClient({ projects: initialProjects, isAdmin: initialIsAdmin }: { projects: IProject[], isAdmin: boolean }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [allProjects, setAllProjects] = useState(initialProjects);
  const [isAdmin, setIsAdmin] = useState(initialIsAdmin);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Sync if server prop changes
    setIsAdmin(initialIsAdmin);
  }, [initialIsAdmin]);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setAllProjects((items) => {
        const oldIndex = items.findIndex((p) => String(p._id) === String(active.id));
        const newIndex = items.findIndex((p) => String(p._id) === String(over.id));
        const nextItems = arrayMove(items, oldIndex, newIndex);
        
        // Save the new order (only for non-placeholder projects)
        const dbItems = nextItems.filter(p => !String(p._id).startsWith("cs"));
        if (dbItems.length > 0) {
          saveOrder(dbItems);
        }
        return nextItems;
      });
    }
  };

  const saveOrder = async (dbProjects: IProject[]) => {
    setIsSaving(true);
    try {
      const orders = dbProjects.map((p, index) => ({
        id: p._id,
        order: index,
      }));

      const response = await fetch("/api/projects/reorder", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orders }),
      });

      if (!response.ok) throw new Error("Failed to save order");
      toast.success("Order synchronized");
    } catch (error) {
      toast.error("Failed to save project order");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = (id: string) => {
    setAllProjects(prev => prev.filter(p => String(p._id) !== id));
  };

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
            AI-Powered Product & Automation Agency
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="text-5xl md:text-[5rem] lg:text-[6rem] xl:text-[7rem] font-black tracking-[-0.02em] mb-8 leading-[1.05] relative w-full"
          >
            SCALE WITHOUT <span className="text-transparent bg-clip-text bg-gradient-to-br from-zinc-100 via-gray-400 to-zinc-700 animate-gradient-x"><ScrambleText text="THE OVERHEAD" /></span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-xl md:text-2xl text-gray-400 max-w-3xl mb-12 relative z-10"
          >
            We deploy autonomous AI agents and elite tech teams to automate your operations, bookings, and payments. Get <Counter value={10} suffix="x" /> faster execution without the hiring headache.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex gap-4 relative z-10"
          >
            <MagneticWrapper>
              <Link
                href="#booking"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-black font-bold uppercase tracking-wider text-sm rounded-sm hover:-translate-y-1 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.1)]"
              >
                Book a Demo
              </Link>
            </MagneticWrapper>
            <MagneticWrapper>
              <Link
                href="#booking"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-white/20 text-white font-bold uppercase tracking-wider text-sm rounded-sm hover:bg-white/5 transition-colors"
              >
                <BrainCircuit size={18} /> Schedule Strategy Call
              </Link>
            </MagneticWrapper>
          </motion.div>
        </div>
      </section>

      {/* Trusted By Marquee - Removed for clean layout
      <div className="relative z-10 bg-black">
        <TrustedBy />
      </div>
      */}

      {/* Offerings Bento Grid */}
      <section className="py-32 px-6 max-w-7xl mx-auto w-full relative z-10">
        <div className="mb-12">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight uppercase text-white">
            <ScrambleText text="CORE CAPABILITIES" />
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[300px]">
          {/* Card 01: WhatsApp Automation */}
          <TiltCard className="md:col-span-2">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5, borderColor: "rgba(255,255,255,0.2)", backgroundColor: "rgba(34, 34, 34, 1)" }}
              viewport={{ once: true }}
              className="bg-[#1b1b1b] rounded-sm p-8 flex flex-col justify-between group transition-all duration-300 h-full border border-white/5"
            >
              <div className="flex justify-between items-start">
                <BrainCircuit className="w-8 h-8 text-white/90" />
                <span className="text-gray-500 text-sm font-medium uppercase tracking-tighter">Autonomous Ops</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2 tracking-wide uppercase">AI Agent Workforces</h3>
                <p className="text-gray-400 text-xs font-medium leading-relaxed">Deploy custom agents that handle customer support, booking logic, and payment reconciliations autonomously. Reduce manual workload by up to 40%.</p>
              </div>
            </motion.div>
          </TiltCard>

          {/* Card 02: Business Dashboards */}
          <TiltCard className="md:col-span-2">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5, borderColor: "rgba(255,255,255,0.2)", backgroundColor: "rgba(34, 34, 34, 1)" }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-[#1b1b1b] rounded-sm p-8 flex flex-col justify-between group transition-all duration-300 h-full border border-white/5"
            >
              <div className="flex justify-between items-start">
                <Code className="w-8 h-8 text-white/90" />
                <span className="text-gray-500 text-sm font-medium uppercase tracking-tighter">Velocity</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2 tracking-wide uppercase">Extended Tech Team</h3>
                <p className="text-gray-400 text-xs font-medium leading-relaxed">Scale your product faster with our elite engineers. We build, maintain, and scale your tech stack at 2x the speed of traditional hiring.</p>
              </div>
            </motion.div>
          </TiltCard>

          {/* Card 03: App & Web Dev */}
          <TiltCard className="md:col-span-1">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5, borderColor: "rgba(255,255,255,0.2)", backgroundColor: "rgba(21, 21, 21, 1)" }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-[#111] rounded-sm p-8 flex flex-col justify-between group transition-all duration-300 h-full border border-white/5"
            >
              <div className="flex justify-between items-start">
                <Cloud className="w-6 h-6 text-white/70" />
                <span className="text-gray-600 text-xs font-bold uppercase">SaaS</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1 uppercase tracking-tight">SaaS Infrastructure</h3>
              </div>
            </motion.div>
          </TiltCard>

          {/* Card 04: Fintech */}
          <TiltCard className="md:col-span-1">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5, borderColor: "rgba(255,255,255,0.2)", backgroundColor: "rgba(21, 21, 21, 1)" }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-[#111] rounded-sm p-8 flex flex-col justify-between group transition-all duration-300 h-full border border-white/5"
            >
              <div className="flex justify-between items-start">
                <Globe className="w-6 h-6 text-white/70" />
                <span className="text-gray-600 text-xs font-bold uppercase">Fintech</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1 uppercase tracking-tight">Payment Workflows</h3>
              </div>
            </motion.div>
          </TiltCard>

          {/* Card 05: MVP */}
          <TiltCard className="md:col-span-1">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5, borderColor: "rgba(255,255,255,0.2)", backgroundColor: "rgba(21, 21, 21, 1)" }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="bg-[#111] rounded-sm p-8 flex flex-col justify-between group transition-all duration-300 h-full border border-white/5"
            >
              <div className="flex justify-between items-start">
                <Smartphone className="w-6 h-6 text-white/70" />
                <span className="text-gray-600 text-xs font-bold uppercase">Agile</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1 uppercase tracking-tight">Rapid MVP Builds</h3>
              </div>
            </motion.div>
          </TiltCard>

          {/* Card 06: Data */}
          <TiltCard className="md:col-span-1">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5, borderColor: "rgba(255,255,255,0.2)", backgroundColor: "rgba(21, 21, 21, 1)" }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="bg-[#111] rounded-sm p-8 flex flex-col justify-between group transition-all duration-300 h-full border border-white/5"
            >
              <div className="flex justify-between items-start">
                <ImageIcon className="w-6 h-6 text-white/70" />
                <span className="text-gray-600 text-xs font-bold uppercase">Analytics</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1 uppercase tracking-tight">Business Intelligence</h3>
              </div>
            </motion.div>
          </TiltCard>

          {/* Card 07: Big Custom AI Section */}
          <TiltCard className="md:col-span-4">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.01, boxShadow: "0 0 30px rgba(255,255,255,0.05)" }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-sm p-10 flex flex-col justify-between transition-all duration-300 h-full shadow-[0_0_40px_rgba(255,255,255,0.05)]"
            >
               <div className="flex justify-between items-start">
                 <Hexagon className="w-8 h-8 text-black fill-black/90 scale-110" />
                 <span className="text-gray-400 text-sm font-black uppercase tracking-widest">Enterprise Ready</span>
               </div>
               <div>
                 <h3 className="text-[32px] font-black text-black mb-4 tracking-[-0.03em] leading-none uppercase">AI AGENTS THAT DRIVE REVENUE</h3>
                 <p className="text-gray-600 text-sm font-medium leading-relaxed max-w-2xl">We don't just build chatbots. We architect intelligent agents that integrate into your core stack—resolving failed payments, managing complex bookings, and automating high-value business workflows so your team can focus on growth.</p>
               </div>
            </motion.div>
          </TiltCard>
        </div>
      </section>

      {/* Testimonials Marquee */}
      <TestimonialMarquee />

      {/* Projects Section - Hidden for now
      <section id="projects" className="py-32 px-6 max-w-7xl mx-auto w-full relative z-10">
        <div className="mb-12 flex justify-between items-end">
          <SectionHeading 
            title="Selected Projects" 
            subtitle="A live showcase of our recent digital products directly from our database."
          />
          {isAdmin && (
            <Link 
              href="/admin/projects/new" 
              className="group flex items-center gap-3 bg-white text-black px-6 py-3 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-gray-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:scale-105 active:scale-95"
            >
              <PlusCircle size={18} /> New Project
            </Link>
          )}
        </div>
        
        <div className="mt-12">
          {isSaving && (
            <div className="fixed top-32 right-8 z-[100] bg-indigo-600 text-white px-6 py-3 rounded-full font-black uppercase tracking-widest text-[10px] shadow-2xl animate-bounce">
              Saving Order...
            </div>
          )}
          {allProjects.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-500">
              <h3 className="text-2xl font-semibold mb-2">No projects yet.</h3>
              <p>Admin hasn't uploaded any projects to the database.</p>
            </div>
          ) : (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
                <SortableContext
                  items={allProjects.map((p) => String(p._id))}
                  strategy={rectSortingStrategy}
                >
                  {allProjects.map((project, index) => (
                    <ProjectCard 
                      key={String(project._id)} 
                      project={project} 
                      index={index} 
                      isAdmin={isAdmin}
                      onDelete={handleDelete}
                    />
                  ))}
                </SortableContext>
              </div>
            </DndContext>
          )}
        </div>
        
        <div className="mt-16 text-center">
          <Link href="/projects" className="inline-block border-b border-indigo-500/50 text-indigo-400 hover:text-indigo-300 transition-colors pb-1 font-medium tracking-wide">
            View All Projects
          </Link>
        </div>
      </section>
      */}

      {/* Built for India Section */}
      <section className="py-24 px-6 bg-[#050505] border-y border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex flex-col gap-2">
              <h3 className="text-white font-bold uppercase tracking-widest text-sm">Fintech Ready</h3>
              <p className="text-gray-500 text-sm">Seamless payment reconciliations and AI fraud detection.</p>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-white font-bold uppercase tracking-widest text-sm">Scalable Infra</h3>
              <p className="text-gray-500 text-sm">Cloud-native systems built for fast-growing SaaS startups.</p>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-white font-bold uppercase tracking-widest text-sm">Outcome Driven</h3>
              <p className="text-gray-500 text-sm">We focus on reduced workload and increased velocity.</p>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-white font-bold uppercase tracking-widest text-sm">Zero Friction</h3>
              <p className="text-gray-500 text-sm">Direct access to product strategists, no middle management.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Parallax Problem Section */}
      <ParallaxSection className="relative z-20 bg-white text-black py-40 px-6 rounded-t-[4rem] md:rounded-t-[6rem]" offset={80}>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center mb-8"
          >
            <div className="w-16 h-16 rounded-2xl bg-black rotate-12 animate-pulse flex items-center justify-center text-white">
              <BrainCircuit size={32} className="-rotate-12" />
            </div>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-black tracking-tighter mb-10 uppercase"
          >
            IS YOUR GROWTH BOTTLENECKED?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-700 leading-relaxed max-w-3xl mx-auto font-medium"
          >
            Hiring developers is expensive. Managing internal teams is slow. Manual workflows are leaking revenue. We replace traditional operational friction with AI-first systems that work 24/7, allowing you to scale without increasing headcount.
          </motion.p>
        </div>
      </ParallaxSection>

      {/* How It Works Section */}
      <section className="py-32 px-6 bg-black relative z-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight uppercase text-white">
              <ScrambleText text="HOW WE SCALE YOU" />
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {[
              { step: "01", title: "Audit & Strategy", desc: "We identify automation bottlenecks in your current product or workflow." },
              { step: "02", title: "Build & Engineer", desc: "Our elite team builds your AI agents or product features in record time." },
              { step: "03", title: "Seamless Integration", desc: "We integrate the solution directly into your existing tech stack (SaaS/Fintech)." },
              { step: "04", title: "Support & Scale", desc: "Continuous monitoring, fine-tuning, and scaling as your business grows." }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col gap-6"
              >
                <span className="text-4xl font-black text-white/20 select-none">{item.step}</span>
                <h4 className="text-xl font-bold text-white uppercase tracking-tight">{item.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Strong Offer / Results Section */}
      <section className="py-24 px-6 bg-white text-black relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-8">
                RESULTS DRIVEN BY <span className="text-gray-400">INTELLIGENCE.</span>
              </h2>
              <div className="space-y-8">
                <div className="flex gap-6 items-start">
                  <div className="text-4xl font-black text-indigo-600 leading-none">40%</div>
                  <div>
                    <h4 className="font-bold uppercase text-sm tracking-widest mb-1">Operational Savings</h4>
                    <p className="text-gray-600 text-sm">Average reduction in manual support and admin workload through AI agents.</p>
                  </div>
                </div>
                <div className="flex gap-6 items-start">
                  <div className="text-4xl font-black text-indigo-600 leading-none">2-4w</div>
                  <div>
                    <h4 className="font-bold uppercase text-sm tracking-widest mb-1">MVP Launch Speed</h4>
                    <p className="text-gray-600 text-sm">Get from concept to a production-ready MVP in as little as two weeks.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 p-8 rounded-sm border border-black/5 shadow-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="space-y-3 font-mono text-xs text-gray-500">
                <p className="text-indigo-600">{"// USE CASE: FAILED PAYMENT RECOVERY"}</p>
                <p>{"AI_AGENT.monitor(payments_flow);"}</p>
                <p>{"IF (payment.status == 'failed') {"}</p>
                <p className="pl-4">{"AI_AGENT.analyze_reason(payment.error_code);"}</p>
                <p className="pl-4">{"AI_AGENT.reach_out_user(automated_personalized_strategy);"}</p>
                <p className="pl-4">{"RESULT: 85% recovery rate without human intervention."}</p>
                <p>{"}"}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Updated Pricing Section */}
      <section className="py-32 px-6 bg-black relative z-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-sm font-bold tracking-[0.2em] text-indigo-400 mb-4 uppercase">Flex Engagement</h2>
            <h3 className="text-4xl md:text-6xl font-black text-white uppercase">Engagement Models</h3>
          </div>

          <motion.div 
            whileHover={{ y: -10, borderColor: "rgba(255,255,255,0.2)" }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {/* Package 01: Starter */}
            <div className="bg-[#0a0a0a] border border-white/5 p-8 rounded-sm flex flex-col justify-between transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.03)] group">
              <div>
                <h4 className="text-xl font-bold text-white mb-2 underline decoration-white/20 underline-offset-8 uppercase tracking-widest">Pilot</h4>
                <p className="text-2xl font-black text-white my-6">Launch Your First AI Agent in 14 Days</p>
                <p className="text-gray-500 text-sm mb-8 font-medium italic">Fast entry / low risk intervention.</p>
                <ul className="space-y-4 mb-10">
                  {["Automate 1 Core Workflow", "Reduce Manual Workload", "Quick 14-Day Deployment", "Direct Strategy Support"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-400 text-sm font-medium">
                      <div className="w-1 h-1 bg-white/40 rounded-full" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <Link href="#booking" className="w-full py-4 border border-white/10 text-white font-bold uppercase tracking-widest text-xs text-center hover:bg-white/5 transition-colors">Start Pilot</Link>
            </div>
 
            {/* Package 02: Scale */}
            <div className="relative bg-[#0a0a0a] border-2 border-white/20 p-8 rounded-sm flex flex-col justify-between scale-105 z-10 shadow-[0_0_50px_rgba(255,255,255,0.05)] transition-all duration-300 hover:scale-[1.07] hover:shadow-[0_0_60px_rgba(255,255,255,0.08)] group">
              <div className="absolute top-0 right-0 bg-white text-black px-4 py-1.5 font-black uppercase text-[10px] tracking-widest">Most Popular</div>
              <div>
                <h4 className="text-xl font-bold text-white mb-2 underline decoration-white/40 underline-offset-8 uppercase italic tracking-widest">Scale</h4>
                <p className="text-2xl font-black text-white my-6">Scale Faster with AI + Dedicated Tech Team</p>
                <p className="text-gray-400 text-sm mb-8 font-semibold uppercase tracking-tighter">For growth-stage startups</p>
                <ul className="space-y-4 mb-10">
                  {["AI Support & Workflow Automation", "Extended Tech Team (Monthly)", "Faster Feature Delivery", "Scale Without Hiring Heads", "Priority Strategic Support"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-white text-sm font-bold">
                      <div className="w-1.5 h-1.5 bg-white/40 rounded-full" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <MagneticWrapper>
                <Link href="#booking" className="w-full py-5 bg-white text-black font-black uppercase tracking-widest text-xs text-center block">Book Free Demo</Link>
              </MagneticWrapper>
            </div>

            {/* Package 03: Custom */}
            <div className="bg-[#0a0a0a] border border-white/5 p-8 rounded-sm flex flex-col justify-between transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.03)] group">
              <div>
                <h4 className="text-xl font-bold text-white mb-2 underline decoration-white/20 underline-offset-8 uppercase tracking-widest">Custom</h4>
                <p className="text-2xl font-black text-white my-6">Custom AI Systems for Complex Business Needs</p>
                <p className="text-gray-500 text-sm mb-8 font-medium italic">Advanced enterprise solutions.</p>
                <ul className="space-y-4 mb-10">
                  {["Fully Custom Workflow Ops", "Bespoke System Engineering", "Deep Product Integrations", "Long-term Maintenance & Support", "24/7 Strategic Partnership"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-400 text-sm font-medium">
                      <div className="w-1 h-1 bg-white/40 rounded-full" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <Link href="#booking" className="w-full py-4 border border-white/10 text-white font-bold uppercase tracking-widest text-xs text-center hover:bg-white/5 transition-colors">Schedule Strategy Call</Link>
            </div>
          </motion.div>

          {/* Add-on Services & Retainer */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-white/5 pt-20">
            <div className="bg-[#050505] p-8 rounded-sm border border-white/5">
              <h4 className="text-white font-black uppercase tracking-widest text-xs mb-8 flex items-center gap-3">
                <Sparkles size={16} className="text-indigo-400" /> Use Cases
              </h4>
              <div className="space-y-4">
                {[
                  "AI Powered Customer Success",
                  "Automated Booking Workflows",
                  "Smart Payment Reconciliation",
                  "Internal Process Automation",
                ].map((useCase, i) => (
                  <div key={i} className="flex justify-between items-center border-b border-white/[0.03] pb-3">
                    <span className="text-gray-400 text-sm font-medium">{useCase}</span>
                    <span className="w-2 h-2 bg-white/40 rounded-full" />
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#0a0a0a] p-10 rounded-sm border-l-4 border-white/40 flex flex-col justify-center">
              <h4 className="text-white font-black uppercase tracking-widest text-xs mb-8">Premium Engagement</h4>
              <div className="space-y-6">
                <div>
                   <h5 className="text-white font-bold text-lg mb-1">App / Product Development</h5>
                   <p className="text-gray-400 text-sm">Starting from ₹30k+</p>
                </div>
                <div>
                   <h5 className="text-white font-bold text-lg mb-1">AI Agent Systems</h5>
                   <p className="text-gray-400 text-sm mb-8 leading-relaxed font-medium italic">Keep your systems sharp. Includes technical maintenance, regular model fine-tuning, bug fixes, and on-call product support.</p>
                   <Link href="#booking" className="text-white/40 text-xs font-black uppercase tracking-widest hover:text-white transition-colors inline-block">Schedule Systems Audit →</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Improved Calendly Booking Section */}
      <section id="booking" className="py-32 px-6 bg-[#050505] relative z-10 border-t border-white/5 overflow-hidden">
        {/* Subtle Radial Gradient */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="text-left">
              <h2 className="text-sm font-bold tracking-[0.2em] text-white/40 mb-6 uppercase">Direct Strategy Access</h2>
              <h3 className="text-4xl md:text-6xl font-black text-white uppercase leading-tight mb-8">
                Book Your AI <br /> Strategy Session
              </h3>
              <p className="text-gray-400 text-lg mb-10 max-w-xl leading-relaxed">
                Select a time to discuss your specific business bottlenecks. We'll audit your workflows and show you exactly how AI can restore 20+ hours to your week.
              </p>
              
              <div className="space-y-6 mb-12">
                {[
                  "1:1 Strategy session with an expert engineer",
                  "Custom technical roadmap & execution plan",
                  "Zero-obligation technical infrastructure audit",
                  "Deep-dive into AI security & scalability"
                ].map((bullet, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="mt-1 w-5 h-5 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0">
                      <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
                    </div>
                    <span className="text-gray-300 font-medium">{bullet}</span>
                  </div>
                ))}
              </div>
              
              <div className="pt-8 border-t border-white/10 inline-block">
                <p className="text-white font-bold uppercase tracking-widest text-xs mb-2">Trusted by Innovation Teams</p>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Sparkles key={s} size={14} className="text-yellow-500 fill-yellow-500" />
                  ))}
                  <span className="ml-2 text-gray-500 text-[10px] font-bold">50+ STRATEGY SESSIONS COMPLETED THIS QUARTER</span>
                </div>
              </div>
            </div>

            {/* Right Widget */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-white/10 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000 group-hover:duration-200" />
              <CalendlyEmbed url="https://calendly.com/rahulrajwwe2/30min?month=2026-04" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-32 px-6 text-center bg-black">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-6xl font-bold mb-8 uppercase tracking-tighter"
        >
          <ScrambleText text="Ready to automate your operations?" />
        </motion.h2>
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 0.5, delay: 0.2 }}
           className="flex flex-col md:flex-row gap-6 justify-center items-center"
        >
          <MagneticWrapper>
            <Link href="#booking" className="relative group inline-flex items-center justify-center px-10 py-5 bg-white text-black font-bold uppercase tracking-wider rounded-sm text-lg hover:bg-gray-200 transition-colors overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
              <span className="relative z-10">Book a Demo</span>
            </Link>
          </MagneticWrapper>
          <Link href="#booking" className="text-white font-bold uppercase tracking-widest text-sm hover:underline decoration-white/40 underline-offset-8">
            Schedule a Call
          </Link>
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
