"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function DemoPage() {
  const [timestamp, setTimestamp] = useState<number | null>(null);

  useEffect(() => {
    // Lock scroll on the parent Next.js page so the iframe takes full control
    document.body.style.overflow = "hidden";
    setTimestamp(Date.now());
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="w-full h-[100dvh] relative overflow-hidden bg-[#212121]">
      {timestamp && (
        <iframe 
          src={`/demo-app.html?v=${timestamp}`}
          className="w-full h-full border-none block"
          title="CADON Secure Execution Demo"
          allow="camera; microphone; geolocation"
        />
      )}
    </div>
  );
}
