import type { Metadata } from "next";
import { Contact } from "@/components/sections/Contact";
import { dictionaries } from "@/i18n/dictionary";
import { pageMetadata, resolveLocale } from "@/lib/metadata";

export async function generateMetadata({ params }: PageProps<"/[locale]/contact">): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = dictionaries[locale].meta;
  return pageMetadata(locale, "/contact", t.contact, t.contactDesc);
}

export default function ContactPage() {
  return (
    <div className="pt-16">
      <Contact headingAs="h1" />
    </div>
  );
}
