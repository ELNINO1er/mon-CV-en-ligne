import { l, type L } from "@/i18n/config";

export type Experience = {
  company: string;
  role?: L;
  period: L;
  color: string;
  points: L[];
};

export const experiences: Experience[] = [
  {
    company: "MH Tech Consulting",
    role: l("Co-Fondateur & Développeur Full-Stack", "Co-Founder & Full-Stack Developer"),
    period: l("2026 — Aujourd'hui", "2026 — Present"),
    color: "var(--color-violet)",
    points: [
      l("Stratégie IT et analyse des besoins clients", "IT strategy and client needs analysis"),
      l("Conception de produits et développement d'applications", "Product design and application development"),
      l("Architecture SaaS et solutions sur mesure", "SaaS architecture and tailor-made solutions"),
      l("Transformation digitale", "Digital transformation"),
      l("Développement commercial", "Business development"),
    ],
  },
  {
    company: "OM Consulting Group",
    role: l("Développeur Full-Stack", "Full-Stack Developer"),
    period: l("Oct. 2024 — Aujourd'hui", "Oct 2024 — Present"),
    color: "var(--color-brand)",
    points: [
      l(
        "Développement et maintenance des applications de gestion financière DELTA et SUCCESS",
        "Development and maintenance of the DELTA and SUCCESS financial management applications"
      ),
      l("Architecture SaaS, multi-tenancy et isolation des données clients", "SaaS architecture, multi-tenancy and client data isolation"),
      l("Espaces utilisateurs sécurisés", "Secure user spaces"),
      l("Amélioration de l'UI/UX et optimisation des performances", "UI/UX improvements and performance optimisation"),
      l("Intégration de l'IA dans le cycle de développement", "AI integrated into the development lifecycle"),
    ],
  },
  {
    company: "GBG — Global Business Group",
    role: l("Développeur Web & Designer Freelance", "Freelance Web Developer & Designer"),
    period: l("2023 — Aujourd'hui", "2023 — Present"),
    color: "var(--color-emerald)",
    points: [
      l("Applications métiers, notamment dans l'agriculture", "Business applications, including for agriculture"),
      l("Sites institutionnels et plateformes e-commerce (SCMC, KIC)", "Institutional websites and e-commerce platforms (SCMC, KIC)"),
      l("Identité visuelle", "Visual identity"),
      l("Transformation digitale", "Digital transformation"),
    ],
  },
  {
    company: "MEV'TIC",
    period: l("Juin 2022 — Août 2024", "Jun 2022 — Aug 2024"),
    color: "var(--color-amber)",
    points: [
      l("Interfaces web", "Web interfaces"),
      l("Outils internationaux", "International tools"),
      l("Solutions utilisant l'IA", "AI-powered solutions"),
      l("Travail en équipe multidisciplinaire sur des projets technologiques", "Multidisciplinary team work on technology projects"),
    ],
  },
];

export const education = [
  {
    title: l("Licence en Génie Logiciel", "Bachelor's degree in Software Engineering"),
    school: "HEC GECOS Formation",
    period: l("2020 — 2023"),
    detail: l("Architecture logicielle · Développement Full-Stack", "Software architecture · Full-stack development"),
  },
  {
    title: l("BTS Informatique — Développement d'Applications", "BTS in Computer Science — Application Development"),
    school: "HEC GECOS Formation",
    period: l("Mai 2021", "May 2021"),
  },
  {
    title: l("Baccalauréat F2 — Informatique et électronique", "Baccalauréat F2 — Computing & Electronics"),
    school: "Lycée Technique de Bouaké",
    period: l("2019"),
  },
];

export type SkillGroup = { key: string; label: L; color: string; items: L[] };

const same = (...items: string[]) => items.map((i) => l(i));

export const skills: SkillGroup[] = [
  {
    key: "frontend",
    label: l("Frontend"),
    color: "var(--color-brand)",
    items: same("Next.js", "React", "TypeScript", "Angular", "Tailwind CSS", "HTML", "CSS"),
  },
  {
    key: "backend",
    label: l("Backend"),
    color: "var(--color-violet)",
    items: [...same("Node.js", "Express.js", "PHP", "Laravel", "Symfony", "Python"), l("APIs REST", "REST APIs")],
  },
  { key: "database", label: l("Base de données", "Database"), color: "var(--color-cyan)", items: same("MySQL", "SQL") },
  {
    key: "architecture",
    label: l("Architecture"),
    color: "var(--color-emerald)",
    items: [
      l("SaaS"),
      l("Multi-tenant", "Multi-tenancy"),
      l("RBAC"),
      l("Authentification", "Authentication"),
      l("Architecture modulaire", "Modular architecture"),
      l("Gestion des rôles", "Role management"),
      l("Portails clients", "Client portals"),
      l("Tableaux de bord", "Dashboards"),
      l("Systèmes de paiement", "Payment systems"),
      l("Génération de documents", "Document generation"),
      l("Notifications"),
    ],
  },
  { key: "devops", label: l("DevOps"), color: "var(--color-amber)", items: same("Linux", "Git", "GitHub", "Docker", "CI/CD") },
  { key: "ai", label: l("IA", "AI"), color: "var(--color-rose)", items: same("ChatGPT", "Claude", "Gemini", "Cursor") },
  { key: "nocode", label: l("No-Code"), color: "var(--color-coral)", items: same("Jotform", "WordPress", "Joomla", "Glide") },
];
