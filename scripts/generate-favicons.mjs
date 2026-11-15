import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const publicDir = path.join(rootDir, 'public');

console.log('[FAVICON] Generating crisp, production-grade favicons for ARENOVA...');

// 1. Fetch high-res logo from git history (c8d9fa0:public/arenova.png is 1587x1587)
let sourceBuf;
try {
  sourceBuf = execSync('git show c8d9fa0:public/arenova.png', {
    cwd: rootDir,
    maxBuffer: 20 * 1024 * 1024,
  });
} catch {
  console.log('[FAVICON] Fallback to local public/arenova.png');
  sourceBuf = fs.readFileSync(path.join(publicDir, 'arenova.png'));
}

// 2. Decode source PNG
let offset = 8;
const idatChunks = [];
let width, height, plte, trns, colorType;

while (offset < sourceBuf.length) {
  const len = sourceBuf.readUInt32BE(offset);
  const type = sourceBuf.toString('ascii', offset + 4, offset + 8);
  if (type === 'IHDR') {
    width = sourceBuf.readUInt32BE(offset + 8);
    height = sourceBuf.readUInt32BE(offset + 12);
    colorType = sourceBuf[offset + 17];
  } else if (type === 'PLTE') {
    plte = sourceBuf.subarray(offset + 8, offset + 8 + len);
  } else if (type === 'tRNS') {
    trns = sourceBuf.subarray(offset + 8, offset + 8 + len);
  } else if (type === 'IDAT') {
    idatChunks.push(sourceBuf.subarray(offset + 8, offset + 8 + len));
  }
  offset += 12 + len;
}

const raw = zlib.inflateSync(Buffer.concat(idatChunks));
const rgba = Buffer.alloc(width * height * 4);
let rawOff = 0;

if (colorType === 3) {
  for (let y = 0; y < height; y++) {
    rawOff++; // filter byte
    for (let x = 0; x < width; x++) {
      const idx = raw[rawOff++];
      const p = (y * width + x) * 4;
      rgba[p] = plte[idx * 3];
      rgba[p + 1] = plte[idx * 3 + 1];
      rgba[p + 2] = plte[idx * 3 + 2];
      rgba[p + 3] = trns && idx < trns.length ? trns[idx] : 255;
    }
  }
} else if (colorType === 6) {
  const stride = width * 4;
  const prevRow = Buffer.alloc(stride);
  const currRow = Buffer.alloc(stride);
  for (let y = 0; y < height; y++) {
    const filter = raw[rawOff++];
    for (let i = 0; i < stride; i++) {
      const val = raw[rawOff++];
      const left = i >= 4 ? currRow[i - 4] : 0;
      const up = prevRow[i];
      const upLeft = i >= 4 ? prevRow[i - 4] : 0;
      let u = val;
      if (filter === 1) u = (val + left) & 0xff;
      else if (filter === 2) u = (val + up) & 0xff;
      else if (filter === 3) u = (val + Math.floor((left + up) / 2)) & 0xff;
      else if (filter === 4) {
        const p = left + up - upLeft;
        const pa = Math.abs(p - left),
          pb = Math.abs(p - up),
          pc = Math.abs(p - upLeft);
        let pr = upLeft;
        if (pa <= pb && pa <= pc) pr = left;
        else if (pb <= pc) pr = up;
        u = (val + pr) & 0xff;
      }
      currRow[i] = u;
    }
    currRow.copy(rgba, y * stride);
    currRow.copy(prevRow);
  }
}

// 3. Calculate tight bounding box
let minX = width,
  maxX = 0,
  minY = height,
  maxY = 0;
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const a = rgba[(y * width + x) * 4 + 3];
    if (a > 15) {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }
}

const cropW = maxX - minX + 1;
const cropH = maxY - minY + 1;
console.log(`[FAVICON] Source logo detected: ${width}x${height}, crop box: [${minX}, ${minY}, ${cropW}x${cropH}]`);

// 4. Create Master 1024x1024 Square Canvas
// Fit mark to ~88% of canvas width (6% padding on left/right), centered vertically
const MASTER_SIZE = 1024;
const masterRgba = Buffer.alloc(MASTER_SIZE * MASTER_SIZE * 4, 0);

const targetW = Math.round(MASTER_SIZE * 0.88);
const scale = targetW / cropW;
const targetH = Math.round(cropH * scale);
const offsetX = Math.round((MASTER_SIZE - targetW) / 2);
const offsetY = Math.round((MASTER_SIZE - targetH) / 2);

