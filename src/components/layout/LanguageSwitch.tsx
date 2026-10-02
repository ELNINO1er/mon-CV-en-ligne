"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { localePath, locales, stripLocale } from "@/i18n/config";
import { useI18n } from "@/i18n/I18nProvider";
import { cn } from "@/lib/utils";

/** Sélecteur FR | EN qui conserve la page courante. */
export function LanguageSwitch({ className }: { className?: string }) {
  const { locale, t } = useI18n();
  const path = stripLocale(usePathname());

  return (
    <nav aria-label={t.ui.language} className={cn("flex items-center rounded-full border border-line-strong bg-surface/80 p-1 backdrop-blur", className)}>
      {locales.map((l) => (
        <Link
          key={l}
          href={localePath(l, path)}
          hrefLang={l}
          lang={l}
          aria-current={l === locale ? "true" : undefined}
          className={cn(
            "relative rounded-full px-2.5 py-1 font-mono text-[11px] uppercase transition-colors",
            l === locale ? "text-bg" : "text-muted hover:text-fg"
          )}
        >
          {l === locale && (
            <motion.span layoutId="lang-pill" className="absolute inset-0 rounded-full bg-fg" transition={{ type: "spring", stiffness: 420, damping: 34 }} />
          )}
          <span className="relative">{l}</span>
        </Link>
      ))}
    </nav>
  );
}
