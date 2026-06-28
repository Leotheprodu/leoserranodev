// Optimización del avatar para web
// Genera versiones WebP y AVIF a múltiples tamaños para srcset
import sharp from 'sharp';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const inputPath = join(__dirname, '..', 'src', 'assets', 'yo_ilustrado.png');
const outputDir = join(__dirname, '..', 'src', 'assets', 'avatar');

async function optimize() {
  await mkdir(outputDir, { recursive: true });

  const input = await readFile(inputPath);
  const metadata = await sharp(input).metadata();
  console.log(`Input: ${metadata.width}x${metadata.height}, ${(input.length / 1024).toFixed(1)} KB`);

  const sizes = [64, 128, 256, 512];
  const formats = ['webp', 'avif'];

  for (const size of sizes) {
    for (const format of formats) {
      const outPath = join(outputDir, `avatar-${size}.${format}`);
      await sharp(input)
        .resize(size, size, { fit: 'cover' })
        .toFormat(format, { quality: 85 })
        .toFile(outPath);
      const stat = await readFile(outPath);
      console.log(`  ${size}px ${format.toUpperCase()}: ${(stat.length / 1024).toFixed(1)} KB`);
    }
  }

  // Fallback PNG optimizado (para browsers que no soporten WebP/AVIF)
  const pngOut = join(outputDir, 'avatar-256.png');
  await sharp(input).resize(256, 256, { fit: 'cover' }).png({ quality: 90, compressionLevel: 9 }).toFile(pngOut);
  const pngStat = await readFile(pngOut);
  console.log(`  256px PNG (fallback): ${(pngStat.length / 1024).toFixed(1)} KB`);

  console.log(`\nOutput: ${outputDir}`);
}

optimize().catch(console.error);
