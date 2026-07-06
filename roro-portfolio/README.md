# RORO systems — Portfolio de Romaric Bombade

Portfolio freelance premium **Next.js 16 + React + TypeScript**, animé (Framer Motion), design sombre futuriste orienté acquisition de clients.

## Lancer en local

```bash
npm install
npm run dev     # http://localhost:3000
```

Build de production :

```bash
npm run build
npm run start
```

## ⚙️ À personnaliser avant la mise en ligne

Tout est centralisé dans **`src/lib/site.ts`** :

| Champ | À vérifier / remplacer |
|-------|------------------------|
| `siteUrl` | Le domaine de production (utilisé pour SEO / sitemap / OpenGraph) |
| `email` | Email public affiché (`dromaric58@gmail.com` par défaut) |
| `phoneIntl` / `phoneDisplay` | Numéro WhatsApp (format `2250749157741`) |
| `linkedin` | **URL LinkedIn réelle** (placeholder actuel à corriger) |
| `github` | URL GitHub (optionnel) |

Les autres contenus sont éditables sans toucher au code :
- `src/lib/content.ts` — services, forces, stack, parcours, packs
- `src/lib/projects.ts` — études de cas / projets
- `public/img/romaric.jpg` — photo (page À propos)
- `public/docs/cv-romaric-bombade.pdf` — CV téléchargeable

## Formulaire de contact

Sans backend : le formulaire compose un message et l'envoie via **WhatsApp** ou **email** (`mailto:`). Aucune donnée n'est stockée. Voir `src/components/ContactForm.tsx`.

## Structure

```
src/
├─ app/            # pages (accueil, projets, offres, à-propos, contact) + sitemap/robots
├─ components/     # Hero, Navbar, cartes, particules IA, animations…
└─ lib/            # données éditoriales + config
```

## Témoignages

La section témoignages est **prête mais désactivée** (`SHOW_TESTIMONIALS = false` dans `src/lib/content.ts`) pour ne pas afficher de faux avis. Remplacez les entrées `testimonials` par de vrais avis (avec accord des clients), puis passez le flag à `true`.

Le bandeau « Ils m'ont fait confiance » (`trustedBrands`) reprend des structures réelles de votre parcours — ajustez la liste si besoin.

## Déploiement (Vercel)

1. Poussez `roro-portfolio/` sur un repo Git.
2. Sur [vercel.com](https://vercel.com) → **New Project** → importez le repo (root = `roro-portfolio`).
3. Ajoutez la variable d'environnement **`NEXT_PUBLIC_SITE_URL`** = votre domaine (`https://…`).
4. Déployez. `vercel.json` ajoute déjà des en-têtes de sécurité.

> Ce site tourne sur Node/Vercel — **pas sur WAMP**. L'ancien site HTML/PHP reste à la racine du dépôt.
