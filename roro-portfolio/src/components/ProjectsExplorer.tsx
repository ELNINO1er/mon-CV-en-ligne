"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { projects } from "@/lib/projects";
import { EASE } from "@/lib/motion";

export default function ProjectsExplorer() {
  const tags = useMemo(() => ["Tous", ...Array.from(new Set(projects.map((p) => p.tag)))], []);
  const [active, setActive] = useState("Tous");

  const filtered = active === "Tous" ? projects : projects.filter((p) => p.tag === active);

  return (
    <div>
      <div className="filters" role="tablist" aria-label="Filtrer les projets">
        {tags.map((t) => (
          <button
            key={t}
            role="tab"
            aria-selected={active === t}
            className={`filter ${active === t ? "is-active" : ""}`}
            onClick={() => setActive(t)}
          >
            {t}
          </button>
        ))}
      </div>

      <motion.div layout className="grid-cards proj-grid">
        <AnimatePresence mode="popLayout">
          {filtered.map((p) => (
            <motion.div
              key={p.slug}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              <ProjectCard project={p} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <style>{`
        .filters { display:flex; flex-wrap:wrap; gap:10px; margin-bottom:32px; }
        .filter {
          font-size:.88rem; font-weight:500; color:var(--muted); cursor:pointer;
          padding:10px 18px; border-radius:999px; background:var(--surface); border:1px solid var(--border);
          transition:color .2s, border-color .2s, background .2s;
        }
        .filter:hover { color:#fff; border-color:var(--border-strong); }
        .filter.is-active { color:#fff; border-color:transparent; background:linear-gradient(120deg,var(--violet),var(--cyan)); }
        .proj-grid { min-height:200px; }
      `}</style>
    </div>
  );
}
