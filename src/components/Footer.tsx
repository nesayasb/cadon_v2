import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-ink border-t border-white/5 py-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-gold" />
          <span className="font-serif text-lg font-medium text-white tracking-tight">
            CADON
          </span>
        </div>

        <div className="flex gap-8">
          {["Product", "Docs", "Security", "Privacy", "Contact"].map((link) => (
            <Link
              key={link}
              href="#"
              className="text-[13px] text-white/30 hover:text-white transition-colors"
            >
              {link}
            </Link>
          ))}
        </div>

        <span className="text-xs text-white/20">
          © {new Date().getFullYear()} CADON. All rights reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
