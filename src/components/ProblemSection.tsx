"use client";

import React from "react";
import { motion } from "framer-motion";

const ProblemSection = () => {
  const problems = [
    {
      id: "01",
      title: "You can't close a product inside a chatbot",
      description:
        "Millions of users ask LLMs about loans, mortgages, and insurance every day. When they're ready to apply, they're redirected to a website. The intent dies. The conversion is lost.",
    },
    {
      id: "02",
      title: "Compliance makes it nearly impossible",
      description:
        "GDPR, PSD2, DORA, the AI Act, FCA Consumer Duty — none of these were designed for LLM channels. Building a compliant execution layer per bank, per product, per jurisdiction takes 18 months and a team of lawyers.",
    },
    {
      id: "03",
      title: "Personal data must never reach the LLM",
      description:
        "No bank can allow an LLM to handle KYC data, consent records, or application data. The architecture to prevent this must come first. Almost nobody has built it. CADON already has.",
    },
  ];

  return (
    <section id="problem" className="bg-ink py-24 md:py-32 px-6 md:px-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <span className="block text-[11px] font-semibold text-gold/60 uppercase tracking-[0.1em] mb-6">
          The problem
        </span>
        <h2 className="font-serif text-3xl md:text-5xl font-normal leading-[1.1] tracking-tight text-white max-w-2xl mb-16">
          LLMs are already inside your customers' financial{" "}
          <em className="italic text-gold/70">conversations.</em>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 border-t border-l border-white/10">
          {problems.map((prob, i) => (
            <motion.div
              key={prob.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 md:p-12 border-r border-b border-white/10 hover:bg-white/[0.025] transition-colors group"
            >
              <div className="font-serif text-[60px] md:text-[80px] font-normal text-white/[0.04] leading-none tracking-tighter mb-8 group-hover:text-white/[0.06] transition-colors">
                {prob.id}
              </div>
              <h3 className="font-serif text-xl md:text-2xl text-white mb-4 leading-tight">
                {prob.title}
              </h3>
              <p className="text-sm md:text-base text-white/40 font-light leading-relaxed">
                {prob.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
