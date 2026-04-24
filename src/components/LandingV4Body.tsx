
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import '../app/v4.css';

/* ─── Types ─────────────────────────────────────────────── */
type RoleKey = "bank" | "dev" | "fintech" | "user";
type CodeKey = "trigger" | "bank" | "result";

/* ─── Data ───────────────────────────────────────────────── */
const ROLES: { id: RoleKey; name: string; sub: string }[] = [
  { id: "bank",    name: "Banks & Lenders",              sub: "Sell via any AI channel" },
  { id: "dev",     name: "Developers & Platforms",       sub: "One API call"            },
  { id: "fintech", name: "Fintechs & Embedded Finance",  sub: "Stay non-regulated"      },
  { id: "user",    name: "End Users",                    sub: "5 mins application"         },
];

const CODE_TABS: Record<CodeKey, { file: string; lines: { cls: string; text: string }[] }> = {
  trigger: {
    file: "cadon_trigger.py",
    lines: [
      { cls: "tc", text: "# Trigger CADON on intent — zero personal data" },
      { cls: "tf", text: "session = cadon.create_session(" },
      { cls: "ts", text: '  token = USER_SESSION_TOKEN,' },
      { cls: "tg", text: '  intent = "personal_loan",' },
      { cls: "tg", text: "  amount = 8000, currency = \"EUR\"" },
      { cls: "tf", text: ")" },
      { cls: "", text: "" },
      { cls: "tc", text: "# Returns session URL — no PII ever sent" },
      { cls: "tr", text: "popup_url = session.url" },
      { cls: "ts", text: "redirect_user_to(popup_url)" },
    ],
  },
  bank: {
    file: "cadon_webhook.py",
    lines: [
      { cls: "tc", text: "# Bank receives KYC data directly — bypasses LLM" },
      { cls: "tf", text: "@app.route(\"/cadon/kyc\", methods=[\"POST\"])" },
      { cls: "tf", text: "def receive_kyc():" },
      { cls: "ts", text: "  payload = cadon.verify_webhook(" },
      { cls: "ts", text: "    request.data, request.headers" },
      { cls: "tf", text: "  )" },
      { cls: "", text: "" },
      { cls: "tc", text: "  # name, dob, IBAN, income → bank only" },
      { cls: "tr", text: "  process_application(payload.data)" },
      { cls: "tr", text: "  return {\"status\": \"received\"}" },
    ],
  },
  result: {
    file: "cadon_result.py",
    lines: [
      { cls: "tc", text: "# Receive clean result — AI gets pass/fail only" },
      { cls: "tf", text: "result = cadon.get_result(session.id)" },
      { cls: "", text: "" },
      { cls: "tc", text: "# {\"status\": \"success\", \"ref\": \"cad_abc123\"}" },
      { cls: "tc", text: "# No personal data returned to the LLM layer" },
      { cls: "", text: "" },
      { cls: "tf", text: "if result.status == \"success\":" },
      { cls: "tr", text: "  reply = \"Application submitted!\"" },
      { cls: "ts", text: "else:" },
      { cls: "ts", text: "  reply = \"Session ended.\"" },
    ],
  },
};

const USE_CASES: { icon: string; badge: string; name: string; meta: string; hl?: boolean }[] = [
  { icon: "🏠", badge: "Banking",         name: "Mortgage application",    meta: "~€280k avg. loan"    },
  { icon: "💳", badge: "Consumer credit", name: "Personal loan",           meta: "30s to apply", hl: true },
  { icon: "🛡️", badge: "Insurance",       name: "Life insurance",          meta: "Instant eligibility" },
  { icon: "📈", badge: "Wealth",          name: "Investment account",      meta: "MiFID II compliant", hl: true },
  { icon: "🚗", badge: "Auto finance",    name: "Vehicle financing",       meta: "POS integration"    },
  { icon: "🏢", badge: "SME banking",     name: "Business credit line",    meta: "CCD2 mapped"        },
  { icon: "💰", badge: "Savings",         name: "High-yield savings",      meta: "Automated KYC"      },
  { icon: "🌍", badge: "Payments",        name: "FX & remittances",        meta: "PSD2 compliant"     },
  { icon: "📱", badge: "Neobank",         name: "Digital account",         meta: "Embedded finance"   },
  { icon: "🤝", badge: "Fintech",         name: "Buy now, pay later",      meta: "CCD2 / UK BNPL", hl: true },
  { icon: "🏗️", badge: "Real estate",    name: "Construction loan",       meta: "Long-term credit"   },
  { icon: "💎", badge: "Premium",         name: "Private banking",         meta: "High net worth"     },
];

