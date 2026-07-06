// Génère l'image de partage social (Open Graph) 1200x630 -> public/og.jpg
// Lancer : node scripts/gen-og.mjs
import sharp from "sharp";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const portraitPath = join(root, "public/img/romaric-portrait.jpg");
const out = join(root, "public/og.jpg");

const W = 1200;
const H = 630;

const bg = `
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="base" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#080a12"/>
      <stop offset="1" stop-color="#05060b"/>
    </linearGradient>
    <radialGradient id="glow1" cx="0.15" cy="0.1" r="0.6">
      <stop offset="0" stop-color="#7c5cff" stop-opacity="0.35"/>
      <stop offset="1" stop-color="#7c5cff" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glow2" cx="0.9" cy="0.9" r="0.6">
      <stop offset="0" stop-color="#22d3ee" stop-opacity="0.28"/>
      <stop offset="1" stop-color="#22d3ee" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#ffffff"/>
      <stop offset="0.5" stop-color="#a78bff"/>
      <stop offset="1" stop-color="#22d3ee"/>
    </linearGradient>
    <pattern id="grid" width="46" height="46" patternUnits="userSpaceOnUse">
      <path d="M 46 0 L 0 0 0 46" fill="none" stroke="#ffffff" stroke-opacity="0.04" stroke-width="1"/>
    </pattern>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#base)"/>
  <rect width="${W}" height="${H}" fill="url(#grid)"/>
  <rect width="${W}" height="${H}" fill="url(#glow1)"/>
  <rect width="${W}" height="${H}" fill="url(#glow2)"/>

  <!-- Logo mark -->
  <g transform="translate(80,72)">
    <rect x="0" y="0" width="132" height="52" rx="12" fill="#0d0f1a" stroke="#ffffff" stroke-opacity="0.12"/>
    <text x="16" y="35" font-family="monospace" font-size="26" font-weight="800" letter-spacing="-1">
      <tspan fill="#22d3ee">&lt;</tspan><tspan fill="#f5c542">/</tspan><tspan fill="#22d3ee">&gt;</tspan>
    </text>
    <text x="66" y="26" font-family="Arial, sans-serif" font-size="17" font-weight="800" fill="#ffffff">RORO</text>
    <text x="66" y="43" font-family="monospace" font-size="10" letter-spacing="3" fill="#f5c542">SYSTEMS</text>
  </g>

  <!-- Eyebrow -->
  <text x="80" y="240" font-family="monospace" font-size="20" letter-spacing="4" fill="#22d3ee">DÉVELOPPEUR FULL-STACK IA &amp; SaaS</text>

  <!-- Name -->
  <text x="78" y="330" font-family="Arial, sans-serif" font-size="82" font-weight="800" fill="#ffffff" letter-spacing="-2">Romaric</text>
  <text x="78" y="418" font-family="Arial, sans-serif" font-size="82" font-weight="800" fill="url(#grad)" letter-spacing="-2">Bombade</text>

  <!-- Tagline -->
  <text x="80" y="482" font-family="Arial, sans-serif" font-size="26" fill="#9aa1b8">Applications web · Plateformes SaaS · Automatisation IA</text>

  <!-- Domain pill -->
  <g transform="translate(80,520)">
    <rect x="0" y="0" width="470" height="46" rx="23" fill="#ffffff" fill-opacity="0.05" stroke="#ffffff" stroke-opacity="0.12"/>
    <circle cx="26" cy="23" r="5" fill="#34d399"/>
    <text x="44" y="30" font-family="monospace" font-size="19" fill="#eef0f7">rorodev.mhtechconsulting.com</text>
  </g>

  <!-- Portrait ring backdrop -->
  <circle cx="965" cy="315" r="212" fill="#7c5cff" fill-opacity="0.18"/>
  <circle cx="965" cy="315" r="196" fill="none" stroke="#ffffff" stroke-opacity="0.15" stroke-width="2"/>
</svg>`;

const size = 372;
const cx = 965;
const cy = 315;

async function run() {
  const circleMask = Buffer.from(
    `<svg width="${size}" height="${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="#fff"/></svg>`,
  );

  const portrait = await sharp(portraitPath)
    .resize(size, size, { fit: "cover", position: "top" })
    .composite([{ input: circleMask, blend: "dest-in" }])
    .png()
    .toBuffer();

  await sharp(Buffer.from(bg))
    .composite([{ input: portrait, left: Math.round(cx - size / 2), top: Math.round(cy - size / 2) }])
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(out);

  console.log("OG image générée -> public/og.jpg");
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
