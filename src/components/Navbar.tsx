"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
const companyLinks = [["Core offerings", "/#services"], ["Use cases", "/#use-cases"], ["Our approach", "/#approach"], ["About CADON", "/#about"]];
const financeLinks = [["Product", "/financial-services#product"], ["How it works", "/financial-services#how-it-works"], ["Developers", "/financial-services#developers"], ["Security", "/financial-services#security"]];
export default function Navbar({financial=false,dark=false}:{financial?:boolean;dark?:boolean}={}) {
  const [open, setOpen] = useState(false);
  const links=financial?financeLinks:companyLinks;
  const contact=financial?"/financial-services#request-access":"/#request-access";
  return <header className={`site-header${dark?" company-header":""}`}><div className="container nav-row"><Link className="wordmark" href="/" aria-label="CADON home" onClick={()=>setOpen(false)}><span className="brand-mark" aria-hidden="true">c</span>cadon<span className="brand-period">.</span></Link><nav className="desktop-nav" aria-label={financial?"Financial services navigation":"Main navigation"}>{links.map(([label,href])=><Link href={href} key={href}>{label}</Link>)}</nav><div className="nav-actions">{financial&&<Link href="/demo" className="nav-demo">Demo</Link>}<Link className="button small" href={contact} onClick={()=>setOpen(false)}>{financial?"Request access":"Discuss a project"}</Link><button className="menu-toggle" aria-label={open?"Close menu":"Open menu"} aria-expanded={open} aria-controls={open?"mobile-nav":undefined} onClick={()=>setOpen(!open)}>{open?<X aria-hidden="true"/>:<Menu aria-hidden="true"/>}</button></div></div>{open&&<nav id="mobile-nav" className="mobile-nav" aria-label="Mobile navigation" onKeyDown={e=>{if(e.key==="Escape")setOpen(false)}}>{links.map(([label,href])=><Link key={href} href={href} onClick={()=>setOpen(false)}>{label}</Link>)}{financial&&<Link onClick={()=>setOpen(false)} href="/demo">Live demo</Link>}</nav>}</header>;
}
