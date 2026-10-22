"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { gsap } from "gsap";
import { ArrowUpRight } from "lucide-react";
import { projects, projectIndex } from "@/data/projects";
import { ProductMockup } from "@/components/project/ProductMockup";
import { StatusBadge } from "@/components/project/StatusBadge";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { useI18n } from "@/i18n/I18nProvider";
import { EASE } from "@/lib/utils";

/** Index complet des projets avec aperçu flottant qui suit le curseur (desktop). */
export function SelectedWork() {
  const { t, tr, href } = useI18n();
  const [active, setActive] = useState<number | null>(null);
  const preview = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = preview.current;
    if (!el || !window.matchMedia("(pointer: fine)").matches) return;
    const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3" });
    const move = (e: PointerEvent) => {
      xTo(e.clientX + 32);
      yTo(e.clientY - 120);
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, []);

  return (
    <section className="relative py-28 md:py-40" aria-label={t.work.label}>
      <div className="container-x">
        <SectionHeading index="05" label={t.work.label} title={t.work.title(projects.length)} description={t.work.description} color="var(--color-amber)" />

        <Stagger className="mt-16 border-t border-line" stagger={0.05}>
          {projects.map((p, i) => (
            <StaggerItem key={p.slug}>
              <Link
                href={href(`/projects/${p.slug}`)}
                data-cursor={t.ui.cursor.open}
                onPointerEnter={() => setActive(i)}
                onPointerLeave={() => setActive(null)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                style={{ "--c": p.accent } as React.CSSProperties}
                className="group relative grid grid-cols-[2.5rem_1fr_auto] items-center gap-4 border-b border-line py-6 md:grid-cols-[4rem_1.1fr_1fr_14rem] md:py-7"
              >
                <span
                  aria-hidden
                  className="absolute inset-0 origin-bottom scale-y-0 transition-transform duration-500 ease-out-expo group-hover:scale-y-100"
                  style={{ background: `color-mix(in srgb, ${p.accent} 9%, transparent)` }}
                />
                <span className="relative font-mono text-xs text-dim transition-colors group-hover:text-[var(--c)]">{projectIndex(p.slug)}</span>
                <span className="relative">
                  <span className="block text-[clamp(1.5rem,3.2vw,2.6rem)] font-semibold tracking-[-0.04em] transition-transform duration-500 ease-out-expo group-hover:translate-x-2">
                    {p.name}
                  </span>
                  <span className="mt-2 block md:hidden">
                    <StatusBadge project={p} compact />
                  </span>
                </span>
                <span className="relative hidden text-sm text-muted md:block">{tr(p.category)}</span>
                <span className="relative flex items-center justify-end gap-3">
                  <span className="hidden md:block">
                    <StatusBadge project={p} compact />
                  </span>
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line-strong transition-all duration-500 ease-out-expo group-hover:border-transparent group-hover:bg-[var(--c)] group-hover:text-[var(--on-accent)]">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>

      <div ref={preview} aria-hidden className="pointer-events-none fixed left-0 top-0 z-40 hidden w-[340px] [@media(pointer:fine)]:block">
        <AnimatePresence>
          {active !== null && (
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 0.85, rotate: -3, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, rotate: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
              transition={{ duration: 0.5, ease: EASE }}
              className="absolute inset-x-0"
            >
              <ProductMockup project={projects[active]} compact />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
