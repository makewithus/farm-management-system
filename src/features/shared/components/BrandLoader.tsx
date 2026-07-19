"use client";

import { Sprout } from "lucide-react";

export function BrandLoader({ label = "Loading..." }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] w-full p-6">
      <div className="flex flex-col items-center gap-3.5">
        {/* Sleek, frameless animated brand icon */}
        <div className="relative w-10 h-10 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-2 border-[#2E3A1C]/10 border-t-[#2E3A1C] animate-spin"></div>
          <Sprout className="w-4.5 h-4.5 text-[#2E3A1C] animate-pulse" />
        </div>
        
        {/* Subtle, refined typography */}
        <span className="text-xs font-semibold text-[#2E3A1C]/65 tracking-tight">
          {label}
        </span>
      </div>
    </div>
  );
}
