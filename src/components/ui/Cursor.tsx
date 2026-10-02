"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";

/** Anneau qui suit le curseur (desktop uniquement). Le curseur natif reste visible. */
export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(false);
  const [label, setLabel] = useState("");

  useEffect(() => {
    const ok =
      window.matchMedia("(pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!ok || !ref.current) return;
    setEnabled(true);

    const el = ref.current;
    const xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3" });

    const move = (e: PointerEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      setVisible(true);
    };
    const over = (e: PointerEvent) => {
      const t = (e.target as HTMLElement).closest<HTMLElement>("a, button, [data-cursor]");
      setActive(!!t);
      setLabel(t?.dataset.cursor ?? "");
    };
    const leave = () => setVisible(false);

    window.addEventListener("pointermove", move);
    document.addEventListener("pointerover", over);
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className={cn("pointer-events-none fixed left-0 top-0 z-[150]", !enabled && "hidden")}
    >
      <div
        className={cn(
          "flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border backdrop-blur-[2px] transition-[width,height,background-color,border-color,opacity] duration-500 ease-out-expo",
          visible ? "opacity-100" : "opacity-0",
          label
            ? "h-20 w-20 border-transparent bg-fg text-bg"
            : active
              ? "h-11 w-11 border-accent/70 bg-accent/10"
              : "h-7 w-7 border-fg/30"
        )}
      >
        {label && <span className="font-mono text-[10px] uppercase tracking-wider">{label}</span>}
      </div>
    </div>
  );
}
