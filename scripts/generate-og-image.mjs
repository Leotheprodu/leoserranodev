// Genera la OG image 1200x630 con el avatar + branding del portfolio
// Usa sharp + SVG overlay para texto
import sharp from 'sharp';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const avatarPath = join(__dirname, '..', 'src', 'assets', 'avatar', 'avatar-256.png');
const outputPath = join(__dirname, '..', 'public', 'og-default.png');

const WIDTH = 1200;
const HEIGHT = 630;
const PAD = 80;

// Genera un SVG con el texto + branding (sharp lo rasteriza sobre la imagen)
function buildSvg() {
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0a0a0a"/>
      <stop offset="100%" stop-color="#1a1a1a"/>
    </linearGradient>
    <linearGradient id="text" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#22d0c9"/>
      <stop offset="100%" stop-color="#ff6b6b"/>
    </linearGradient>
  </defs>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg)"/>
  <circle cx="${WIDTH * 0.22}" cy="${HEIGHT / 2}" r="160" fill="#1f1f1f"/>
  <text x="${WIDTH * 0.40}" y="${HEIGHT / 2 - 40}" font-family="ui-sans-serif, system-ui, -apple-system, sans-serif" font-size="64" font-weight="800" fill="#fafafa">Leonardo Serrano</text>
  <text x="${WIDTH * 0.40}" y="${HEIGHT / 2 + 30}" font-family="ui-sans-serif, system-ui, -apple-system, sans-serif" font-size="36" font-weight="500" fill="url(#text)">Full-Stack Engineer</text>
  <text x="${WIDTH * 0.40}" y="${HEIGHT - 80}" font-family="ui-monospace, monospace" font-size="22" font-weight="400" fill="#71717a">Next.js · NestJS · Prisma · Socket.IO</text>
</svg>`);
}

async function generate() {
  await mkdir(dirname(outputPath), { recursive: true });

  const avatar = await readFile(avatarPath);
  const svgOverlay = buildSvg();

  // Renderiza el SVG a un buffer PNG
  const svgRendered = await sharp(svgOverlay).png().toBuffer();

  // Crea el canvas OG con el avatar circular + texto
  // El avatar se redimensiona a 320x320 y se posiciona a la izquierda
  const avatarResized = await sharp(avatar)
    .resize(320, 320, { fit: 'cover' })
    .composite([{
      input: Buffer.from(`<svg><circle cx="160" cy="160" r="160" fill="none"/></svg>`),
      blend: 'dest-in',
    }])
    .png()
    .toBuffer();

  // Compone todo: SVG background + avatar circular encima
  const result = await sharp(svgRendered)
    .composite([{
      input: avatarResized,
      top: 155,
      left: 100,
    }])
    .png({ quality: 90, compressionLevel: 9 })
    .toFile(outputPath);

  const stat = await readFile(outputPath);
  console.log(`OG image: ${WIDTH}x${HEIGHT}, ${(stat.length / 1024).toFixed(1)} KB`);
  console.log(`Output: ${outputPath}`);
}

generate().catch(console.error);
