"use client";

import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { featuredSlugs, getProject, projectIndex, projects, type Project } from "@/data/projects";
import { ProductMockup } from "@/components/project/ProductMockup";
import { WorkflowDiagram } from "@/components/project/WorkflowDiagram";
import { StatusBadge } from "@/components/project/StatusBadge";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useI18n } from "@/i18n/I18nProvider";

gsap.registerPlugin(ScrollTrigger);

const featured = featuredSlugs.map((s) => getProject(s)).filter(Boolean) as Project[];

/** Projets phares : scroll horizontal épinglé sur desktop, pile verticale sur mobile. */
export function FeaturedProjects() {
  const { t, href } = useI18n();
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const el = track.current!;
      const distance = () => el.scrollWidth - window.innerWidth;
      gsap.to(el, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section.current,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (bar.current) bar.current.style.transform = `scaleX(${self.progress})`;
          },
        },
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={section} className="relative overflow-hidden py-24 lg:flex lg:h-screen lg:flex-col lg:justify-center lg:py-0" aria-label={t.featured.label}>
      <div className="container-x mb-12 flex items-end justify-between gap-8 lg:mb-10">
        <SectionHeading index="02" label={t.featured.label} title={t.featured.title} color="var(--color-violet)" />
        <div className="hidden w-48 shrink-0 pb-3 lg:block">
          <span className="block h-px w-full overflow-hidden bg-line-strong">
            <span ref={bar} className="block h-full w-full origin-left scale-x-0 bg-gradient-to-r from-brand via-violet to-cyan" />
          </span>
          <p className="label-mono mt-3 text-right">{t.featured.scroll}</p>
        </div>
      </div>

      <div ref={track} className="flex flex-col gap-6 px-[clamp(1.25rem,4vw,2.5rem)] lg:w-max lg:flex-row lg:gap-8 lg:pr-[10vw] lg:will-change-transform">
        {featured.map((p) => (
          <FeaturedCard key={p.slug} project={p} />
        ))}
        <Link
          href={href("/projects")}
          data-cursor={t.ui.cursor.all}
          className="group relative flex min-h-48 items-center justify-center overflow-hidden rounded-2xl border border-dashed border-line-strong p-10 transition-colors hover:border-fg/30 lg:min-h-0 lg:w-[22vw]"
        >
          <span aria-hidden className="absolute inset-0 bg-gradient-to-br from-brand/10 via-violet/10 to-cyan/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <span className="relative flex items-center gap-3 text-2xl font-medium tracking-tight">
            {t.featured.all(projects.length)}
            <ArrowUpRight className="h-6 w-6 transition-transform duration-500 ease-out-expo group-hover:-translate-y-1 group-hover:translate-x-1" />
          </span>
        </Link>
      </div>
    </section>
  );
}

function FeaturedCard({ project }: { project: Project }) {
  const { t, tr, href } = useI18n();
  return (
    <Link
      href={href(`/projects/${project.slug}`)}
      data-cursor={t.ui.cursor.view}
      style={{ "--accent": project.accent } as React.CSSProperties}
      className="spotlight group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-surface p-5 transition-colors duration-500 hover:border-line-strong sm:p-7 lg:h-[68vh] lg:w-[62vw] lg:flex-row lg:gap-8 xl:w-[56vw]"
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
        e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
      }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-1/3 -right-1/4 h-[80%] w-[70%] rounded-full opacity-[var(--glow)] blur-[90px] transition-opacity duration-700 group-hover:opacity-30"
        style={{ background: project.accent }}
      />
      <span aria-hidden className="absolute inset-x-0 top-0 h-px" style={{ background: `linear-gradient(to right, transparent, ${project.accent}, transparent)` }} />
      <div className="relative flex flex-col lg:w-[38%] lg:shrink-0">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs" style={{ color: project.accent }}>
            {projectIndex(project.slug)}
          </span>
          <span className="label-mono">{tr(project.category)}</span>
        </div>
        <h3 className="mt-6 text-[clamp(2.5rem,5vw,4.5rem)] font-semibold leading-none tracking-[-0.05em]">{project.name}</h3>
        <p className="mt-4 max-w-sm text-base leading-relaxed text-muted">{tr(project.tagline)}</p>
        <div className="mt-5">
          <StatusBadge project={project} compact />
        </div>
        {project.workflow && (
          <div className="mt-8 hidden lg:block">
            <p className="label-mono mb-3">{tr(project.workflow.label)}</p>
            <WorkflowDiagram steps={project.workflow.steps.map(tr)} accent={project.accent} size="sm" />
          </div>
        )}
        {!project.workflow && project.features.length > 0 && (
          <div className="mt-8 hidden flex-wrap gap-2 lg:flex">
            {(project.features.length > 1 ? project.features.map((g) => g.label) : project.features[0].items).map((label) => (
              <span key={label.en} className="rounded-full border border-line-strong px-3 py-1 text-xs text-muted">
                {tr(label)}
              </span>
            ))}
          </div>
        )}
        <span className="mt-8 inline-flex items-center gap-2 text-sm font-medium lg:mt-auto" style={{ color: project.accent }}>
          {t.featured.caseStudy}
          <ArrowUpRight className="h-4 w-4 transition-transform duration-500 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>
      <div className="relative mt-8 flex flex-1 items-center lg:mt-0">
        <ProductMockup project={project} className="transition-transform duration-700 ease-out-expo group-hover:scale-[1.02]" />
      </div>
    </Link>
  );
}
