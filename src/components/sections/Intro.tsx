"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { Compass, Layers, Rocket } from "lucide-react";
import { Marquee } from "@/components/ui/Marquee";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { useI18n } from "@/i18n/I18nProvider";

const pillarStyle = [
  { color: "var(--color-brand)", icon: Compass },
  { color: "var(--color-violet)", icon: Layers },
  { color: "var(--color-cyan)", icon: Rocket },
];

const sectorColors = ["var(--color-brand)", "var(--color-violet)", "var(--color-cyan)", "var(--color-emerald)", "var(--color-amber)", "var(--color-rose)", "var(--color-coral)"];

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <motion.span style={{ opacity }} className="inline">
      {children}{" "}
    </motion.span>
  );
}

export function Intro() {
  const { t } = useI18n();
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = t.intro.statement.split(" ");

  return (
    <section className="relative pt-28 md:pt-40" aria-label={t.intro.label}>
      <div className="container-x">
        <p className="label-mono mb-10 flex items-center gap-3">
          <span className="text-brand">01</span>
          <span className="h-px w-8 bg-gradient-to-r from-brand to-transparent" />
          {t.intro.label}
        </p>
        <p ref={ref} className="max-w-6xl text-[clamp(1.75rem,4.2vw,3.6rem)] font-medium leading-[1.12] tracking-[-0.035em]">
          {words.map((w, i) => (
            <Word key={`${w}-${i}`} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
              {w}
            </Word>
          ))}
        </p>

        <Stagger className="mt-20 grid gap-4 md:grid-cols-3" stagger={0.1}>
          {t.intro.pillars.map((p, i) => {
            const { color, icon: Icon } = pillarStyle[i];
            return (
              <StaggerItem key={p.title}>
                <SpotlightCard className="relative h-full overflow-hidden p-7" tilt accent={color}>
                  <span aria-hidden className="absolute inset-x-0 top-0 h-px" style={{ background: `linear-gradient(to right, transparent, ${color}, transparent)` }} />
                  <div className="flex items-center justify-between">
                    <span
                      className="grid h-10 w-10 place-items-center rounded-xl"
                      style={{ color, background: `color-mix(in srgb, ${color} 14%, transparent)` }}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="font-mono text-xs" style={{ color }}>
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="mt-10 text-xl font-medium tracking-tight">{p.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{p.text}</p>
                </SpotlightCard>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>

      <div className="mt-24 border-y border-line py-6">
        <p className="label-mono container-x mb-4">{t.intro.solutionsFor}</p>
        <Marquee
          items={t.intro.sectors}
          duration={45}
          colors={sectorColors}
          className="text-[clamp(1.5rem,3vw,2.5rem)] font-medium tracking-tight text-muted"
        />
      </div>
    </section>
  );
}
