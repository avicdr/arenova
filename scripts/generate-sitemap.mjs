import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const DOMAIN = 'https://arenova.in';

// Define all valid, canonical, 200 OK public routes (strict trailing-slash alignment for GitHub Pages)
const routes = [
  {
    path: '/',
    changefreq: 'weekly',
    priority: '1.0',
    lastmod: new Date().toISOString().split('T')[0],
  },
  {
    path: '/services/ai-automation/',
    changefreq: 'weekly',
    priority: '0.95',
    lastmod: new Date().toISOString().split('T')[0],
  },
  {
    path: '/services/ai-agents/',
    changefreq: 'weekly',
    priority: '0.95',
    lastmod: new Date().toISOString().split('T')[0],
  },
  {
    path: '/services/business-process-automation/',
    changefreq: 'weekly',
    priority: '0.9',
    lastmod: new Date().toISOString().split('T')[0],
  },
  {
    path: '/services/ai-workflow-automation/',
    changefreq: 'weekly',
    priority: '0.9',
    lastmod: new Date().toISOString().split('T')[0],
  },
  {
    path: '/services/crm-automation/',
    changefreq: 'weekly',
    priority: '0.9',
    lastmod: new Date().toISOString().split('T')[0],
  },
  {
    path: '/services/custom-ai-development/',
    changefreq: 'weekly',
    priority: '0.9',
    lastmod: new Date().toISOString().split('T')[0],
  },
  {
    path: '/tools/automation-roi-calculator/',
    changefreq: 'weekly',
    priority: '0.9',
    lastmod: new Date().toISOString().split('T')[0],
  },
  {
    path: '/pricing/',
    changefreq: 'weekly',
    priority: '0.85',
    lastmod: new Date().toISOString().split('T')[0],
  },
  {
    path: '/industries/real-estate/',
    changefreq: 'monthly',
    priority: '0.8',
    lastmod: new Date().toISOString().split('T')[0],
  },
  {
    path: '/industries/b2b-services/',
    changefreq: 'monthly',
    priority: '0.8',
    lastmod: new Date().toISOString().split('T')[0],
  },
  {
    path: '/industries/healthcare/',
    changefreq: 'monthly',
    priority: '0.8',
    lastmod: new Date().toISOString().split('T')[0],
  },
  {
    path: '/about/',
    changefreq: 'monthly',
    priority: '0.8',
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
console.log(`[SEO SITEMAP] Successfully generated valid XML sitemap with ${routes.length} URLs at: ${targetPath}`);

// Also copy to dist if dist exists
const distPath = path.join(rootDir, 'dist', 'sitemap.xml');
if (fs.existsSync(path.dirname(distPath))) {
  fs.writeFileSync(distPath, sitemapContent, 'utf-8');
  console.log(`[SEO SITEMAP] Copied sitemap to dist: ${distPath}`);
}
