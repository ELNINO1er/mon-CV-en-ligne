"use client";

import { MagneticButton } from "@/components/ui/MagneticButton";
import { useI18n } from "@/i18n/I18nProvider";

export default function NotFound() {
  const { t, href } = useI18n();
  const [before, em] = t.notFound.title.split("*");
  return (
    <section className="container-x flex min-h-[80vh] flex-col items-start justify-center pt-24">
      <p className="label-mono">Error 404</p>
      <h1 className="mt-4 text-[clamp(3rem,10vw,8rem)] font-semibold leading-[0.9] tracking-[-0.06em]">
        {before}
        <span className="text-gradient pr-[0.1em] font-serif font-normal italic">{em}</span>
      </h1>
      <p className="mt-6 text-muted">{t.notFound.text}</p>
      <MagneticButton href={href("/")} className="mt-10">
        {t.notFound.back}
      </MagneticButton>
    </section>
  );
}
