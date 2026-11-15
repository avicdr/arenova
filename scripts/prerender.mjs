import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');

const routesToPrerender = [
  { route: '/', distHtml: path.join(distDir, 'index.html') },
  { route: '/pricing', distHtml: path.join(distDir, 'pricing', 'index.html') },
  { route: '/about', distHtml: path.join(distDir, 'about', 'index.html') },
  { route: '/services/ai-automation', distHtml: path.join(distDir, 'services', 'ai-automation', 'index.html') },
  { route: '/services/ai-agents', distHtml: path.join(distDir, 'services', 'ai-agents', 'index.html') },
  {
    route: '/services/business-process-automation',
    distHtml: path.join(distDir, 'services', 'business-process-automation', 'index.html'),
  },
  {
    route: '/services/ai-workflow-automation',
    distHtml: path.join(distDir, 'services', 'ai-workflow-automation', 'index.html'),
  },
  { route: '/services/crm-automation', distHtml: path.join(distDir, 'services', 'crm-automation', 'index.html') },
  {
    route: '/services/custom-ai-development',
    distHtml: path.join(distDir, 'services', 'custom-ai-development', 'index.html'),
  },
  { route: '/industries/real-estate', distHtml: path.join(distDir, 'industries', 'real-estate', 'index.html') },
  { route: '/industries/b2b-services', distHtml: path.join(distDir, 'industries', 'b2b-services', 'index.html') },
  { route: '/industries/healthcare', distHtml: path.join(distDir, 'industries', 'healthcare', 'index.html') },
  {
    route: '/tools/automation-roi-calculator',
    distHtml: path.join(distDir, 'tools', 'automation-roi-calculator', 'index.html'),
  },
];

async function prerender() {
  const vite = await createServer({
    root: rootDir,
    logLevel: 'error',
    server: { middlewareMode: true, hmr: false },
    appType: 'custom',
  });

  try {
    const { render } = await vite.ssrLoadModule('/src/entry-server.tsx');

    for (const { route, distHtml } of routesToPrerender) {
      if (!fs.existsSync(distHtml)) {
        throw new Error(`Built HTML not found at ${distHtml}`);
      }

      const template = fs.readFileSync(distHtml, 'utf-8');
      const appHtml = render(route);

      if (!appHtml || !appHtml.includes('<h1')) {
        throw new Error(`SSR output for "${route}" was empty or missing <h1>.`);
      }

      const injected = template.replace(/<div\s+id=["']root["']\s*><\/div>/, () => `<div id="root">${appHtml}</div>`);
      if (injected === template) {
        throw new Error(`Could not find empty <div id="root"></div> placeholder in ${distHtml}`);
      }

      fs.writeFileSync(distHtml, injected, 'utf-8');
      console.log(`[SSR PRERENDER] Pre-rendered "${route}" -> ${path.relative(rootDir, distHtml)} (${appHtml.length} chars)`);
    }
  } finally {
    await vite.close();
  }
}

prerender().catch((err) => {
  console.error('[SSR PRERENDER] Failed:', err);
  process.exit(1);
});
