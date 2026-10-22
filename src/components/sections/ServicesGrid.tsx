"use client";

import { Check, Clock, Play } from "lucide-react";
import { chariowStore, services } from "@/data/services";
import { profile } from "@/data/profile";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Reveal } from "@/components/ui/Reveal";
import { useI18n } from "@/i18n/I18nProvider";

/** Offres RoroDev : prix fixes, achat sur Chariow et contact WhatsApp pré-rempli. */
export function ServicesGrid() {
  const { t, tr, locale, href } = useI18n();
  const s = t.servicesPage;
  const price = new Intl.NumberFormat(locale === "fr" ? "fr-FR" : "en-US");

  return (
    <section className="pb-28 md:pb-40" aria-label={s.label}>
      <div className="container-x">
        <div className="grid gap-5 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.slug} delay={i * 0.1} className="h-full">
              <SpotlightCard accent={service.accent} className="flex h-full flex-col p-7 md:p-8">
                <p className="label-mono flex items-center gap-3">
                  <span style={{ color: service.accent }}>0{i + 1}</span>
                  <span className="h-px w-8" style={{ background: service.accent }} />
                  RoroDev
                </p>
                <h2 className="mt-6 text-2xl font-semibold tracking-tight">{tr(service.name)}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted">{tr(service.tagline)}</p>

                <p className="mt-8 flex items-baseline gap-2">
                  <span className="text-4xl font-semibold tracking-[-0.04em]">{price.format(service.price)}</span>
                  <span className="text-sm text-muted">{s.currency}</span>
                </p>
                <p className="mt-2 flex items-center gap-2 text-sm text-muted">
                  <Clock className="h-4 w-4" aria-hidden />
                  {s.delay} : {tr(service.delay)}
                </p>

                <p className="label-mono mb-3 mt-8">{s.includes}</p>
                <ul className="space-y-2.5 text-sm">
                  {service.includes.map((item) => (
                    <li key={item.fr} className="flex gap-3">
                      <Check className="mt-0.5 h-4 w-4 shrink-0" style={{ color: service.accent }} aria-hidden />
                      {tr(item)}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-8">
                  {!service.chariowUrl && <p className="mb-4 text-xs leading-relaxed text-dim">{s.quote}</p>}
                  <div className="flex flex-col gap-3">
                    {service.chariowUrl && (
                      <MagneticButton href={service.chariowUrl} className="justify-center" strength={0.15}>
                        {s.buy}
                      </MagneticButton>
                    )}
                    <MagneticButton
                      href={`${profile.whatsapp}?text=${encodeURIComponent(tr(service.whatsapp))}`}
                      variant={service.chariowUrl ? "ghost" : "primary"}
                      className="justify-center"
                      strength={0.15}
                    >
                      {s.whatsapp}
                    </MagneticButton>
                  </div>
                  {service.demo && (
                    <a
                      href={service.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-underline mt-5 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
                    >
                      <Play className="h-3.5 w-3.5" aria-hidden />
                      {s.demo}
                    </a>
                  )}
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 flex flex-col items-start justify-between gap-6 border-t border-line pt-10 md:flex-row md:items-center">
          <p className="max-w-xl text-lg leading-relaxed text-muted">{s.custom}</p>
          <div className="flex flex-wrap gap-3">
            <MagneticButton href={chariowStore} variant="ghost">
              {s.store}
            </MagneticButton>
            <MagneticButton href={href("/contact")}>{t.ui.letsTalk}</MagneticButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
