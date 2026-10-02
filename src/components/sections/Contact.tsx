"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Check, Copy, Mail, MessageCircle, Phone } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { profile } from "@/data/profile";
import { SplitText } from "@/components/ui/SplitText";
import { Reveal } from "@/components/ui/Reveal";
import { useI18n } from "@/i18n/I18nProvider";
import { cn, EASE } from "@/lib/utils";

export function Contact({ headingAs = "h2" }: { headingAs?: "h1" | "h2" }) {
  const { t, tr } = useI18n();
  const c = t.contact;
  const [copied, setCopied] = useState(false);
  const [type, setType] = useState(0);
  const area = useRef<HTMLDivElement>(null);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const subject = `[${c.types[type]}] — ${data.get("name")}`;
    const body = `${data.get("message")}\n\n— ${data.get("name")} (${data.get("email")})`;
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const channels = [
    { label: c.channels.email, value: profile.email, href: `mailto:${profile.email}`, icon: Mail, color: "var(--color-brand)" },
    { label: c.channels.whatsapp, value: profile.phone, href: profile.whatsapp, icon: MessageCircle, color: "var(--color-emerald)" },
    { label: c.channels.phone, value: profile.phone, href: `tel:${profile.phone.replaceAll(" ", "")}`, icon: Phone, color: "var(--color-amber)" },
    { label: c.channels.linkedin, value: "romaric-bombade", href: profile.linkedin, icon: LinkedinIcon, color: "var(--color-cyan)" },
    { label: c.channels.github, value: "ELNINO1er", href: profile.github, icon: GithubIcon, color: "var(--color-violet)" },
  ];

  return (
    <section
      id="contact"
      className="relative overflow-hidden py-28 md:py-40"
      aria-label={c.label}
      onPointerMove={(e) => {
        const r = area.current?.getBoundingClientRect();
        if (!r || !area.current) return;
        area.current.style.setProperty("--x", `${e.clientX - r.left}px`);
        area.current.style.setProperty("--y", `${e.clientY - r.top}px`);
      }}
    >
      <div
        ref={area}
        aria-hidden
        className="pointer-events-none absolute inset-0 [background:radial-gradient(600px_circle_at_var(--x,50%)_var(--y,30%),color-mix(in_srgb,var(--violet)_14%,transparent),transparent_50%)]"
      />
      <div aria-hidden className="pointer-events-none absolute -right-40 top-20 h-96 w-96 animate-aurora rounded-full bg-coral/15 blur-[110px]" />
      <div className="container-x relative">
        <Reveal blur={false} y={12}>
          <p className="label-mono mb-8 flex items-center gap-3">
            <span className="text-coral">07</span>
            <span className="h-px w-8 bg-gradient-to-r from-coral to-transparent" />
            {c.label}
          </p>
        </Reveal>
        <SplitText
          key={c.title}
          as={headingAs}
          text={c.title}
          className="max-w-[13ch] text-[clamp(2.8rem,9.5vw,9rem)] font-semibold leading-[0.9] tracking-[-0.06em]"
        />

        <div className="mt-14 flex flex-wrap items-center gap-4">
          <Reveal delay={0.2}>
            <button
              type="button"
              onClick={copy}
              data-cursor={copied ? c.copied : c.copy}
              className="group flex items-center gap-4 rounded-full border border-line-strong bg-surface py-2 pl-6 pr-2 text-lg tracking-tight transition-colors hover:border-fg/30 md:text-2xl"
            >
              {profile.email}
              <span className="relative grid h-11 w-11 place-items-center overflow-hidden rounded-full bg-gradient-to-br from-brand to-violet text-white">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={copied ? "ok" : "copy"}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.3, ease: EASE }}
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </motion.span>
                </AnimatePresence>
              </span>
            </button>
          </Reveal>
          <span role="status" aria-live="polite" className="sr-only">
            {copied ? c.copiedSr : ""}
          </span>
          <Reveal delay={0.3}>
            <p className="flex items-center gap-2.5 text-sm text-muted">
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 animate-ping rounded-full bg-emerald/60" />
                <span className="relative h-2 w-2 rounded-full bg-emerald" />
              </span>
              {c.availability}
            </p>
          </Reveal>
        </div>

        <div className="mt-20 grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <ul className="divide-y divide-line border-y border-line">
              {channels.map((ch) => (
                <li key={ch.label}>
                  <a
                    href={ch.href}
                    {...(ch.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group flex items-center justify-between gap-4 py-5"
                  >
                    <span className="flex min-w-0 items-center gap-4">
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg" style={{ color: ch.color, background: `color-mix(in srgb, ${ch.color} 13%, transparent)` }}>
                        <ch.icon className="h-4 w-4" />
                      </span>
                      <span className="label-mono hidden w-20 sm:block">{ch.label}</span>
                      <span className="truncate text-sm sm:text-base">{ch.value}</span>
                    </span>
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-dim transition-all duration-500 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg" />
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-muted">{tr(profile.location)} · GMT</p>
          </Reveal>

          <Reveal delay={0.1}>
            <form onSubmit={submit} className="relative overflow-hidden rounded-2xl border border-line bg-surface/80 p-6 backdrop-blur md:p-8">
              <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-brand via-violet to-coral" />
              <fieldset>
                <legend className="label-mono mb-4">{c.legend}</legend>
                <div className="flex flex-wrap gap-2">
                  {c.types.map((label, i) => (
                    <button
                      key={label}
                      type="button"
                      aria-pressed={type === i}
                      onClick={() => setType(i)}
                      className={cn(
                        "rounded-full border px-3.5 py-1.5 text-sm transition-colors duration-300",
                        type === i ? "border-fg bg-fg text-bg" : "border-line-strong text-muted hover:text-fg"
                      )}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </fieldset>
              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                <Field name="name" label={c.name} autoComplete="name" />
                <Field name="email" label={c.email} type="email" autoComplete="email" />
              </div>
              <Field name="message" label={c.message} textarea className="mt-6" />
              <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                <p className="text-xs text-dim">{c.hint}</p>
                <button
                  type="submit"
                  className="group inline-flex h-12 items-center gap-2 rounded-full bg-gradient-to-r from-brand to-violet px-6 text-sm font-medium text-white shadow-[0_10px_30px_-10px_color-mix(in_srgb,var(--violet)_70%,transparent)] transition-opacity hover:opacity-90"
                >
                  {c.send}
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-500 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </button>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({
  name,
  label,
  type = "text",
  textarea,
  className,
  autoComplete,
}: {
  name: string;
  label: string;
  type?: string;
  textarea?: boolean;
  className?: string;
  autoComplete?: string;
}) {
  const base =
    "peer w-full border-b border-line-strong bg-transparent pb-3 pt-6 text-base outline-none transition-colors placeholder-transparent focus:border-brand";
  return (
    <div className={cn("relative", className)}>
      {textarea ? (
        <textarea id={name} name={name} required rows={4} placeholder={label} className={cn(base, "resize-none")} />
      ) : (
        <input id={name} name={name} type={type} required placeholder={label} autoComplete={autoComplete} className={base} />
      )}
      <label
        htmlFor={name}
        className="pointer-events-none absolute left-0 top-0 text-xs text-muted transition-all duration-300 peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-xs peer-focus:text-brand"
      >
        {label}
      </label>
    </div>
  );
}
