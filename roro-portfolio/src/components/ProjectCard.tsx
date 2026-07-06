import Link from "next/link";
import Icon from "./Icon";
import type { Project } from "@/lib/projects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/projets/${project.slug}`} className="card proj">
      <div className="proj-cover" style={{ backgroundImage: project.gradient }}>
        <span className="proj-tag">{project.tag}</span>
        <span className="proj-year mono">{project.year}</span>
        <div className="proj-cover-grid" aria-hidden="true" />
        <span className="proj-cover-title">{project.title}</span>
      </div>
      <div className="proj-body">
        <h3 className="proj-title">{project.title}</h3>
        <p className="proj-cat mono">{project.category}</p>
        <p className="proj-summary">{project.summary}</p>
        <div className="proj-tech">
          {project.tech.slice(0, 4).map((t) => (
            <span key={t} className="proj-chip">
              {t}
            </span>
          ))}
        </div>
        <span className="proj-link">
          Voir l&apos;étude de cas <Icon name="ArrowUpRight" size={16} />
        </span>
      </div>
      <style>{`
        .proj { display:flex; flex-direction:column; }
        .proj-cover {
          position:relative; aspect-ratio:16/10; overflow:hidden;
          display:flex; align-items:flex-end; padding:20px;
          background-color:#0b0d16;
        }
        .proj-cover-grid {
          position:absolute; inset:0;
          background-image:
            linear-gradient(rgba(255,255,255,.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.06) 1px, transparent 1px);
          background-size:34px 34px;
          mask-image:radial-gradient(120% 100% at 50% 0%, #000, transparent 75%);
        }
        .proj-cover-title {
          position:relative; font-family:var(--font-display); font-weight:700;
          font-size:clamp(1.3rem,2.4vw,1.9rem); color:#fff; letter-spacing:-.02em;
          text-shadow:0 2px 30px rgba(0,0,0,.5);
          transition:transform .4s cubic-bezier(.22,1,.36,1);
        }
        .proj:hover .proj-cover-title { transform:translateY(-4px); }
        .proj-tag {
          position:absolute; top:16px; left:16px; z-index:2;
          font-size:.72rem; font-weight:600; letter-spacing:.04em;
          padding:6px 11px; border-radius:999px; color:#fff;
          background:rgba(0,0,0,.35); border:1px solid var(--border-strong); backdrop-filter:blur(6px);
        }
        .proj-year { position:absolute; top:18px; right:16px; z-index:2; font-size:.72rem; color:rgba(255,255,255,.75); }
        .proj-body { padding:22px 24px 24px; display:flex; flex-direction:column; gap:10px; }
        .proj-title { font-size:1.25rem; }
        .proj-cat { font-size:.74rem; letter-spacing:.08em; text-transform:uppercase; color:var(--cyan); }
        .proj-summary { color:var(--muted); font-size:.94rem; }
        .proj-tech { display:flex; flex-wrap:wrap; gap:7px; margin-top:4px; }
        .proj-chip { font-size:.74rem; color:var(--text); padding:5px 10px; border-radius:8px; background:var(--surface); border:1px solid var(--border); }
        .proj-link { display:inline-flex; align-items:center; gap:6px; margin-top:8px; color:#fff; font-weight:600; font-size:.9rem; }
        .proj:hover .proj-link { color:var(--cyan); }
      `}</style>
    </Link>
  );
}
