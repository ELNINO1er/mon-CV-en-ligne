"use client";

import { statusColor, type Project } from "@/data/projects";
import { useI18n } from "@/i18n/I18nProvider";
import { cn } from "@/lib/utils";

/** État du projet (couleur sémantique) + étiquettes (projet client, installation locale…) */
export function StatusBadge({ project, className, compact }: { project: Project; className?: string; compact?: boolean }) {
  const { t } = useI18n();
  const color = statusColor[project.status];
  const pulse = project.status === "live" || project.status === "inDevelopment" || project.status === "active";

  return (
    <span className={cn("inline-flex flex-wrap items-center gap-2", className)}>
      <span
        className="inline-flex items-center gap-2 rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider"
        style={{
          color,
          borderColor: `color-mix(in srgb, ${color} 35%, transparent)`,
          background: `color-mix(in srgb, ${color} 10%, transparent)`,
        }}
      >
        <span className="relative flex h-1.5 w-1.5">
          {pulse && <span className="absolute inset-0 animate-ping rounded-full" style={{ background: color, opacity: 0.6 }} />}
          <span className="relative h-1.5 w-1.5 rounded-full" style={{ background: color }} />
        </span>
        {t.status[project.status]}
      </span>
      {!compact &&
        project.tags?.map((tag) => (
          <span key={tag} className="rounded-full border border-line-strong px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted">
            {t.tags[tag]}
          </span>
        ))}
    </span>
  );
}
