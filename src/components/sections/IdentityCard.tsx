"use client";

import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { profile } from "@/data/profile";
import { useI18n } from "@/i18n/I18nProvider";
import Image from "next/image";

/** Portrait original, avec légende séparée pour préserver le cadrage. */
export function IdentityCard() {
  const { tr } = useI18n();
  return (
    <SpotlightCard className="relative overflow-hidden">
      <figure>
        <div className="relative aspect-[4/5] overflow-hidden">
          <Image src="/img/romaric-bombade.jpeg" alt="Portrait de Romaric Bombade en costume, en noir et blanc" fill sizes="(min-width: 1024px) 42vw, 90vw" className="object-cover" />
          <span className="absolute left-5 top-5 rounded-full border border-line bg-bg/90 px-3 py-1.5 font-mono text-[10px] tracking-widest text-fg backdrop-blur">ROMARIC / ABIDJAN</span>
        </div>
        <figcaption className="flex items-start gap-4 border-t border-line bg-surface p-5 sm:p-7">
          <Image src="/brand/rorodev.png" alt="" width={44} height={44} className="shrink-0 rounded-xl" />
          <div className="min-w-0">
            <p className="text-lg font-medium tracking-tight">{profile.name}</p>
            <p className="mt-1 text-sm leading-relaxed text-muted">{tr(profile.title)} · {tr(profile.subtitle)}</p>
          </div>
        </figcaption>
      </figure>
    </SpotlightCard>
  );
}
