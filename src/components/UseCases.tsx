"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const useCases = [
  { icon: "🏠", name: "Mortgage", sub: "Home purchase & remortgage", hi: true },
  { icon: "💳", name: "Personal Loan", sub: "€1k–€75k instant decision" },
  { icon: "🚘", name: "Car Loan", sub: "Finance new & used vehicles", hi: true },
  { icon: "📈", name: "Investments", sub: "MiFID II compliant portfolios" },
  { icon: "🌅", name: "Pension Plan", sub: "Tax-deductible savings", hi: true },
  { icon: "🏦", name: "Savings Account", sub: "3.4% AER, instant opening" },
  { icon: "🚗", name: "Car Insurance", sub: "Comprehensive, instant cover" },
  { icon: "🏡", name: "Home Insurance", sub: "Buildings & contents" },
  { icon: "↗️", name: "Money Transfer", sub: "SEPA Instant & international", hi: true },
];

const UseCases = () => {
  return (
    <section id="use-cases" className="bg-ink py-24 md:py-32 items-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16">
        <span className="block text-[11px] font-semibold text-gold/60 uppercase tracking-[0.1em] mb-6">
          Use cases
        </span>
        <h2 className="font-serif text-3xl md:text-5xl font-normal leading-[1.1] tracking-tight text-white max-w-lg">
          Every financial product, <em className="italic text-gold/70 text-nowrap">every conversation.</em>
        </h2>
      </div>

      <div className="relative group">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-ink to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-ink to-transparent z-10 pointer-events-none" />

        <div className="flex gap-6 animate-marquee-slow py-4">
          {[...useCases, ...useCases].map((uc, i) => (
            <div
              key={i}
              className={cn(
                "shrink-0 w-[280px] h-[160px] rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 cursor-pointer border",
                uc.hi
                  ? "bg-white/5 border-gold/20 hover:bg-gold/10 hover:border-gold/40"
                  : "bg-white/[0.04] border-white/10 hover:bg-white/[0.08] hover:border-white/20"
              )}
            >
              <div className="flex items-center justify-between">
                <span className="text-3xl">{uc.icon}</span>
                <span className={cn(
                  "text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full",
                  uc.hi ? "bg-gold/20 text-gold" : "bg-white/10 text-white/30"
                )}>
                  {uc.hi ? "Popular" : "Available"}
                </span>
              </div>
              <div>
                <div className="font-serif text-lg text-white mb-1">{uc.name}</div>
                <div className="text-[11px] text-white/30 font-light">{uc.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee-slow {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-marquee-slow {
          display: flex;
          width: max-content;
          animation: marquee-slow 40s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default UseCases;
