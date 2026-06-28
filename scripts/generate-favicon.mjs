// Genera favicons (ICO multi-size, PNG 16/32/180, Apple touch) a partir del avatar
import sharp from 'sharp';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const inputPath = join(__dirname, '..', 'src', 'assets', 'avatar', 'avatar-256.png');
const publicDir = join(__dirname, '..', 'public');

async function generate() {
  const input = await readFile(inputPath);
  const sizes = [16, 32, 48, 64, 128, 180, 192, 256, 512];

  console.log('Generando favicons desde avatar-256.png...\n');

  for (const size of sizes) {
    const outPath = join(publicDir, `favicon-${size}x${size}.png`);
    await sharp(input)
      .resize(size, size, { fit: 'cover' })
      .png({ quality: 95, compressionLevel: 9 })
      .toFile(outPath);
    const stat = await readFile(outPath);
    console.log(`  favicon-${size}x${size}.png: ${(stat.length / 1024).toFixed(1)} KB`);
  }

  // Apple touch icon (180x180, no transparency)
  const appleTouch = join(publicDir, 'apple-touch-icon.png');
  await sharp(input)
    .resize(180, 180, { fit: 'cover' })
    .flatten({ background: { r: 10, g: 10, b: 10 } })
    .png()
    .toFile(appleTouch);
  const appleStat = await readFile(appleTouch);
  console.log(`  apple-touch-icon.png: ${(appleStat.length / 1024).toFixed(1)} KB`);

  // favicon.ico multi-size (16+32+48)
  const icoPath = join(publicDir, 'favicon.ico');
  const png16 = await sharp(input).resize(16, 16).png().toBuffer();
  const png32 = await sharp(input).resize(32, 32).png().toBuffer();
  const png48 = await sharp(input).resize(48, 48).png().toBuffer();

  // ICO file format: header + directory entries + image data
  const numImages = 3;
  const headerSize = 6;
  const dirEntrySize = 16;
  const offsetTable = headerSize + numImages * dirEntrySize;

  // Calculate total size for offsets
  const offsets = [offsetTable];
  const pngSizesBytes = [png16.length, png32.length, png48.length];
  let currentOffset = offsetTable;
  for (let i = 0; i < numImages; i++) {
    currentOffset += pngSizesBytes[i];
    if (i < numImages - 1) offsets.push(currentOffset);
  }

  // ICONDIR (6 bytes)
  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0); // Reserved, must be 0
  header.writeUInt16LE(1, 2); // Type 1 = ICO
  header.writeUInt16LE(numImages, 4);

  // ICONDIRENTRY (16 bytes per entry)
  const dirEntries = Buffer.alloc(dirEntrySize * numImages);
  const pngs = [png16, png32, png48];
  for (let i = 0; i < numImages; i++) {
    const pngSizes = [16, 32, 48];
    const entryOffset = i * dirEntrySize;
    dirEntries.writeUInt8(pngSizes[i] === 256 ? 0 : pngSizes[i], entryOffset + 0); // width
    dirEntries.writeUInt8(pngSizes[i] === 256 ? 0 : pngSizes[i], entryOffset + 1); // height
    dirEntries.writeUInt8(0, entryOffset + 2); // color palette
    dirEntries.writeUInt8(0, entryOffset + 3); // reserved
    dirEntries.writeUInt16LE(1, entryOffset + 4); // color planes
    dirEntries.writeUInt16LE(32, entryOffset + 6); // bits per pixel
    dirEntries.writeUInt32LE(pngSizesBytes[i], entryOffset + 8); // image size
    dirEntries.writeUInt32LE(offsets[i], entryOffset + 12); // offset
  }

  await writeFile(icoPath, Buffer.concat([header, dirEntries, png16, png32, png48]));
  const icoStat = await readFile(icoPath);
  console.log(`  favicon.ico: ${(icoStat.length / 1024).toFixed(1)} KB`);

  console.log(`\nOutput: ${publicDir}`);
}

generate().catch(console.error);
