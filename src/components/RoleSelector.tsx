"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

type Role = "bank" | "dev" | "fintech" | "user";

const roles: { id: Role; name: string; sub: string }[] = [
  { id: "bank", name: "Banks & Lenders", sub: "Sell via any AI channel" },
  { id: "dev", name: "Developers & Platforms", sub: "One API call" },
  { id: "fintech", name: "Fintechs & Embedded Finance", sub: "Stay non-regulated" },
  { id: "user", name: "End Users", sub: "30s application flow" },
];

const RoleSelector = () => {
  const [activeRole, setActiveRole] = useState<Role>("bank");

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveRole((prev) => {
        const idx = roles.findIndex((r) => r.id === prev);
        return roles[(idx + 1) % roles.length].id;
      });
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-cream2 py-24 md:py-32 px-6 md:px-12 border-y border-muted3 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr,1.2fr] gap-16 md:gap-24 items-start">
        {/* Left Side: Buttons */}
        <div>
          <span className="block text-[11px] font-semibold text-muted uppercase tracking-[0.1em] mb-6">
            Who it's for
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-normal leading-[1.1] tracking-tight text-ink mb-6">
            One layer.<br />Every <em className="italic text-gold">party</em> in<br />the chain.
          </h2>
          <p className="text-base text-muted font-light leading-relaxed mb-10 max-w-md">
            CADON connects banks, developers, fintechs, and end users into a single compliant execution flow. Click a role to see how CADON serves each party.
          </p>

          <div className="flex flex-col gap-2">
            {roles.map((role) => (
              <button
                key={role.id}
                onClick={() => setActiveRole(role.id)}
                className={cn(
                  "flex items-center gap-4 p-4 rounded-xl text-left border-2 transition-all duration-300 group",
                  activeRole === role.id
                    ? "bg-ink border-ink text-white"
                    : "bg-transparent border-transparent text-muted hover:bg-muted3"
                )}
              >
                <div
                  className={cn(
                    "w-2 h-2 rounded-full transition-colors",
                    activeRole === role.id ? "bg-gold" : "bg-muted2 group-hover:bg-muted"
                  )}
                />
                <div className="flex-1">
                  <div
                    className={cn(
                      "text-[15px] font-bold",
                      activeRole === role.id ? "text-white" : "text-muted group-hover:text-ink"
                    )}
                  >
                    {role.name}
                  </div>
                  <div
                    className={cn(
                      "text-[12px]",
                      activeRole === role.id ? "text-white/40" : "text-muted2"
                    )}
                  >
                    {role.sub}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Side: Visuals */}
        <div className="relative aspect-[4/3] md:aspect-auto md:h-[480px] bg-ink rounded-[20px] shadow-[0_32px_80px_rgba(13,14,9,0.18)] overflow-hidden p-6 md:p-12">
          <AnimatePresence mode="wait">
            {activeRole === "bank" && <BankScene key="bank" />}
            {activeRole === "dev" && <DevScene key="dev" />}
            {activeRole === "fintech" && <FintechScene key="fintech" />}
            {activeRole === "user" && <UserScene key="user" />}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

const BankScene = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 1.05 }}
    className="h-full flex items-center justify-center"
  >
    <div className="w-full max-w-[380px]">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-accent2 flex items-center justify-center text-xl shadow-lg">
          🏦
        </div>
        <div>
          <div className="text-[14px] font-bold text-white">Bank AI × CADON</div>
          <div className="text-[11px] text-white/30 tracking-wide">Live execution dashboard</div>
        </div>
      </div>

      <div className="flex flex-col gap-2.5">
        {[
          { label: "Applications today", value: "312", color: "text-green-400" },
          { label: "Conversion rate", value: "73.4%", color: "text-gold2" },
          { label: "Data to LLM", value: "0 fields", color: "text-green-400" },
          { label: "Compliance status", value: "✅ All regs active", color: "text-green-400" },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white/5 rounded-xl p-4 flex items-center justify-between"
          >
            <span className="text-[12px] text-white/50">{item.label}</span>
            <span className={cn("text-[13px] font-bold", item.color)}>{item.value}</span>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 bg-accent/20 border border-accent2/40 rounded-xl p-3.5 flex items-center gap-3">
        <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.8)]" />
        <span className="text-[11px] font-mono text-green-400 tracking-tight">
          Secure session active · exec.cadon.io
        </span>
      </div>
    </div>
  </motion.div>
);

