import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import { projects, getProject } from "@/lib/projects";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Projet introuvable" };
  return {
    title: `${project.title} — ${project.category}`,
    description: project.summary,
    alternates: { canonical: `/projets/${project.slug}` },
  };
}

const blocks = (project: NonNullable<ReturnType<typeof getProject>>) => [
  { label: "Le problème", icon: "Target" as const, text: project.problem },
  { label: "Ma solution", icon: "Zap" as const, text: project.solution },
  { label: "Le résultat", icon: "Rocket" as const, text: project.result },
];

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const idx = projects.findIndex((p) => p.slug === slug);
  const next = projects[(idx + 1) % projects.length];

  return (
    <>
      <article>
        {/* Hero */}
        <section className="pd-hero">
          <div className="container">
            <Reveal>
              <Link href="/projets" className="pd-back">
                <Icon name="ArrowRight" size={16} style={{ transform: "rotate(180deg)" }} /> Tous les projets
              </Link>
            </Reveal>
            <Reveal delay={0.05}>
              <div className="pd-meta">
                <span className="chip">{project.tag}</span>
                <span className="mono pd-year">{project.year}</span>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="h-display pd-title">{project.title}</h1>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="lead pd-cat">{project.category}</p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="pd-cover" style={{ backgroundImage: project.gradient }}>
                <div className="pd-cover-grid" aria-hidden="true" />
                <span className="pd-cover-title">{project.title}</span>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Body */}
        <section className="section" style={{ paddingTop: 24 }}>
          <div className="container pd-layout">
            <div className="pd-main">
              {blocks(project).map((b, i) => (
                <Reveal key={b.label} delay={i * 0.05} className="pd-block card">
                  <span className="pd-block-icon">
                    <Icon name={b.icon} size={20} />
                  </span>
                  <div>
                    <h2 className="pd-block-label">{b.label}</h2>
                    <p className="pd-block-text">{b.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <aside className="pd-side">
              <div className="card pd-side-card">
                <h3 className="pd-side-h mono">Technologies</h3>
                <div className="pd-tech">
                  {project.tech.map((t) => (
                    <span key={t} className="chip">
                      {t}
                    </span>
                  ))}
                </div>
                <hr className="divider" style={{ margin: "20px 0" }} />
                <h3 className="pd-side-h mono">Points clés</h3>
                <ul className="pd-high">
                  {project.highlights.map((h) => (
                    <li key={h}>
                      <Icon name="CheckCircle2" size={16} /> {h}
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className="btn btn-primary" style={{ marginTop: 22, width: "100%" }}>
                  Lancer un projet similaire
                </Link>
                <p className="pd-side-note mono">Devis gratuit — réponse sous 24h</p>
              </div>
            </aside>
          </div>
        </section>

        {/* Next project */}
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="container">
            <Link href={`/projets/${next.slug}`} className="card pd-next">
              <div>
                <span className="mono pd-next-label">Projet suivant</span>
                <h3 className="pd-next-title">{next.title}</h3>
                <p className="pd-next-cat">{next.category}</p>
              </div>
              <span className="pd-next-arrow">
                <Icon name="ArrowRight" size={22} />
              </span>
            </Link>
          </div>
        </section>
      </article>

      <CtaBand />

      <style>{`
        .pd-hero { padding-top:clamp(36px,6vw,64px); }
        .pd-back { display:inline-flex; align-items:center; gap:8px; color:var(--muted); font-size:.9rem; margin-bottom:24px; transition:color .2s; }
        .pd-back:hover { color:#fff; }
        .pd-meta { display:flex; align-items:center; gap:14px; margin-bottom:16px; }
        .pd-year { color:var(--faint); font-size:.85rem; }
        .pd-title { margin-bottom:12px; }
        .pd-cat { color:var(--cyan); margin-bottom:32px; }
        .pd-cover { position:relative; border-radius:var(--radius-lg); overflow:hidden; aspect-ratio:21/9; display:flex; align-items:flex-end; padding:clamp(20px,4vw,40px); background-color:#0b0d16; border:1px solid var(--border-strong); }
        .pd-cover-grid { position:absolute; inset:0; background-image:linear-gradient(rgba(255,255,255,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.05) 1px,transparent 1px); background-size:44px 44px; mask-image:radial-gradient(120% 100% at 50% 0%,#000,transparent 75%); }
        .pd-cover-title { position:relative; font-family:var(--font-display); font-weight:700; font-size:clamp(1.6rem,4vw,3rem); color:#fff; }

        .pd-layout { display:grid; grid-template-columns:1.7fr 1fr; gap:28px; align-items:start; }
        .pd-main { display:flex; flex-direction:column; gap:18px; }
        .pd-block { padding:26px; display:flex; gap:18px; }
        .pd-block-icon { flex:none; display:inline-flex; align-items:center; justify-content:center; width:46px; height:46px; border-radius:13px; color:var(--cyan); background:linear-gradient(135deg,rgba(34,211,238,.15),rgba(124,92,255,.12)); border:1px solid var(--border-strong); }
        .pd-block-label { font-size:1.15rem; margin-bottom:8px; }
        .pd-block-text { color:var(--muted); }
        .pd-side { position:sticky; top:96px; }
        .pd-side-card { padding:26px; }
        .pd-side-h { font-size:.72rem; letter-spacing:.14em; text-transform:uppercase; color:var(--faint); margin-bottom:14px; }
        .pd-tech { display:flex; flex-wrap:wrap; gap:8px; }
        .pd-high { list-style:none; margin:0; padding:0; display:flex; flex-direction:column; gap:10px; }
        .pd-high li { display:flex; align-items:center; gap:9px; color:var(--text); font-size:.92rem; }
        .pd-high svg { color:var(--cyan); flex:none; }
        .pd-side-note { text-align:center; color:var(--faint); font-size:.78rem; margin-top:12px; }

        .pd-next { display:flex; align-items:center; justify-content:space-between; gap:20px; padding:28px 32px; }
        .pd-next-label { font-size:.72rem; letter-spacing:.14em; text-transform:uppercase; color:var(--cyan); }
        .pd-next-title { font-size:1.5rem; margin:8px 0 4px; }
        .pd-next-cat { color:var(--muted); font-size:.92rem; }
        .pd-next-arrow { display:inline-flex; align-items:center; justify-content:center; width:52px; height:52px; border-radius:50%; color:#fff; background:linear-gradient(135deg,var(--violet),var(--indigo)); flex:none; transition:transform .3s; }
        .pd-next:hover .pd-next-arrow { transform:translateX(6px); }

        @media (max-width:900px){ .pd-layout{ grid-template-columns:1fr; } .pd-side{ position:static; } }
      `}</style>
    </>
  );
}
