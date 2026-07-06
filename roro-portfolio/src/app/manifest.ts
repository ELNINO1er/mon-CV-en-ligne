import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — Développeur Full-Stack IA & SaaS`,
    short_name: "Romaric Bombade",
    description: site.shortPitch,
    start_url: "/",
    display: "standalone",
    background_color: "#05060b",
    theme_color: "#05060b",
    lang: "fr-FR",
    icons: [
      { src: "/roro-mark.svg", sizes: "any", type: "image/svg+xml" },
    ],
  };
}