/* ─── Component ─────────────────────────────────────────── */
export default function LandingV4Body() {
  const [activeRole, setActiveRole]     = useState<RoleKey>("bank");
  const [activeCode, setActiveCode]     = useState<CodeKey>("trigger");

  useEffect(() => {
    /* REVEAL — all .reveal elements */
    const io = new IntersectionObserver(
      (entries) => entries.forEach((x) => { if (x.isIntersecting) x.target.classList.add("in"); }),
      { threshold: 0.07 }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

    /* HERO FADE — staggered entry */
    const heroEls: HTMLElement[] = [];
    [".h-kicker", "h1", ".h-foot"].forEach((sel, i) => {
      const el = document.querySelector<HTMLElement>(sel);
      if (!el) return;
      heroEls.push(el);
      el.style.opacity = "0";
      el.style.transform = "translateY(12px)";
      el.style.transition = `opacity .65s ease ${i * 0.13}s, transform .65s ease ${i * 0.13}s`;
    });
    const heroTimer = setTimeout(() => {
      heroEls.forEach((el) => { el.style.opacity = "1"; el.style.transform = "translateY(0)"; });
    }, 60);

    /* SCROLL-REVEAL — desktop only */
    const sec    = document.getElementById("sr-section");
    const L      = document.getElementById("srL");
    const R      = document.getElementById("srR");
    const seed   = document.getElementById("srSeed");
    const seedLbl= document.getElementById("srSeedLbl");
    const popup  = document.getElementById("srPopup");
    const bot    = document.getElementById("srBot");
    const cue    = document.getElementById("srCue");

    const isMobile = window.matchMedia("(max-width:768px)").matches;

    if (!sec || isMobile) {
      return () => { clearTimeout(heroTimer); io.disconnect(); };
    }

    const cl   = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
    const ease = (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

    if (L)      L.style.cssText      = "opacity:1;transform:translateY(-50%) translateX(0)";
    if (R)      R.style.cssText      = "opacity:1;transform:translateY(-50%) translateX(0)";
    if (seed)   seed.style.opacity   = "1";
    if (popup)  { popup.style.opacity = "0"; popup.style.transform = "translate(-50%,-50%) scale(0.1)"; }
    if (bot)    bot.style.cssText    = "opacity:0;transform:translateY(12px)";

    const handler = () => {
      const secTop = sec.getBoundingClientRect().top + window.scrollY;
      const p = cl((window.scrollY - secTop) / (sec.offsetHeight - window.innerHeight), 0, 1);

      const pSide  = cl(1 - p * 2.8, 0, 1);
      const pSeed  = cl(1 - p * 6, 0, 1);
      const pLbl   = cl(p * 6 - 0.5, 0, 1) * cl(1 - p * 5, 0, 1);
      const pPopup = ease(cl((p - 0.12) / 0.65, 0, 1));
      const pBot   = cl((p - 0.82) / 0.18, 0, 1);
      const pCue   = cl(1 - p * 6, 0, 1);
      const slide  = ease(cl((p - 0.04) / 0.55, 0, 1)) * 65;

      if (L)      { L.style.opacity = String(pSide); L.style.transform = `translateY(-50%) translateX(${-slide}px)`; }
      if (R)      { R.style.opacity = String(pSide); R.style.transform = `translateY(-50%) translateX(${slide}px)`; }
      if (seed)   seed.style.opacity   = String(pSeed);
      if (seedLbl) seedLbl.style.opacity = String(pLbl);
      if (cue)    cue.style.opacity    = String(pCue);

      if (popup) {
        if (pPopup > 0.01) {
          popup.style.opacity   = String(pPopup);
          popup.style.transform = `translate(-50%,-50%) scale(${0.1 + 0.9 * pPopup})`;
          if (pPopup > 0.9) popup.classList.add("live"); else popup.classList.remove("live");
        } else {
          popup.style.opacity = "0";
        }
      }
      if (bot) {
        bot.style.opacity   = String(pBot);
        bot.style.transform = `translateY(${(1 - pBot) * 12}px)`;
      }
    };

    window.addEventListener("scroll", handler, { passive: true });
    return () => {
      clearTimeout(heroTimer);
      window.removeEventListener("scroll", handler);
      io.disconnect();
    };
  }, []);

  /* ── JSX ───────────────────────────────────────────────── */
  return (
    <>

{/* ── HERO ─────────────────────────────────────────────── */}
<section id="hero">
  <span className="h-kicker"><em>●</em> Compliance infrastructure for LLM banking</span>
  <h1>Your products,<br />inside every<br /><em>AI conversation.</em></h1>
  <div className="h-foot">
    <p className="h-desc">CADON is the secure execution layer that lets banks sell financial products through LLMs — compliantly. One integration. Every channel. Full regulatory coverage from day one.</p>
    <div className="h-right">
      <div className="h-stats">
        <div className="hst"><div className="hst-n">5 mins</div><div className="hst-l">Avg. completion</div></div>
        <div className="hst"><div className="hst-n">0</div><div className="hst-l">Data to LLM</div></div>
        <div className="hst"><div className="hst-n">30+</div><div className="hst-l">Regs mapped</div></div>
      </div>
      <div className="h-btns">
        <Link href="/demo" className="btn btn-gold btn-lg">Demo</Link>
        <a href="#cta" className="btn btn-ghost btn-lg">Request access</a>
      </div>
    </div>
  </div>
</section>


{/* ── SCROLL-REVEAL ────────────────────────────────────── */}
<section id="sr-section">
  <div className="sr-sticky" id="srSticky">
    <div className="sr-left" id="srL">
      <span className="sr-tag">Compliance infrastructure</span>
      <div className="sr-txt">Banking products<br />made <em>compliant</em></div>
    </div>
    <div className="sr-right" id="srR">
      <span className="sr-tag">For every LLM channel</span>
      <div className="sr-txt"><em>CADON</em></div>
    </div>
    <div className="sr-seed" id="srSeed">
      <div className="sr-seed-icon">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <rect x="2"  y="2"  width="6" height="6" rx="1.5" fill="#0D0E09" opacity=".85"/>
          <rect x="12" y="2"  width="6" height="6" rx="1.5" fill="#0D0E09" opacity=".3"/>
          <rect x="2"  y="12" width="6" height="6" rx="1.5" fill="#0D0E09" opacity=".3"/>
          <rect x="12" y="12" width="6" height="6" rx="1.5" fill="#4F6EF7" opacity=".9"/>
        </svg>
      </div>
      <div className="sr-seed-lbl" id="srSeedLbl">exec.cadon.io</div>
    </div>

    <div className="sr-popup-wrap" id="srPopup">
      <div className="pc">
        <div className="pc-head">
          <div className="pc-top">
            <div className="pc-brand">
              <div className="pc-logo">B</div>
              <div>
                <div className="pc-bname">Bank AI × CADON</div>
                <div className="pc-bsub">exec.cadon.io · TLS 1.3 · PSD2/GDPR/DORA</div>
              </div>
            </div>
            <div className="pc-ctrls">
              <div className="pc-pause">⏸ Pause</div>
              <div className="pc-x">✕</div>
            </div>
          </div>
          <div className="pc-steps-row">
            <div className="pc-dot done">✓</div><div className="pc-line done"></div>
            <div className="pc-dot done">✓</div><div className="pc-line done"></div>
            <div className="pc-dot active">3</div><div className="pc-line pending"></div>
            <div className="pc-dot pending">4</div>
          </div>
          <div className="pc-slabels">
            <span className="pc-slbl done">Intent</span>
            <span className="pc-slbl done">Identity</span>
            <span className="pc-slbl active">Details</span>
            <span className="pc-slbl">Consent</span>
          </div>
          <div className="pc-sess">
            <span className="pc-sess-t">🔒 Secure session</span>
            <span className="pc-sess-ttl" id="srTtl">19:47</span>
          </div>
        </div>
        <div className="pc-body">
          <div className="pc-title">Your loan details</div>
          <div className="pc-sub">Shared only with the bank — the AI never sees this data.</div>
          <div className="pc-amt">
            <div className="pc-amt-n" id="srAmt">€8,000</div>
            <div className="pc-amt-l">Requested loan amount</div>
            <div className="pc-pills">
              <span className="pc-pill">24 months</span>
              <span className="pc-pill">~€365/mo</span>
              <span className="pc-pill">4.9% APR</span>
            </div>
          </div>
          <div className="pc-rows">
            <div className="pc-row"><span className="pc-row-ico">🪪</span><span className="pc-row-txt">Full name &amp; date of birth</span><span className="pc-row-tag">Mandatory</span></div>
            <div className="pc-row"><span className="pc-row-ico">💼</span><span className="pc-row-txt">Employment status &amp; income range</span><span className="pc-row-tag">Mandatory</span></div>
            <div className="pc-row gr"><span className="pc-row-ico">🛡️</span><span className="pc-row-txt">CADON security &amp; fraud check</span><span className="pc-row-ok">✅ Passed</span></div>
          </div>
          <div className="pc-note">🔒 The AI only receives a pass/fail signal. Your data stays entirely inside this secure CADON session.</div>
          <button className="pc-btn">Review &amp; give consent →</button>
        </div>
      </div>
    </div>

    <div className="sr-bottom" id="srBot">
      <p>CADON is live. <a href="#cta">Request access →</a></p>
    </div>
    <div className="sr-cue" id="srCue">
      <span>Scroll</span><div className="sr-cue-line"></div>
    </div>
  </div>
</section>


{/* ── PROBLEM ──────────────────────────────────────────── */}
<section id="problem">
  <div className="wrap">
    <span className="slbl">The problem</span>
    <h2 className="stitle" style={{ maxWidth: 600, color: '#f0f1ea' }}>
      LLMs are already inside your customers' financial <em>conversations.</em>
    </h2>
    <div className="pgrid">
      <div className="pcard reveal">
        <div className="pn">01</div>
        <h3>You can't close a product inside a chatbot</h3>
        <p>Millions of users ask LLMs about loans, mortgages, and insurance every day. When they're ready to apply, they're redirected elsewhere. Intent dies. Conversion is lost.</p>
      </div>
      <div className="pcard reveal" style={{ transitionDelay: '.1s' }}>
        <div className="pn">02</div>
        <h3>Compliance makes it nearly impossible</h3>
        <p>GDPR, PSD2, DORA, the AI Act, FCA Consumer Duty — none were designed for LLM channels. Building a compliant execution layer takes 18 months and a team of lawyers.</p>
      </div>
      <div className="pcard reveal" style={{ transitionDelay: '.2s' }}>
        <div className="pn">03</div>
        <h3>Personal data must never reach the LLM</h3>
        <p>No bank can allow an LLM to handle KYC data, consent records, or application data. The architecture to prevent this must come first. CADON already has it.</p>
      </div>
    </div>
  </div>
</section>


{/* ── ANIM 1 — Who it's for ────────────────────────────── */}
<section id="anim1">
  <div className="wrap">
    <div className="a1layout">
      <div className="a1left">
        <span className="slbl">Who it's for</span>
        <h2>One layer.<br />Every <em>party</em><br />in the chain.</h2>
        <p>CADON connects banks, developers, fintechs, and end users into a single compliant execution flow.</p>
        <div className="rtabs" id="roleTabs">
          {ROLES.map((r) => (
            <div
              key={r.id}
              className={`rtab${activeRole === r.id ? " active" : ""}`}
              data-role={r.id}
              onClick={() => setActiveRole(r.id)}
            >
              <span className="rtdot"></span>
              <span className="rtnm">{r.name}</span>
              <span className="rtsub">{r.sub}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="a1vis">
        {/* Bank scene */}
        <div className={`rscene${activeRole === "bank" ? " active" : ""}`} id="scene-bank">
          <div className="bsi">
            <div className="bshdr">
              <div className="bsico">🏦</div>
              <div>
                <div className="bst">Bank AI × CADON</div>
                <div className="bss">Live execution dashboard</div>
              </div>
            </div>
            <div className="bsrows">
              <div className="bsrow"><span className="bsrl">Applications today</span><span className="bsrv gr">847</span></div>
              <div className="bsrow"><span className="bsrl">Conversion rate</span><span className="bsrv go">68.4%</span></div>
              <div className="bsrow"><span className="bsrl">Data to LLM</span><span className="bsrv gr">0 fields</span></div>
              <div className="bsrow"><span className="bsrl">Compliance status</span><span className="bsrv gr">✓ Active</span></div>
            </div>
            <div className="bssig"><span className="sigdot"></span><span>Secure session · exec.cadon.io</span></div>
          </div>
        </div>

        {/* Dev scene */}
        <div className={`rscene${activeRole === "dev" ? " active" : ""}`} id="scene-dev">
          <div className="dterm">
            <div className="dtbar">
              <span className="dtd"></span><span className="dtd"></span><span className="dtd"></span>
              <span className="dtfn">cadon_integration.py</span>
            </div>
            <div className="dtbody">
              <span className="tc"># Trigger CADON on intent</span><br />
              <span className="tf">session = cadon.create_session(</span><br />
              <span className="ts">{"  "}token=SESSION_TOKEN,</span><br />
              <span className="tg">{"  "}intent=<span className="ts">"personal_loan"</span>,</span><br />
              <span className="tg">{"  "}amount=<span className="ts">8000</span></span><br />
              <span className="tf">)</span><br /><br />
              <span className="tc"># Zero personal data sent — ever</span><br />
              <span className="tr">return session.url</span>
            </div>
          </div>
        </div>

        {/* Fintech scene */}
        <div className={`rscene${activeRole === "fintech" ? " active" : ""}`} id="scene-fintech">
          <div className="ffow">
            <div className="fflbl">EMBEDDED FINANCE FLOW</div>
            <div className="ffnodes">
              <div className="ffnode"><span className="ffnico">💬</span><div><div className="ffntit">User expresses intent</div><div className="ffnsub">Inside your AI product</div></div><span className="ffbdg bl">Your platform</span></div>
              <div className="ffarr">↓</div>
              <div className="ffnode"><span className="ffnico">📡</span><div><div className="ffntit">CADON API call</div><div className="ffnsub">Zero personal data sent</div></div><span className="ffbdg go">CADON</span></div>
              <div className="ffarr">↓</div>
              <div className="ffnode"><span className="ffnico">🔒</span><div><div className="ffntit">Secure pop-up opens</div><div className="ffnsub">Bank-branded, isolated</div></div><span className="ffbdg go">CADON</span></div>
              <div className="ffarr">↓</div>
              <div className="ffnode"><span className="ffnico">✅</span><div><div className="ffntit">Status returned</div><div className="ffnsub">&#123;"status":"success"&#125; only</div></div><span className="ffbdg gr">Clean</span></div>
            </div>
          </div>
        </div>

        {/* User scene */}
        <div className={`rscene${activeRole === "user" ? " active" : ""}`} id="scene-user">
          <div className="uchat">
            <div className="uchdr">
              <div className="ucav">🤖</div>
              <div>
                <div className="ucnm">Bank AI Assistant</div>
                <div className="ucst">● Powered by CADON</div>
              </div>
            </div>
            <div className="ucmsgs">
              <div className="ucmsg u">I'd like a personal loan of €8,000</div>
              <div className="ucmsg a">I found 4 banks. Opening a secure session — your data stays private from me.</div>
              <div className="minipop">
                <div className="mptop">
                  <div className="mplogo">C</div>
                  <div className="mpnm">Bank AI × CADON</div>
                  <div className="mpbdg">SECURED</div>
                </div>
                <div className="mpprog">
                  <div className="mps done"></div>
                  <div className="mps done"></div>
                  <div className="mps done"></div>
                  <div className="mps"></div>
                </div>
                <div className="mptxt">Identity verified · Reviewing consent…</div>
                <button className="mpbtn">Submit application →</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


{/* ── ANIM 2 — Integration ─────────────────────────────── */}
<section id="anim2">
  <div className="wrap">
    <div className="a2layout">
      <div>
        <span className="slbl" style={{ color: 'rgba(196,165,90,.52)' }}>Integration</span>
        <div className="cptabs" style={{ margin: '13px 0 20px' }}>
          {(["trigger", "bank", "result"] as CodeKey[]).map((key, i) => (
            <div
              key={key}
              className={`cptab${activeCode === key ? " active" : ""}`}
              onClick={() => setActiveCode(key)}
            >
              {["Trigger session", "Bank receives KYC", "Receive result"][i]}
            </div>
          ))}
        </div>
        <div className="cpane">
          <div className="cpbar">
            <span className="cpd"></span><span className="cpd"></span><span className="cpd"></span>
            <span className="cpfile">{CODE_TABS[activeCode].file}</span>
          </div>
          <div className="cpbody">
            {CODE_TABS[activeCode].lines.map((line, i) => (
              <div key={i} className={`cline vis ${line.cls}`}>{line.text || "\u00A0"}</div>
            ))}
          </div>
        </div>
      </div>

      <div className="a2r">
        <h2>One API call.<br /><em>Everything</em><br />handled.</h2>
        <p>Banks integrate CADON as a DORA Art. 30-compliant ICT third-party service provider. GDPR Art. 28 DPA template included from day one.</p>
        <div className="fsteps">
          {[
            { n: "01", h: "Trigger the session",      b: "One API call with session token and product intent. Zero personal data. Ever." },
            { n: "02", h: "Bank performs KYC & consent", b: "CADON pop-up handles identity, consent, and application capture in isolation." },
            { n: "03", h: "Receive clean result",     b: "Status signal returned. Audit log written. Personal data never crosses back." },
          ].map((step, i) => (
            <div
              key={i}
              className={`fstep${activeCode === (["trigger","bank","result"] as CodeKey[])[i] ? "" : " dim"}`}
              onClick={() => setActiveCode((["trigger","bank","result"] as CodeKey[])[i])}
            >
              <span className="fsn">{step.n}</span>
              <div><h4>{step.h}</h4><p>{step.b}</p></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
</section>


{/* ── PRODUCT ──────────────────────────────────────────── */}
<section id="product">
  <div className="wrap">
    <div className="prodlayout">
      <div>
        <span className="slbl">The product</span>
        <h2 className="stitle">The execution layer banking <em>needed.</em></h2>
        <p className="sbody">When a user expresses financial intent in any AI conversation, CADON triggers a secure, bank-branded pop-up. Identity verification, consent capture, and application submission happen in a fully isolated environment. The LLM receives only a status signal.</p>
        <p className="sbody" style={{ marginTop: 11 }}>Think of it as Stripe Checkout for bank products in AI conversations. The bank controls everything inside it. CADON is the container. The bank is the controller.</p>
        <div className="mrow" style={{ marginTop: 24 }}>
          <div className="met">
            <div className="metn">30<span style={{ fontSize: 16, verticalAlign: 'super' }}>s</span></div>
            <div className="metl">Average user<br />completion</div>
          </div>
          <div className="met">
            <div className="metn">0</div>
            <div className="metl">Personal data fields<br />reaching the LLM</div>
          </div>
          <div className="met">
            <div className="metn">30+</div>
            <div className="metl">EU &amp; UK regulations<br />mapped</div>
          </div>
        </div>
      </div>

      <div className="pillars reveal">
        <div className="pillar"><div className="pillar-ico">🪪</div><div className="pillar-t">Identity &amp; consent capture</div><div className="pillar-b">Bank-directed pop-up handles KYC, biometric auth, and GDPR Art. 7-compliant consent — isolated from the LLM.</div></div>
        <div className="pillar"><div className="pillar-ico">⚖️</div><div className="pillar-t">Compliance by architecture</div><div className="pillar-b">GDPR, DORA, PSD2, AI Act, FCA Consumer Duty — enforced at protocol level. Not by policy. By how the system is built.</div></div>
        <div className="pillar"><div className="pillar-ico">🔌</div><div className="pillar-t">Any product, any bank system</div><div className="pillar-b">Consumer credit, mortgages, insurance, investments — CADON adapts to any product schema without rearchitecting.</div></div>
        <div className="pillar"><div className="pillar-ico">📋</div><div className="pillar-t">Full audit infrastructure</div><div className="pillar-b">Immutable consent records and session logs. Structured for DORA Art. 30, GDPR Art. 30, and FCA supervisory inspection.</div></div>
      </div>
    </div>
  </div>
</section>


{/* ── HOW ──────────────────────────────────────────────── */}
<section id="how">
  <div className="wrap">
    <span className="slbl">How it works</span>
    <h2 className="stitle">Five steps.<br />One compliant <em>execution.</em></h2>
    <div className="srow">
      <div className="sline"></div>
      <div className="scol reveal"><div className="snum">01</div><h3>User expresses intent</h3><p>Natural language, any AI interface. Loan, mortgage, insurance.</p></div>
      <div className="scol reveal" style={{ transitionDelay: '.08s' }}><div className="snum">02</div><h3>CADON is called</h3><p>Single API call. Session token + intent only. Zero personal data.</p></div>
      <div className="scol reveal" style={{ transitionDelay: '.16s' }}><div className="snum">03</div><h3>Secure pop-up opens</h3><p>Bank-branded, isolated. Identity, consent, and application captured.</p></div>
      <div className="scol reveal" style={{ transitionDelay: '.24s' }}><div className="snum">04</div><h3>Bank receives data</h3><p>Verified application transmitted directly. CADON does not retain it.</p></div>
      <div className="scol reveal" style={{ transitionDelay: '.32s' }}><div className="snum">05</div><h3>Status returned</h3><p><code style={{ fontFamily: 'var(--mono)', fontSize: '10.5px', background: '#EBEBEB', padding: '2px 5px', borderRadius: 3 }}>&#123;"status":"success"&#125;</code></p></div>
    </div>
  </div>
</section>


{/* ── ANIM 3 — Use cases ───────────────────────────────── */}
<section id="anim3">
  <div className="a3wrap">
    <span className="slbl">Use cases</span>
    <h2>Every financial product,<br /><em>every</em> conversation.</h2>
  </div>
  <div className="ucsroll" style={{ position: 'relative' }}>
    <div className="ucfl"></div>
    <div className="uct" id="uct1">
      {USE_CASES.map((uc, i) => (
        <div key={i} className={`uccard${uc.hl ? " hl" : ""}`}>
          <div className="uccinner">
            <div className="uctop">
              <span className="uco">{uc.icon}</span>
              <span className="ucbdg">{uc.badge}</span>
            </div>
            <div>
              <div className="ucnm">{uc.name}</div>
              <div className="ucmt">{uc.meta}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
    <div className="uct2" id="uct2">
      {USE_CASES.map((uc, i) => (
        <div key={i} className={`uccard${uc.hl ? " hl" : ""}`}>
          <div className="uccinner">
            <div className="uctop">
              <span className="uco">{uc.icon}</span>
              <span className="ucbdg">{uc.badge}</span>
            </div>
            <div>
              <div className="ucnm">{uc.name}</div>
              <div className="ucmt">{uc.meta}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
    <div className="ucfr"></div>
  </div>
</section>


{/* ── WHY ──────────────────────────────────────────────── */}
<section id="why">
  <div className="wrap">
    <div className="whead">
      <span className="slbl">Why CADON</span>
      <h2 className="stitle">Compliance isn't a feature.<br />It's the <em>foundation.</em></h2>
      <p className="sbody" style={{ maxWidth: 400 }}>Every other approach treats compliance as something to navigate around. CADON treats it as the architecture itself.</p>
    </div>
    <div className="dgrid">
      <div className="dcell reveal"><div className="dcell-ico">🚫</div><h3>Zero-data LLM boundary</h3><p>The LLM never receives a name, income, ID, or outcome. Enforced cryptographically — not by policy.</p><div className="dcell-tag">GDPR · Schrems II · AI Act</div></div>
      <div className="dcell reveal" style={{ transitionDelay: '.06s' }}><div className="dcell-ico">🏛️</div><h3>Bank-directed by design</h3><p>The bank controls the data schema, consent language, product content, and retention period. CADON is the container.</p><div className="dcell-tag">GDPR Art. 28 · PSD2 · FCA</div></div>
      <div className="dcell reveal" style={{ transitionDelay: '.12s' }}><div className="dcell-ico">🧬</div><h3>Regulation-native</h3><p>30 frameworks mapped. Architecturally addressed. CADON was designed around the full EU &amp; UK stack from commit one.</p><div className="dcell-tag">DORA · NIS2 · CRA · ePrivacy</div></div>
      <div className="dcell reveal" style={{ transitionDelay: '.18s' }}><div className="dcell-ico">🔗</div><h3>One integration, every product</h3><p>Consumer credit, mortgages, investments, insurance — same integration, different schemas. No new compliance work.</p><div className="dcell-tag">CCD2 · MCD · MiFID II · IDD</div></div>
      <div className="dcell reveal" style={{ transitionDelay: '.24s' }}><div className="dcell-ico">📁</div><h3>Full audit infrastructure</h3><p>Every session logged: timestamp, intent, consent evidence, outcome. Structured for DORA Art. 30 and FCA inspection.</p><div className="dcell-tag">DORA Art. 30 · GDPR Art. 30</div></div>
      <div className="dcell reveal" style={{ transitionDelay: '.3s' }}><div className="dcell-ico">⚖️</div><h3>Non-regulated positioning</h3><p>CADON is a technical service provider. Not a credit broker. Not a payment initiator. The architecture enforces this.</p><div className="dcell-tag">PSD2 Art. 3(j) · FSMA · FCA</div></div>
    </div>
  </div>
</section>


{/* ── VALUES ───────────────────────────────────────────── */}
<section id="values">
  <div className="wrap">
    <div className="vlayout">
      <div>
        <span className="slbl">Principles</span>
        <h2 className="stitle">Designed for banks.<br />Built for <em>regulators.</em></h2>
      </div>
      <div className="vrows">
        <div className="vrow reveal"><h3>Controlled</h3><div><div className="vtag">The bank is in charge. Always.</div><div className="vdesc">Every element of the execution pop-up is set by the bank. CADON executes the instruction. The bank gives it.</div></div></div>
        <div className="vrow reveal" style={{ transitionDelay: '.08s' }}><h3>Isolated</h3><div><div className="vtag">Personal data never crosses the boundary.</div><div className="vdesc">The LLM environment is a zero-data zone. This is a cryptographic constraint. Identity and application data live only in CADON's secure layer and the bank's systems.</div></div></div>
        <div className="vrow reveal" style={{ transitionDelay: '.16s' }}><h3>Evidenced</h3><div><div className="vtag">Every transaction is provable.</div><div className="vdesc">Immutable audit trails for every execution. When a regulator asks, the evidence is already structured, timestamped, and exportable.</div></div></div>
        <div className="vrow reveal" style={{ transitionDelay: '.24s' }}><h3>Scalable</h3><div><div className="vtag">One integration, infinite channels.</div><div className="vdesc">Banks integrate once. The same execution layer works across every AI channel, every product type, and every jurisdiction CADON supports.</div></div></div>
      </div>
    </div>
  </div>
</section>


{/* ── CTA ──────────────────────────────────────────────── */}
<section id="cta">
  <h2>Financial products,<br />inside every<br /><em>conversation.</em></h2>
  <p>Request early access for your bank, LLM platform, or fintech. Onboarding partners now across France, Belgium, Netherlands, and the UK.</p>
  <div className="ctaform">
    <input type="email" className="ctain" placeholder="you@bank.com" />
    <button className="btn btn-gold btn-lg">Request access →</button>
  </div>
</section>

    </>
  );
}
