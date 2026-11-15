import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

async function generateTemplates() {
  const vite = await createServer({
    root: rootDir,
    logLevel: 'error',
    server: { middlewareMode: true, hmr: false },
    appType: 'custom',
  });

  try {
    const { ROUTE_SEO } = await vite.ssrLoadModule('/src/config/seo.ts');
    const { generateSchemaGraph } = await vite.ssrLoadModule('/src/seo/schema.ts');

    const routes = Object.keys(ROUTE_SEO).filter((r) => r !== '/' && r !== '/pricing' && r !== '/about');

    for (const routeKey of routes) {
      const meta = ROUTE_SEO[routeKey];
      const schema = generateSchemaGraph(routeKey);

      const cleanRoute = routeKey.replace(/^\//, '');
      const targetDir = path.join(rootDir, cleanRoute);
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }

      const htmlContent = `<!doctype html>
<html lang="en" data-type="software" data-radius="soft" data-buttons="solid" data-motion="restrained">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <!-- Favicon & Brand Icons -->
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    <link rel="icon" type="image/x-icon" href="/favicon.ico" />
    <link rel="shortcut icon" href="/favicon.ico" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <link rel="manifest" href="/site.webmanifest" />

    <!-- Primary SEO Meta Tags -->
    <title>${meta.title}</title>
    <meta name="title" content="${meta.title}" />
    <meta name="description" content="${meta.description}" />
    <meta name="keywords" content="${meta.keywords}" />
    <meta name="author" content="ARENOVA" />
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
    <meta name="googlebot" content="index, follow" />
    <meta name="bingbot" content="index, follow" />
    <link rel="canonical" href="${meta.canonicalUrl}" />

    <link rel="alternate" type="text/plain" href="https://arenova.in/llms.txt" title="LLM Context" />
    <meta name="theme-color" content="#f4f6f3" />
    <meta name="color-scheme" content="light" />
    <meta name="page-type" content="software" />
    <meta name="site-kind" content="software" />

    <!-- Open Graph -->
    <meta property="og:site_name" content="ARENOVA" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${meta.canonicalUrl}" />
    <meta property="og:title" content="${meta.title}" />
    <meta property="og:description" content="${meta.description}" />
    <meta property="og:image" content="https://arenova.in/metadata.png" />
    <meta property="og:image:secure_url" content="https://arenova.in/metadata.png" />
    <meta property="og:image:type" content="image/png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="${meta.title}" />
    <meta property="og:locale" content="en_US" />

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:url" content="${meta.canonicalUrl}" />
    <meta name="twitter:title" content="${meta.title}" />
    <meta name="twitter:description" content="${meta.description}" />
    <meta name="twitter:image" content="https://arenova.in/metadata.png" />
    <meta name="twitter:image:alt" content="${meta.title}" />

    <!-- Self-Hosted High-Performance Fonts -->
    <link rel="preload" href="/fonts/syne-bold.woff2" as="font" type="font/woff2" crossorigin />
    <link rel="preload" href="/fonts/plus-jakarta-sans.woff2" as="font" type="font/woff2" crossorigin />

    <!-- Schema.org JSON-LD Structured Data -->
    <script type="application/ld+json">
${JSON.stringify(schema, null, 2)}
    </script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`;

      const targetFile = path.join(targetDir, 'index.html');
      fs.writeFileSync(targetFile, htmlContent, 'utf-8');
      console.log(`[HTML TEMPLATE] Created template for ${cleanRoute} -> ${path.relative(rootDir, targetFile)}`);
    }
  } finally {
    await vite.close();
  }
}

generateTemplates().catch((err) => {
  console.error('[HTML TEMPLATE] Error:', err);
  process.exit(1);
});
