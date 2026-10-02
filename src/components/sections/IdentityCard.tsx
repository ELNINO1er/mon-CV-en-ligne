"use client";

import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { profile } from "@/data/profile";
import { useI18n } from "@/i18n/I18nProvider";

/** Carte d'identité « badge » — remplaçable par une photo plus tard. */
export function IdentityCard() {
  const { tr } = useI18n();
  return (
    <SpotlightCard tilt className="relative aspect-[4/5] overflow-hidden p-7 sm:aspect-[5/4] lg:aspect-[4/5]">
      <div className="bg-grid absolute inset-0 opacity-50 [mask-image:radial-gradient(circle_at_70%_30%,#000,transparent_70%)]" />
      <div className="absolute -right-20 -top-20 h-72 w-72 animate-aurora rounded-full bg-brand/30 blur-[90px]" />
      <div className="absolute -bottom-24 -left-16 h-64 w-64 animate-aurora rounded-full bg-violet/25 blur-[90px] [animation-delay:-8s]" />
      <div className="relative flex h-full flex-col">
        <div className="flex items-center justify-between">
          <span className="label-mono">ID / 001</span>
          <span className="flex items-center gap-2 text-xs text-muted">
            <span className="h-1.5 w-1.5 animate-blink rounded-full bg-emerald" />
            Abidjan
          </span>
        </div>
        <span className="text-gradient mt-auto w-fit pr-2 font-mono text-[clamp(5rem,14vw,9rem)] font-medium leading-none tracking-[-0.08em]">RB</span>
        <div className="mt-6 flex items-end justify-between gap-4 border-t border-line pt-5">
          <div>
            <p className="text-lg font-medium tracking-tight">{profile.name}</p>
            <p className="text-sm text-muted">
              {tr(profile.title)} · {tr(profile.subtitle)}
            </p>
          </div>
          <span className="hidden font-mono text-[10px] text-dim sm:block">{profile.coordinates}</span>
        </div>
      </div>
    </SpotlightCard>
  );
}
