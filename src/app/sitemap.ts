import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { localePath } from "@/i18n/config";
import { siteUrl } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/services", "/projects", "/about", "/experience", "/skills", "/contact", ...projects.map((p) => `/projects/${p.slug}`)];
  return paths.map((path) => ({
    url: `${siteUrl}${localePath("fr", path)}`,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : path.startsWith("/projects/") ? 0.7 : 0.8,
    alternates: {
      languages: { fr: `${siteUrl}${localePath("fr", path)}`, en: `${siteUrl}${localePath("en", path)}` },
    },
  }));
}
