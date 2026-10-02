"use client";

import Link from "next/link";
import { navItems, profile } from "@/data/profile";
import { useI18n } from "@/i18n/I18nProvider";
import { LocalTime } from "./LocalTime";
import { BackToTop } from "./BackToTop";

export function Footer() {
  const { t, tr, href } = useI18n();
  const socials = [
    { label: t.contact.channels.linkedin, href: profile.linkedin },
    { label: t.contact.channels.github, href: profile.github },
    { label: t.contact.channels.whatsapp, href: profile.whatsapp },
    { label: t.contact.channels.email, href: `mailto:${profile.email}` },
  ];

  return (
    <footer className="relative overflow-hidden pt-20">
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand to-transparent opacity-60" />
      <div aria-hidden className="absolute left-1/2 top-0 h-40 w-[50vw] -translate-x-1/2 rounded-full bg-violet/10 blur-[90px]" />
      <div className="container-x relative grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="max-w-sm text-2xl font-medium leading-snug tracking-tight">
            {t.footer.tagline} <span className="text-gradient pr-[0.1em] font-serif italic">{t.footer.taglineEm}</span>
          </p>
          <p className="label-mono mt-6">{t.footer.built}</p>
        </div>
        <div className="md:col-span-2 md:col-start-7">
          <p className="label-mono mb-4">{t.footer.navigate}</p>
          <ul className="space-y-2 text-sm">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={href(item.href)} className="text-muted transition-colors hover:text-fg">
                  {t.nav[item.key]}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-2">
          <p className="label-mono mb-4">{t.footer.connect}</p>
          <ul className="space-y-2 text-sm">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  className="text-muted transition-colors hover:text-fg"
                  {...(s.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-2">
          <p className="label-mono mb-4">{t.footer.time}</p>
          <LocalTime />
          <p className="mt-1 text-sm text-muted">{tr(profile.location)}</p>
        </div>
      </div>

      <div className="container-x relative mt-16 flex items-center justify-between border-t border-line py-6 text-xs text-dim">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <BackToTop label={t.footer.top} />
      </div>

      <p
        aria-hidden
        className="text-stroke pointer-events-none select-none whitespace-nowrap text-center text-[19.5vw] font-semibold leading-[0.75] tracking-[-0.06em]"
      >
        BOMBADE
      </p>
    </footer>
  );
}
