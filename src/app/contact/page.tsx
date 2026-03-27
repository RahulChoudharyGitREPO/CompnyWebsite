"use client";

import { useState } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to send message");

      toast.success("Message sent successfully! We'll get back to you soon.");
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-32 px-6 max-w-4xl mx-auto min-h-screen">
      <SectionHeading 
        title="LET'S TALK" 
        subtitle="Have a project in mind? Fill out the form below and our team will get back to you within 24 hours."
      />

      <motion.form 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        onSubmit={handleSubmit} 
        className="flex flex-col gap-6 bg-[#0a0a0a] p-8 md:p-12 rounded-3xl border border-white/10"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-sm text-gray-400 font-medium">Name</label>
            <input required name="name" type="text" id="name" className="bg-[#111] border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors" placeholder="John Doe" />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm text-gray-400 font-medium">Email</label>
            <input required name="email" type="email" id="email" className="bg-[#111] border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors" placeholder="john@company.com" />
          </div>
        </div>
        
        <div className="flex flex-col gap-2">
          <label htmlFor="subject" className="text-sm text-gray-400 font-medium">Subject</label>
          <input required name="subject" type="text" id="subject" className="bg-[#111] border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors" placeholder="Web App Development" />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="message" className="text-sm text-gray-400 font-medium">Project Details</label>
          <textarea required name="message" id="message" rows={5} className="bg-[#111] border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors resize-none" placeholder="Tell us about your requirements..."></textarea>
        </div>

        <button 
          disabled={loading}
          type="submit" 
          className="mt-4 px-8 py-4 bg-white text-black font-semibold rounded-xl hover:bg-gray-200 transition-colors disabled:opacity-70 flex justify-center items-center"
        >
          {loading ? "Sending..." : "Send Message"}
        </button>
      </motion.form>
    </div>
  );
}
