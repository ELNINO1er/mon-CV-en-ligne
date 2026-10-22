"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { education, experiences } from "@/data/career";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { useI18n } from "@/i18n/I18nProvider";
import { EASE } from "@/lib/utils";

/** Timeline verticale : la ligne se remplit au scroll, chaque étape s'allume à son passage. */
export function Experience({ headingAs = "h2", showEducation = true }: { headingAs?: "h1" | "h2"; showEducation?: boolean }) {
  const { t, tr } = useI18n();
  const list = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: list, offset: ["start 0.7", "end 0.6"] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  return (
    <section className="relative py-28 md:py-40" aria-label={t.experience.label}>
      <div className="container-x grid gap-16 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            as={headingAs}
            index="04"
            label={t.experience.label}
            title={t.experience.title}
            description={t.experience.description}
            color="var(--color-emerald)"
          />
        </div>

        <div>
          <ol ref={list} className="relative">
            <span aria-hidden className="absolute bottom-2 left-[7px] top-2 w-px bg-line-strong" />
            <motion.span
              aria-hidden
              style={{ scaleY: fill }}
              className="absolute bottom-2 left-[7px] top-2 w-px origin-top bg-brand"
            />
            {experiences.map((exp, i) => (
              <motion.li
                key={exp.company}
                initial="idle"
                whileInView="lit"
                viewport={{ once: false, margin: "-45% 0px -45% 0px" }}
                className="relative pb-16 pl-12 last:pb-0"
              >
                <motion.span
                  aria-hidden
                  variants={{ idle: { scale: 1 }, lit: { scale: 1.15 } }}
                  transition={{ duration: 0.4 }}
                  className="absolute left-0 top-1.5 h-[15px] w-[15px] overflow-hidden rounded-full border bg-surface"
                  style={{ borderColor: exp.color, boxShadow: `0 0 0 6px color-mix(in srgb, ${exp.color} 14%, transparent)` }}
                >
                  <motion.span
                    className="absolute inset-0"
                    style={{ background: exp.color }}
                    variants={{ idle: { opacity: 0 }, lit: { opacity: 1 } }}
                    transition={{ duration: 0.4 }}
                  />
                </motion.span>
                <Reveal delay={i === 0 ? 0.1 : 0}>
                  <p className="font-mono text-xs text-muted">{tr(exp.period)}</p>
                  <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em] md:text-3xl">{exp.company}</h3>
                  {exp.role && (
                    <p className="mt-1 text-base font-medium" style={{ color: exp.color }}>
                      {tr(exp.role)}
                    </p>
                  )}
                  <ul className="mt-5 space-y-2">
                    {exp.points.map((pt) => (
                      <li key={pt.en} className="flex gap-3 text-sm leading-relaxed text-muted md:text-base">
                        <span className="mt-[0.6em] h-px w-3 shrink-0" style={{ background: exp.color }} />
                        {tr(pt)}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </motion.li>
            ))}
          </ol>

          {showEducation && (
            <div className="mt-24">
              <p className="label-mono mb-6">{t.experience.education}</p>
              <div className="grid gap-3">
                {education.map((ed, i) => (
                  <motion.div
                    key={ed.title.en}
                    initial={{ opacity: 0, x: 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: i * 0.08, ease: EASE }}
                    className="relative flex flex-col justify-between gap-2 overflow-hidden rounded-xl border border-line bg-surface p-5 sm:flex-row sm:items-center"
                  >
                    <span aria-hidden className="absolute inset-y-0 left-0 w-0.5 bg-brand" />
                    <div>
                      <p className="font-medium tracking-tight">{tr(ed.title)}</p>
                      <p className="mt-1 text-sm text-muted">
                        {ed.school}
                        {ed.detail && <span className="text-dim"> · {tr(ed.detail)}</span>}
                      </p>
                    </div>
                    <span className="shrink-0 font-mono text-xs text-dim">{tr(ed.period)}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
