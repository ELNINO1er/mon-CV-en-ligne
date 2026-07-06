// ============================================================
// Contenu éditorial : services, forces, stack, parcours, offres.
// ============================================================

export type Service = {
  icon: string; // lucide icon name
  title: string;
  description: string;
  benefit: string;
};

export const services: Service[] = [
  {
    icon: "Globe",
    title: "Sites web professionnels",
    description:
      "Sites vitrines et institutionnels rapides, modernes et sur-mesure pour entreprises, ONG, écoles et cabinets.",
    benefit: "Une image crédible qui inspire confiance dès la première visite.",
  },
  {
    icon: "AppWindow",
    title: "Applications web sur mesure",
    description:
      "Tableaux de bord, portails et outils métiers pensés autour de vos processus réels, pas de templates génériques.",
    benefit: "Vos équipes gagnent du temps et arrêtent les tâches manuelles.",
  },
  {
    icon: "Layers",
    title: "Plateformes SaaS & portails clients",
    description:
      "Architectures multi-tenant sécurisées, gestion des rôles et espaces clients pour vendre un produit ou servir vos utilisateurs.",
    benefit: "Un actif digital scalable qui génère des revenus récurrents.",
  },
  {
    icon: "Bot",
    title: "Automatisation avec l'IA",
    description:
      "Automatisation de formulaires, workflows et collecte de données avec l'IA, Jotform, Glide et WordPress.",
    benefit: "Moins de saisie manuelle, moins d'erreurs, plus de productivité.",
  },
  {
    icon: "ShoppingCart",
    title: "E-commerce sécurisé",
    description:
      "Boutiques en ligne performantes avec catalogue, commandes, gestion client et parcours d'achat optimisé.",
    benefit: "Vous vendez en ligne 24h/24 en toute sécurité.",
  },
  {
    icon: "Sparkles",
    title: "Refonte & modernisation UI/UX",
    description:
      "Modernisation d'interfaces existantes : design premium, ergonomie, performance et responsive impeccable.",
    benefit: "Une expérience qui convertit et fidélise vos utilisateurs.",
  },
];

export type Strength = {
  icon: string;
  title: string;
  description: string;
};

export const strengths: Strength[] = [
  {
    icon: "Code2",
    title: "Expertise Full-Stack moderne",
    description:
      "Maîtrise complète du front au back : React, Next.js, TypeScript, Node.js, Laravel, PHP, Python et bases de données.",
  },
  {
    icon: "BrainCircuit",
    title: "IA au service de la qualité",
    description:
      "J'exploite l'IA pour accélérer le développement, sécuriser le code et livrer plus vite sans sacrifier la qualité.",
  },
  {
    icon: "Landmark",
    title: "Applications financières complexes",
    description:
      "Expérience concrète sur des solutions FinTech de gestion financière et de projets à fortes exigences.",
  },
  {
    icon: "Network",
    title: "Solutions SaaS multi-tenant",
    description:
      "Conception de plateformes multi-utilisateurs avec rôles, isolation des données et espaces clients sécurisés.",
  },
  {
    icon: "Workflow",
    title: "Automatisation no-code / low-code",
    description:
      "Mise en place rapide de workflows automatisés et d'outils métiers avec Jotform, Glide et WordPress.",
  },
  {
    icon: "Target",
    title: "Vision business, pas seulement du code",
    description:
      "J'analyse votre besoin réel pour livrer une solution qui crée de la valeur — autonomie, rigueur et esprit d'équipe.",
  },
];

export type StackGroup = {
  label: string;
  icon: string;
  items: string[];
};

export const stackGroups: StackGroup[] = [
  {
    label: "Frontend",
    icon: "MonitorSmartphone",
    items: ["React", "Next.js", "TypeScript", "Angular", "HTML", "CSS", "UI/UX"],
  },
  {
    label: "Backend",
    icon: "Server",
    items: ["Node.js", "PHP", "Laravel", "Symfony", "Python", "SQL", "API REST"],
  },
  {
    label: "CMS / No-Code / Low-Code",
    icon: "Blocks",
    items: ["WordPress", "Joomla", "Jotform", "Glide"],
  },
  {
    label: "IA & Productivité",
    icon: "Sparkles",
    items: ["ChatGPT", "Claude", "Gemini", "Cursor", "IA dans les IDE"],
  },
  {
    label: "Outils & Infra",
    icon: "Wrench",
    items: ["GitHub", "Linux", "API", "Automatisation", "SaaS", "Multi-tenancy"],
  },
];

export type TimelineItem = {
  period: string;
  title: string;
  org: string;
  description: string;
  type: "exp" | "edu";
};

