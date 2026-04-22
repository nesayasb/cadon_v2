"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function DemoPage() {
  useEffect(() => {
    // Lock scroll on the parent Next.js page so the iframe takes full control
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="w-full h-[100dvh] relative overflow-hidden bg-[#212121]">
      <iframe 
        src={`/demo-app.html?v=${Date.now()}`}
        className="w-full h-full border-none block"
        title="CADON Secure Execution Demo"
        allow="camera; microphone; geolocation"
      />
    </div>
  );
}
