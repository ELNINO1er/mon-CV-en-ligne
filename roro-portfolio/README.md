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

## Déploiement — Hostinger (hébergement mutualisé)

Le site est configuré en **export statique** (`output: "export"`), donc pas besoin de Node côté serveur : on upload un dossier de fichiers HTML/CSS/JS.

1. Mettre le domaine dans `NEXT_PUBLIC_SITE_URL` (fichier `.env.local` ou `src/lib/site.ts`).
2. Générer le site :
   ```bash
   npm run build      # crée le dossier out/
   ```
3. Uploader **le contenu de `out/`** (pas le dossier lui-même) dans `public_html/` :
   - hPanel → **Gestionnaire de fichiers** → `public_html` → glisser-déposer un zip de `out/` puis extraire, **ou** via FTP (FileZilla).
4. Vérifier que `public_html/index.html` existe. C'est en ligne.

À chaque mise à jour : `npm run build` puis re-upload de `out/`.

## Déploiement — Vercel (alternative)

Importer le repo sur [vercel.com](https://vercel.com), définir `NEXT_PUBLIC_SITE_URL`, déployer. `vercel.json` ajoute des en-têtes de sécurité.
