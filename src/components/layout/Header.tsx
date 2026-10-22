"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { navItems, profile } from "@/data/profile";
import { cn, EASE } from "@/lib/utils";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { getLenis } from "@/components/providers/SmoothScroll";
import { useI18n } from "@/i18n/I18nProvider";
import { stripLocale } from "@/i18n/config";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageSwitch } from "./LanguageSwitch";

export function Header() {
  const { t, tr, href } = useI18n();
  const pathname = usePathname();
  const path = stripLocale(pathname);
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    setHidden(y > prev && y > 320 && !open);
  });

  // Ferme le menu mobile au changement de page (ajustement pendant le rendu, sans effet)
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const lenis = getLenis();
    if (open) lenis?.stop();
    else lenis?.start();
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (p: string) => path === p || path.startsWith(`${p}/`);

  return (
    <>
      <motion.header animate={{ y: hidden ? "-110%" : "0%" }} transition={{ duration: 0.6, ease: EASE }} className="fixed inset-x-0 top-0 z-[60]">
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-x-0 top-0 h-28 bg-bg/95 transition-opacity duration-500",
            scrolled ? "opacity-100" : "opacity-0"
          )}
        />
        <div className={cn("container-x relative flex h-16 items-center justify-between gap-3 transition-[height] duration-500 md:h-20", scrolled && "md:h-16")}>
          <Link href={href("/")} className="group flex items-center gap-3" aria-label={`${profile.name} — ${t.nav.home}`}>
            <span className="relative block h-11 w-11 shrink-0 overflow-hidden rounded-xl border border-line-strong">
              <Image src="/brand/rorodev.png" alt="RoroDev" width={44} height={44} priority className="h-full w-full object-cover" />
            </span>
            <span className="hidden text-sm font-medium tracking-tight lg:block">
              Romaric <span className="text-muted">Bombade</span>
            </span>
          </Link>

          <nav
            aria-label="Main"
            className={cn(
              "hidden items-center gap-1 rounded-full border p-1 transition-colors duration-500 md:flex",
              scrolled ? "border-line-strong bg-surface/70 backdrop-blur-xl" : "border-transparent"
            )}
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={href(item.href)}
                className={cn("relative rounded-full px-3.5 py-2 text-[13px] transition-colors lg:px-4", isActive(item.href) ? "text-fg" : "text-muted hover:text-fg")}
              >
                {isActive(item.href) && (
                  <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-fg/[0.07]" transition={{ type: "spring", stiffness: 380, damping: 32 }} />
                )}
                <span className="relative">{t.nav[item.key]}</span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <LanguageSwitch />
            <ThemeToggle />
            <span className="hidden lg:block">
              <MagneticButton href={href("/contact")} className="h-10 px-5" icon={false}>
                {t.ui.letsTalk}
              </MagneticButton>
            </span>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? t.ui.closeMenu : t.ui.openMenu}
              className="relative grid h-10 w-10 place-items-center rounded-full border border-line-strong bg-surface/80 backdrop-blur md:hidden"
            >
              <span className={cn("absolute h-px w-4 bg-fg transition-transform duration-500 ease-out-expo", open ? "rotate-45" : "-translate-y-[3px]")} />
              <span className={cn("absolute h-px w-4 bg-fg transition-transform duration-500 ease-out-expo", open ? "-rotate-45" : "translate-y-[3px]")} />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="fixed inset-0 z-[55] flex flex-col bg-bg/95 px-6 pb-10 pt-28 backdrop-blur-xl md:hidden"
          >
            <nav aria-label="Mobile" className="flex flex-col">
              {[{ href: "/", key: "home" as const }, ...navItems].map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.15 + i * 0.05, duration: 0.7, ease: EASE }}
                  className="border-b border-line"
                >
                  <Link href={href(item.href)} className="flex items-baseline justify-between py-4 text-4xl font-semibold tracking-tight">
                    {t.nav[item.key]}
                    <span className="font-mono text-xs text-dim">0{i + 1}</span>
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="mt-auto space-y-1 text-sm text-muted">
              <a href={`mailto:${profile.email}`} className="block text-fg">
                {profile.email}
              </a>
              <p>{tr(profile.location)}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
