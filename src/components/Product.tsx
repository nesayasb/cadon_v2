"use client";

import React from "react";
import { motion } from "framer-motion";

const Product = () => {
  return (
    <section id="product" className="bg-cream py-24 md:py-32 px-6 md:px-12 border-t border-muted3">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
        <div>
          <span className="block text-[11px] font-semibold text-muted uppercase tracking-[0.1em] mb-6">
            The product
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-normal leading-[1.1] tracking-tight text-ink mb-6">
            The execution layer<br />banking <em className="italic text-gold">needed.</em>
          </h2>
          <p className="text-base text-muted font-light leading-relaxed mb-8">
            When a user expresses financial intent inside any AI conversation, CADON triggers a secure, bank-branded pop-up. Identity verification, consent capture, and application submission happen inside a fully isolated environment.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 border border-muted3 rounded-2xl overflow-hidden mt-12">
            {[
              { val: "30s", sub: "Average user completion" },
              { val: "0", sub: "Personal data reaching LLM" },
              { val: "30+", sub: "EU & UK regulations mapped" },
            ].map((m, i) => (
              <div key={i} className="p-6 border-r border-muted3 last:border-0 hover:bg-cream2 transition-colors">
                <div className="font-serif text-3xl md:text-4xl text-ink mb-2">{m.val}</div>
                <div className="text-[11px] text-muted leading-tight uppercase tracking-wide">{m.sub}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-px bg-muted3 border border-muted3 rounded-2xl overflow-hidden">
          {[
            {
              icon: "🪪",
              title: "Identity & consent capture",
              desc: "Bank-directed pop-up handles KYC, biometric auth, and GDPR Art. 7-compliant consent — isolated from the LLM.",
            },
            {
              icon: "⚖️",
              title: "Compliance by architecture",
              desc: "GDPR, DORA, PSD2, AI Act, FCA Consumer Duty — enforced at protocol level. Not by policy. Not by contract.",
            },
            {
              icon: "🔌",
              title: "Any product, any bank system",
              desc: "Consumer credit, mortgages, insurance, investments — CADON adapts to any product schema and any bank's existing systems.",
            },
            {
              icon: "📋",
              title: "Full audit infrastructure",
              desc: "Immutable consent records, session logs, and transmission evidence. Structured for DORA Art. 30 and GDPR compliance.",
            },
          ].map((pillar, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-8 hover:bg-cream2 transition-colors group"
            >
              <div className="text-2xl mb-4 group-hover:scale-110 transition-transform inline-block">
                {pillar.icon}
              </div>
              <h4 className="font-serif text-lg text-ink mb-2">{pillar.title}</h4>
              <p className="text-[13px] text-muted font-light leading-relaxed">
                {pillar.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Product;