export const timeline: TimelineItem[] = [
  {
    period: "Actuel",
    title: "Développeur Full-Stack",
    org: "OM Consulting Group",
    description:
      "Développement de plateformes de gestion et d'applications métier, architecture, intégration IA et amélioration continue de l'expérience utilisateur.",
    type: "exp",
  },
  {
    period: "Freelance",
    title: "Développeur Web & Designer",
    org: "GBG — AgriTech",
    description:
      "Conception de solutions digitales pour le secteur agricole ivoirien : applications métiers, site institutionnel et identité web.",
    type: "exp",
  },
  {
    period: "Expérience",
    title: "Développeur Full-Stack",
    org: "MEV'TIC",
    description:
      "Développement d'applications web, intégration front/back et mise en place de fonctionnalités métiers.",
    type: "exp",
  },
  {
    period: "Entrepreneuriat",
    title: "Co-fondateur & Développeur Freelance",
    org: "METCH Con",
    description:
      "Création d'une marque de consulting digital orientée transformation numérique et solutions web sur mesure pour les entreprises.",
    type: "exp",
  },
  {
    period: "Formation",
    title: "Licence en Génie Logiciel",
    org: "Parcours académique",
    description:
      "Licence en Génie Logiciel, complétée par un BTS en Informatique et un Baccalauréat série F2.",
    type: "edu",
  },
];

// Structures réelles issues du parcours / des projets (bandeau "confiance").
export const trustedBrands = [
  "OM Consulting Group",
  "DELTA",
  "SUCCESS",
  "GBG AgriTech",
  "MEV'TIC",
  "METCH Con",
  "MH Tech Consulting",
];

// ⚠️ TÉMOIGNAGES — exemples de STRUCTURE uniquement.
// Remplacez par de VRAIS avis clients (avec accord), puis passez SHOW_TESTIMONIALS à true.
// Tant que false, la section n'apparaît pas sur le site public (on n'affiche pas de faux avis).
export const SHOW_TESTIMONIALS = false;

export type Testimonial = {
  quote: string;
  author: string;
  role: string;
  initials: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "[À remplacer] Romaric a livré une plateforme claire et fiable, dans les délais, avec une vraie compréhension de notre métier.",
    author: "Prénom Nom",
    role: "Fonction, Entreprise",
    initials: "PN",
  },
  {
    quote:
      "[À remplacer] Communication fluide, code propre et interface moderne. Nos équipes ont gagné un temps précieux.",
    author: "Prénom Nom",
    role: "Fonction, Entreprise",
    initials: "PN",
  },
  {
    quote:
      "[À remplacer] Un partenaire technique de confiance, force de proposition et orienté résultats.",
    author: "Prénom Nom",
    role: "Fonction, Entreprise",
    initials: "PN",
  },
];

export type Pack = {
  slug: string;
  icon: string;
  name: string;
  tagline: string;
  audience: string;
  benefits: string[];
  featured?: boolean;
};

export const packs: Pack[] = [
  {
    slug: "site-vitrine",
    icon: "Globe",
    name: "Pack Site Vitrine",
    tagline: "Une présence en ligne crédible et professionnelle.",
    audience: "Entreprises, ONG, écoles, cabinets, commerces et consultants.",
    benefits: [
      "Design premium et responsive",
      "Optimisé SEO et performance",
      "Formulaire de contact & WhatsApp",
      "Mise en ligne clé en main",
    ],
  },
  {
    slug: "application-metier",
    icon: "AppWindow",
    name: "Pack Application Métier",
    tagline: "Digitalisez et pilotez votre activité au quotidien.",
    audience: "Tableaux de bord, portails clients, CRM simple, gestion et suivi d'activité.",
    benefits: [
      "Interface sur-mesure à vos process",
      "Tableaux de bord & indicateurs",
      "Gestion des données centralisée",
      "Gain de temps sur les tâches manuelles",
    ],
    featured: true,
  },
  {
    slug: "saas-portail",
    icon: "Layers",
    name: "Pack SaaS / Portail Client",
    tagline: "Une plateforme multi-utilisateurs scalable et sécurisée.",
    audience: "Plateformes multi-utilisateurs avec rôles, sécurité et espaces clients.",
    benefits: [
      "Architecture multi-tenant",
      "Gestion des rôles & permissions",
      "Espaces clients sécurisés",
      "Base pour un produit récurrent",
    ],
  },
  {
    slug: "automatisation-ia",
    icon: "Bot",
    name: "Pack Automatisation IA",
    tagline: "Automatisez le répétitif, concentrez-vous sur l'essentiel.",
    audience: "Formulaires, workflows, collecte de données, rapports et tâches répétitives.",
    benefits: [
      "Workflows automatisés",
      "Collecte & traitement des données",
      "Rapports générés automatiquement",
      "Intégration IA / Jotform / Glide",
    ],
  },
  {
    slug: "ecommerce",
    icon: "ShoppingCart",
    name: "Pack E-commerce",
    tagline: "Vendez en ligne, en toute sécurité, 24h/24.",
    audience: "Vente en ligne avec catalogue, commandes, gestion client et paiement.",
    benefits: [
      "Catalogue & gestion produits",
      "Commandes & suivi client",
      "Paiement sécurisé",
      "Parcours d'achat optimisé",
    ],
  },
];
