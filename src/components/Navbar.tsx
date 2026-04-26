"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const navLinks = [
    { name: "Integration", href: "#anim2" },
    { name: "Product", href: "#product" },
    { name: "Use cases", href: "#anim3" },
    { name: "Why CADON", href: "#why" },
  ];

  return (
    <nav>
      <div className="nav-w">
        <Link href="/" className="logo">
          <div className="logo-mk">
            <svg viewBox="0 0 13 13" fill="none">
              <rect x="1" y="1" width="4.5" height="4.5" rx="1" fill="white" opacity=".9" />
              <rect x="7.5" y="1" width="4.5" height="4.5" rx="1" fill="white" opacity=".35" />
              <rect x="1" y="7.5" width="4.5" height="4.5" rx="1" fill="white" opacity=".35" />
              <rect x="7.5" y="7.5" width="4.5" height="4.5" rx="1" fill="#C4A55A" opacity=".95" />
            </svg>
          </div>
          CADON
        </Link>
        <div className="nav-links">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href}>
              {link.name}
            </Link>
          ))}
        </div>
        <div className="nav-r">
          
          <Link href="/demo" target="_blank" rel="noopener noreferrer" className="btn btn-gold">
            Demo
          </Link>
          <a href="#cta" className="btn btn-ghost" style={{ fontSize: "13px" }}>
            Request access
          </a>
        </div>
        
        {/* Mobile Toggle Button */}
        <div className="flex md:hidden ml-auto">
          <button
            onClick={() => setIsOpen((v) => !v)}
            className="flex items-center justify-center w-[36px] h-[36px] rounded-lg transition-colors hover:bg-black/[0.05] text-[#0D0E09]"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* MOBILE DRAWER OVERLAY */}
      <div
        className={cn(
          "fixed inset-0 top-[54px] md:hidden transition-all duration-300 ease-out z-[490]",
          "bg-white/[0.97] backdrop-blur-xl",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <div className="mobile-drawer bg-white shadow-sm">
          <div className="flex flex-col">
            {navLinks.map((link, i) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="mobile-drawer-link transition-all duration-300"
                style={{
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen ? "translateY(0)" : "translateY(10px)",
                  transitionDelay: isOpen ? `${55 + i * 38}ms` : "0ms",
                }}
              >
                {link.name}
                <span className="text-black/20 font-sans text-[14px]">→</span>
              </Link>
            ))}
          </div>
          <div
            className="mt-auto flex flex-col gap-3 pt-8 px-2 transition-all duration-300"
            style={{
              opacity: isOpen ? 1 : 0,
              transform: isOpen ? "translateY(0)" : "translateY(10px)",
              transitionDelay: isOpen ? `${50 + navLinks.length * 38 + 38}ms` : "0ms",
            }}
          >
            <a href="#cta" onClick={() => setIsOpen(false)} className="btn btn-ghost w-full justify-center py-4 text-[15px]">
              Request access
            </a>
            <Link href="/demo" target="_blank" rel="noopener noreferrer" onClick={() => setIsOpen(false)} className="btn btn-gold w-full justify-center py-4 text-[15px]">
              Demo
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
