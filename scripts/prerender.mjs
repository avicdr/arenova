import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');

async function prerender() {
  const vite = await createServer({
    root: rootDir,
    logLevel: 'error',
    server: { middlewareMode: true, hmr: false },
    appType: 'custom',
  });

  try {
    const { render } = await vite.ssrLoadModule('/src/entry-server.tsx');
    const { ROUTE_SEO } = await vite.ssrLoadModule('/src/config/seo.ts');

    const routeKeys = Object.keys(ROUTE_SEO);

    for (const routeKey of routeKeys) {
      const distHtml =
        routeKey === '/'
          ? path.join(distDir, 'index.html')
          : path.join(distDir, routeKey.replace(/^\//, ''), 'index.html');

      if (!fs.existsSync(distHtml)) {
        throw new Error(`Built HTML not found at ${distHtml}`);
      }

      const template = fs.readFileSync(distHtml, 'utf-8');
      const appHtml = render(routeKey);

      if (!appHtml || !appHtml.includes('<h1')) {
        throw new Error(`SSR output for "${routeKey}" was empty or missing <h1>.`);
      }

      const injected = template.replace(/<div\s+id=["']root["']\s*><\/div>/, () => `<div id="root">${appHtml}</div>`);
      if (injected === template) {
        throw new Error(`Could not find empty <div id="root"></div> placeholder in ${distHtml}`);
      }

      fs.writeFileSync(distHtml, injected, 'utf-8');
      console.log(`[SSR PRERENDER] Pre-rendered "${routeKey}" -> ${path.relative(rootDir, distHtml)} (${appHtml.length} chars)`);
    }
  } finally {
    await vite.close();
  }
}

prerender().catch((err) => {
  console.error('[SSR PRERENDER] Failed:', err);
  process.exit(1);
});
