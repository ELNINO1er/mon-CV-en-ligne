// ============================================================
// Études de cas / projets.
// ============================================================

export type Project = {
  slug: string;
  title: string;
  category: string;
  tag: string; // court label secteur
  summary: string;
  problem: string;
  solution: string;
  result: string;
  tech: string[];
  highlights: string[];
  gradient: string; // classe de dégradé pour la cover
  year: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "delta-success-fintech",
    title: "DELTA & SUCCESS",
    category: "Plateformes FinTech",
    tag: "FinTech",
    summary:
      "Solutions de gestion financière et de projets avec architecture multi-tenant et espaces utilisateurs sécurisés.",
    problem:
      "Des équipes financières devaient suivre budgets, projets et utilisateurs sur des outils dispersés, sans espace sécurisé ni vision consolidée, ce qui ralentissait la prise de décision.",
    solution:
      "Développement full-stack de deux plateformes FinTech avec une architecture multi-tenant, des espaces utilisateurs cloisonnés et sécurisés, une gestion fine des rôles et une refonte complète de l'UI/UX pour fluidifier les parcours métiers.",
    result:
      "Une gestion financière centralisée, des accès sécurisés par utilisateur et une expérience nettement plus claire, adoptée plus rapidement par les équipes.",
    tech: ["Laravel", "PHP", "SQL", "API REST", "UI/UX", "Multi-tenancy"],
    highlights: ["Architecture multi-tenant", "Espaces sécurisés", "Refonte UI/UX", "Gestion de projets"],
    gradient: "linear-gradient(135deg,#7c5cff40,#5b6dff26 45%,#22d3ee33)",
    year: "2023–2024",
    featured: true,
  },
  {
    slug: "gbg-agritech",
    title: "GBG — AgriTech",
    category: "Solutions AgriTech",
    tag: "AgriTech",
    summary:
      "Solutions digitales et applications métiers pour accompagner les besoins du secteur agricole ivoirien.",
    problem:
      "Un acteur agricole avait besoin d'outils digitaux adaptés au terrain et d'une présence institutionnelle crédible pour structurer et valoriser son activité.",
    solution:
      "Création de solutions digitales sur-mesure : applications métiers pour les besoins agricoles, ainsi qu'un site institutionnel moderne reflétant le sérieux de la structure.",
    result:
      "Des processus mieux outillés, une image professionnelle renforcée et des bases digitales solides pour accompagner la croissance.",
    tech: ["Web App", "WordPress", "UI/UX", "PHP", "API"],
    highlights: ["Applications métiers", "Site institutionnel", "Adapté au terrain"],
    gradient: "linear-gradient(135deg,#10b98140,#22c55e26 45%,#22d3ee26)",
    year: "2022–2023",
    featured: true,
  },
  {
    slug: "ecommerce-sante",
    title: "E-commerce & Santé",
    category: "E-commerce & Santé digitale",
    tag: "E-commerce",
    summary:
      "Boutique en ligne sécurisée et application de suivi médical.",
    problem:
      "Deux besoins : vendre en ligne en toute sécurité et permettre un suivi médical simple et fiable pour les utilisateurs.",
    solution:
      "Conception d'une boutique e-commerce sécurisée (catalogue, commandes, gestion client) et d'une application de suivi médical centrée sur la clarté et la confidentialité des données.",
    result:
      "Un canal de vente en ligne opérationnel et un outil de suivi santé accessible, pensé pour la confiance des utilisateurs.",
    tech: ["Next.js", "Node.js", "SQL", "API REST", "Paiement"],
    highlights: ["Boutique sécurisée", "Suivi médical", "Gestion client"],
    gradient: "linear-gradient(135deg,#22d3ee40,#0ea5e926 45%,#7c5cff26)",
    year: "2023",
    featured: true,
  },
  {
    slug: "reseau-social-securise",
    title: "Réseau Social Sécurisé",
    category: "Plateforme sociale",
    tag: "Social",
    summary:
      "Interface d'interaction et de partage de contenu avec un fort accent sur la confidentialité des échanges.",
    problem:
      "Créer un espace d'échange et de partage où la confidentialité des utilisateurs est une priorité, sans sacrifier l'expérience.",
    solution:
      "Développement d'une interface sociale d'interaction et de partage de contenu, avec une attention particulière portée à la confidentialité des échanges et à la fluidité de l'expérience.",
    result:
      "Une plateforme sociale moderne où les utilisateurs interagissent en confiance, avec une interface soignée et responsive.",
    tech: ["React", "Node.js", "TypeScript", "API REST"],
    highlights: ["Confidentialité", "Partage de contenu", "Interface temps réel"],
    gradient: "linear-gradient(135deg,#d946ef40,#7c5cff26 45%,#5b6dff26)",
    year: "2023",
  },
  {
    slug: "automatisation-jotform-glide",
    title: "Automatisation Jotform / Glide / WordPress",
    category: "Automatisation & No-Code",
    tag: "Automatisation",
    summary:
      "Automatisation de formulaires, workflows et collecte de données pour créer rapidement des solutions métiers.",
    problem:
      "Des entreprises perdaient du temps sur la saisie manuelle, la collecte de données et des tâches répétitives sans outils reliés entre eux.",
    solution:
      "Mise en place d'automatisations avec Jotform, Glide et WordPress : formulaires intelligents, workflows automatisés, collecte structurée des données et applications rapides à déployer.",
    result:
      "Moins de saisie manuelle, des données fiables et centralisées, et des solutions livrées rapidement à moindre coût.",
    tech: ["Jotform", "Glide", "WordPress", "Automatisation", "IA"],
    highlights: ["Workflows automatisés", "Collecte de données", "Déploiement rapide"],
    gradient: "linear-gradient(135deg,#f5c54240,#f9731626 45%,#7c5cff26)",
    year: "2022–2024",
  },
  {
    slug: "mh-tech-consulting",
    title: "MH Tech Consulting / METCH Con",
    category: "Consulting digital",
    tag: "Consulting",
    summary:
      "Marque de consulting digital orientée transformation numérique et solutions web sur mesure.",
    problem:
      "Structurer une marque de consulting crédible pour accompagner les entreprises dans leur transformation numérique.",
    solution:
      "Développement d'une identité et d'une présence digitale pour une marque de consulting orientée transformation numérique : accompagnement business et solutions web sur-mesure.",
    result:
      "Une marque de consulting positionnée et outillée pour accompagner les entreprises vers le digital.",
    tech: ["Next.js", "WordPress", "UI/UX", "SEO", "Branding"],
    highlights: ["Branding digital", "Transformation numérique", "Solutions sur-mesure"],
    gradient: "linear-gradient(135deg,#5b6dff40,#3b82f626 45%,#22d3ee26)",
    year: "2023–2024",
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
