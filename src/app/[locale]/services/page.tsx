import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { dictionaries } from "@/i18n/dictionary";
import { pageMetadata, resolveLocale } from "@/lib/metadata";

export async function generateMetadata({ params }: PageProps<"/[locale]/services">): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = dictionaries[locale].meta;
  return pageMetadata(locale, "/services", t.services, t.servicesDesc);
}

export default async function ServicesPage({ params }: PageProps<"/[locale]/services">) {
  const locale = await resolveLocale(params);
  const t = dictionaries[locale].servicesPage;
  return (
    <>
      <PageHeader label={t.label} title={t.title} description={t.description} />
      <ServicesGrid />
    </>
  );
}
