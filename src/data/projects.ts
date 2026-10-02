import { l, type L } from "@/i18n/config";

export type MockupKind = "dashboard" | "restaurant" | "wedding" | "site" | "store" | "news" | "blueprint";
export type Status = "completed" | "inDevelopment" | "optimization" | "active" | "live";
export type Tag = "clientProject" | "professionalProject" | "localInstall";
export type Kind = "saas" | "ecommerce" | "platform" | "web";

export type FeatureGroup = { label: L; items: L[] };

export type Project = {
  slug: string;
  name: string;
  kind: Kind;
  category: L;
  tagline: L;
  summary: L;
  accent: string;
  mockup: MockupKind;
  /** Libellés affichés dans le mockup (noms de produits, rubriques…) */
  mockupItems?: string[];
  status: Status;
  tags?: Tag[];
  url?: string;
  note?: L;
  workflow?: { label: L; steps: L[] };
  problem?: L;
  solution?: L;
  role: L[];
  stack?: string[];
  integrations?: { label: L; items: string[] };
  architecture?: { title: L; text: L }[];
  features: FeatureGroup[];
  value?: L;
};

const ROLE = {
  product: l("Conception produit", "Product design"),
  fullstack: l("Développement full-stack", "Full-stack development"),
  saas: l("Architecture SaaS", "SaaS architecture"),
  multitenant: l("Architecture multi-tenant", "Multi-tenant architecture"),
  api: l("Architecture API", "API architecture"),
  web: l("Design & développement web", "Web design & development"),
};

