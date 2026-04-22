"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const snippets = [
  {
    id: "trigger",
    label: "Trigger session",
    file: "cadon_trigger.py",
    lines: [
      { text: "# Bank-side: trigger CADON when LLM detects intent", type: "comment" },
      { text: "from cadon import Client", type: "keyword" },
      { text: "", type: "plain" },
      { text: "client = Client(api_key=\"bank_prod_key\")", type: "plain" },
      { text: "", type: "plain" },
      { text: "# Zero personal data in this call. Ever.", type: "comment" },
      { text: "session = client.execute({", type: "plain" },
      { text: "  \"product\":     \"personal_loan\",", type: "string" },
      { text: "  \"bank_id\":     \"bnp_fr_prod\",", type: "string" },
      { text: "  \"session_token\": session.opaque_id,", type: "string" },
      { text: "  \"amount_hint\":  8000, # Non-personal", type: "comment" },
      { text: "})", type: "plain" },
      { text: "# CADON opens bank-branded secure pop-up", type: "comment" },
    ],
  },
  {
    id: "webhook",
    label: "Bank applies KYC",
    file: "cadon_kyc_hook.py",
    lines: [
      { text: "# CADON calls your bank's KYC webhook", type: "comment" },
      { text: "@app.route(\"/cadon/kyc-result\", methods=[\"POST\"])", type: "keyword" },
      { text: "def receive_kyc(request):", type: "keyword" },
      { text: "  # Arrives directly to your system", type: "comment" },
      { text: "  # Never touches the LLM", type: "comment" },
      { text: "  payload = request.json", type: "plain" },
      { text: "  # payload contains:", type: "comment" },
      { text: "  # - Verified identity signal", type: "comment" },
      { text: "  # - GDPR consent record", type: "comment" },
      { text: "  # - Application data (bank-schema)", type: "comment" },
      { text: "  process_application(payload)", type: "plain" },
      { text: "  return {\"status\": \"received\"}", type: "keyword" },
    ],
  },
  {
    id: "result",
    label: "Receive result",
    file: "cadon_result.py",
    lines: [
      { text: "# What the LLM/calling system receives", type: "comment" },
      { text: "# This is ALL the AI ever sees:", type: "comment" },
      { text: "", type: "plain" },
      { text: "result = {", type: "plain" },
      { text: "  \"status\":           \"success\",", type: "string" },
      { text: "  \"session_id\":       \"MDON-4X9A-F22B1\",", type: "string" },
      { text: "  \"intent_type\":      \"personal_loan\",", type: "string" },
      { text: "  \"psd2_compliant\":   True,", type: "plain" },
      { text: "  \"gdpr_consent\":    True,", type: "plain" },
      { text: "  \"dora_logged\":     True,", type: "plain" },
      { text: "  # No name. No amount. No ID.", type: "comment" },
      { text: "  # No bank. No account. Nothing.", type: "comment" },
      { text: "}", type: "plain" },
    ],
  },
];

const CodeIntegration = () => {
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setActiveTab((t) => (t + 1) % snippets.length), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="integration" className="bg-ink py-24 md:py-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1.2fr,1fr] gap-16 md:gap-24 items-center">
        {/* Code Pane */}
        <div>
          <span className="block text-[11px] font-semibold text-gold/60 uppercase tracking-[0.1em] mb-8">
            Integration
          </span>

          <div className="flex gap-2 mb-6">
            {snippets.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setActiveTab(i)}
                className={cn(
                  "px-4 py-2 rounded-lg font-mono text-[11px] transition-all border",
                  activeTab === i
                    ? "bg-white/10 border-white/20 text-white"
                    : "bg-transparent border-transparent text-white/30 hover:text-white/60"
                )}
              >
                {s.label}
              </button>
            ))}
          </div>

          <div className="bg-[#080908] rounded-2xl overflow-hidden border border-white/5 shadow-2xl">
            <div className="bg-[#0E100D] px-5 py-3.5 flex items-center gap-6 border-b border-white/5">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
              </div>
              <span className="text-[11px] font-mono text-white/20">
                {snippets[activeTab].file}
              </span>
            </div>
            <div className="p-8 font-mono text-[13px] leading-6 min-h-[400px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {snippets[activeTab].lines.map((line, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className={cn(
                        "whitespace-pre",
                        line.type === "comment" && "text-white/20 italic",
                        line.type === "keyword" && "text-white/70",
                        line.type === "string" && "text-gold/80",
                        line.type === "plain" && "text-white/50"
                      )}
                    >
                      {line.text || "\u00A0"}
                    </motion.div>
                  ))}
                  <motion.div
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="inline-block w-2 h-4 bg-white/40 align-middle"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Right Content */}
        <div className="lg:pt-16">
          <h2 className="font-serif text-3xl md:text-5xl font-normal leading-[1.1] tracking-tight text-white mb-6">
            One API call.<br />
            <em className="italic text-gold/70">Everything</em><br />
            handled.
          </h2>
          <p className="text-base text-white/40 font-light leading-relaxed mb-12">
            Banks integrate CADON as a DORA-compliant ICT third-party service provider. Developers connect via REST API or SDK. The DORA Art. 30 contract and GDPR Art. 28 DPA template are included from day one.
          </p>

          <div className="flex flex-col gap-6">
            {[
              { n: "01", t: "Trigger the session", d: "One API call with session token and product intent. Zero personal data in the call. Ever." },
              { n: "02", t: "Bank performs KYC & consent", d: "CADON opens a bank-branded pop-up. Identity, consent, and application data captured in isolation." },
              { n: "03", t: "Receive clean result", d: "Status signal returned. Audit log written. Personal data never crosses back. Session closed." },
            ].map((step, i) => (
              <div 
                key={step.n} 
                className={cn(
                  "flex gap-4 pb-6 border-b border-white/5 transition-opacity duration-500",
                  activeTab === i ? "opacity-100" : "opacity-30"
                )}
              >
                <span className="font-mono text-[11px] text-white/30 pt-1">{step.n}</span>
                <div>
                  <h4 className="font-serif text-lg text-white mb-2">{step.t}</h4>
                  <p className="text-[13px] text-white/40 font-light leading-relaxed">{step.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CodeIntegration;
