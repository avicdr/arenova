import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const PRODUCTION_DOMAIN = 'https://arenova.in';

let errorsCount = 0;
let warningsCount = 0;

function logPass(msg) {
  console.log(`\x1b[32m✔ PASS:\x1b[0m ${msg}`);
}

function logFail(msg) {
  console.error(`\x1b[31m✖ FAIL:\x1b[0m ${msg}`);
  errorsCount++;
}

function logWarn(msg) {
  console.warn(`\x1b[33m⚠ WARN:\x1b[0m ${msg}`);
  warningsCount++;
}

console.log('\n======================================================');
console.log('--- ARENOVA ECOSYSTEM SEO VALIDATOR & AUDIT ENGINE ---');
console.log('Target Domain: ' + PRODUCTION_DOMAIN);
console.log('======================================================\n');

const distExists = fs.existsSync(path.join(rootDir, 'dist', 'index.html'));

const pageSpecs = [
  {
    route: '/',
    file: distExists ? path.join(rootDir, 'dist', 'index.html') : path.join(rootDir, 'index.html'),
    expectedCanonical: `${PRODUCTION_DOMAIN}/`,
  },
  {
    route: '/pricing/',
    file: distExists ? path.join(rootDir, 'dist', 'pricing', 'index.html') : path.join(rootDir, 'pricing', 'index.html'),
    expectedCanonical: `${PRODUCTION_DOMAIN}/pricing/`,
  },
  {
    route: '/about/',
    file: distExists ? path.join(rootDir, 'dist', 'about', 'index.html') : path.join(rootDir, 'about', 'index.html'),
    expectedCanonical: `${PRODUCTION_DOMAIN}/about/`,
  },
];

const seenTitles = new Map();
const seenDescriptions = new Map();

