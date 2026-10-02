"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { HeroCanvas } from "./HeroCanvas";
import { RotatingWord } from "./RotatingWord";
import { SplitText } from "@/components/ui/SplitText";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { profile } from "@/data/profile";
import { useI18n } from "@/i18n/I18nProvider";

export function Hero() {
  const { t, tr, href } = useI18n();
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "28%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 0.94]);

  // Entrées en CSS pur (.anim-fade-up) : visibles dès le premier rendu, sans attendre l'hydratation.
  const fade = (delay: number) => ({ style: { animationDelay: `${delay}s` } });

  return (
    <section ref={ref} className="relative flex min-h-[100svh] flex-col overflow-hidden">
      {/* Aurore colorée */}
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[calc(var(--glow)*4)]">
        <div className="absolute -left-[10%] -top-[25%] h-[65vh] w-[55vw] animate-aurora rounded-full bg-brand/40 blur-[120px]" />
        <div className="absolute -top-[10%] right-[-10%] h-[55vh] w-[45vw] animate-aurora rounded-full bg-violet/35 blur-[120px] [animation-delay:-6s]" />
        <div className="absolute bottom-[5%] left-[30%] h-[40vh] w-[40vw] animate-aurora rounded-full bg-cyan/25 blur-[120px] [animation-delay:-12s]" />
      </div>

      <HeroCanvas />

      {/* Sol en perspective (3D subtile) */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-[45vh] [perspective:900px]">
        <div className="bg-grid absolute inset-x-[-50%] bottom-[-40%] h-[160%] origin-bottom [mask-image:linear-gradient(to_top,#000_10%,transparent_70%)] [transform:rotateX(68deg)]" />
      </div>
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg to-transparent" />

      <motion.div style={{ y, opacity, scale }} className="container-x relative flex flex-1 flex-col justify-center pb-24 pt-32 md:pt-36">
        <p {...fade(0.1)} className="anim-fade-up mb-8 inline-flex w-fit items-center gap-3 rounded-full border border-line-strong bg-surface/60 py-1.5 pl-2 pr-4 text-xs text-muted backdrop-blur">
          <span className="relative flex h-2 w-2">
            <span className="absolute inset-0 animate-ping rounded-full bg-emerald/60" />
            <span className="relative h-2 w-2 rounded-full bg-emerald" />
          </span>
          <span className="text-fg">{profile.name}</span>
          <span className="h-3 w-px bg-line-strong" />
          {tr(profile.location)}
        </p>

        <SplitText
          key={t.hero.title}
          as="h1"
          inView={false}
          delay={0.25}
          stagger={0.06}
          text={t.hero.title}
          className="max-w-[15ch] text-[clamp(2.7rem,7.8vw,7.75rem)] font-semibold leading-[0.93] tracking-[-0.055em] text-balance"
        />

        <p {...fade(0.9)} className="anim-fade-up mt-8 max-w-xl text-lg leading-relaxed text-muted md:text-xl">
          {t.hero.lead} <RotatingWord key={t.hero.lead} words={t.hero.words} />
          <br className="hidden sm:block" /> {t.hero.tail}
        </p>

        <div {...fade(1.05)} className="anim-fade-up mt-10 flex flex-wrap items-center gap-3">
          <MagneticButton href={href("/projects")}>{t.hero.ctaWork}</MagneticButton>
          <MagneticButton href={href("/contact")} variant="ghost">
            {t.hero.ctaContact}
          </MagneticButton>
        </div>
      </motion.div>

      <div {...fade(1.3)} className="anim-fade-up container-x relative flex items-end justify-between gap-6 pb-8 font-mono text-[11px] uppercase tracking-[0.1em] text-dim">
        <div className="hidden sm:block">
          <p className="text-muted">{tr(profile.title)}</p>
          <p>{tr(profile.subtitle)}</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="relative h-10 w-px overflow-hidden bg-line-strong">
            <span
              className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-transparent to-brand"
              style={{ animation: "scrollcue 2.2s cubic-bezier(.65,0,.35,1) infinite" }}
            />
          </span>
          {t.hero.scroll}
        </div>
        <p className="hidden text-right sm:block">{profile.coordinates}</p>
      </div>

      <style>{`@keyframes scrollcue{0%{transform:translateY(-100%)}100%{transform:translateY(200%)}}`}</style>
    </section>
  );
}
