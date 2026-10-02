# Portfolio — Romaric BOMBADE

Portfolio personnel de **Romaric BOMBADE**, développeur Full-Stack & SaaS Product Builder basé à Abidjan.

Construit avec **Next.js 16** (App Router), **React 19**, **Tailwind CSS 4**, avec internationalisation FR/EN, animations (GSAP, Lenis, Motion) et curseur personnalisé.

## Développement

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

## Scripts

| Commande | Description |
|---|---|
| `npm run dev` | Serveur de développement |
| `npm run build` | Build de production |
| `npm run start` | Serveur de production |
| `npm run lint` | Lint ESLint |

## Structure

```
src/
  app/[locale]/     Routing par langue (FR par défaut, /en)
  components/       Composants UI, sections, layout
  data/             Contenu (profil, projets, parcours)
  i18n/             Dictionnaires et config FR/EN
  lib/              Utilitaires, métadonnées SEO
  proxy.ts          Middleware Next 16 (routing des langues)
```

## Configuration

Définir `NEXT_PUBLIC_SITE_URL` au build (sinon les URL SEO pointent vers `localhost:3000`).

## Internationalisation

Le français est servi sans préfixe (`/`), l'anglais sous `/en`. La logique de réécriture/redirection est dans [`src/proxy.ts`](src/proxy.ts).