for (let y = 0; y < targetH; y++) {
  const sy = minY + y / scale;
  const sy0 = Math.floor(sy);
  const sy1 = Math.min(height - 1, sy0 + 1);
  const fy = sy - sy0;
  for (let x = 0; x < targetW; x++) {
    const sx = minX + x / scale;
    const sx0 = Math.floor(sx);
    const sx1 = Math.min(width - 1, sx0 + 1);
    const fx = sx - sx0;

    const p00 = (sy0 * width + sx0) * 4;
    const p10 = (sy0 * width + sx1) * 4;
    const p01 = (sy1 * width + sx0) * 4;
    const p11 = (sy1 * width + sx1) * 4;

    const dp = ((offsetY + y) * MASTER_SIZE + (offsetX + x)) * 4;
    for (let c = 0; c < 4; c++) {
      const top = rgba[p00 + c] * (1 - fx) + rgba[p10 + c] * fx;
      const bot = rgba[p01 + c] * (1 - fx) + rgba[p11 + c] * fx;
      masterRgba[dp + c] = Math.round(top * (1 - fy) + bot * fy);
    }
  }
}

// 5. High-quality Area-Averaging Downsampling with Premultiplied Alpha
function downsample(src, srcW, srcH, dstW, dstH, boostContrast = false) {
  const dst = Buffer.alloc(dstW * dstH * 4, 0);
  const scaleX = srcW / dstW;
  const scaleY = srcH / dstH;

  for (let dy = 0; dy < dstH; dy++) {
    const syStart = dy * scaleY;
    const syEnd = (dy + 1) * scaleY;
    for (let dx = 0; dx < dstW; dx++) {
      const sxStart = dx * scaleX;
      const sxEnd = (dx + 1) * scaleX;

      let sumR = 0,
        sumG = 0,
        sumB = 0,
        sumA = 0;
      let totalArea = 0;

      const y0 = Math.floor(syStart);
      const y1 = Math.min(srcH - 1, Math.floor(syEnd));
      const x0 = Math.floor(sxStart);
      const x1 = Math.min(srcW - 1, Math.floor(sxEnd));

      for (let y = y0; y <= y1; y++) {
        const yTop = Math.max(syStart, y);
        const yBot = Math.min(syEnd, y + 1);
        const yWeight = Math.max(0, yBot - yTop);
        if (yWeight <= 0) continue;

        for (let x = x0; x <= x1; x++) {
          const xLeft = Math.max(sxStart, x);
          const xRight = Math.min(sxEnd, x + 1);
          const xWeight = Math.max(0, xRight - xLeft);
          if (xWeight <= 0) continue;

          const weight = xWeight * yWeight;
          const p = (y * srcW + x) * 4;
          const a = src[p + 3] / 255;
          sumR += src[p] * a * weight;
          sumG += src[p + 1] * a * weight;
          sumB += src[p + 2] * a * weight;
          sumA += src[p + 3] * weight;
          totalArea += weight;
        }
      }

      const dp = (dy * dstW + dx) * 4;
      if (totalArea > 0 && sumA > 0) {
        const avgA = sumA / totalArea;
        const normA = avgA / 255;
        let r = Math.min(255, Math.round(sumR / totalArea / normA));
        let g = Math.min(255, Math.round(sumG / totalArea / normA));
        let b = Math.min(255, Math.round(sumB / totalArea / normA));
        let a = Math.min(255, Math.round(avgA));

        // For small favicons (16x16, 32x32, 48x48): lift dark shadow tones slightly
        // so dark facets remain clearly legible on dark browser tabs (#1f1f1f)
        if (boostContrast && a > 20) {
          // Check luminance
          const lum = 0.299 * r + 0.587 * g + 0.114 * b;
          if (lum < 95) {
            // Lift warmth and brightness in shadows
            const lift = (95 - lum) * 0.42;
            r = Math.min(255, Math.round(r + lift * 1.3));
            g = Math.min(255, Math.round(g + lift * 0.45));
            b = Math.min(255, Math.round(b + lift * 0.3));
          }
        }

        dst[dp] = r;
        dst[dp + 1] = g;
        dst[dp + 2] = b;
        dst[dp + 3] = a;
      }
    }
  }
  return dst;
}

