"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { skills } from "@/data/career";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { useI18n } from "@/i18n/I18nProvider";
import { cn, EASE } from "@/lib/utils";

const SIZE = 560;
const C = SIZE / 2;
const R = 190;

const nodes = skills.map((g, i) => {
  const a = (i / skills.length) * Math.PI * 2 - Math.PI / 2;
  const x = C + Math.cos(a) * R;
  const y = C + Math.sin(a) * R;
  const leaves = g.items.map((_, j) => {
    const spread = Math.min(1.5, 0.22 * g.items.length);
    const la = a + (g.items.length === 1 ? 0 : (j / (g.items.length - 1) - 0.5) * spread);
    const lr = 46 + (j % 2) * 14;
    return { x: x + Math.cos(la) * lr, y: y + Math.sin(la) * lr };
  });
  return { ...g, x, y, leaves };
});

/** Constellation interactive des compétences. */
export function Skills({ headingAs = "h2" }: { headingAs?: "h1" | "h2" }) {
  const { t, tr } = useI18n();
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!auto || reduce) return;
    const id = setInterval(() => setActive((n) => (n + 1) % skills.length), 3200);
    return () => clearInterval(id);
  }, [auto, reduce]);

  const select = (i: number) => {
    setAuto(false);
    setActive(i);
  };

  const current = nodes[active];

  return (
    <section className="relative py-28 md:py-40" aria-label={t.skills.label}>
      <div className="container-x">
        <SectionHeading as={headingAs} index="03" label={t.skills.label} title={t.skills.title} description={t.skills.description} color="var(--color-cyan)" />

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
          <Reveal className="relative mx-auto w-full max-w-[560px]">
            <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="h-auto w-full overflow-visible" role="img" aria-label={t.skills.constellation}>
              <defs>
                <radialGradient id="core">
                  <stop offset="0" stopColor={current.color} stopOpacity="0.45" />
                  <stop offset="1" stopColor={current.color} stopOpacity="0" />
                </radialGradient>
              </defs>
              <circle cx={C} cy={C} r={R} fill="none" stroke="var(--line-strong)" strokeDasharray="2 6" />
              <circle cx={C} cy={C} r={R * 0.45} fill="none" stroke="var(--line)" />
              {nodes.map((n, i) => {
                const on = i === active;
                return (
                  <g key={n.key} className="transition-opacity duration-500" opacity={on ? 1 : 0.6}>
                    <line
                      x1={C}
                      y1={C}
                      x2={n.x}
                      y2={n.y}
                      stroke={on ? n.color : "var(--line-strong)"}
                      strokeWidth={on ? 1.5 : 1}
                      strokeDasharray={on ? "4 4" : undefined}
                      className={on && !reduce ? "[animation:dash_1s_linear_infinite]" : undefined}
                    />
                    {n.leaves.map((l, j) => (
                      <g key={j}>
                        <line x1={n.x} y1={n.y} x2={l.x} y2={l.y} stroke="var(--line)" />
                        <circle cx={l.x} cy={l.y} r={on ? 3.2 : 2.2} fill={n.color} opacity={on ? 1 : 0.55} className="transition-all duration-500" />
                      </g>
                    ))}
                    <g
                      role="button"
                      tabIndex={0}
                      aria-label={tr(n.label)}
                      aria-pressed={on}
                      className="cursor-pointer outline-none"
                      onClick={() => select(i)}
                      onPointerEnter={() => select(i)}
                      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && select(i)}
                    >
                      <circle
                        cx={n.x}
                        cy={n.y}
                        r={on ? 31 : 25}
                        fill="var(--surface)"
                        stroke={n.color}
                        strokeOpacity={on ? 1 : 0.45}
                        strokeWidth={on ? 1.5 : 1}
                        className="transition-all duration-500"
                      />
                      {on && <circle cx={n.x} cy={n.y} r={41} fill="none" stroke={n.color} strokeOpacity={0.3} />}
                      <text
                        x={n.x}
                        y={n.y + 3.5}
                        textAnchor="middle"
                        className={cn("pointer-events-none fill-fg font-mono uppercase", tr(n.label).length > 9 ? "text-[7px]" : "text-[9.5px] tracking-wider")}
                      >
                        {tr(n.label)}
                      </text>
                    </g>
                  </g>
                );
              })}
              <circle cx={C} cy={C} r={74} fill="url(#core)" />
              <circle cx={C} cy={C} r={34} fill="var(--surface)" stroke="var(--line-strong)" />
              <text x={C} y={C + 5} textAnchor="middle" className="fill-fg font-mono text-[15px] font-medium">
                RB
              </text>
            </svg>
            <style>{`@keyframes dash{to{stroke-dashoffset:-16}}`}</style>
          </Reveal>

          <div>
            <div role="tablist" aria-label={t.skills.categories} className="flex flex-wrap gap-2">
              {nodes.map((n, i) => (
                <button
                  key={n.key}
                  role="tab"
                  aria-selected={i === active}
                  onClick={() => select(i)}
                  className={cn(
                    "relative flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors duration-300",
                    i === active ? "border-transparent text-[var(--on-accent)]" : "border-line-strong text-muted hover:text-fg"
                  )}
                >
                  {i === active && (
                    <motion.span
                      layoutId="skill-pill"
                      className="absolute inset-0 rounded-full"
                      style={{ background: n.color }}
                      transition={{ type: "spring", stiffness: 400, damping: 34 }}
                    />
                  )}
                  {i !== active && <span className="relative h-1.5 w-1.5 rounded-full" style={{ background: n.color }} />}
                  <span className="relative font-medium">{tr(n.label)}</span>
                </button>
              ))}
            </div>

            <div role="tabpanel" className="mt-10 min-h-[260px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.key}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.45, ease: EASE }}
                >
                  <p className="label-mono" style={{ color: current.color }}>
                    {String(active + 1).padStart(2, "0")} / {String(nodes.length).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 text-4xl font-semibold tracking-[-0.04em]">{tr(current.label)}</h3>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {current.items.map((item, j) => (
                      <motion.li
                        key={item.en}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.05 * j, duration: 0.4, ease: EASE }}
                        className="rounded-lg border bg-surface px-3.5 py-2 text-sm"
                        style={{ borderColor: `color-mix(in srgb, ${current.color} 35%, var(--line-strong))` }}
                      >
                        {tr(item)}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
