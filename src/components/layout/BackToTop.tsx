"use client";

import { ArrowUp } from "lucide-react";
import { getLenis } from "@/components/providers/SmoothScroll";

export function BackToTop({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={() => {
        const lenis = getLenis();
        if (lenis) lenis.scrollTo(0, { duration: 1.6 });
        else window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      className="group flex items-center gap-2 text-muted transition-colors hover:text-fg"
    >
      {label}
      <ArrowUp className="h-3.5 w-3.5 transition-transform duration-500 ease-out-expo group-hover:-translate-y-1" />
    </button>
  );
}
