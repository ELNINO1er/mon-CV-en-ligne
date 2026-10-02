"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { projects, projectIndex, type Kind } from "@/data/projects";
import { ProductMockup } from "./ProductMockup";
import { StatusBadge } from "./StatusBadge";
import { useI18n } from "@/i18n/I18nProvider";
import { cn, EASE } from "@/lib/utils";

const filters: ("all" | Kind)[] = ["all", "saas", "ecommerce", "platform", "web"];

export function ProjectsGrid() {
  const { t, tr, href } = useI18n();
  const [filter, setFilter] = useState<(typeof filters)[number]>("all");
  const list = filter === "all" ? projects : projects.filter((p) => p.kind === filter);

  return (
    <section className="container-x pb-32" aria-label={t.projectsPage.label}>
      <div className="mb-12 flex flex-wrap items-center justify-between gap-4">
        <div role="group" aria-label="Filtres" className="flex flex-wrap gap-2">
          {filters.map((f) => {
            const n = f === "all" ? projects.length : projects.filter((p) => p.kind === f).length;
            return (
              <button
                key={f}
                type="button"
                aria-pressed={filter === f}
                onClick={() => setFilter(f)}
                className={cn(
                  "relative rounded-full border px-4 py-2 text-sm transition-colors duration-300",
                  filter === f ? "border-transparent text-bg" : "border-line-strong text-muted hover:text-fg"
                )}
              >
                {filter === f && (
                  <motion.span layoutId="filter-pill" className="absolute inset-0 rounded-full bg-fg" transition={{ type: "spring", stiffness: 400, damping: 34 }} />
                )}
                <span className="relative">
                  {t.projectsPage.filters[f]} <span className="font-mono text-[10px] opacity-60">{n}</span>
                </span>
              </button>
            );
          })}
        </div>
        <p className="label-mono" aria-live="polite">
          {t.projectsPage.count(list.length)}
        </p>
      </div>

      <motion.div layout className="grid gap-x-6 gap-y-14 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {list.map((p) => (
            <motion.article
              key={p.slug}
              layout
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.96, filter: "blur(8px)" }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <Link href={href(`/projects/${p.slug}`)} data-cursor={t.ui.cursor.view} className="group block" style={{ "--accent": p.accent } as React.CSSProperties}>
                <div className="relative overflow-hidden rounded-2xl border border-line bg-surface p-4 transition-colors duration-500 group-hover:border-line-strong sm:p-6">
                  <div
                    aria-hidden
                    className="absolute -bottom-1/3 left-1/2 h-2/3 w-2/3 -translate-x-1/2 rounded-full opacity-[var(--glow)] blur-[70px] transition-opacity duration-700 group-hover:opacity-40"
                    style={{ background: p.accent }}
                  />
                  <ProductMockup project={p} className="relative transition-transform duration-700 ease-out-expo group-hover:scale-[1.025]" />
                </div>
                <div className="mt-5 flex items-start justify-between gap-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="font-mono text-xs" style={{ color: p.accent }}>
                        {projectIndex(p.slug)}
                      </span>
                      <span className="label-mono">{tr(p.category)}</span>
                    </div>
                    <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em]">{p.name}</h2>
                    <p className="mt-2 max-w-md text-sm text-muted">{tr(p.tagline)}</p>
                    <div className="mt-4">
                      <StatusBadge project={p} />
                    </div>
                  </div>
                  <span className="mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line-strong transition-all duration-500 ease-out-expo group-hover:rotate-45 group-hover:border-transparent group-hover:bg-fg group-hover:text-bg">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