export const projects: Project[] = [
  {
    slug: "qr-resto",
    name: "QR Resto",
    kind: "saas",
    category: l("SaaS Restauration", "Restaurant SaaS"),
    tagline: l("Tout le parcours restaurant, du QR de table aux statistiques.", "The full restaurant journey, from table QR to analytics."),
    summary: l(
      "Une plateforme qui digitalise le parcours client des restaurants. Le client scanne, commande et paie ; la cuisine et la salle suivent chaque commande en temps réel ; le gérant pilote l'activité grâce aux statistiques.",
      "A platform that digitalises the restaurant customer journey. Guests scan, order and pay; the kitchen and the floor follow every order in real time; managers steer the business with statistics."
    ),
    accent: "#F5A524",
    mockup: "restaurant",
    status: "completed",
    tags: ["localInstall"],
    url: "https://qrcodemht.mhtechconsulting.com",
    workflow: {
      label: l("Parcours client", "Customer journey"),
      steps: [
        l("QR de table", "Table QR"),
        l("Menu"),
        l("Commande", "Order"),
        l("Cuisine", "Kitchen"),
        l("Serveur", "Waiter"),
        l("Paiement", "Payment"),
        l("Statistiques", "Analytics"),
      ],
    },
    problem: l(
      "Entre la commande, la cuisine, la salle et la caisse, chaque transmission crée de l'attente et des frictions pour les clients comme pour les équipes.",
      "Between the order, the kitchen, the floor and the till, every hand-off creates waiting time and friction for guests and staff."
    ),
    solution: l(
      "Une plateforme connectée : chaque table a son QR code, les commandes arrivent en cuisine en temps réel et les serveurs suivent chaque commande jusqu'au paiement et aux statistiques.",
      "One connected platform: every table gets its own QR code, orders reach the kitchen in real time, and waiters follow each order through to payment and statistics."
    ),
    role: [ROLE.product, ROLE.fullstack, ROLE.saas],
    stack: ["React", "Vite", "Tailwind CSS", "Node.js", "Express", "MySQL", "JWT", "Socket.io"],
    architecture: [
      { title: l("Multi-restaurant"), text: l("Plusieurs restaurants sur la même plateforme.", "Several restaurants run on the same platform.") },
      {
        title: l("Cuisine temps réel", "Real-time kitchen"),
        text: l("Les commandes circulent de la table à la cuisine puis au serveur via WebSocket.", "Orders flow from the table to the kitchen and back to the waiter over WebSocket."),
      },
      {
        title: l("Installation locale", "Local deployment"),
        text: l("Déployé sur le réseau du restaurant, sans application à installer pour le client.", "Deployed on the restaurant's network, with no app for guests to install."),
      },
    ],
    features: [
      {
        label: l("Fonctionnalités", "Features"),
        items: [
          l("Menu digital", "Digital menu"),
          l("QR code par table", "QR code per table"),
          l("Commandes", "Ordering"),
          l("Cuisine en temps réel", "Real-time kitchen"),
          l("Gestion des tables", "Table management"),
          l("Espace serveur", "Waiter space"),
          l("Réservations", "Reservations"),
          l("Avis", "Reviews"),
          l("Tableau de bord", "Dashboard"),
          l("Statistiques", "Statistics"),
          l("Multi-restaurant"),
          l("Suivi des commandes", "Order tracking"),
        ],
      },
    ],
    value: l(
      "Réduire l'attente, améliorer l'expérience client et fluidifier les opérations du restaurant.",
      "Reduce waiting, improve the customer experience and streamline restaurant operations."
    ),
  },
  {
    slug: "koraflow",
    name: "KoraFlow",
    kind: "saas",
    category: l("SaaS de gestion d'entreprise · CRM", "Business Management SaaS · CRM"),
    tagline: l("Tout le cycle commercial et opérationnel d'une entreprise, sur une seule plateforme.", "The entire commercial and operational cycle of a company, in one platform."),
    summary: l(
      "Une plateforme multi-tenant qui centralise tout, du premier prospect à la dernière facture : CRM, rendez-vous, devis, contrats, paiements, projets et documents.",
      "A multi-tenant platform that centralises everything from the first prospect to the final invoice: CRM, appointments, quotes, contracts, payments, projects and documents."
    ),
    accent: "#5B8CFF",
    mockup: "dashboard",
    status: "inDevelopment",
    workflow: {
      label: l("Cycle commercial", "Business cycle"),
      steps: [
        l("Prospect"),
        l("Client"),
        l("Rendez-vous", "Appointment"),
        l("Devis", "Quote"),
        l("Contrat", "Contract"),
        l("Paiement", "Payment"),
        l("Projet", "Project"),
        l("Facture", "Invoice"),
      ],
    },
    problem: l(
      "Le cycle commercial et opérationnel d'une entreprise est souvent éclaté entre de nombreux outils déconnectés, de la prospection à la facturation.",
      "A company's commercial and operational cycle is usually split across many disconnected tools, from prospecting to invoicing."
    ),
    solution: l(
      "Une plateforme unique couvrant tout le cycle, bâtie sur une architecture multi-tenant pour que plusieurs entreprises l'utilisent avec des données isolées.",
      "A single platform covering the full cycle, built on a multi-tenant architecture so several companies can use it with isolated data."
    ),
    role: [ROLE.product, ROLE.fullstack, ROLE.multitenant],
    stack: ["Next.js", "React", "TypeScript", "Node.js", "MySQL"],
    architecture: [
      { title: l("Multi-tenant"), text: l("Plusieurs entreprises partagent la plateforme avec isolation des données.", "Several companies share the platform with isolated data.") },
      { title: l("Rôles & permissions", "Roles & permissions"), text: l("Utilisateurs, rôles, permissions et journal d'audit.", "Users, roles, permissions and audit trail.") },
      { title: l("Portail client", "Client portal"), text: l("Un espace dédié aux clients de chaque entreprise.", "A dedicated space for each company's clients.") },
    ],
    features: [
      { label: l("Commercial"), items: [l("CRM"), l("Prospects"), l("Clients"), l("Entreprises", "Companies"), l("Services")] },
      {
        label: l("Opérations", "Operations"),
        items: [l("Rendez-vous", "Appointments"), l("Devis", "Quotes"), l("Contrats", "Contracts"), l("Signature"), l("Factures", "Invoices"), l("Paiements", "Payments")],
      },
      { label: l("Livraison", "Delivery"), items: [l("Projets", "Projects"), l("Tâches", "Tasks"), l("Documents"), l("Portail client", "Client portal")] },
      {
        label: l("Plateforme", "Platform"),
        items: [l("Tableau de bord", "Dashboard"), l("Utilisateurs", "Users"), l("Rôles", "Roles"), l("Permissions"), l("Audit")],
      },
    ],
    value: l(
      "Permettre à plusieurs entreprises de gérer tout leur cycle sur la même plateforme, avec isolation des données.",
      "Let multiple companies run their whole business cycle on the same platform, with data isolation."
    ),
  },
  {
    slug: "scmc",
    name: "SCMC E-commerce",
    kind: "ecommerce",
    category: l("E-commerce · Projet client", "E-commerce · Client project"),
    tagline: l("La boutique en ligne des produits cacao transformés en Côte d'Ivoire.", "The online store for cocoa products processed in Côte d'Ivoire."),
    summary: l(
      "Plateforme e-commerce de SCMC, entreprise ivoirienne de transformation du cacao du groupe Global Business Group : catalogue de produits cacao, fiches produits, panier et offre dédiée aux professionnels, avec des prix en FCFA.",
      "E-commerce platform for SCMC, an Ivorian cocoa-processing company within Global Business Group: cocoa product catalogue, product pages, cart and a dedicated offer for professionals, priced in FCFA."
    ),
    accent: "#C08A5B",
    mockup: "store",
    mockupItems: ["Masse de cacao", "Poudre de cacao", "Infusion de cacao"],
    status: "completed",
    tags: ["clientProject"],
    url: "https://scmc-ci.com",
    workflow: {
      label: l("Parcours d'achat", "Purchase flow"),
      steps: [l("Catalogue"), l("Produit", "Product"), l("Panier", "Cart"), l("Commande", "Checkout")],
    },
    role: [ROLE.product, ROLE.fullstack],
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    integrations: { label: l("Paiements selon les besoins", "Payments as needed"), items: ["CinetPay", "Mobile Money"] },
    features: [
      {
        label: l("Fonctionnalités", "Features"),
        items: [
          l("Catalogue produits", "Product catalogue"),
          l("Fiches produits", "Product pages"),
          l("Panier", "Cart"),
          l("Disponibilité en stock", "Stock availability"),
          l("Offre professionnels", "Professional offer"),
          l("Prix en FCFA", "FCFA pricing"),
          l("Bilingue FR / EN", "Bilingual FR / EN"),
        ],
      },
    ],
    value: l("Permettre à une marque ivoirienne de vendre ses produits cacao en ligne.", "Enable an Ivorian brand to sell its cocoa products online."),
  },
  {
    slug: "kic",
    name: "KIC E-commerce",
    kind: "ecommerce",
    category: l("E-commerce B2B · Projet client", "B2B E-commerce · Client project"),
    tagline: l("Cacao durable pour les professionnels européens.", "Sustainable cocoa for European professionals."),
    summary: l(
      "Boutique en ligne de KIC — Konan Industrie et Chocolaterie, société française qui commercialise des produits cacao semi-finis issus de filières durables auprès des artisans et transformateurs européens.",
      "Online store for KIC — Konan Industrie et Chocolaterie, a French company selling semi-finished cocoa products from sustainable supply chains to European artisans and processors."
    ),
    accent: "#D4A24C",
    mockup: "store",
    mockupItems: ["Beurre de cacao", "Poudre de cacao", "Masse de cacao"],
    status: "completed",
    tags: ["clientProject"],
    url: "https://kic-fr.com",
    workflow: {
      label: l("Parcours d'achat", "Purchase flow"),
      steps: [l("Catalogue"), l("Produit", "Product"), l("Conditionnement", "Packaging"), l("Panier", "Cart")],
    },
    role: [ROLE.product, ROLE.fullstack],
    features: [
      {
        label: l("Fonctionnalités", "Features"),
        items: [
          l("Boutique multi-pages", "Multi-page store"),
          l("Catalogue produits", "Product catalogue"),
          l("Fiches produits", "Product pages"),
          l("Plusieurs conditionnements", "Multiple pack sizes"),
          l("Panier", "Cart"),
          l("Favoris", "Favourites"),
          l("Prix en euros", "Euro pricing"),
          l("Récit « De la fève à l'excellence »", "“From bean to excellence” story"),
        ],
      },
    ],
    value: l("Rapprocher les filières cacao durables des professionnels européens.", "Connect sustainable cocoa supply chains with European professionals."),
  },
  {
    slug: "gbg",
    name: "GBG Digital Platform",
    kind: "web",
    category: l("Corporate · E-commerce · Projet client", "Corporate · E-commerce · Client project"),
    tagline: l("La présence digitale de Global Business Group.", "Global Business Group's digital presence."),
    summary: l(
      "Plateforme digitale de Global Business Group, le groupe dont font partie SCMC et KIC : présence institutionnelle, identité visuelle et transformation digitale du groupe.",
      "Digital platform for Global Business Group, the group behind SCMC and KIC: institutional presence, visual identity and the group's digital transformation."
    ),
    accent: "#34D399",
    mockup: "site",
    mockupItems: ["SCMC", "KIC", "Agriculture"],
    status: "completed",
    tags: ["clientProject"],
    role: [ROLE.web, l("Identité visuelle", "Visual identity")],
    features: [
      {
        label: l("Périmètre", "Scope"),
        items: [
          l("Site institutionnel", "Institutional website"),
          l("Identité visuelle", "Visual identity"),
          l("Applications métiers (agriculture)", "Business applications (agriculture)"),
          l("Transformation digitale", "Digital transformation"),
        ],
      },
    ],
  },
  {
    slug: "nova",
    name: "NOVA",
    kind: "platform",
    category: l("HealthTech"),
    tagline: l("Une plateforme de santé numérique avec quatre environnements connectés.", "A digital health platform with four connected environments."),
    summary: l(
      "NOVA centralise le parcours de santé à travers quatre espaces — Patient, Médecin, Pharmacie et Administration — chacun avec ses outils et ses permissions. Le produit existe et est en phase de corrections et d'optimisation.",
      "NOVA centralises the healthcare journey across four spaces — Patient, Doctor, Pharmacy and Administration — each with its own tools and permissions. The product exists and is in a fixes & optimisation phase."
    ),
    accent: "#2DD4BF",
    mockup: "dashboard",
    status: "optimization",
    problem: l(
      "Le parcours de santé est fragmenté entre patients, médecins, pharmacies et administration.",
      "The healthcare journey is fragmented between patients, doctors, pharmacies and administration."
    ),
    solution: l(
      "Une plateforme unique avec quatre environnements dédiés, connectés autour du dossier patient, des ordonnances et des rendez-vous.",
      "One platform with four dedicated environments, connected around the patient record, prescriptions and appointments."
    ),
    role: [ROLE.product, ROLE.fullstack, ROLE.api],
    stack: ["React 19", "Vite", "Tailwind CSS", "Express.js", "MySQL", "JWT", "Swagger", "Docker", "CI/CD"],
    architecture: [
      { title: l("4 environnements", "4 environments"), text: l("Espaces Patient, Médecin, Pharmacie et Administration.", "Patient, Doctor, Pharmacy and Administration spaces.") },
      { title: l("API sécurisée", "Secured API"), text: l("API REST Express avec authentification JWT, documentée avec Swagger.", "Express REST API with JWT authentication, documented with Swagger.") },
      { title: l("Livraison", "Delivery"), text: l("Conteneurisé avec Docker, livré via CI/CD.", "Containerised with Docker, shipped through CI/CD.") },
    ],
    features: [
      {
        label: l("Patient"),
        items: [
          l("Dossier médical", "Medical record"),
          l("Constantes", "Vital signs"),
          l("Traitements", "Treatments"),
          l("Pilulier", "Pill organiser"),
          l("Ordonnances", "Prescriptions"),
          l("Laboratoire", "Laboratory"),
          l("Rendez-vous", "Appointments"),
          l("Messagerie", "Messaging"),
          l("Vaccination"),
          l("Assurance", "Insurance"),
          l("SOS"),
        ],
      },
      {
        label: l("Médecin", "Doctor"),
        items: [
          l("Patients"),
          l("Consultations"),
          l("Prescriptions"),
          l("Agenda", "Calendar"),
          l("Maladies chroniques", "Chronic diseases"),
          l("Signature"),
          l("Statistiques", "Statistics"),
          l("Messagerie", "Messaging"),
        ],
      },
      { label: l("Pharmacie", "Pharmacy"), items: [l("Ordonnances", "Prescriptions"), l("Vérification", "Verification"), l("Délivrance", "Dispensing")] },
      {
        label: l("Administration"),
        items: [l("Utilisateurs", "Users"), l("Permissions"), l("Statistiques", "Statistics"), l("Supervision")],
      },
    ],
    value: l("Centraliser et digitaliser le parcours de santé.", "Centralise and digitalise the healthcare journey."),
  },
  {
    slug: "noces",
    name: "Noces",
    kind: "saas",
    category: l("SaaS Mariage", "Wedding SaaS"),
    tagline: l("La gestion digitale du mariage, de l'invitation au livre d'or.", "Digital wedding management, from invitation to guestbook."),
    summary: l(
      "Une plateforme pour digitaliser la préparation et l'expérience d'un mariage : invitations personnalisées, RSVP, mini-site, plan de tables, check-in QR, galerie et livre d'or.",
      "A platform to digitalise the preparation and the experience of a wedding: personalised invitations, RSVP, a mini-site, seating plan, QR check-in, gallery and guestbook."
    ),
    accent: "#F472B6",
    mockup: "wedding",
    status: "completed",
    workflow: {
      label: l("Parcours invité", "Guest journey"),
      steps: [
        l("Invitation"),
        l("RSVP"),
        l("Mini-site"),
        l("Plan de tables", "Seating plan"),
        l("Check-in QR", "QR check-in"),
        l("Galerie", "Gallery"),
        l("Livre d'or", "Guestbook"),
      ],
    },
    solution: l(
      "Une plateforme pour les mariés et leur équipe : invitations, gestion des invités, plan de tables et check-in le jour J, puis les souvenirs avec galerie et livre d'or.",
      "One platform for the couple and their team: invitations, guest management, seating and day-of check-in, then memories with a gallery and guestbook."
    ),
    role: [ROLE.product, ROLE.fullstack],
    stack: ["Next.js", "TypeScript", "React", "MySQL", "Prisma", "Tailwind CSS", "NextAuth", "Zod"],
    features: [
      {
        label: l("Fonctionnalités", "Features"),
        items: [
          l("Invitations digitales", "Digital invitations"),
          l("Invitations personnalisées", "Personalised invitations"),
          l("RSVP"),
          l("Mini-site du mariage", "Wedding mini-site"),
          l("Gestion des invités", "Guest management"),
          l("Plan de tables", "Seating plan"),
          l("QR codes"),
          l("Check-in"),
          l("Galerie", "Gallery"),
          l("Livre d'or", "Guestbook"),
          l("Statistiques", "Statistics"),
          l("Équipe", "Team"),
        ],
      },
    ],
    value: l("Digitaliser la préparation et l'expérience d'un mariage.", "Digitalise the preparation and the experience of a wedding."),
  },
  {
    slug: "success",
    name: "SUCCESS",
    kind: "platform",
    category: l("Plateforme de gestion d'entreprise · ERP", "Enterprise Management Platform · ERP"),
    tagline: l("Les fonctions stratégiques d'une entreprise, centralisées.", "A company's strategic functions, centralised."),
    summary: l(
      "Plateforme professionnelle qui centralise plusieurs fonctions stratégiques d'une entreprise : finance, comptabilité, ressources humaines, gestion administrative, gestion de projets et autres processus métiers.",
      "A professional platform that centralises several strategic functions of a company: finance, accounting, human resources, administration, project management and other business processes."
    ),
    accent: "#8B7CFF",
    mockup: "dashboard",
    status: "active",
    tags: ["professionalProject"],
    note: l(
      "Projet professionnel : aucune donnée ni capture confidentielle n'est publiée.",
      "Professional project: no confidential data or screenshots are published."
    ),
    role: [ROLE.fullstack, l("Interfaces professionnelles", "Professional interfaces"), l("Architecture d'application", "Application architecture")],
    features: [
      {
        label: l("Domaines", "Domains"),
        items: [
          l("Finance"),
          l("Comptabilité", "Accounting"),
          l("Ressources humaines", "Human resources"),
          l("Gestion administrative", "Administration"),
          l("Gestion de projets", "Project management"),
          l("Processus métiers", "Business processes"),
        ],
      },
    ],
    value: l("Centraliser la gestion d'une entreprise dans une seule plateforme.", "Centralise a company's management in a single platform."),
  },
  {
    slug: "work",
    name: "Work",
    kind: "platform",
    category: l("Plateforme d'actualité en ligne", "Online News Platform"),
    tagline: l("Une plateforme moderne d'information et de publication en ligne.", "A modern online news & publishing platform."),
    summary: l(
      "Work est un journal en ligne en cours de développement : une plateforme moderne d'information et de publication. Cette page évoluera avec le produit.",
      "Work is an online newspaper in development: a modern news and publishing platform. This page will evolve with the product."
    ),
    accent: "#A1A1AA",
    mockup: "blueprint",
    status: "inDevelopment",
    note: l("La stack et les fonctionnalités seront publiées une fois confirmées.", "Stack and features will be published once confirmed."),
    role: [ROLE.product, ROLE.fullstack],
    features: [],
  },
  {
    slug: "leconomiste",
    name: "L'Économiste",
    kind: "web",
    category: l("Média · Plateforme d'information", "Media · News platform"),
    tagline: l("« Le quotidien des décideurs » — l'actualité économique ivoirienne en ligne.", "“Le quotidien des décideurs” — Ivorian business news online."),
    summary: l(
      "Plateforme média de L'Économiste de la Côte d'Ivoire : fil d'actualité en direct et rubriques économiques (Finance & BRVM, Économie, UEMOA…), pensée pour un lectorat de décideurs.",
      "Media platform for L'Économiste de la Côte d'Ivoire: a live news feed and business sections (Finance & BRVM, Economy, WAEMU…), designed for a readership of decision-makers."
    ),
    accent: "#E5484D",
    mockup: "news",
    mockupItems: ["Finance & BRVM", "Économie", "UEMOA"],
    status: "live",
    url: "https://leconomistedelacotedivoire.com",
    role: [ROLE.web, ROLE.fullstack],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "next-intl"],
    features: [
      {
        label: l("Fonctionnalités", "Features"),
        items: [
          l("Fil d'actualité en direct", "Live news feed"),
          l("Rubriques thématiques", "Topic sections"),
          l("Articles"),
          l("Bilingue FR / EN", "Bilingual FR / EN"),
          l("Tableau de bord d'administration", "Admin dashboard"),
        ],
      },
    ],
  },
  {
    slug: "gym-management",
    name: "Gym Management",
    kind: "saas",
    category: l("SaaS Fitness", "Fitness SaaS"),
    tagline: l("Membres, abonnements, check-in, coaching et progression.", "Members, subscriptions, check-in, coaching and progress."),
    summary: l(
      "Une plateforme de gestion de salle de sport couvrant le parcours membre, de l'abonnement et du paiement au check-in QR, aux programmes, au coaching et au suivi de progression.",
      "A gym management platform covering the member journey from subscription and payment to QR check-in, programmes, coaching and progress tracking."
    ),
    accent: "#FB7A68",
    mockup: "dashboard",
    status: "completed",
    note: l("Nom du produit non définitif. Stack publiée après confirmation.", "Product name not final. Stack published once confirmed."),
    workflow: {
      label: l("Parcours membre", "Member journey"),
      steps: [
        l("Membre", "Member"),
        l("Abonnement", "Subscription"),
        l("Paiement", "Payment"),
        l("Check-in"),
        l("Programme"),
        l("Coach"),
        l("Progression", "Progress"),
      ],
    },
    solution: l(
      "Une plateforme pour l'équipe de la salle et ses membres : abonnements, paiements, check-in QR, programmes de coaching, planning et statistiques de fréquentation.",
      "One platform for the gym team and its members: subscriptions, payments, QR check-in, coaching programmes, planning and attendance statistics."
    ),
    role: [ROLE.product, ROLE.fullstack],
    features: [
      {
        label: l("Fonctionnalités", "Features"),
        items: [
          l("Membres", "Members"),
          l("Abonnements", "Subscriptions"),
          l("Paiements", "Payments"),
          l("QR membre", "Member QR"),
          l("Check-in"),
          l("Coachs", "Coaches"),
          l("Programmes", "Programmes"),
          l("Exercices", "Exercises"),
          l("Planning"),
          l("Statistiques", "Statistics"),
          l("Fréquentation", "Attendance"),
          l("Suivi de progression", "Progress tracking"),
          l("Tableau de bord", "Dashboard"),
        ],
      },
    ],
    value: l(
      "Gérer une salle de sport — membres, fréquentation, coaching et progression — depuis une seule plateforme.",
      "Manage a gym — members, attendance, coaching and progress — from one platform."
    ),
  },
  {
    slug: "mh-tech-consulting",
    name: "MH Tech Consulting",
    kind: "web",
    category: l("Corporate · Produits digitaux", "Corporate · Digital products"),
    tagline: l("Le site de mon entreprise — et la vitrine de ses produits.", "My company's website — and the showcase for its products."),
    summary: l(
      "Site de MH Tech Consulting : conseil IT, cybersécurité, cloud, DevOps, design digital et staffing technologique, ainsi que les produits et solutions développés par l'entreprise.",
      "Website of MH Tech Consulting: IT consulting, cybersecurity, cloud, DevOps, digital design and tech staffing, plus the products and solutions built by the company."
    ),
    accent: "#3DD9F0",
    mockup: "site",
    mockupItems: ["KoraFlow", "QR Resto", "Noces", "NOVA", "E-commerce", "Gym"],
    status: "active",
    url: "https://mhtechconsulting.com",
    role: [ROLE.web, l("Co-fondateur", "Co-founder")],
    architecture: [
      {
        title: l("Hub produits", "Product hub"),
        text: l("Porte d'entrée vers KoraFlow, QR Resto, Noces, NOVA, E-commerce et Gym Management.", "Gateway to KoraFlow, QR Resto, Noces, NOVA, E-commerce and Gym Management."),
      },
      {
        title: l("Services IT", "IT services"),
        text: l("Conseil IT, cybersécurité, cloud, DevOps et staffing technologique.", "IT consulting, cybersecurity, cloud, DevOps and tech staffing."),
      },
    ],
    features: [
      {
        label: l("Site"),
        items: [
          l("Services"),
          l("Équipe", "Team"),
          l("Expertise"),
          l("Réalisations", "Work"),
          l("Technologies"),
          l("Produits", "Products"),
          l("Contact"),
          l("Prise de rendez-vous", "Appointment booking"),
          l("Demande de devis", "Quote request"),
        ],
      },
    ],
    value: l("Devenir le hub central des produits et services de l'entreprise.", "Become the central hub of the company's products and services."),
  },
];

export const featuredSlugs = ["qr-resto", "koraflow", "success", "nova", "noces"];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

export const projectIndex = (slug: string) => String(projects.findIndex((p) => p.slug === slug) + 1).padStart(2, "0");

export const nextProject = (slug: string) => {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
};

export const statusColor: Record<Status, string> = {
  completed: "var(--color-emerald)",
  inDevelopment: "var(--color-amber)",
  optimization: "var(--color-cyan)",
  active: "var(--color-brand)",
  live: "var(--color-emerald)",
};
