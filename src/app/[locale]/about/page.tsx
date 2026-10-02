import type { Metadata } from "next";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Skills } from "@/components/sections/Skills";
import { Contact } from "@/components/sections/Contact";
import { dictionaries } from "@/i18n/dictionary";
import { pageMetadata, resolveLocale } from "@/lib/metadata";

export async function generateMetadata({ params }: PageProps<"/[locale]/about">): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = dictionaries[locale].meta;
  return pageMetadata(locale, "/about", t.about, t.aboutDesc);
}

export default function AboutPage() {
  return (
    <div className="pt-16">
      <About full headingAs="h1" />
      <Experience />
      <Skills />
      <Contact />
    </div>
  );
}
