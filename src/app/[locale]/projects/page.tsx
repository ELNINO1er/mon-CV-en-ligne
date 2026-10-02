import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { ProjectsGrid } from "@/components/project/ProjectsGrid";
import { dictionaries } from "@/i18n/dictionary";
import { pageMetadata, resolveLocale } from "@/lib/metadata";

export async function generateMetadata({ params }: PageProps<"/[locale]/projects">): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = dictionaries[locale].meta;
  return pageMetadata(locale, "/projects", t.projects, t.projectsDesc);
}

export default async function ProjectsPage({ params }: PageProps<"/[locale]/projects">) {
  const locale = await resolveLocale(params);
  const t = dictionaries[locale].projectsPage;
  return (
    <>
      <PageHeader label={t.label} title={t.title} description={t.description} />
      <ProjectsGrid />
    </>
  );
}
