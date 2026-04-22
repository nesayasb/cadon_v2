"use client";

import React from "react";
import { motion } from "framer-motion";

const WhySection = () => {
  const points = [
    {
      title: "Zero-data LLM boundary",
      desc: "The LLM never receives a name, an income, an ID, or an application outcome. Enforced cryptographically — not by policy, not by contract.",
      tag: "GDPR · Schrems II · AI Act",
      icon: "🚫",
    },
    {
      title: "Bank-directed by design",
      desc: "The bank controls the data schema, consent language, product content, and retention period. CADON is the container. The bank is the controller.",
      tag: "GDPR Art. 28 · PSD2 · FCA",
      icon: "🏛️",
    },
    {
      title: "Regulation-native",
      desc: "30 frameworks mapped. Architecturally addressed. Most platforms become aware of GDPR and DORA after building. CADON was designed around the full stack.",
      tag: "DORA · NIS2 · CRA · ePrivacy",
      icon: "🧬",
    },
    {
      title: "One integration, every product",
      desc: "Consumer credit, mortgages, investment products, insurance — the same integration handles different product schemas.",
      tag: "CCD2 · MCD · MiFID II · IDD",
      icon: "🔗",
    },
    {
      title: "Full audit infrastructure",
      desc: "Every session logged with timestamp, intent type, consent evidence, and outcome status. Structured for DORA ICT reporting.",
      tag: "DORA Art. 30 · GDPR Art. 30",
      icon: "📁",
    },
    {
      title: "Non-regulated positioning",
      desc: "CADON is a technical service provider. Not a credit broker. Not a payment initiator. The architecture enforces this positioning.",
      tag: "PSD2 Art. 3(j) · FSMA · FCA",
      icon: "⚖️",
    },
  ];

  return (
    <section id="why" className="bg-white py-24 md:py-32 px-6 md:px-12 border-t border-muted3">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-xl mb-16 md:mb-24">
          <span className="block text-[11px] font-semibold text-muted uppercase tracking-[0.1em] mb-6">
            Why CADON
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-normal leading-[1.1] tracking-tight text-ink mb-6">
            Compliance isn't a feature.<br />It's the <em className="italic text-gold">foundation.</em>
          </h2>
          <p className="text-base text-muted font-light leading-relaxed">
            Every other approach treats compliance as something to navigate around. CADON treats it as the architecture itself.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-muted3 rounded-2xl overflow-hidden">
          {points.map((point, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="p-10 border-r border-b border-muted3 hover:bg-cream2 transition-colors relative group"
            >
              <div className="text-2xl mb-6 group-hover:scale-110 transition-transform inline-block">
                {point.icon}
              </div>
              <h3 className="font-serif text-xl text-ink mb-3 leading-tight">{point.title}</h3>
              <p className="text-[13px] text-muted font-light leading-relaxed mb-6">
                {point.desc}
              </p>
              <div className="font-mono text-[10px] text-muted2 uppercase tracking-wider">
                {point.tag}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhySection;
