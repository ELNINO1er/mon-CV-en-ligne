"use client";

import { Brain, Lightbulb, Puzzle, Rocket } from "lucide-react";
import { profile } from "@/data/profile";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useI18n } from "@/i18n/I18nProvider";
import { IdentityCard } from "./IdentityCard";

const valueStyle = [
  { icon: Rocket, color: "var(--color-violet)" },
  { icon: Brain, color: "var(--color-rose)" },
  { icon: Lightbulb, color: "var(--color-amber)" },
  { icon: Puzzle, color: "var(--color-cyan)" },
];

export function About({ full = false, headingAs = "h2" }: { full?: boolean; headingAs?: "h1" | "h2" }) {
  const { t, tr, href } = useI18n();
  const facts: [string, string][] = [
    [t.about.facts.basedIn, tr(profile.location)],
    [t.about.facts.nationality, tr(profile.nationality)],
    ...profile.languages.map((l) => [tr(l.name), tr(l.level)] as [string, string]),
  ];

  return (
    <section className="relative py-28 md:py-40" aria-label={t.about.label}>
      <div className="container-x grid gap-16 lg:grid-cols-[1fr_0.9fr] lg:gap-24">
        <div>
          <SectionHeading as={headingAs} index="06" label={t.about.label} title={t.about.title} color="var(--color-rose)" />
          <Reveal delay={0.15}>
            <p className="mt-10 text-xl leading-relaxed tracking-tight text-fg/90 md:text-2xl">{t.about.p1}</p>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted md:text-lg">{t.about.p2}</p>
          </Reveal>

          {full ? (
            <Stagger className="mt-14 grid gap-4 sm:grid-cols-2">
              {t.about.values.map((v, i) => {
                const { icon: Icon, color } = valueStyle[i];
                return (
                  <StaggerItem key={v.title} className="rounded-2xl border border-line bg-surface p-6">
                    <span className="grid h-9 w-9 place-items-center rounded-lg" style={{ color, background: `color-mix(in srgb, ${color} 14%, transparent)` }}>
                      <Icon className="h-4 w-4" />
                    </span>
                    <h3 className="mt-5 text-lg font-medium tracking-tight">{v.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{v.text}</p>
                  </StaggerItem>
                );
              })}
            </Stagger>
          ) : (
            <Reveal delay={0.25} className="mt-10">
              <MagneticButton href={href("/about")} variant="ghost">
                {t.about.more}
              </MagneticButton>
            </Reveal>
          )}
        </div>

        <Reveal delay={0.1} className="lg:pt-24">
          <IdentityCard />
          <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line">
            {facts.map(([k, v]) => (
              <div key={k} className="bg-surface p-5">
                <dt className="label-mono">{k}</dt>
                <dd className="mt-2 text-sm">{v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