const DevScene = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="h-full flex items-center justify-center"
  >
    <div className="w-full max-w-[400px] h-full bg-[#0A0B07] rounded-xl overflow-hidden shadow-2xl border border-white/5">
      <div className="bg-[#151610] px-4 py-3 border-b border-white/5 flex items-center gap-6">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
        </div>
        <span className="text-[11px] font-mono text-white/20">cadon_integration.py</span>
      </div>
      <div className="p-6 font-mono text-[13px] leading-relaxed">
        <div className="text-white/20 mb-2"># Trigger CADON when user intent is detected</div>
        <div className="text-white/70">
          <span className="text-white/80">result</span> = cadon.
          <span className="text-white/90">execute</span>({`{`}
        </div>
        <div className="pl-4">
          <span className="text-white/40">"product"</span>:{" "}
          <span className="text-white/50">"personal_loan"</span>,
        </div>
        <div className="pl-4">
          <span className="text-white/40">"bank_id"</span>:{" "}
          <span className="text-white/50">"bnp_fr_prod"</span>,
        </div>
        <div className="pl-4 text-white/20"># No personal data. Ever.</div>
        <div className="text-white/70">{`})`}</div>
        <div className="h-4" />
        <div className="text-white/20 mb-2"># CADON returns only status signal</div>
        <div className="text-white/70">
          <span className="text-white/80">result</span> == {`{`}
        </div>
        <div className="pl-4">
          <span className="text-white/40">"status"</span>:{" "}
          <span className="text-green-400">"success"</span>,
        </div>
        <div className="pl-4">
          <span className="text-white/40">"session"</span>:{" "}
          <span className="text-green-400">"[opaque_token]"</span>,
        </div>
        <div className="text-white/70">{`}`}</div>
        <motion.div
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="inline-block w-2 h-4 bg-white/40 align-middle ml-1"
        />
      </div>
    </div>
  </motion.div>
);

const FintechScene = () => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    className="h-full flex items-center justify-center"
  >
    <div className="w-full max-w-[360px]">
      <div className="text-[11px] font-mono text-white/30 tracking-[0.1em] mb-4 text-center uppercase">
        Embedded Finance Flow
      </div>
      <div className="flex flex-col gap-2">
        {[
          { icon: "💬", title: "User expresses intent", sub: "Inside your AI product", badge: "Your platform", badgeColor: "text-blue-300 bg-blue-300/10" },
          { arrow: true },
          { icon: "📡", title: "CADON API call", sub: "Zero personal data sent", badge: "CADON", badgeColor: "text-gold2 bg-gold2/10" },
          { arrow: true },
          { icon: "🔒", title: "Secure pop-up opens", sub: "Bank-branded, isolated", badge: "CADON", badgeColor: "text-gold2 bg-gold2/10" },
          { arrow: true },
          { icon: "✅", title: "Status returned", sub: '{ status: "success" } only', badge: "Clean", badgeColor: "text-green-400 bg-green-400/10" },
        ].map((item, i) => (
          item.arrow ? (
            <motion.div
              key={i}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              transition={{ delay: i * 0.15 }}
              className="text-white/20 text-center text-sm py-0.5"
            >
              ↓
            </motion.div>
          ) : (
            <motion.div
              key={i}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.15 }}
              className="bg-white/5 rounded-xl p-4 flex items-center gap-4 relative overflow-hidden"
            >
              <span className="text-xl shrink-0">{item.icon}</span>
              <div className="flex-1">
                <div className="text-[13px] font-bold text-white leading-tight">{item.title}</div>
                <div className="text-[11px] text-white/30 mt-0.5">{item.sub}</div>
              </div>
              <span className={cn("text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider", item.badgeColor)}>
                {item.badge}
              </span>
            </motion.div>
          )
        ))}
      </div>
    </div>
  </motion.div>
);

const UserScene = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setStep((s) => (s + 1) % 4), 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-full flex flex-col pt-4 items-center"
    >
      <div className="w-full max-w-[360px] flex flex-col gap-10">
        {/* Header */}
        <div className="flex items-center gap-4 border-b border-white/10 pb-6">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent2 to-accent flex items-center justify-center text-lg">
            🤖
          </div>
          <div>
            <div className="text-[13px] font-bold text-white">Bank AI Assistant</div>
            <div className="text-[11px] text-green-400 font-medium">● Powered by CADON</div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex flex-col gap-4">
          <div className="bg-white/10 text-white/80 rounded-2xl rounded-tr-none px-4 py-3 text-[13px] self-end max-w-[80%] leading-relaxed">
            I'd like a personal loan of €8,000
          </div>
          <div className="bg-gradient-to-br from-accent/40 to-accent2/20 text-white rounded-2xl rounded-tl-none px-4 py-3 text-[13px] self-start max-w-[80%] leading-relaxed">
            I found 4 banks with great rates. I'm opening a secure application — your data stays private from me.
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-4 self-start max-w-[90%] shadow-lg mt-2"
          >
            <div className="flex items-center justify-between mb-3 border-b pb-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-ink flex items-center justify-center font-serif text-[10px] text-white">M</div>
                <span className="text-[11px] font-bold text-ink">Bank AI × CADON</span>
              </div>
              <span className="text-[8px] font-bold bg-green-100 text-green-700 px-1.5 py-0.5 rounded">SECURED</span>
            </div>
            
            <div className="flex gap-1.5 mb-3">
              {[0, 1, 2, 3].map((s) => (
                <div key={s} className={cn("h-1 flex-1 rounded-full", s <= step ? "bg-ink" : "bg-ink/10")} />
              ))}
            </div>

            <div className="text-[11px] text-ink/60 mb-3">
              {step < 3 ? "Identity verified · Reviewing consent..." : "Application submitted successfully ✓"}
            </div>

            <button className={cn(
              "w-full py-2.5 rounded-lg text-[11px] font-bold transition-all",
              step < 3 ? "bg-ink text-white" : "bg-green-600 text-white"
            )}>
              {step < 3 ? "Submit application →" : "✅ Done!"}
            </button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default RoleSelector;