// 6. PNG Encoder
function encodePng(w, h, rgbaBuf) {
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  function makeChunk(type, data) {
    const len = Buffer.alloc(4);
    len.writeUInt32BE(data.length, 0);
    const tBuf = Buffer.from(type, 'ascii');
    const td = Buffer.concat([tBuf, data]);
    const crc = Buffer.alloc(4);
    crc.writeUInt32BE(zlib.crc32(td) >>> 0, 0);
    return Buffer.concat([len, td, crc]);
  }

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0);
  ihdr.writeUInt32BE(h, 4);
  ihdr[8] = 8; // 8-bit
  ihdr[9] = 6; // RGBA
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  const scanlineLen = 1 + w * 4;
  const rawData = Buffer.alloc(h * scanlineLen);
  for (let y = 0; y < h; y++) {
    rawData[y * scanlineLen] = 0; // Filter 0
    rgbaBuf.copy(rawData, y * scanlineLen + 1, y * w * 4, (y + 1) * w * 4);
  }
  const idat = zlib.deflateSync(rawData, { level: 9 });

  return Buffer.concat([sig, makeChunk('IHDR', ihdr), makeChunk('IDAT', idat), makeChunk('IEND', Buffer.alloc(0))]);
}

// 7. Multi-Resolution Windows ICO Encoder
function encodeIco(pngImages) {
  // pngImages: array of { width, height, buffer }
  const count = pngImages.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // ICO type
  header.writeUInt16LE(count, 4); // image count

  const dirLen = count * 16;
  let currentOffset = 6 + dirLen;
  const dirEntries = [];

  for (const img of pngImages) {
    const entry = Buffer.alloc(16);
    entry[0] = img.width >= 256 ? 0 : img.width;
    entry[1] = img.height >= 256 ? 0 : img.height;
    entry[2] = 0;
    entry[3] = 0;
    entry.writeUInt16LE(1, 4); // planes
    entry.writeUInt16LE(32, 6); // bpp
    entry.writeUInt32LE(img.buffer.length, 8);
    entry.writeUInt32LE(currentOffset, 12);
    dirEntries.push(entry);
    currentOffset += img.buffer.length;
  }

  return Buffer.concat([header, ...dirEntries, ...pngImages.map((p) => p.buffer)]);
}

// 8. Generate Favicon & App Icons
console.log('[FAVICON] Resampling raster sizes...');
const rgba16 = downsample(masterRgba, MASTER_SIZE, MASTER_SIZE, 16, 16, true);
const rgba32 = downsample(masterRgba, MASTER_SIZE, MASTER_SIZE, 32, 32, true);
const rgba48 = downsample(masterRgba, MASTER_SIZE, MASTER_SIZE, 48, 48, true);
const rgba192 = downsample(masterRgba, MASTER_SIZE, MASTER_SIZE, 192, 192, false);
const rgba512 = downsample(masterRgba, MASTER_SIZE, MASTER_SIZE, 512, 512, false);

const png16 = encodePng(16, 16, rgba16);
const png32 = encodePng(32, 32, rgba32);
const png48 = encodePng(48, 48, rgba48);
const png192 = encodePng(192, 192, rgba192);
const png512 = encodePng(512, 512, rgba512);

// Create Apple Touch Icon on brand background (#152421 obsidian dark)
// Apple guidelines suggest non-transparent background so iOS doesn't fill with black
const appleTouchRgba = Buffer.alloc(180 * 180 * 4);
const bgR = 0x15,
  bgG = 0x24,
  bgB = 0x21; // #152421
// Inset mark by 12% so it has safe padding on rounded squircle corners
const appleInnerSize = 144;
const appleInnerRgba = downsample(masterRgba, MASTER_SIZE, MASTER_SIZE, appleInnerSize, appleInnerSize, false);
const appleOffset = Math.round((180 - appleInnerSize) / 2);

for (let y = 0; y < 180; y++) {
  for (let x = 0; x < 180; x++) {
    const p = (y * 180 + x) * 4;
    appleTouchRgba[p] = bgR;
    appleTouchRgba[p + 1] = bgG;
    appleTouchRgba[p + 2] = bgB;
    appleTouchRgba[p + 3] = 255;
  }
}

for (let y = 0; y < appleInnerSize; y++) {
  for (let x = 0; x < appleInnerSize; x++) {
    const sp = (y * appleInnerSize + x) * 4;
    const dp = ((appleOffset + y) * 180 + (appleOffset + x)) * 4;
    const a = appleInnerRgba[sp + 3] / 255;
    if (a > 0) {
      appleTouchRgba[dp] = Math.round(appleInnerRgba[sp] * a + bgR * (1 - a));
      appleTouchRgba[dp + 1] = Math.round(appleInnerRgba[sp + 1] * a + bgG * (1 - a));
      appleTouchRgba[dp + 2] = Math.round(appleInnerRgba[sp + 2] * a + bgB * (1 - a));
    }
  }
}
const appleTouchPng = encodePng(180, 180, appleTouchRgba);

