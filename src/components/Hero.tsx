"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

const MadonPopupMockup = ({ progress }: { progress: number }) => {
  const [ttlSecs, setTtlSecs] = useState(1187);
  const [amountIdx, setAmountIdx] = useState(0);
  const amounts = ["€5,000", "€8,000", "€12,500", "€20,000"];

  useEffect(() => {
    const timer = setInterval(() => setTtlSecs((s) => Math.max(0, s - 1)), 1000);
    const amountTimer = setInterval(
      () => setAmountIdx((i) => (i + 1) % amounts.length),
      3000
    );
    return () => {
      clearInterval(timer);
      clearInterval(amountTimer);
    };
  }, []);

  const m = Math.floor(ttlSecs / 60);
  const s = ttlSecs % 60;

  return (
    <div className="w-full max-w-[440px] bg-white rounded-[20px] shadow-[0_40px_120px_rgba(13,14,9,0.18),0_4px_20px_rgba(13,14,9,0.08)] overflow-hidden border border-ink/5">
      {/* Header */}
      <div className="p-4 md:p-5 pb-3.5 bg-gradient-to-br from-[#003768] to-[#004d99]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#00AEEF] flex items-center justify-center font-bold text-[12px] text-white">
              B
            </div>
            <div>
              <div className="text-[12px] font-bold text-white">
                Bank AI × CADON
              </div>
              <div className="text-[9px] text-white/50">
                exec.cadon.io · TLS 1.3 · PSD2/GDPR secured
              </div>
            </div>
          </div>
          <div className="flex gap-1.5">
            <div className="bg-white/15 border border-white/25 text-white rounded-md px-2 py-1 text-[9px] font-semibold whitespace-nowrap">
              ⏸ Pause
            </div>
            <div className="w-6 h-6 rounded-full bg-white/12 flex items-center justify-center text-white text-[12px]">
              ✕
            </div>
          </div>
        </div>

        {/* Steps */}
        <div className="flex items-center gap-1">
          <div className="w-5 h-5 rounded-full bg-green-400 flex items-center justify-center text-[8px] font-extrabold text-white">
            ✓
          </div>
          <div className="flex-1 h-[2px] bg-green-400 rounded-full" />
          <div className="w-5 h-5 rounded-full bg-green-400 flex items-center justify-center text-[8px] font-extrabold text-white">
            ✓
          </div>
          <div className="flex-1 h-[2px] bg-[#00AEEF] rounded-full" />
          <div className="w-5 h-5 rounded-full bg-[#00AEEF] shadow-[0_0_0_3px_rgba(0,174,239,0.3)] flex items-center justify-center text-[8px] font-extrabold text-white">
            3
          </div>
          <div className="flex-1 h-[2px] bg-white/15 rounded-full" />
          <div className="w-5 h-5 rounded-full bg-white/15 flex items-center justify-center text-[8px] text-white/35">
            4
          </div>
        </div>
        <div className="flex justify-between px-0.5 pt-1 text-[7px] text-white/35 font-medium uppercase tracking-wider">
          <span>Intent</span>
          <span>Identity</span>
          <span className="text-[#00AEEF] font-bold">Details</span>
          <span>Submit</span>
        </div>
        <div className="flex items-center justify-between bg-black/15 rounded-md px-2.5 py-1 mt-2">
          <div className="text-[9px] text-white/50">🔒 Secure session</div>
          <div className="text-[10px] font-bold text-[#00AEEF] font-mono">
            {m}:{s < 10 ? `0${s}` : s}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 md:p-6">
        <div className="text-base md:text-lg font-bold text-[#003768] mb-1">
          Your loan details
        </div>
        <div className="text-[11px] text-muted mb-4 md:mb-5">
          This information is shared only with the bank — ChatGPT never sees it.
        </div>

        {/* Amount */}
        <div className="bg-gradient-to-br from-[#003768] to-[#004d99] rounded-xl p-3 text-center mb-3">
          <motion.div
            key={amountIdx}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl md:text-3xl font-extrabold text-white"
          >
            {amounts[amountIdx]}
          </motion.div>
          <div className="text-[9px] text-white/60">Loan amount</div>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="bg-gray-50 border border-gray-100 rounded-lg p-2 md:p-2.5">
            <div className="text-[9px] font-semibold text-muted uppercase tracking-wider">
              Duration
            </div>
            <div className="text-[13px] font-bold text-ink">24 months</div>
          </div>
          <div className="bg-gray-50 border border-gray-100 rounded-lg p-2 md:p-2.5">
            <div className="text-[9px] font-semibold text-muted uppercase tracking-wider">
              Monthly
            </div>
            <div className="text-[13px] font-bold text-ink">~€365/mo</div>
          </div>
        </div>

        {/* List items */}
        <div className="flex flex-col gap-2 mb-4">
          {[
            { icon: "🪪", text: "Full name & date of birth", tag: "Mandatory" },
            { icon: "💼", text: "Employment & income range", tag: "Mandatory" },
            {
              icon: "🛡️",
              text: "CADON fraud check",
              tag: "✅ Passed",
              hl: true,
            },
          ].map((item, i) => (
            <div
              key={i}
              className={cn(
                "flex items-center gap-2.5 p-2 md:px-3 rounded-lg",
                item.hl ? "bg-green-50 border border-green-200" : "bg-gray-50"
              )}
            >
              <span className="text-sm">{item.icon}</span>
              <div className="flex-1 text-[11px] text-ink/80 font-medium">
                {item.text}
              </div>
              <span
                className={cn(
                  "text-[9px] font-bold",
                  item.hl ? "text-green-600" : "text-[#003768]"
                )}
              >
                {item.tag}
              </span>
            </div>
          ))}
        </div>

        <div className="bg-blue-50 border-l-2 border-[#00AEEF] rounded-lg p-3 mb-4 text-[10px] text-[#003768] leading-relaxed">
          🔒 ChatGPT only receives a pass/fail signal — your data stays entirely
          private.
        </div>

        <button className="w-full py-3 md:py-3.5 bg-[#003768] hover:bg-[#002a50] text-white font-bold text-[13px] rounded-xl transition-colors">
          Review & give consent →
        </button>
      </div>
    </div>
  );
};

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // phase transforms
  const sideTextOpacity = useTransform(smoothProgress, [0, 0.25], [1, 0]);
  const slideLeft = useTransform(smoothProgress, [0, 0.25], [0, -100]);
  const slideRight = useTransform(smoothProgress, [0, 0.25], [0, 100]);

  const popupScale = useTransform(smoothProgress, [0.15, 0.65], [0.12, 1]);
  const popupOpacity = useTransform(smoothProgress, [0.15, 0.3], [0, 1]);

  const centerIconOpacity = useTransform(smoothProgress, [0, 0.15, 0.3], [1, 1, 0]);
  const centerIconLabelOpacity = useTransform(smoothProgress, [0.05, 0.15, 0.25], [0, 1, 0]);

  const bottomOpacity = useTransform(smoothProgress, [0.75, 0.95], [0, 1]);
  const bottomY = useTransform(smoothProgress, [0.75, 0.95], [40, 0]);

  const scrollHintOpacity = useTransform(smoothProgress, [0, 0.1], [1, 0]);

  return (
    <section ref={containerRef} className="h-[300vh] relative">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-white">
        {/* Side Texts */}
        <motion.div
          style={{ opacity: sideTextOpacity, x: slideLeft }}
          className="absolute left-6 md:left-12 lg:left-24 top-[25%] md:top-1/2 -translate-y-1/2 z-10 max-w-[280px]"
        >
          <span className="block text-[11px] font-semibold text-muted uppercase tracking-[0.1em] mb-2 md:mb-3">
            Compliance infrastructure
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-normal leading-[1.1] tracking-tight text-ink">
            Banking products made{" "}
            <em className="italic font-serif">compliant</em>
          </h2>
        </motion.div>

        <motion.div
          style={{ opacity: sideTextOpacity, x: slideRight }}
          className="absolute right-6 md:right-12 lg:right-24 top-[75%] md:top-1/2 -translate-y-1/2 z-10 text-right max-w-[280px]"
        >
          <span className="block text-[11px] font-semibold text-muted uppercase tracking-[0.1em] mb-2 md:mb-3">
            For LLM channels
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-normal leading-[1.1] tracking-tight text-ink">
            <em className="italic font-serif">CADON</em>
          </h2>
        </motion.div>

        {/* Center Container (Small Icon) */}
        <motion.div
          style={{ opacity: centerIconOpacity }}
          className="absolute flex items-center gap-4 z-20 pointer-events-none"
        >
          <div className="w-14 h-14 bg-white border border-ink/10 rounded-2xl flex items-center justify-center shadow-lg overflow-hidden shrink-0">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <rect
                x="3"
                y="3"
                width="7"
                height="7"
                rx="1.5"
                fill="#0D0E09"
                fillOpacity="0.9"
              />
              <rect
                x="14"
                y="3"
                width="7"
                height="7"
                rx="1.5"
                fill="#0D0E09"
                fillOpacity="0.4"
              />
              <rect
                x="3"
                y="14"
                width="7"
                height="7"
                rx="1.5"
                fill="#0D0E09"
                fillOpacity="0.4"
              />
              <rect
                x="14"
                y="14"
                width="7"
                height="7"
                rx="1.5"
                fill="#C4A55A"
                fillOpacity="0.9"
              />
            </svg>
          </div>
          <motion.span
            style={{ opacity: centerIconLabelOpacity }}
            className="font-serif text-xl md:text-2xl text-ink whitespace-nowrap"
          >
            exec.cadon.io
          </motion.span>
        </motion.div>

        {/* Main Popup Wrapper */}
        <motion.div
          style={{
            scale: popupScale,
            opacity: popupOpacity,
          }}
          className="relative z-[15] p-2 md:p-6 w-full flex justify-center -translate-y-6 md:translate-y-0"
        >
          <div className="transform scale-[0.85] sm:scale-100 origin-top">
            <MadonPopupMockup progress={0} />
          </div>
        </motion.div>

        {/* Bottom Content */}
        <motion.div
          style={{ opacity: bottomOpacity, y: bottomY }}
          className="absolute bottom-6 md:bottom-20 left-4 md:left-12 right-4 md:right-12 flex flex-col items-center md:flex-row md:items-end justify-between gap-4 md:gap-8 z-30"
        >
          <p className="max-w-[440px] text-[13px] md:text-lg text-muted font-light text-center md:text-left leading-snug md:leading-relaxed tracking-tight">
            CADON is the secure execution layer that lets banks sell financial
            products through LLMs — compliantly. One integration. Every channel.
            Full regulatory coverage from day one.
          </p>
          <div className="flex gap-3 md:gap-4 shrink-0">
            <a
              href="#cta"
              className="bg-gold hover:bg-gold2 text-ink text-[13px] md:text-base font-semibold px-6 md:px-8 py-3 md:py-4 rounded-full transition-all hover:-translate-y-px text-center"
            >
              Request access
            </a>
            <a
              href="#integration"
              className="border border-muted2 hover:border-ink text-ink text-[13px] md:text-base px-6 md:px-8 py-3 md:py-4 rounded-full transition-all text-center"
            >
              See integration
            </a>
          </div>
        </motion.div>

        {/* Scroll Hint */}
        <motion.div
          style={{ opacity: scrollHintOpacity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-30 pointer-events-none"
        >
          <span className="text-[10px] font-bold text-muted uppercase tracking-[0.2em]">
            Scroll
          </span>
          <div className="w-[1px] h-10 bg-muted/20 relative overflow-hidden">
            <motion.div
              animate={{ y: ["-100%", "100%"] }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: "easeInOut",
              }}
              className="absolute inset-0 w-full bg-ink"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
