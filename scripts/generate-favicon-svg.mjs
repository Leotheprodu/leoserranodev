// Genera un favicon.svg con el avatar embebido como data URI
// (algunos browsers no resuelven href relativos desde SVG)
import sharp from 'sharp';
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const avatarPath = join(__dirname, '..', 'src', 'assets', 'avatar', 'avatar-256.png');
const outPath = join(__dirname, '..', 'public', 'favicon.svg');

async function generate() {
  const avatar = await readFile(avatarPath);
  const dataUri = `data:image/png;base64,${avatar.toString('base64')}`;

  // Genera el SVG con el avatar embebido en un <image>
  // Aplicando un clip-path circular para que se vea redondo
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
  <defs>
    <clipPath id="circle">
      <circle cx="16" cy="16" r="16"/>
    </clipPath>
  </defs>
  <image href="${dataUri}" x="0" y="0" width="32" height="32" clip-path="url(#circle)" preserveAspectRatio="xMidYMid slice"/>
</svg>`;

  await writeFile(outPath, svg, 'utf-8');
  const stat = await readFile(outPath);
  console.log(`favicon.svg: ${(stat.length / 1024).toFixed(1)} KB (with embedded avatar data URI)`);
}

generate().catch(console.error);
