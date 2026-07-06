import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Export statique : génère un dossier `out/` à uploader sur Hostinger (public_html).
  output: "export",
  // Requis par l'export statique (pas d'optimisation d'images à la volée côté serveur).
  images: { unoptimized: true },
  // URLs en dossiers (/contact/ -> /contact/index.html) : plus fiable en hébergement mutualisé.
  trailingSlash: true,
};

export default nextConfig;
