"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { OFFERINGS, OFFERING_GROUPS } from "@/lib/offerings";

const companyLinks = [["Use cases", "/#use-cases"], ["Our approach", "/#approach"], ["About CADON", "/#about"]];
const financeLinks = [["Product", "/financial-services#product"], ["How it works", "/financial-services#how-it-works"], ["Developers", "/financial-services#developers"], ["Security", "/financial-services#security"]];

export default function Navbar({financial=false}:{financial?:boolean;dark?:boolean}={}) {
  const [mobileOpen,setMobileOpen] = useState(false);
  const [offeringsOpen,setOfferingsOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const firstOffering = useRef<HTMLAnchorElement>(null);
  const mobileTrigger = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cancelClose = () => {
    if(closeTimer.current !== null) clearTimeout(closeTimer.current);
    closeTimer.current = null;
  };
  useEffect(()=>()=>{if(closeTimer.current !== null) clearTimeout(closeTimer.current);},[]);
  const close = () => {cancelClose();setMobileOpen(false);setOfferingsOpen(false);};
  const contact=financial?"/financial-services#request-access":"/#request-access";

  return <header className="site-header company-header">
    <div className="container nav-row">
      <Link className="wordmark" href="/" aria-label="CADON home" onClick={close}><span className="brand-mark" aria-hidden="true">c</span>cadon<span className="brand-period">.</span></Link>
      <nav className="desktop-nav" aria-label="Main navigation">
        <div className="offerings-navigation"
          onPointerEnter={e=>{cancelClose();if(e.pointerType!=="touch")setOfferingsOpen(true);}}
          onPointerLeave={e=>{
            if(e.currentTarget.contains(document.activeElement))return;
            cancelClose();
            closeTimer.current=setTimeout(()=>{setOfferingsOpen(false);closeTimer.current=null;},250);
          }}
          onBlur={e=>{if(!e.currentTarget.contains(e.relatedTarget)){cancelClose();setOfferingsOpen(false);}}}
          onKeyDown={e=>{if(e.key==="Escape"){e.preventDefault();e.stopPropagation();cancelClose();setOfferingsOpen(false);trigger.current?.focus();}}}>
          <button ref={trigger} className="offerings-trigger" aria-expanded={offeringsOpen} aria-controls={offeringsOpen?"desktop-offerings":undefined}
            onClick={()=>{cancelClose();setOfferingsOpen(value=>!value);}}
            onKeyDown={e=>{if(e.key==="ArrowDown"){e.preventDefault();setOfferingsOpen(true);requestAnimationFrame(()=>firstOffering.current?.focus());}}}>
            Core Offerings <ChevronDown size={14} aria-hidden="true"/>
          </button>
          {offeringsOpen&&<div className="mega-panel" id="desktop-offerings"><div className="container mega-grid">
            {OFFERING_GROUPS.map(group=><section key={group} aria-label={group}><h2>{group}</h2><div>{OFFERINGS.filter(offering=>offering.group===group).map(offering=><Link ref={offering.slug==="data-analytics"?firstOffering:undefined} key={offering.slug} href={offering.href} onClick={close}>{offering.title}</Link>)}</div></section>)}
          </div></div>}
        </div>
        {companyLinks.map(([label,href])=><Link href={href} key={href}>{label}</Link>)}
      </nav>
      <div className="nav-actions"><Link className="button small" href={contact} onClick={close}>{financial?"Request access":"Discuss a project"}</Link><button ref={mobileTrigger} className="menu-toggle" aria-label={mobileOpen?"Close menu":"Open menu"} aria-expanded={mobileOpen} aria-controls={mobileOpen?"mobile-nav":undefined} onClick={()=>{setMobileOpen(value=>!value);setOfferingsOpen(false);}}>{mobileOpen?<X aria-hidden="true"/>:<Menu aria-hidden="true"/>}</button></div>
    </div>
    {mobileOpen&&<nav id="mobile-nav" className="mobile-nav" aria-label="Mobile navigation" onKeyDown={e=>{if(e.key==="Escape"){close();mobileTrigger.current?.focus();}}}>
      <button className="mobile-offerings-trigger" aria-expanded={offeringsOpen} aria-controls={offeringsOpen?"mobile-offerings":undefined} onClick={()=>{cancelClose();setOfferingsOpen(value=>!value);}}>Core Offerings <ChevronDown size={16} aria-hidden="true"/></button>
      {offeringsOpen&&<div id="mobile-offerings" className="mobile-offerings">{OFFERINGS.map(offering=><Link key={offering.slug} href={offering.href} onClick={close}>{offering.title}</Link>)}</div>}
      {companyLinks.map(([label,href])=><Link key={href} href={href} onClick={close}>{label}</Link>)}
    </nav>}
    {financial&&<nav className="finance-subnav" aria-label="Financial services navigation"><div className="container"><span>Financial Services</span>{financeLinks.map(([label,href])=><Link href={href} key={href}>{label}</Link>)}<Link href="/demo">Demo</Link></div></nav>}
  </header>;
}
