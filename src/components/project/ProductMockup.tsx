"use client";

import type { Project } from "@/data/projects";
import { useI18n } from "@/i18n/I18nProvider";
import { cn } from "@/lib/utils";

/**
 * Concepts d'interface recodés en HTML : aucune fausse capture, aucun chiffre inventé.
 * Les libellés viennent des fonctionnalités réelles de chaque projet.
 * La fenêtre reste sombre dans les deux thèmes (c'est une « capture » d'application).
 */
export function ProductMockup({ project, className, compact }: { project: Project; className?: string; compact?: boolean }) {
  return (
    <div
      style={{ "--accent": project.accent } as React.CSSProperties}
      className={cn(
        "@container relative aspect-[16/10] w-full select-none overflow-hidden rounded-xl border border-white/10 bg-[#0a0c0f] text-white shadow-[0_40px_120px_-40px_rgba(0,0,0,0.65)]",
        className
      )}
      aria-hidden
    >

      <Chrome title={project.url ? project.url.replace(/^https?:\/\//, "") : project.name} />
      <div className="absolute inset-x-0 bottom-0 top-8">
        {project.mockup === "dashboard" && <Dashboard project={project} compact={compact} />}
        {project.mockup === "restaurant" && <Restaurant />}
        {project.mockup === "wedding" && <Wedding />}
        {project.mockup === "site" && <Site project={project} />}
        {project.mockup === "store" && <Store project={project} />}
        {project.mockup === "news" && <News project={project} />}
        {project.mockup === "blueprint" && <Blueprint project={project} />}
      </div>
    </div>
  );
}

function Chrome({ title }: { title: string }) {
  return (
    <div className="absolute inset-x-0 top-0 flex h-8 items-center gap-1.5 border-b border-white/[0.06] bg-white/[0.02] px-3">
      <span className="h-2 w-2 rounded-full bg-[#ff5f57]/70" />
      <span className="h-2 w-2 rounded-full bg-[#febc2e]/70" />
      <span className="h-2 w-2 rounded-full bg-[#28c840]/70" />
      <span className="mx-auto max-w-[60%] truncate rounded-md bg-white/[0.05] px-3 py-0.5 font-mono text-[9px] text-white/45">{title}</span>
    </div>
  );
}

const Bar = ({ w, className }: { w: string; className?: string }) => (
  <span className={cn("block h-1.5 rounded-full bg-white/10", className)} style={{ width: w }} />
);

function Dashboard({ project, compact }: { project: Project; compact?: boolean }) {
  const { tr } = useI18n();
  const groups = project.features;
  const nav = (groups.length > 1 ? groups.map((g) => g.label) : groups[0]?.items.slice(0, 7) ?? []).map(tr);
  const tiles = ((groups.length > 1 ? groups[0].items : groups[0]?.items.slice(7)) ?? []).map(tr);

  return (
    <div className="flex h-full">
      <aside className="hidden w-[24%] shrink-0 flex-col gap-1 border-r border-white/[0.06] p-3 @md:flex">
        <div className="mb-3 flex items-center gap-2">
          <span className="h-4 w-4 rounded" style={{ background: "var(--accent)" }} />
          <span className="truncate text-[10px] font-medium text-white/80">{project.name}</span>
        </div>
        {nav.map((item, i) => (
          <span key={item} className={cn("truncate rounded-md px-2 py-1 text-[9px]", i === 0 ? "bg-white/[0.07] text-white/90" : "text-white/40")}>
            {item}
          </span>
        ))}
      </aside>
      <div className="flex min-w-0 flex-1 flex-col gap-3 p-3 sm:p-4">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-medium text-white/85">{groups.length > 1 ? tr(groups[0].label) : "Dashboard"}</span>
          <span className="h-4 w-16 rounded-full bg-white/[0.06]" />
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-2">
              <span className="block truncate text-[8px] text-white/45">{tiles[i] ?? nav[i]}</span>
              <span className="mt-2 block h-2.5 w-2/3 rounded bg-white/15" />
              <span className="mt-1.5 block h-1 rounded-full" style={{ width: `${40 + i * 18}%`, background: "var(--accent)", opacity: 0.7 }} />
            </div>
          ))}
        </div>
        <div className="relative min-h-[56px] flex-1 overflow-hidden rounded-lg border border-white/[0.06] bg-white/[0.02]">
          <svg viewBox="0 0 300 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
            <defs>
              <linearGradient id={`g-${project.slug}`} x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor={project.accent} stopOpacity="0.4" />
                <stop offset="1" stopColor={project.accent} stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M0 80 C 30 70, 50 76, 75 60 S 120 40, 150 48 S 200 22, 225 30 S 270 12, 300 16 L300 100 L0 100Z" fill={`url(#g-${project.slug})`} />
            <path d="M0 80 C 30 70, 50 76, 75 60 S 120 40, 150 48 S 200 22, 225 30 S 270 12, 300 16" fill="none" stroke={project.accent} strokeWidth="1.4" vectorEffect="non-scaling-stroke" />
          </svg>
        </div>
        {!compact && (
          <div className="hidden space-y-1.5 @2xl:block">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex items-center gap-3 rounded-md border border-white/[0.04] px-2 py-1.5">
                <span className="h-3 w-3 rounded-full bg-white/10" />
                <Bar w="28%" />
                <Bar w="18%" className="ml-auto" />
                <span className="h-2 w-8 rounded-full" style={{ background: "var(--accent)", opacity: 0.4 }} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Restaurant() {
  const { locale } = useI18n();
  const fr = locale === "fr";
  const columns = fr ? ["Nouvelles", "En cuisine", "Prêtes"] : ["New", "Preparing", "Ready"];
  const cats = fr ? ["Entrées", "Plats", "Boissons"] : ["Starters", "Mains", "Drinks"];
  return (
    <div className="flex h-full gap-3 p-3 sm:p-4">
      <div className="relative flex w-[30%] shrink-0 flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-2.5">
        <span className="mx-auto mb-2 h-1 w-8 rounded-full bg-white/15" />
        <span className="text-[10px] font-medium text-white/85">Menu</span>
        <div className="mt-2 flex gap-1">
          {cats.map((c, i) => (
            <span key={c} className={cn("truncate rounded-full px-1.5 py-0.5 text-[7px]", i === 1 ? "bg-[var(--accent)] text-black" : "bg-white/[0.06] text-white/50")}>
              {c}
            </span>
          ))}
        </div>
        <div className="mt-2 space-y-1.5">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-2 rounded-lg bg-white/[0.03] p-1.5">
              <span className="h-5 w-5 shrink-0 rounded-md bg-white/10" />
              <div className="flex-1 space-y-1">
                <Bar w="70%" />
                <Bar w="40%" className="bg-white/5" />
              </div>
            </div>
          ))}
        </div>
        <span className="mt-auto rounded-lg py-1.5 text-center text-[8px] font-medium text-black" style={{ background: "var(--accent)" }}>
          {fr ? "Commander" : "Order"}
        </span>
      </div>
      <div className="grid min-w-0 flex-1 grid-cols-3 gap-2">
        {columns.map((col, c) => (
          <div key={col} className="flex flex-col gap-1.5 rounded-lg border border-white/[0.06] bg-white/[0.02] p-2">
            <span className="flex items-center gap-1.5 truncate text-[9px] text-white/60">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: c === 2 ? "#34d399" : "var(--accent)" }} />
              {col}
            </span>
            {Array.from({ length: 3 - c + (c === 2 ? 1 : 0) }).map((_, i) => (
              <div key={i} className="space-y-1 rounded-md border border-white/[0.06] bg-white/[0.03] p-1.5">
                <span className="block text-[8px] text-white/70">Table {String(c * 3 + i + 2).padStart(2, "0")}</span>
                <Bar w="80%" />
                <Bar w="55%" className="bg-white/5" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function Wedding() {
  const { locale } = useI18n();
  const fr = locale === "fr";
  return (
    <div className="flex h-full items-center justify-center gap-4 p-4">
      <div className="flex h-full w-[34%] flex-col items-center justify-center rounded-2xl border border-white/10 bg-brand p-3 text-center">
        <span className="font-mono text-[7px] uppercase tracking-[0.2em] text-white/40">{fr ? "Vous êtes invités" : "You are invited"}</span>
        <span className="mt-2 font-serif text-[clamp(14px,2.2vw,26px)] italic leading-none text-white/90">{fr ? "Réservez la date" : "Save the date"}</span>
        <span className="my-3 h-px w-10" style={{ background: "var(--accent)" }} />
        <Bar w="60%" />
        <Bar w="40%" className="mt-1.5 bg-white/5" />
        <div className="mt-4 flex w-full gap-1.5">
          <span className="flex-1 truncate rounded-md py-1 text-[7px] font-medium text-black" style={{ background: "var(--accent)" }}>
            {fr ? "Présent" : "Attending"}
          </span>
          <span className="flex-1 truncate rounded-md border border-white/10 py-1 text-[7px] text-white/60">{fr ? "Absent" : "Decline"}</span>
        </div>
      </div>
      <div className="hidden h-full flex-1 flex-col gap-2 @md:flex">
        <div className="flex-1 rounded-lg border border-white/[0.06] bg-white/[0.02] p-2.5">
          <span className="text-[9px] text-white/60">{fr ? "Plan de tables" : "Seating plan"}</span>
          <div className="mt-2 grid grid-cols-4 gap-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <span key={i} className="relative grid aspect-square place-items-center rounded-full border border-white/10">
                <span className="h-1/2 w-1/2 rounded-full" style={{ background: "var(--accent)", opacity: 0.2 + (i % 3) * 0.18 }} />
              </span>
            ))}
          </div>
        </div>
        <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-2.5">
          <span className="text-[9px] text-white/60">{fr ? "Invités · RSVP" : "Guests · RSVP"}</span>
          {[0, 1].map((i) => (
            <div key={i} className="mt-1.5 flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-white/10" />
              <Bar w="40%" />
              <span className="ml-auto h-2 w-8 rounded-full" style={{ background: "var(--accent)", opacity: 0.45 }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Site({ project }: { project: Project }) {
  const { locale } = useI18n();
  const items = project.mockupItems ?? [];
  const links = locale === "fr" ? ["Services", "Produits", "Réalisations", "Contact"] : ["Services", "Products", "Work", "Contact"];
  return (
    <div className="flex h-full flex-col p-4">
      <div className="flex items-center justify-between">
        <span className="h-3 w-12 rounded" style={{ background: "var(--accent)", opacity: 0.6 }} />
        <div className="hidden gap-3 @md:flex">
          {links.map((l) => (
            <span key={l} className="text-[8px] text-white/45">
              {l}
            </span>
          ))}
        </div>
        <span className="rounded-full px-2 py-0.5 text-[7px] font-medium text-black" style={{ background: "var(--accent)" }}>
          {locale === "fr" ? "Devis" : "Get a quote"}
        </span>
      </div>
      <div className="mt-5 space-y-2">
        <span className="block h-3.5 w-3/5 rounded bg-white/20" />
        <span className="block h-3.5 w-2/5 rounded bg-white/10" />
      </div>
      <div className="mt-auto grid grid-cols-3 gap-2">
        {items.map((p) => (
          <div key={p} className="rounded-lg border border-white/[0.07] bg-white/[0.02] p-2">
            <span className="mb-1.5 block h-3 w-3 rounded" style={{ background: "var(--accent)", opacity: 0.55 }} />
            <span className="block truncate text-[8px] text-white/70">{p}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Store({ project }: { project: Project }) {
  const { locale } = useI18n();
  const fr = locale === "fr";
  const items = project.mockupItems ?? [];
  return (
    <div className="flex h-full flex-col p-3 sm:p-4">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-semibold tracking-tight text-white/90">{project.name.split(" ")[0]}</span>
        <div className="hidden gap-3 @md:flex">
          {(fr ? ["Boutique", "Professionnels", "À propos"] : ["Shop", "Professionals", "About"]).map((l) => (
            <span key={l} className="text-[8px] text-white/45">
              {l}
            </span>
          ))}
        </div>
        <span className="flex items-center gap-1 rounded-full border border-white/10 px-2 py-0.5 text-[7px] text-white/70">
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--accent)" }} />
          {fr ? "Panier" : "Cart"}
        </span>
      </div>
      <div className="mt-3 rounded-lg p-3" style={{ background: "color-mix(in srgb, var(--accent) 15%, transparent)" }}>
        <span className="block h-2.5 w-2/5 rounded bg-white/30" />
        <span className="mt-1.5 block h-2 w-1/4 rounded bg-white/15" />
      </div>
      <div className="mt-3 grid flex-1 grid-cols-3 gap-2">
        {items.map((name) => (
          <div key={name} className="flex flex-col rounded-lg border border-white/[0.07] bg-white/[0.02] p-2">
            <span className="flex-1 rounded-md" style={{ background: "color-mix(in srgb, var(--accent) 20%, transparent)" }} />
            <span className="mt-1.5 truncate text-[8px] text-white/80">{name}</span>
            <span className="mt-1 rounded py-0.5 text-center text-[6px] font-medium text-black" style={{ background: "var(--accent)" }}>
              {fr ? "Ajouter" : "Add"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function News({ project }: { project: Project }) {
  const { locale } = useI18n();
  const items = project.mockupItems ?? [];
  return (
    <div className="flex h-full flex-col p-3 sm:p-4">
      <div className="flex items-end justify-between border-b border-white/10 pb-2">
        <span className="font-serif text-[clamp(12px,2vw,20px)] italic text-white/90">{project.name}</span>
        <span className="flex items-center gap-1 text-[7px] font-semibold uppercase tracking-wider" style={{ color: "var(--accent)" }}>
          <span className="h-1.5 w-1.5 animate-pulse rounded-full" style={{ background: "var(--accent)" }} />
          {locale === "fr" ? "En direct" : "Live"}
        </span>
      </div>
      <div className="mt-2 flex gap-3">
        {items.map((s) => (
          <span key={s} className="truncate text-[7px] uppercase tracking-wider text-white/45">
            {s}
          </span>
        ))}
      </div>
      <div className="mt-3 grid flex-1 grid-cols-3 gap-2">
        <div className="col-span-2 flex flex-col rounded-lg border border-white/[0.07] bg-white/[0.02] p-2">
          <span className="flex-1 rounded-md bg-brand" />
          <span className="mt-2 block h-2 w-4/5 rounded bg-white/25" />
          <span className="mt-1 block h-1.5 w-3/5 rounded bg-white/10" />
        </div>
        <div className="flex flex-col gap-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex-1 rounded-lg border border-white/[0.07] bg-white/[0.02] p-1.5">
              <span className="block font-mono text-[6px]" style={{ color: "var(--accent)" }}>
                {["07:38", "14:54", "16:10"][i]}
              </span>
              <Bar w="90%" className="mt-1" />
              <Bar w="60%" className="mt-1 bg-white/5" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Blueprint({ project }: { project: Project }) {
  const { t } = useI18n();
  return (
    <div className="relative h-full">
      <div className="absolute inset-0 opacity-60 [background-image:linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="absolute inset-4 grid grid-cols-4 grid-rows-3 gap-3">
        <div className="row-span-3 rounded-lg border border-dashed border-white/15" />
        <div className="col-span-3 rounded-lg border border-dashed border-white/15" />
        <div className="col-span-2 row-span-2 rounded-lg border border-dashed border-white/15" />
        <div className="row-span-2 rounded-lg border border-dashed border-white/15" />
      </div>
      <div className="absolute inset-0 grid place-items-center">
        <span className="rounded-full border border-white/15 bg-[#0a0c0f]/90 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.15em] text-white/60 backdrop-blur">
          {t.status[project.status]}
        </span>
      </div>
    </div>
  );
}
