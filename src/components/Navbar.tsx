"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const navLinks = [
    { name: "Integration", href: "#integration" },
    { name: "Product", href: "#product" },
    { name: "Why CADON", href: "#why" },
    { name: "Use cases", href: "#use-cases" },
    { name: "Demo", href: "/demo" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-[200] transition-all duration-300",
        scrolled
          ? "bg-white/80 backdrop-blur-xl border-b border-muted3 py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-2 h-2 rounded-full bg-gold transition-transform group-hover:scale-125" />
          <span className="font-serif text-xl font-medium tracking-tight text-ink">
            CADON
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-[13px] font-medium text-muted hover:text-ink transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/docs"
            className="text-[13px] font-medium text-ink px-4 py-2 rounded-full border border-muted2 hover:border-ink transition-all"
          >
            Docs
          </Link>
          <a
            href="#cta"
            className="bg-gold hover:bg-gold2 text-ink text-[13px] font-semibold px-6 py-2 rounded-full transition-all hover:-translate-y-px"
          >
            Request access
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-ink p-1"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 top-[60px] bg-white z-[190] md:hidden transition-transform duration-300",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col p-8 gap-6 bg-white shadow-sm">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-xl font-serif text-ink border-b border-muted3 pb-4"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="flex flex-col gap-4 mt-8">
            <a
              href="#cta"
              className="bg-gold text-ink text-center py-4 rounded-xl font-bold"
              onClick={() => setIsOpen(false)}
            >
              Request access
            </a>
            <Link
              href="/docs"
              className="border border-muted2 text-ink text-center py-4 rounded-xl font-bold"
              onClick={() => setIsOpen(false)}
            >
              Docs
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
