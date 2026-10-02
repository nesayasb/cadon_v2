"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
const links = [["Product", "product"], ["How it works", "how-it-works"], ["Developers", "developers"], ["Security", "security"]];
export default function Navbar() {
  const [open, setOpen] = useState(false);
  return <header className="site-header"><div className="container nav-row"><Link className="wordmark" href="/" aria-label="CADON home"><span className="brand-mark" aria-hidden="true">c</span>cadon<span className="brand-period">.</span></Link><nav className="desktop-nav" aria-label="Main navigation">{links.map(([label,id])=><a href={`/#${id}`} key={id}>{label}</a>)}</nav><div className="nav-actions"><Link href="/demo" className="nav-demo">Demo</Link><Link className="button small" href="/#request-access">Request access</Link><button className="menu-toggle" aria-label={open?"Close menu":"Open menu"} aria-expanded={open} aria-controls="mobile-nav" onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button></div></div>{open&&<nav id="mobile-nav" className="mobile-nav" aria-label="Mobile navigation" onKeyDown={e=>{if(e.key==="Escape")setOpen(false)}}>{links.map(([label,id])=><a key={id} href={`/#${id}`} onClick={()=>setOpen(false)}>{label}</a>)}<Link onClick={()=>setOpen(false)} href="/demo">Live demo</Link></nav>}</header>;
}
