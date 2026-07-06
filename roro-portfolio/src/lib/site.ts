// ============================================================
// Central site configuration.
// ⚠️  À CONFIRMER / REMPLACER : téléphone WhatsApp, email public,
//     URL LinkedIn et le domaine de production (siteUrl).
// ============================================================

export const site = {
  name: "Romaric Bombade",
  brand: "RORO systems",
  role: "Développeur Full-Stack IA & SaaS",
  tagline:
    "Je transforme vos idées en applications web modernes, plateformes SaaS et automatisations intelligentes pour aider votre entreprise à gagner du temps, mieux gérer ses activités et accélérer sa transformation digitale.",
  shortPitch:
    "Développeur Full-Stack spécialisé en IA appliquée, SaaS, automatisation et applications métier — basé à Abidjan, disponible en freelance à l'international.",
  location: "Abidjan, Côte d'Ivoire",

  // Domaine de production — via variable d'env sur Vercel (NEXT_PUBLIC_SITE_URL),
  // sinon valeur par défaut ci-dessous à mettre à jour avant mise en ligne.
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://romaricbombade.com",

  // Coordonnées
  email: "dromaric58@gmail.com",
  phoneDisplay: "+225 07 49 15 77 41",
  phoneIntl: "2250749157741", // format wa.me / tel sans "+"
  linkedin: "https://www.linkedin.com/in/romaric-bombade-725623253",
  github: "https://github.com/",

  whatsappMessage:
    "Bonjour Romaric, j'ai un projet (site / application / SaaS / automatisation) et j'aimerais en discuter avec vous.",
};

export const whatsappUrl = (message: string = site.whatsappMessage) =>
  `https://wa.me/${site.phoneIntl}?text=${encodeURIComponent(message)}`;

export const mailtoUrl = (subject = "Projet — prise de contact", body = "") =>
  `mailto:${site.email}?subject=${encodeURIComponent(subject)}${
    body ? `&body=${encodeURIComponent(body)}` : ""
  }`;

export const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/projets", label: "Projets" },
  { href: "/offres", label: "Offres" },
  { href: "/a-propos", label: "À propos" },
  { href: "/contact", label: "Contact" },
];

export const stats = [
  { value: 5, suffix: "+", label: "Années d'expérience" },
  { value: 20, suffix: "+", label: "Projets livrés" },
  { value: 6, suffix: "", label: "Secteurs adressés" },
  { value: 100, suffix: "%", label: "Orienté résultats" },
];
