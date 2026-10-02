import type { Metadata } from "next";
import { Experience } from "@/components/sections/Experience";
import { Contact } from "@/components/sections/Contact";
import { dictionaries } from "@/i18n/dictionary";
import { pageMetadata, resolveLocale } from "@/lib/metadata";

export async function generateMetadata({ params }: PageProps<"/[locale]/experience">): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = dictionaries[locale].meta;
  return pageMetadata(locale, "/experience", t.experience, t.experienceDesc);
}

export default function ExperiencePage() {
  return (
    <div className="pt-16">
      <Experience headingAs="h1" />
      <Contact />
    </div>
  );
}
