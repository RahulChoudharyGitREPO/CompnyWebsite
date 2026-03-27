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
            AI-Powered Digital Agency
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="text-5xl md:text-[5rem] lg:text-[6rem] xl:text-[7rem] font-black tracking-[-0.02em] mb-8 leading-[1.05] relative w-full"
          >
            STOP MANUAL WORK. <span className="text-transparent bg-clip-text bg-gradient-to-br from-zinc-100 via-gray-400 to-zinc-700 animate-gradient-x"><ScrambleText text="START AI AUTOMATION" /></span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-xl md:text-2xl text-gray-400 max-w-3xl mb-12 relative z-10"
          >
            Scale your Indian startup or MSME with WhatsApp bots, custom dashboards, and AI tools. Save <Counter value={20} suffix="+ hours" /> every week and grow your revenue.
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
                See Results
              </Link>
            </MagneticWrapper>
            <MagneticWrapper>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-white/20 text-white font-bold uppercase tracking-wider text-sm rounded-sm hover:bg-white/5 transition-colors"
              >
                <BrainCircuit size={18} /> Book Free AI Audit 
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
            <ScrambleText text="OUR SOLUTIONS" />
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
                <Smartphone className="w-8 h-8 text-white/90" />
                <span className="text-gray-500 text-sm font-medium uppercase tracking-tighter">Automation</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2 tracking-wide uppercase">WhatsApp Automation</h3>
                <p className="text-gray-400 text-xs font-medium leading-relaxed">Automate sales and customer support on India's favorite platform. Close deals 24/7.</p>
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
                <Globe className="w-8 h-8 text-white/90" />
                <span className="text-gray-500 text-sm font-medium uppercase tracking-tighter">Business BI</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2 tracking-wide uppercase">Business Dashboards</h3>
                <p className="text-gray-400 text-xs font-medium leading-relaxed">Track every rupee and lead in real-time. Stop checking 10 apps manually.</p>
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
                <Code className="w-6 h-6 text-white/70" />
                <span className="text-gray-600 text-xs font-bold uppercase">Dev</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1 uppercase tracking-tight">App & Web Development</h3>
              </div>
            </motion.div>
          </TiltCard>

          {/* Card 04: SEO */}
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
                <Compass className="w-6 h-6 text-white/70" />
                <span className="text-gray-600 text-xs font-bold uppercase">Growth</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1 uppercase tracking-tight">SEO & Reach</h3>
              </div>
            </motion.div>
          </TiltCard>

          {/* Card 05: Video Editing */}
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
                <Video className="w-6 h-6 text-white/70" />
                <span className="text-gray-600 text-xs font-bold uppercase">Content</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1 uppercase tracking-tight">Video Editing</h3>
              </div>
            </motion.div>
          </TiltCard>

          {/* Card 06: Graphic Design */}
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
                <span className="text-gray-600 text-xs font-bold uppercase">Design</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1 uppercase tracking-tight">Graphic Designing</h3>
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
                 <span className="text-gray-400 text-sm font-black uppercase tracking-widest">Premium</span>
               </div>
               <div>
                 <h3 className="text-[32px] font-black text-black mb-4 tracking-[-0.03em] leading-none uppercase">AI APP & WORKFLOW AUTOMATION</h3>
                 <p className="text-gray-600 text-sm font-medium leading-relaxed max-w-2xl">Building intelligent agents that think for you. From AI-powered billing systems to fully automated inventory management, we deploy custom LLMs into your existing workflows.</p>
               </div>
            </motion.div>
          </TiltCard>
        </div>
      </section>

      {/* Testimonials Marquee */}
      <TestimonialMarquee />

      {/* Projects Section on the Home Page */}
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

      {/* Built for India Section */}
      <section className="py-24 px-6 bg-[#050505] border-y border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex flex-col gap-2">
              <h3 className="text-white font-bold uppercase tracking-widest text-sm">UPI Ready</h3>
              <p className="text-gray-500 text-sm">Razorpay & UPI integrations for seamless Indian payments.</p>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-white font-bold uppercase tracking-widest text-sm">WhatsApp First</h3>
              <p className="text-gray-500 text-sm">Automated workflows built for India's favorite platform.</p>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-white font-bold uppercase tracking-widest text-sm">MSME Focused</h3>
              <p className="text-gray-500 text-sm">Simple, practical systems designed for small & medium business.</p>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-white font-bold uppercase tracking-widest text-sm">No Tech Jargon</h3>
              <p className="text-gray-500 text-sm">Direct support in simple English (and Hinglish) for your team.</p>
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
            IS YOUR BUSINESS STUCK?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-700 leading-relaxed max-w-3xl mx-auto font-medium"
          >
            Manual entry, missed WhatsApp leads, and messy spreadsheets are killing your growth. We replace the chaos with automated systems that work 24/7, so you can focus on building your business, not managing it.
          </motion.p>
        </div>
      </ParallaxSection>

      {/* Updated Pricing Section */}
      <section className="py-32 px-6 bg-black relative z-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-sm font-bold tracking-[0.2em] text-indigo-400 mb-4 uppercase">Pricing Plans</h2>
            <h3 className="text-4xl md:text-6xl font-black text-white uppercase">Choose Your Scale</h3>
          </div>

          <motion.div 
            whileHover={{ y: -10, borderColor: "rgba(255,255,255,0.2)" }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {/* Package 01: Starter */}
            <div className="bg-[#0a0a0a] border border-white/5 p-8 rounded-sm flex flex-col justify-between transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.03)] group">
              <div>
                <h4 className="text-xl font-bold text-white mb-2 underline decoration-white/20 underline-offset-8 uppercase tracking-widest">Starter</h4>
                <p className="text-4xl font-black text-white my-6">₹<Counter value={10} suffix="k" /> – ₹<Counter value={25} suffix="k" /></p>
                <p className="text-gray-500 text-sm mb-8 font-medium italic">Perfect for small shops & local businesses.</p>
                <ul className="space-y-4 mb-10">
                  {["Basic WhatsApp Bot OR Dashboard", "Simple Landing Page App", "Fast 3-7 Day Delivery", "Standard Email Support"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-400 text-sm font-medium">
                      <div className="w-1 h-1 bg-white/40 rounded-full" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <Link href="/contact" className="w-full py-4 border border-white/10 text-white font-bold uppercase tracking-widest text-xs text-center hover:bg-white/5 transition-colors">Inquire Now</Link>
            </div>

            {/* Package 02: Growth */}
            <div className="relative bg-[#0a0a0a] border-2 border-indigo-500/50 p-8 rounded-sm flex flex-col justify-between scale-105 z-10 shadow-[0_0_50px_rgba(79,70,229,0.15)] transition-all duration-300 hover:scale-[1.07] hover:shadow-[0_0_60px_rgba(79,70,229,0.2)] group">
              <div className="absolute top-0 right-0 bg-white text-black px-4 py-1.5 font-black uppercase text-[10px] tracking-widest">Most Popular</div>
              <div>
                <h4 className="text-xl font-bold text-white mb-2 underline decoration-indigo-500 underline-offset-8 uppercase italic tracking-widest">Growth</h4>
                <p className="text-4xl font-black text-white my-6">₹<Counter value={30} suffix="k" /> – ₹<Counter value={80} suffix="k" /></p>
                <p className="text-gray-400 text-sm mb-8 font-semibold uppercase tracking-tighter">For startups ready to scale fast</p>
                <ul className="space-y-4 mb-10">
                  {["WhatsApp Bot + Dashboard", "Basic AI Workflow Automation", "Medium-scale Web/App Dev", "Payment & API Integrations", "Priority Support"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-white text-sm font-bold">
                      <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <MagneticWrapper>
                <Link href="/contact" className="w-full py-5 bg-white text-black font-black uppercase tracking-widest text-xs text-center block">Book Free Audit</Link>
              </MagneticWrapper>
            </div>

          {/* Package 03: Pro */}
            <div className="bg-[#0a0a0a] border border-white/5 p-8 rounded-sm flex flex-col justify-between transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.03)] group">
              <div>
                <h4 className="text-xl font-bold text-white mb-2 underline decoration-white/20 underline-offset-8 uppercase tracking-widest">Pro</h4>
                <p className="text-4xl font-black text-white my-6">₹<Counter value={80} suffix="k" /> – ₹<Counter value={2} suffix="L+" /></p>
                <p className="text-gray-500 text-sm mb-8 font-medium italic">Full enterprise-grade automation.</p>
                <ul className="space-y-4 mb-10">
                  {["Full AI Workflow System", "Custom App/Web Platform", "Advanced Analytics Dashboard", "Complex Database Logic", "24/7 Priority Support"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-400 text-sm font-medium">
                      <div className="w-1 h-1 bg-white/40 rounded-full" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <Link href="/contact" className="w-full py-4 border border-white/10 text-white font-bold uppercase tracking-widest text-xs text-center hover:bg-white/5 transition-colors">Contact Pro Team</Link>
            </div>
          </motion.div>

          {/* Add-on Services & Retainer */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-white/5 pt-20">
            <div className="bg-[#050505] p-8 rounded-sm border border-white/5">
              <h4 className="text-white font-black uppercase tracking-widest text-xs mb-8 flex items-center gap-3">
                <Sparkles size={16} className="text-indigo-400" /> Individual Services
              </h4>
              <div className="space-y-4">
                {[
                  { name: "WhatsApp Automation", min: 10, max: 40, suffix: "k" },
                  { name: "Dashboards", min: 15, max: 50, suffix: "k" },
                  { name: "App/Web Dev", min: 20, max: 1.5, suffix: "L+", isLakh: true },
                  { name: "AI Automation", min: 30, max: 2, suffix: "L+", isLakh: true },
                  { name: "SEO (Per Month)", min: 5, max: 20, suffix: "k" },
                  { name: "Video Editing (Per Video)", min: 500, max: 3000, isRaw: true },
                  { name: "Graphic Design (Per Creative)", min: 500, max: 2000, isRaw: true },
                ].map((service, i) => (
                  <div key={i} className="flex justify-between items-center border-b border-white/[0.03] pb-2">
                    <span className="text-gray-400 text-sm font-medium">{service.name}</span>
                    <span className="text-white text-sm font-black">
                      ₹{service.isRaw ? <Counter value={service.min} /> : <Counter value={service.min} suffix={service.suffix} />}
                      –
                      ₹{service.isRaw ? <Counter value={service.max} /> : <Counter value={service.max} suffix={service.suffix} />}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#0a0a0a] p-10 rounded-sm border-l-4 border-indigo-500 flex flex-col justify-center">
              <h4 className="text-white font-black uppercase tracking-widest text-xs mb-4">Monthly Retainer</h4>
              <p className="text-3xl font-black text-white mb-4">₹<Counter value={3000} /> – ₹<Counter value={15000} /><span className="text-sm font-normal text-gray-500"> /month</span></p>
              <p className="text-gray-400 text-sm mb-8 leading-relaxed font-medium italic">Keep your systems sharp. Includes technical maintenance, regular AI fine-tuning, bug fixes, and on-call team support.</p>
              <Link href="/contact" className="text-indigo-400 text-xs font-black uppercase tracking-widest hover:text-indigo-300 transition-colors inline-block">Inquire About Systems Maintenance →</Link>
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
          className="text-4xl md:text-6xl font-bold mb-8"
        >
          <ScrambleText text="Ready to save 20+ hours every week?" />
        </motion.h2>
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 0.5, delay: 0.2 }}
           className="flex flex-col md:flex-row gap-6 justify-center items-center"
        >
          <MagneticWrapper>
            <Link href="/contact" className="relative group inline-flex items-center justify-center px-10 py-5 bg-white text-black font-bold uppercase tracking-wider rounded-sm text-lg hover:bg-gray-200 transition-colors overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
              <span className="relative z-10">Book a Call</span>
            </Link>
          </MagneticWrapper>
          <Link href="/projects" className="text-white font-bold uppercase tracking-widest text-sm hover:underline decoration-indigo-500 underline-offset-8">
            See AI Demo
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
