import type { Metadata } from "next";
import { Skills } from "@/components/sections/Skills";
import { Contact } from "@/components/sections/Contact";
import { dictionaries } from "@/i18n/dictionary";
import { pageMetadata, resolveLocale } from "@/lib/metadata";

export async function generateMetadata({ params }: PageProps<"/[locale]/skills">): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = dictionaries[locale].meta;
  return pageMetadata(locale, "/skills", t.skills, t.skillsDesc);
}

export default function SkillsPage() {
  return (
    <div className="pt-16">
      <Skills headingAs="h1" />
      <Contact />
    </div>
  );
}
