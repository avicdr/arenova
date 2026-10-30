import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const DOMAIN = 'https://arenova.in';

// Define all valid, canonical, indexable public routes (NO hash fragments)
const routes = [
  {
    path: '/',
    changefreq: 'weekly',
    priority: '1.0',
    // Uses latest git/file modification or release date
    lastmod: new Date().toISOString().split('T')[0],
  },
];

export function generateSitemapXml() {
  const urlEntries = routes
    .map((route) => {
      const loc = `${DOMAIN}${route.path}`;
      return `  <url>
    <loc>${loc}</loc>
    <lastmod>${route.lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>
`;
}

// Write to public/sitemap.xml
const sitemapContent = generateSitemapXml();
const targetPath = path.join(rootDir, 'public', 'sitemap.xml');
fs.writeFileSync(targetPath, sitemapContent, 'utf-8');
console.log(`[SEO SITEMAP] Successfully generated valid XML sitemap at: ${targetPath}`);

// Also copy to dist if dist exists
const distPath = path.join(rootDir, 'dist', 'sitemap.xml');
if (fs.existsSync(path.join(rootDir, 'dist'))) {
  fs.writeFileSync(distPath, sitemapContent, 'utf-8');
  console.log(`[SEO SITEMAP] Copied sitemap to dist: ${distPath}`);
}

