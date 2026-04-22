"use client";

import React from "react";
import { motion } from "framer-motion";

const PrinciplesSection = () => {
  const principles = [
    {
      title: "Controlled",
      tagline: "The bank is in charge. Always.",
      desc: "Every element of the execution pop-up is set by the bank — data schema, consent text, product content, retention period. CADON executes the instruction.",
    },
    {
      title: "Isolated",
      tagline: "Personal data never crosses the boundary.",
      desc: "The LLM environment is a zero-data zone. Identity, consent, and application data live only in CADON's secure layer and the bank's systems.",
    },
    {
      title: "Evidenced",
      tagline: "Every transaction is provable.",
      desc: "Immutable audit trails for every execution. When a regulator asks, the evidence is already structured, timestamped, and exportable.",
    },
    {
      title: "Scalable",
      tagline: "One integration, infinite channels.",
      desc: "Banks integrate once. The same execution layer then works across every AI channel, product type, and jurisdiction CADON supports.",
    },
  ];

  return (
    <section className="bg-cream2 py-24 md:py-32 px-6 md:px-12 border-t border-muted3">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr,1.50fr] gap-20 items-start">
        <div>
          <span className="block text-[11px] font-semibold text-muted uppercase tracking-[0.1em] mb-6">
            Principles
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-normal leading-[1.1] tracking-tight text-ink mb-6">
            Designed for banks.<br />Built for <em className="italic text-gold">regulators.</em>
          </h2>
        </div>

        <div className="flex flex-col gap-px bg-muted3 border border-muted3 rounded-2xl overflow-hidden">
          {principles.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-cream p-8 md:p-10 grid grid-cols-1 md:grid-cols-[160px,1fr] gap-6 md:gap-12 hover:bg-cream2 transition-all duration-300 group"
            >
              <h3 className="font-serif text-xl md:text-2xl text-ink leading-tight group-hover:text-gold transition-colors">
                {p.title}
              </h3>
              <div>
                <div className="text-[14px] font-bold text-ink mb-2">{p.tagline}</div>
                <div className="text-[13.5px] text-muted font-light leading-relaxed">
                  {p.desc}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PrinciplesSection;
