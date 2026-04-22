"use client";

import React from "react";
import { motion } from "framer-motion";

const CTA = () => {
  return (
    <section 
      id="cta" 
      className="bg-ink py-32 md:py-48 px-6 md:px-12 text-center relative overflow-hidden"
    >
      {/* Decorative Gradients */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-[120%] bg-[radial-gradient(ellipse_at_50%_0%,rgba(196,165,90,0.15)_0%,transparent_60%)]" />
        <div className="absolute bottom-0 left-0 w-[100%] h-[100%] bg-[radial-gradient(ellipse_at_20%_100%,rgba(44,90,64,0.2)_0%,transparent_50%)]" />
        <div className="absolute top-1/2 right-0 w-[80%] h-[80%] bg-[radial-gradient(ellipse_at_80%_50%,rgba(44,90,64,0.15)_0%,transparent_50%)]" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-serif text-5xl md:text-8xl lg:text-[108px] font-normal leading-[0.92] tracking-tighter text-white mb-10"
        >
          Financial products,<br />
          inside every<br />
          <em className="italic text-gold/60">conversation.</em>
        </motion.h2>
        
        <p className="text-base md:text-xl text-white/40 font-light leading-relaxed max-w-lg mx-auto mb-12">
          Request early access for your bank, LLM platform, or fintech. Onboarding partners now across France, Belgium, the Netherlands, and the UK.
        </p>

        <form 
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col md:flex-row gap-3 justify-center items-center max-w-md mx-auto"
        >
          <input 
            type="email" 
            placeholder="you@bank.com"
            className="w-full md:w-auto flex-1 bg-white/[0.07] border border-white/10 rounded-full px-6 py-4 text-white text-sm outline-none focus:border-white/30 transition-all placeholder:text-white/20"
          />
          <button className="w-full md:w-auto bg-gold hover:bg-gold2 text-ink text-sm font-bold px-8 py-4 rounded-full transition-all hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap">
            Request access →
          </button>
        </form>
      </div>
    </section>
  );
};

export default CTA;
