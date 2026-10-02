"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
  accent?: string;
  tilt?: boolean;
};

/** Carte avec lumière qui suit le curseur + inclinaison 3D subtile. */
export function SpotlightCard({ children, className, accent, tilt = false }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    el.style.setProperty("--x", `${x}px`);
    el.style.setProperty("--y", `${y}px`);
    if (tilt) {
      const rx = ((y / r.height) - 0.5) * -4;
      const ry = ((x / r.width) - 0.5) * 4;
      el.style.transform = `perspective(1200px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    }
  };

  const onLeave = () => {
    if (ref.current && tilt) ref.current.style.transform = "";
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={accent ? ({ "--accent": accent } as React.CSSProperties) : undefined}
      className={cn(
        "spotlight rounded-2xl border border-line bg-surface transition-[transform,border-color] duration-500 ease-out-expo hover:border-line-strong",
        className
      )}
    >
      {children}
    </div>
  );
}
