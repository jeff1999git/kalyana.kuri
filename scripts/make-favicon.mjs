#!/usr/bin/env node
/**
 * Favicon generator
 *
 * Usage: node scripts/make-favicon.mjs [source]      (default: public/logo.svg)
 *
 * Produces the App Router icon files Next.js picks up automatically:
 *   app/icon.png        512x512, transparent outside the disc (browser tabs, PWA)
 *   app/apple-icon.png  180x180 on the cream background (iOS home screen)
 *   app/favicon.ico     16 + 32 + 48 PNG frames (legacy /favicon.ico requests)
 *
 * The source can be the SVG monogram or a square PNG/JPG of the same artwork —
 * a circular mask is applied so any white corners become transparent.
 */

import sharp from "sharp";
import { existsSync, statSync, writeFileSync } from "fs";
import { join } from "path";

const SRC = process.argv[2] ?? "public/logo.svg";
const OUT_DIR = "app";
const CREAM = "#f7f1e6";
const RASTER_DENSITY = 384; // SVG rasterisation density; irrelevant for bitmap sources

async function disc(size, { background } = {}) {
  const base = sharp(SRC, { density: RASTER_DENSITY });
  const meta = await base.metadata();
  const side = Math.min(meta.width, meta.height);
  const left = Math.floor((meta.width - side) / 2);
  const top = Math.floor((meta.height - side) / 2);

  const r = (size / 2) * 0.985;
  const mask = Buffer.from(
    `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="#fff"/></svg>`
  );

  const masked = await base
    .extract({ left, top, width: side, height: side })
    .resize(size, size, { fit: "cover", kernel: "lanczos3" })
    .ensureAlpha()
    .composite([{ input: mask, blend: "dest-in" }])
    .png()
    .toBuffer();

  if (!background) return sharp(masked).png({ compressionLevel: 9 }).toBuffer();
  return sharp({ create: { width: size, height: size, channels: 4, background } })
    .composite([{ input: masked }])
    .png({ compressionLevel: 9 })
    .toBuffer();
}

function ico(frames) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(frames.length, 4);

  const entries = [];
  let offset = 6 + 16 * frames.length;
  for (const { size, buf } of frames) {
    const e = Buffer.alloc(16);
    e.writeUInt8(size >= 256 ? 0 : size, 0);
    e.writeUInt8(size >= 256 ? 0 : size, 1);
    e.writeUInt16LE(1, 4);
    e.writeUInt16LE(32, 6);
    e.writeUInt32LE(buf.length, 8);
    e.writeUInt32LE(offset, 12);
    offset += buf.length;
    entries.push(e);
  }
  return Buffer.concat([header, ...entries, ...frames.map((f) => f.buf)]);
}

async function main() {
  if (!existsSync(SRC)) {
    console.error(`Source image not found: ${SRC}`);
    process.exit(1);
  }

  writeFileSync(join(OUT_DIR, "icon.png"), await disc(512));
  writeFileSync(join(OUT_DIR, "apple-icon.png"), await disc(180, { background: CREAM }));

  const frames = [];
  for (const size of [16, 32, 48]) frames.push({ size, buf: await disc(size) });
  writeFileSync(join(OUT_DIR, "favicon.ico"), ico(frames));

  for (const f of ["icon.png", "apple-icon.png", "favicon.ico"]) {
    console.log(`  ${f.padEnd(16)} ${(statSync(join(OUT_DIR, f)).size / 1024).toFixed(1)} KB`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
