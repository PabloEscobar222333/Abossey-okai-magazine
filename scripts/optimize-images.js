// ─── Image Optimizer ─────────────────────────────────────
// Converts the full-size originals in images-src/ into small WebP files in
// public/assets/images/, sized for how large they actually appear on the site.
// Run after adding or replacing an image:  npm run images
import sharp from "sharp";
import { readdir, mkdir, stat } from "node:fs/promises";
import path from "node:path";

const SRC = "images-src";
const OUT = "public/assets/images";

// Each group: source folder (relative to images-src), output folder, max size and quality.
// Sizes are 2× the on-screen size so images stay sharp on high-density phone screens.
const GROUPS = [
  { from: "categories", to: "categories", width: 160, height: 160, quality: 82 }, // shown in 80px circles
  { from: "brands", to: "brands", width: 240, height: 120, quality: 85 },         // shown up to 48px tall
  { from: ".", to: ".", width: 1600, height: 1600, quality: 78 },                 // hero backgrounds
];

const IMAGE_EXT = /\.(png|jpe?g)$/i;

let totalIn = 0;
let totalOut = 0;

for (const group of GROUPS) {
  const srcDir = path.join(SRC, group.from);
  const outDir = path.join(OUT, group.to);
  await mkdir(outDir, { recursive: true });

  const files = (await readdir(srcDir, { withFileTypes: true }))
    .filter((f) => f.isFile() && IMAGE_EXT.test(f.name))
    .map((f) => f.name);

  for (const name of files) {
    const input = path.join(srcDir, name);
    const output = path.join(outDir, name.replace(IMAGE_EXT, ".webp"));

    const info = await sharp(input)
      .resize(group.width, group.height, { fit: "inside", withoutEnlargement: true })
      .webp({ quality: group.quality, effort: 6 })
      .toFile(output);

    totalIn += (await stat(input)).size;
    totalOut += info.size;
  }
  console.log(`✓ ${group.from}: ${files.length} images`);
}

const mb = (bytes) => (bytes / 1048576).toFixed(2);
console.log(`Done: ${mb(totalIn)} MB → ${mb(totalOut)} MB`);
