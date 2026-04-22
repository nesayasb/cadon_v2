"use client";

import React from "react";
import { motion } from "framer-motion";

const HowItWorks = () => {
  const steps = [
    {
      n: "01",
      t: "User expresses intent",
      d: "Natural language, inside any AI interface. Loan, mortgage, insurance — any product type.",
    },
    {
      n: "02",
      t: "CADON is called",
      d: "Single API call with session token and product intent. Zero personal data in the call.",
    },
    {
      n: "03",
      t: "Secure pop-up opens",
      d: "Bank-branded, bank-directed environment. Identity, consent, and application data captured here.",
    },
    {
      n: "04",
      t: "Bank receives data",
      d: "Verified application transmitted directly to bank systems. CADON does not retain it.",
    },
    {
      n: "05",
      t: "Status returned",
      d: '{ status: "success" } only. No personal data. Session ends.',
    },
  ];

  return (
    <section id="how" className="bg-cream2 py-24 md:py-32 px-6 md:px-12 border-t border-muted3 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <span className="block text-[11px] font-semibold text-muted uppercase tracking-[0.1em] mb-6">
          How it works
        </span>
        <h2 className="font-serif text-3xl md:text-5xl font-normal leading-[1.1] tracking-tight text-ink mb-16">
          Five steps.<br />One compliant <em className="italic text-gold">execution.</em>
        </h2>

        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-[19px] left-[10%] right-[10%] h-px bg-muted3 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-6 relative z-10">
            {steps.map((step, i) => (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center text-center group"
              >
                <div className="w-10 h-10 rounded-full border border-muted2 bg-cream flex items-center justify-center font-mono text-[11px] text-muted mb-6 transition-all duration-300 group-hover:bg-ink group-hover:border-ink group-hover:text-white group-hover:scale-110">
                  {step.n}
                </div>
                <h3 className="font-serif text-base text-ink mb-3 leading-tight px-4">
                  {step.t}
                </h3>
                <p className="text-[12px] text-muted font-light leading-relaxed px-2">
                  {step.d}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
