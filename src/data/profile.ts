import { l } from "@/i18n/config";

export const profile = {
  name: "Romaric BOMBADE",
  title: l("Développeur Full-Stack", "Full-Stack Developer"),
  subtitle: l("SaaS & Product Builder"),
  location: l("Abidjan, Côte d'Ivoire"),
  coordinates: "5.3600° N, 4.0083° W",
  nationality: l("Ivoirienne", "Ivorian"),
  email: "dromaric58@gmail.com",
  phone: "+225 07 49 15 77 41",
  whatsapp: "https://wa.me/2250749157741",
  linkedin: "https://www.linkedin.com/in/romaric-bombade-725623253",
  github: "https://github.com/ELNINO1er",
  languages: [
    { name: l("Français", "French"), level: l("Langue maternelle", "Native") },
    { name: l("Anglais", "English"), level: l("Professionnel", "Professional") },
  ],
};

export const navItems = [
  { href: "/services", key: "services" },
  { href: "/projects", key: "work" },
  { href: "/about", key: "about" },
  { href: "/experience", key: "experience" },
  { href: "/skills", key: "skills" },
  { href: "/contact", key: "contact" },
] as const;
