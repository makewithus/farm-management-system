import * as React from "react";

export function Skeleton({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`animate-pulse rounded-lg bg-[#2E3A1C]/10 border border-[#E3E4D6]/40 ${className}`}
      {...props}
    />
  );
}
