import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

async function generate() {
  const vite = await createServer({
    root: rootDir,
    logLevel: 'error',
    server: { middlewareMode: true, hmr: false },
    appType: 'custom',
  });

  try {
    const { ROUTE_SEO } = await vite.ssrLoadModule('/src/config/seo.ts');
    const today = new Date().toISOString().split('T')[0];

    const entries = Object.keys(ROUTE_SEO).map((routeKey) => {
      const meta = ROUTE_SEO[routeKey];
      let priority = '0.8';
      let changefreq = 'weekly';

      if (routeKey === '/') {
        priority = '1.0';
      } else if (routeKey.startsWith('/services/ai-automation') || routeKey.startsWith('/services/ai-agents')) {
        priority = '0.95';
      } else if (routeKey.startsWith('/services/')) {
        priority = '0.9';
      } else if (routeKey.startsWith('/tools/')) {
        priority = '0.9';
      } else if (routeKey.startsWith('/blog/')) {
        priority = '0.85';
      } else if (routeKey === '/pricing') {
        priority = '0.85';
      } else if (routeKey.startsWith('/industries/')) {
        priority = '0.8';
        changefreq = 'monthly';
      } else if (routeKey === '/about' || routeKey === '/blog') {
        priority = '0.8';
      }

      return `  <url>
    <loc>${meta.canonicalUrl}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
    });

    const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join('\n')}
</urlset>
`;

    const targetPath = path.join(rootDir, 'public', 'sitemap.xml');
    fs.writeFileSync(targetPath, sitemapContent, 'utf-8');
    console.log(`[SEO SITEMAP] Successfully generated valid XML sitemap with ${entries.length} URLs at: ${targetPath}`);

    const distPath = path.join(rootDir, 'dist', 'sitemap.xml');
    if (fs.existsSync(path.dirname(distPath))) {
      fs.writeFileSync(distPath, sitemapContent, 'utf-8');
      console.log(`[SEO SITEMAP] Copied sitemap to dist: ${distPath}`);
    }
  } finally {
    await vite.close();
  }
}

generate().catch((err) => {
  console.error('[SEO SITEMAP] Failed:', err);
  process.exit(1);
});
