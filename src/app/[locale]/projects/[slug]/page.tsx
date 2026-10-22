import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Check, Globe } from "lucide-react";
import { getProject, nextProject, projectIndex, projects } from "@/data/projects";
import { SplitText } from "@/components/ui/SplitText";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { ProductMockup } from "@/components/project/ProductMockup";
import { WorkflowDiagram } from "@/components/project/WorkflowDiagram";
import { ScaleOnScroll } from "@/components/project/ScaleOnScroll";
import { StatusBadge } from "@/components/project/StatusBadge";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { dictionaries } from "@/i18n/dictionary";
import { localePath, locales } from "@/i18n/config";
import { pageMetadata, resolveLocale } from "@/lib/metadata";

export function generateStaticParams() {
  return locales.flatMap((locale) => projects.map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const locale = await resolveLocale(params);
  const p = getProject(slug);
  if (!p) return {};
  return pageMetadata(locale, `/projects/${p.slug}`, `${p.name} — ${p.category[locale]}`, p.summary[locale]);
}

function Block({ index, label, children }: { index: string; label: string; children: React.ReactNode }) {
  return (
    <section className="grid gap-8 border-t border-line py-16 md:grid-cols-[14rem_1fr] md:py-24">
      <Reveal blur={false} y={12} className="self-start md:sticky md:top-28">
        <p className="label-mono flex items-center gap-3">
          <span style={{ color: "var(--accent)" }}>{index}</span>
          {label}
        </p>
      </Reveal>
      <div>{children}</div>
    </section>
  );
}

export default async function ProjectPage({ params }: PageProps<"/[locale]/projects/[slug]">) {
  const { slug } = await params;
  const locale = await resolveLocale(params);
  const p = getProject(slug);
  if (!p) notFound();
  const t = dictionaries[locale].project;
  const ui = dictionaries[locale].ui;
  const next = nextProject(p.slug);
  const tr = (v: { fr: string; en: string }) => v[locale];

  let n = 0;
  const idx = () => String(++n).padStart(2, "0");

  const meta = [
    [t.role, p.role.slice(0, 2).map(tr).join(" · ")],
    [t.category, tr(p.category).split(" · ")[0]],
    [t.stack, p.stack?.slice(0, 4).join(" · ")],
    [t.workflow, p.workflow && t.steps(p.workflow.steps.length)],
  ].filter(([, v]) => v) as [string, string][];

  return (
    <article style={{ "--accent": p.accent } as React.CSSProperties}>
      {/* Hero projet */}
      <header className="relative overflow-hidden pb-12 pt-36 md:pt-44">

        <div className="container-x relative">
          <Reveal blur={false} y={10}>
            <Link href={localePath(locale, "/projects")} className="group mb-12 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg">
              <ArrowLeft className="h-4 w-4 transition-transform duration-500 ease-out-expo group-hover:-translate-x-1" />
              {t.all}
            </Link>
            <p className="label-mono flex items-center gap-3">
              <span style={{ color: p.accent }}>{projectIndex(p.slug)}</span>
              <span className="h-px w-8 bg-line-strong" />
              {tr(p.category)}
            </p>
          </Reveal>
          <SplitText
            as="h1"
            inView={false}
            delay={0.1}
            text={p.name}
            className="mt-6 text-[clamp(3.25rem,11vw,10rem)] font-semibold leading-[0.88] tracking-[-0.06em]"
          />
          <Reveal delay={0.35}>
            <p className="mt-8 max-w-2xl text-xl leading-relaxed text-muted md:text-2xl">{tr(p.tagline)}</p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <StatusBadge project={p} />
              {p.url && (
                <MagneticButton href={p.url} className="h-11 px-5">
                  <span className="inline-flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    {t.visit}
                  </span>
                </MagneticButton>
              )}
            </div>
          </Reveal>

          <Reveal delay={0.5}>
            <dl className="mt-14 flex flex-wrap gap-px overflow-hidden rounded-2xl border border-line bg-line">
              {meta.map(([k, v]) => (
                <div key={k} className="min-w-[45%] flex-1 bg-bg p-5 md:min-w-0">
                  <dt className="label-mono">{k}</dt>
                  <dd className="mt-2 text-sm">{v}</dd>
                </div>
              ))}
              {p.url && (
                <div className="min-w-[45%] flex-1 bg-bg p-5 md:min-w-0">
                  <dt className="label-mono">{t.link}</dt>
                  <dd className="mt-2 truncate text-sm">
                    <a href={p.url} target="_blank" rel="noopener noreferrer" className="underline decoration-line-strong underline-offset-4 hover:decoration-[var(--accent)]">
                      {p.url.replace(/^https?:\/\//, "")}
                    </a>
                  </dd>
                </div>
              )}
            </dl>
          </Reveal>
        </div>
      </header>

      {/* Mockup */}
      <div className="container-x">
        <ScaleOnScroll className="mx-auto max-w-5xl py-8">
          <ProductMockup project={p} />
        </ScaleOnScroll>
        <p className="label-mono mt-2 text-center text-dim">{t.concept}</p>
      </div>

      <div className="container-x mt-20">
        <Block index={idx()} label={t.overview}>
          <Reveal>
            <p className="max-w-3xl text-2xl font-medium leading-snug tracking-[-0.02em] md:text-3xl">{tr(p.summary)}</p>
          </Reveal>
          {p.note && (
            <Reveal delay={0.1}>
              <p className="mt-8 inline-flex items-center gap-3 rounded-full border border-line-strong px-4 py-2 text-sm text-muted">
                <span className="h-1.5 w-1.5 shrink-0 animate-blink rounded-full" style={{ background: p.accent }} />
                {tr(p.note)}
              </p>
            </Reveal>
          )}
        </Block>

        {(p.problem || p.solution) && (
          <Block index={idx()} label={p.problem ? t.problemSolution : t.solution}>
            <div className="grid gap-4 md:grid-cols-2">
              {p.problem && (
                <Reveal>
                  <div className="h-full rounded-2xl border border-line bg-surface p-7">
                    <p className="label-mono">{t.problem}</p>
                    <p className="mt-5 text-lg leading-relaxed text-fg/90">{tr(p.problem)}</p>
                  </div>
                </Reveal>
              )}
              {p.solution && (
                <Reveal delay={0.1}>
                  <div className="relative h-full overflow-hidden rounded-2xl border border-line-strong bg-surface p-7">

                    <p className="label-mono relative" style={{ color: p.accent }}>
                      {t.solution}
                    </p>
                    <p className="relative mt-5 text-lg leading-relaxed">{tr(p.solution)}</p>
                  </div>
                </Reveal>
              )}
            </div>
          </Block>
        )}

        {p.workflow && (
          <Block index={idx()} label={tr(p.workflow.label)}>
            <WorkflowDiagram steps={p.workflow.steps.map(tr)} accent={p.accent} />
          </Block>
        )}

        <Block index={idx()} label={t.role}>
          <Stagger className="flex flex-wrap gap-3">
            {p.role.map((r) => (
              <StaggerItem key={r.en}>
                <span className="inline-flex rounded-full border border-line-strong bg-surface px-4 py-2 text-base">{tr(r)}</span>
              </StaggerItem>
            ))}
          </Stagger>
        </Block>

        {(p.stack || p.integrations) && (
          <Block index={idx()} label={t.stack}>
            {p.stack && (
              <Stagger className="flex flex-wrap gap-2" stagger={0.04}>
                {p.stack.map((s) => (
                  <StaggerItem key={s}>
                    <span
                      className="inline-flex rounded-lg border px-3.5 py-2 font-mono text-sm"
                      style={{ borderColor: `color-mix(in srgb, ${p.accent} 30%, var(--line-strong))` }}
                    >
                      {s}
                    </span>
                  </StaggerItem>
                ))}
              </Stagger>
            )}
            {p.integrations && (
              <div className={p.stack ? "mt-10" : undefined}>
                <p className="label-mono mb-4">{tr(p.integrations.label)}</p>
                <Stagger className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {p.integrations.items.map((s) => (
                    <StaggerItem key={s}>
                      <div className="rounded-xl border border-line-strong bg-surface p-5 text-center font-medium tracking-tight">{s}</div>
                    </StaggerItem>
                  ))}
                </Stagger>
              </div>
            )}
          </Block>
        )}

        {p.architecture && (
          <Block index={idx()} label={t.architecture}>
            <Stagger className="grid gap-4 md:grid-cols-3">
              {p.architecture.map((a) => (
                <StaggerItem key={a.title.en} className="h-full">
                  <SpotlightCard accent={p.accent} className="h-full p-6">
                    <span className="block h-8 w-8 rounded-lg border border-line-strong" style={{ background: `color-mix(in srgb, ${p.accent} 22%, transparent)` }} />
                    <h3 className="mt-8 text-lg font-medium tracking-tight">{tr(a.title)}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{tr(a.text)}</p>
                  </SpotlightCard>
                </StaggerItem>
              ))}
            </Stagger>
          </Block>
        )}

        {p.features.length > 0 && (
          <Block index={idx()} label={p.features.length > 1 ? t.modules : t.features}>
            <div className={p.features.length > 1 ? "grid gap-10 md:grid-cols-2" : undefined}>
              {p.features.map((g) => (
                <div key={g.label.en}>
                  {(p.features.length > 1 || g.label.en !== "Features") && <h3 className="mb-4 text-xl font-medium tracking-tight">{tr(g.label)}</h3>}
                  <Stagger className={p.features.length > 1 ? "grid gap-px" : "grid gap-px sm:grid-cols-2 lg:grid-cols-3"} stagger={0.03}>
                    {g.items.map((f) => (
                      <StaggerItem key={f.en}>
                        <div className="flex items-center gap-3 border-b border-line py-3.5 text-base">
                          <Check className="h-4 w-4 shrink-0" style={{ color: p.accent }} />
                          {tr(f)}
                        </div>
                      </StaggerItem>
                    ))}
                  </Stagger>
                </div>
              ))}
            </div>
          </Block>
        )}

        {p.value && (
          <Block index={idx()} label={t.value}>
            <SplitText
              as="p"
              text={tr(p.value)}
              stagger={0.03}
              className="max-w-4xl text-[clamp(1.75rem,4vw,3.25rem)] font-medium leading-[1.1] tracking-[-0.035em]"
            />
          </Block>
        )}
      </div>

      {/* Projet suivant */}
      <Link href={localePath(locale, `/projects/${next.slug}`)} data-cursor={ui.cursor.next} className="group relative mt-16 block overflow-hidden border-t border-line py-24 md:py-36">
        <div
          aria-hidden
          className="absolute inset-0 origin-bottom scale-y-0 transition-transform duration-700 ease-out-expo group-hover:scale-y-100"
          style={{ background: `color-mix(in srgb, ${next.accent} 6%, transparent)` }}
        />
        <div className="container-x relative flex items-end justify-between gap-8">
          <div>
            <p className="label-mono">
              {t.next} — {projectIndex(next.slug)}
            </p>
            <p className="mt-4 text-[clamp(2.75rem,9vw,8.5rem)] font-semibold leading-[0.9] tracking-[-0.06em] transition-transform duration-700 ease-out-expo group-hover:translate-x-4">
              {next.name}
            </p>
            <p className="mt-4" style={{ color: next.accent }}>
              {tr(next.category)}
            </p>
          </div>
          <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full border border-line-strong transition-all duration-500 ease-out-expo group-hover:border-transparent group-hover:bg-fg group-hover:text-bg md:h-24 md:w-24">
            <ArrowUpRight className="h-6 w-6 transition-transform duration-500 group-hover:rotate-45" />
          </span>
        </div>
      </Link>
    </article>
  );
}