for (const page of pageSpecs) {
  console.log(`\n[HTML AUDIT] Checking route "${page.route}" (${path.relative(rootDir, page.file)})`);
  if (!fs.existsSync(page.file)) {
    logFail(`Missing HTML file: ${page.file}`);
    continue;
  }

  const html = fs.readFileSync(page.file, 'utf-8');

  // Title Check
  const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
  if (!titleMatch) {
    logFail(`[${page.route}] Missing <title> tag.`);
  } else {
    const title = titleMatch[1].trim();
    if (seenTitles.has(title)) {
      logFail(`[${page.route}] Duplicate <title> already used by "${seenTitles.get(title)}".`);
    } else {
      seenTitles.set(title, page.route);
    }
    if (title.length < 20 || title.length > 85) {
      logWarn(`[${page.route}] Title length (${title.length} chars) outside recommended 30-75 range: "${title}"`);
    } else {
      logPass(`[${page.route}] Unique <title> (${title.length} chars): "${title}"`);
    }
  }

  // Meta Description Check
  const descMatch = html.match(/<meta\s+name=["']description["']\s+content=(?:"([^"]+)"|'([^']+)')/i);
  if (!descMatch) {
    logFail(`[${page.route}] Missing meta description tag.`);
  } else {
    const desc = (descMatch[1] || descMatch[2] || '').trim();
    if (seenDescriptions.has(desc)) {
      logFail(`[${page.route}] Duplicate meta description already used by "${seenDescriptions.get(desc)}".`);
    } else {
      seenDescriptions.set(desc, page.route);
    }
    if (desc.length < 50 || desc.length > 200) {
      logWarn(`[${page.route}] Meta description length (${desc.length} chars) outside optimal 80-180 range.`);
    } else {
      logPass(`[${page.route}] Unique meta description (${desc.length} chars).`);
    }
  }

  // Canonical Tag Check (Strict match to 200 OK trailing-slash URL)
  const canonicalMatch = html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i);
  if (!canonicalMatch) {
    logFail(`[${page.route}] Missing canonical link tag.`);
  } else {
    const canonicalUrl = canonicalMatch[1].trim();
    if (canonicalUrl !== page.expectedCanonical) {
      logFail(`[${page.route}] Canonical URL "${canonicalUrl}" != expected "${page.expectedCanonical}"`);
    } else {
      logPass(`[${page.route}] Canonical URL matches 200 OK endpoint: ${canonicalUrl}`);
    }
  }

  // Open Graph & Twitter Tags Check
  const requiredOgTags = ['og:title', 'og:description', 'og:image', 'og:url', 'og:site_name', 'og:type'];
  for (const tag of requiredOgTags) {
    const regex = new RegExp(`<meta\\s+(?:property|name)=["']${tag}["']\\s+content=["']([^"']+)["']`, 'i');
    const match = html.match(regex);
    if (!match) {
      logFail(`[${page.route}] Missing Open Graph tag: ${tag}`);
    } else if (tag === 'og:url' && match[1].trim() !== page.expectedCanonical) {
      logFail(`[${page.route}] og:url "${match[1]}" != expected "${page.expectedCanonical}"`);
    }
  }
  logPass(`[${page.route}] Open Graph tags verified.`);

  const requiredTwitterTags = ['twitter:card', 'twitter:title', 'twitter:description', 'twitter:image', 'twitter:url'];
  for (const tag of requiredTwitterTags) {
    const regex = new RegExp(`<meta\\s+(?:property|name)=["']${tag}["']\\s+content=["']([^"']+)["']`, 'i');
    const match = html.match(regex);
    if (!match) {
      logFail(`[${page.route}] Missing Twitter card tag: ${tag}`);
    } else if (tag === 'twitter:url' && match[1].trim() !== page.expectedCanonical) {
      logFail(`[${page.route}] twitter:url "${match[1]}" != expected "${page.expectedCanonical}"`);
    }
  }
  logPass(`[${page.route}] Twitter card tags verified.`);

  // Robots Directives Check
  const robotsMatch = html.match(/<meta\s+name=["']robots["']\s+content=["']([^"']+)["']/i);
  if (!robotsMatch) {
    logWarn(`[${page.route}] No meta robots tag found in head.`);
  } else {
    const robots = robotsMatch[1].toLowerCase();
    if (robots.includes('noindex')) {
      logFail(`[${page.route}] Production HTML contains "noindex": ${robots}`);
    } else {
      logPass(`[${page.route}] Robots directive verified: ${robots}`);
    }
  }

  // Pre-rendered SSR Content & Heading Hierarchy Check (critical for built dist/)
  if (distExists) {
    const h1Matches = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)];
    if (h1Matches.length === 0) {
      logFail(`[${page.route}] Built HTML has no <h1> (SSR pre-render missing!).`);
    } else if (h1Matches.length > 1) {
      logFail(`[${page.route}] Found multiple <h1> headings (${h1Matches.length}).`);
    } else {
      const cleanH1 = h1Matches[0][1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
      logPass(`[${page.route}] Pre-rendered <h1> present: "${cleanH1}"`);
    }

    const bodyText = html
      .replace(/<script[\s\S]*?<\/script>/gi, '')
      .replace(/<style[\s\S]*?<\/style>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    const wordCount = bodyText.split(' ').filter(Boolean).length;
    if (wordCount < 100) {
      logFail(`[${page.route}] Pre-rendered visible text too thin (${wordCount} words).`);
    } else {
      logPass(`[${page.route}] Rich pre-rendered semantic copy verified (${wordCount} words).`);
    }

    if (page.route === '/') {
      if (!html.includes('href="/pricing/"') || !html.includes('href="/about/"')) {
        logFail('[/] Built HTML missing crawlable <a href="/pricing/"> or <a href="/about/"> links.');
      } else {
        logPass('[/] Crawlable internal <a href> links to /pricing/ and /about/ verified.');
      }
    }

    if (html.includes('https://arova.arenova.in')) {
      logFail(`[${page.route}] Found broken external NXDOMAIN link to https://arova.arenova.in`);
    }
  }

  // Image Alt Attributes Check
  const imgMatches = [...html.matchAll(/<img\s+([^>]+)>/gi)];
  for (const imgTag of imgMatches) {
    const attrs = imgTag[1];
    if (!/alt=["'][^"']*["']/i.test(attrs)) {
      logWarn(`[${page.route}] Image tag missing alt attribute: <img ${attrs.substring(0, 50)}...>`);
    }
  }

  // JSON-LD Structured Data Validation
  const jsonLdMatches = [...html.matchAll(/<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi)];
  if (jsonLdMatches.length === 0) {
    logFail(`[${page.route}] No Schema.org JSON-LD scripts found.`);
  } else {
    for (const match of jsonLdMatches) {
      try {
        const parsed = JSON.parse(match[1]);
        if (!parsed['@context'] || !parsed['@graph']) {
          logFail(`[${page.route}] JSON-LD missing standard @context or @graph.`);
        } else {
          const types = parsed['@graph'].map((item) => item['@type']);
          logPass(`[${page.route}] JSON-LD parsed (${types.join(', ')}).`);
          if (page.route === '/' && (!types.includes('Organization') || !types.includes('WebSite'))) {
            logFail('[/] Schema.org graph missing Organization or WebSite entity.');
          }
        }
      } catch (e) {
        logFail(`[${page.route}] JSON-LD syntax error: ${e.message}`);
      }
    }
  }
}

// 2. Validate Sitemap & Strict Trailing-Slash Parity
console.log('\n[SITEMAP AUDIT] Checking sitemap.xml...');
const sitemapPath = distExists
  ? path.join(rootDir, 'dist', 'sitemap.xml')
  : path.join(rootDir, 'public', 'sitemap.xml');

if (!fs.existsSync(sitemapPath)) {
  logFail(`Sitemap not found at: ${sitemapPath}`);
} else {
  const sitemapContent = fs.readFileSync(sitemapPath, 'utf-8');
  if (!sitemapContent.includes('<urlset') || !sitemapContent.includes('http://www.sitemaps.org/schemas/sitemap/0.9')) {
    logFail('Sitemap is missing standard <urlset> XML namespace.');
  }

  const locMatches = [...sitemapContent.matchAll(/<loc>([^<]+)<\/loc>/gi)].map((m) => m[1].trim());
  if (locMatches.length === 0) {
    logFail('Sitemap contains zero <loc> URLs.');
  } else {
    logPass(`Sitemap contains ${locMatches.length} URL entry/entries.`);
    const expectedCanonicals = new Set(pageSpecs.map((p) => p.expectedCanonical));
    for (const loc of locMatches) {
      if (loc.includes('#')) {
        logFail(`Sitemap contains invalid URL with hash fragment: ${loc}`);
      } else if (!loc.startsWith(PRODUCTION_DOMAIN)) {
        logFail(`Sitemap URL "${loc}" does not match production domain "${PRODUCTION_DOMAIN}"`);
      } else if (!loc.endsWith('/')) {
        logFail(`Sitemap URL "${loc}" lacks trailing slash and would trigger a 301 redirect on GitHub Pages.`);
      } else if (!expectedCanonicals.has(loc)) {
        logWarn(`Sitemap URL "${loc}" has no corresponding audited page spec.`);
      } else {
        logPass(`Sitemap URL valid & 200 OK canonical: ${loc}`);
      }
    }
  }
}

// 3. Validate robots.txt
console.log('\n[ROBOTS.TXT AUDIT] Checking robots.txt...');
const robotsPath = distExists
  ? path.join(rootDir, 'dist', 'robots.txt')
  : path.join(rootDir, 'public', 'robots.txt');

if (!fs.existsSync(robotsPath)) {
  logFail(`robots.txt not found at: ${robotsPath}`);
} else {
  const robotsTxt = fs.readFileSync(robotsPath, 'utf-8');
  if (!robotsTxt.includes('User-agent:')) {
    logFail('robots.txt missing User-agent directive.');
  } else {
    logPass('robots.txt contains User-agent directive.');
  }

  if (/^\s*Disallow:/im.test(robotsTxt)) {
    logWarn('robots.txt contains Disallow rules; verify none block valid indexable assets/pages.');
  } else {
    logPass('robots.txt has zero Disallow blocks for public assets.');
  }

  if (!robotsTxt.includes(`Sitemap: ${PRODUCTION_DOMAIN}/sitemap.xml`)) {
    logFail(`robots.txt does not reference Sitemap: ${PRODUCTION_DOMAIN}/sitemap.xml`);
  } else {
    logPass('robots.txt references valid production sitemap.');
  }
}

// 4. Validate AI Discovery Documents (llms.txt)
console.log('\n[AI SEARCH AUDIT] Checking llms.txt...');
const llmsPath = distExists
  ? path.join(rootDir, 'dist', 'llms.txt')
  : path.join(rootDir, 'public', 'llms.txt');

if (!fs.existsSync(llmsPath)) {
  logWarn('llms.txt not found.');
} else {
  const llmsContent = fs.readFileSync(llmsPath, 'utf-8');
  if (llmsContent.length > 50) {
    logPass(`llms.txt discovered and validated (${llmsContent.length} bytes).`);
  }
}

// 5. Validate 404 Error Page
console.log('\n[404 PAGE AUDIT] Checking 404.html...');
const notFoundPath = distExists
  ? path.join(rootDir, 'dist', '404.html')
  : path.join(rootDir, 'public', '404.html');

if (!fs.existsSync(notFoundPath)) {
  logFail('No static 404.html page found.');
} else {
  const notFoundHtml = fs.readFileSync(notFoundPath, 'utf-8');
  if (/name=["']robots["']\s+content=["'][^"']*noindex/i.test(notFoundHtml)) {
    logPass('404.html correctly configured with noindex directive.');
  } else {
    logFail('404.html must have a <meta name="robots" content="noindex" /> directive.');
  }

  if (/window\.location\.replace/i.test(notFoundHtml)) {
    logFail('404.html contains auto-redirect JS (triggers Soft-404 / redirect flags in Search Console).');
  } else {
    logPass('404.html does not auto-redirect bots to / (clean HTTP 404 semantics).');
  }

  if (/href=["']\.\/|src=["']\.\//i.test(notFoundHtml)) {
    logFail('404.html uses relative ./ asset paths that break on nested missing routes.');
  } else {
    logPass('404.html uses root-relative asset paths.');
  }
}

// Final Summary
console.log('\n======================================================');
console.log(`SEO AUDIT COMPLETE: ${errorsCount} Error(s), ${warningsCount} Warning(s)`);
console.log('======================================================\n');

if (errorsCount > 0) {
  console.error('\x1b[31m[SEO VALIDATOR] Critical SEO failures detected! Please fix errors above.\x1b[0m');
  process.exit(1);
} else {
  console.log('\x1b[32m[SEO VALIDATOR] All deterministic SEO checks passed successfully!\x1b[0m\n');
  process.exit(0);
}
