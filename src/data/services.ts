import { l, type L } from "@/i18n/config";

/** Boutique RoroDev sur Chariow */
export const chariowStore = "https://ajhmnovu.mychariow.market";

export type Service = {
  slug: string;
  name: L;
  price: number;
  tagline: L;
  delay: L;
  accent: string;
  includes: L[];
  /** Page d'achat Chariow (absente tant que le produit n'est pas publié) */
  chariowUrl?: string;
  /** Vidéo de démonstration hébergée dans public/ */
  demo?: string;
  /** Message pré-rempli du bouton WhatsApp */
  whatsapp: L;
};

export const services: Service[] = [
  {
    slug: "logo-animation",
    name: l("Animation de logo — Signature", "Logo animation — Signature"),
    price: 25000,
    tagline: l(
      "Une signature animée pour présenter votre entreprise et terminer vos vidéos avec une identité reconnaissable.",
      "An animated signature to introduce your business and close your videos with a recognisable identity."
    ),
    delay: l("3 jours ouvrés", "3 business days"),
    accent: "#34D399",
    includes: [
      l("Animation de 6 à 10 secondes à partir de votre logo", "6 to 10-second animation from your logo"),
      l("Vos couleurs, votre nom et un slogan court", "Your colours, name and a short tagline"),
      l("Formats vertical 1080 × 1920 et carré 1080 × 1080", "Vertical 1080 × 1920 and square 1080 × 1080 formats"),
      l("Une série de retouches regroupées", "One round of grouped revisions"),
      l("Livraison en MP4", "Delivered as MP4"),
    ],
    chariowUrl: `${chariowStore}/prd_79f2ejup`,
    demo: "/media/roro-dev-logo-anime.mp4",
    whatsapp: l(
      "Bonjour Romaric, je suis intéressé(e) par l'animation de logo Signature (25 000 FCFA).",
      "Hello Romaric, I'm interested in the Signature logo animation (25,000 FCFA)."
    ),
  },
  {
    slug: "promo-video",
    name: l("Vidéo promotionnelle — Essentiel", "Promotional video — Essential"),
    price: 65000,
    tagline: l(
      "Une vidéo courte de 30 secondes pour présenter votre offre : une accroche, votre service et une action claire.",
      "A short 30-second video to present your offer: a hook, your service and a clear call to action."
    ),
    delay: l("5 jours ouvrés", "5 business days"),
    accent: "#F5A524",
    includes: [
      l("Vidéo de 30 secondes maximum", "Video of up to 30 seconds"),
      l("Script court rédigé et validé avant animation", "Short script written and approved before animation"),
      l("Format vertical 1080 × 1920, en français", "Vertical 1080 × 1920 format, in French"),
      l("Textes animés, logo et coordonnées", "Animated text, logo and contact details"),
      l("Deux séries de retouches regroupées", "Two rounds of grouped revisions"),
    ],
    chariowUrl: `${chariowStore}/prd_ihbf28ky`,
    demo: "/media/roro-dev-presentation.mp4",
    whatsapp: l(
      "Bonjour Romaric, je suis intéressé(e) par la vidéo promotionnelle Essentiel (65 000 FCFA).",
      "Hello Romaric, I'm interested in the Essential promotional video (65,000 FCFA)."
    ),
  },
  {
    slug: "showcase-website",
    name: l("Site vitrine — Présence Pro", "Showcase website — Pro Presence"),
    price: 250000,
    tagline: l(
      "Présentez vos services, rassurez vos prospects et facilitez la prise de contact.",
      "Present your services, reassure prospects and make it easy to get in touch."
    ),
    delay: l("15 jours ouvrés", "15 business days"),
    accent: "#5B8CFF",
    includes: [
      l("Jusqu'à 5 pages : accueil, entreprise, services, réalisations, contact", "Up to 5 pages: home, company, services, work, contact"),
      l("Adapté ordinateur, tablette et téléphone", "Desktop, tablet and mobile ready"),
      l("Liens WhatsApp, téléphone et réseaux sociaux", "WhatsApp, phone and social links"),
      l("Formulaire de contact et réglages SEO de base", "Contact form and basic SEO setup"),
      l("Mise en ligne et 14 jours de corrections", "Launch and 14 days of fixes"),
    ],
    whatsapp: l(
      "Bonjour Romaric, je souhaite un site vitrine Présence Pro (250 000 FCFA). Voici mon projet :",
      "Hello Romaric, I'd like a Pro Presence showcase website (250,000 FCFA). Here is my project:"
    ),
  },
];