// 9. Generate Multi-Size ICO File (48x48, 32x32, 16x16)
const multiIco = encodeIco([
  { width: 48, height: 48, buffer: png48 },
  { width: 32, height: 32, buffer: png32 },
  { width: 16, height: 16, buffer: png16 },
]);

// 10. Generate SVG Favicon with Dark & Light Mode Adaptive Styling
// Uses 128x128 retina-grade base64 image with adaptive SVG filters
const rgba128 = downsample(masterRgba, MASTER_SIZE, MASTER_SIZE, 128, 128, true);
const png128 = encodePng(128, 128, rgba128);
const b64_128 = png128.toString('base64');

const svgFavicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
  <defs>
    <filter id="ember-backlight" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="0" stdDeviation="1.5" flood-color="#FF5722" flood-opacity="0.65" />
      <feDropShadow dx="0" dy="1" stdDeviation="2.5" flood-color="#E84B2C" flood-opacity="0.4" />
    </filter>
    <filter id="crisp-shadow" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="0.75" stdDeviation="1" flood-color="#111A18" flood-opacity="0.3" />
    </filter>
  </defs>
  <style>
    .brand-mark {
      transform-origin: center;
    }
    @media (prefers-color-scheme: dark) {
      .brand-mark {
        filter: url(#ember-backlight);
      }
    }
    @media (prefers-color-scheme: light) {
      .brand-mark {
        filter: url(#crisp-shadow);
      }
    }
  </style>
  <image class="brand-mark" href="data:image/png;base64,${b64_128}" x="0" y="0" width="64" height="64" preserveAspectRatio="xMidYMid meet" />
</svg>
`;

// 11. Generate site.webmanifest
const webmanifest = JSON.stringify(
  {
    name: 'ARENOVA',
    short_name: 'Arenova',
    description: 'Custom software and AI automation systems.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f4f6f3',
    theme_color: '#f4f6f3',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any maskable',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable',
      },
    ],
  },
  null,
  2
);

// 12. Write all files to disk
fs.writeFileSync(path.join(publicDir, 'favicon.svg'), svgFavicon, 'utf-8');
fs.writeFileSync(path.join(publicDir, 'favicon-16x16.png'), png16);
fs.writeFileSync(path.join(publicDir, 'favicon-32x32.png'), png32);
fs.writeFileSync(path.join(publicDir, 'favicon-48x48.png'), png48);
fs.writeFileSync(path.join(publicDir, 'icon-192.png'), png192);
fs.writeFileSync(path.join(publicDir, 'icon-512.png'), png512);
fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), appleTouchPng);
fs.writeFileSync(path.join(publicDir, 'site.webmanifest'), webmanifest, 'utf-8');

// Update favicon.ico and arenova.ico
fs.writeFileSync(path.join(publicDir, 'favicon.ico'), multiIco);
fs.writeFileSync(path.join(publicDir, 'arenova.ico'), multiIco);
fs.writeFileSync(path.join(rootDir, 'arenova.ico'), multiIco);

// Update arenova.png with cropped 512x512 master so existing links look gorgeous
fs.writeFileSync(path.join(publicDir, 'arenova.png'), png512);
fs.writeFileSync(path.join(rootDir, 'arenova.png'), png512);

console.log('[FAVICON] All favicon files successfully written to public/:');
console.log(' - public/favicon.svg (' + svgFavicon.length + ' chars)');
console.log(' - public/favicon-16x16.png (' + png16.length + ' bytes)');
console.log(' - public/favicon-32x32.png (' + png32.length + ' bytes)');
console.log(' - public/favicon-48x48.png (' + png48.length + ' bytes)');
console.log(' - public/favicon.ico (' + multiIco.length + ' bytes, 3 sub-images)');
console.log(' - public/apple-touch-icon.png (' + appleTouchPng.length + ' bytes, 180x180)');
console.log(' - public/icon-192.png (' + png192.length + ' bytes)');
console.log(' - public/icon-512.png (' + png512.length + ' bytes)');
console.log(' - public/site.webmanifest');
console.log(' - public/arenova.ico & arenova.ico (updated)');
console.log(' - public/arenova.png & arenova.png (updated)');
