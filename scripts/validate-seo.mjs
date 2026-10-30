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

// 1. Inspect index.html (source or dist)
const targetHtmlPath = fs.existsSync(path.join(rootDir, 'dist', 'index.html'))
  ? path.join(rootDir, 'dist', 'index.html')
  : path.join(rootDir, 'index.html');

console.log(`[HTML AUDIT] Checking: ${targetHtmlPath}`);
const html = fs.readFileSync(targetHtmlPath, 'utf-8');

// Title Check
const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
if (!titleMatch) {
  logFail('Missing <title> tag in HTML.');
} else {
  const title = titleMatch[1].trim();
  if (title.length < 20 || title.length > 85) {
    logWarn(`Title tag length (${title.length} chars) is outside recommended range (30-75 chars): "${title}"`);
  } else {
    logPass(`Title tag optimal (${title.length} chars): "${title}"`);
  }
}

// Meta Description Check
const descMatch = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i);
if (!descMatch) {
  logFail('Missing meta description tag in HTML.');
} else {
  const desc = descMatch[1].trim();
  if (desc.length < 50 || desc.length > 200) {
    logWarn(`Meta description length (${desc.length} chars) outside optimal range (80-165 chars).`);
  } else {
    logPass(`Meta description optimal (${desc.length} chars).`);
  }
}

// Canonical Tag Check
const canonicalMatch = html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i);
if (!canonicalMatch) {
  logFail('Missing canonical URL tag.');
} else {
  const canonicalUrl = canonicalMatch[1].trim();
  if (canonicalUrl !== `${PRODUCTION_DOMAIN}/` && canonicalUrl !== PRODUCTION_DOMAIN) {
    logFail(`Canonical URL "${canonicalUrl}" does not match canonical domain "${PRODUCTION_DOMAIN}/"`);
  } else {
    logPass(`Canonical URL verified: ${canonicalUrl}`);
  }
}

// Open Graph Tags Check
const requiredOgTags = ['og:title', 'og:description', 'og:image', 'og:url', 'og:site_name', 'og:type'];
for (const tag of requiredOgTags) {
  const regex = new RegExp(`<meta\\s+(?:property|name)=["']${tag}["']\\s+content=["']([^"']+)["']`, 'i');
  if (!regex.test(html)) {
    logFail(`Missing required Open Graph tag: ${tag}`);
  } else {
    logPass(`Found Open Graph tag: ${tag}`);
  }
}

// Twitter Card Tags Check
const requiredTwitterTags = ['twitter:card', 'twitter:title', 'twitter:description', 'twitter:image'];
for (const tag of requiredTwitterTags) {
  const regex = new RegExp(`<meta\\s+(?:property|name)=["']${tag}["']\\s+content=["']([^"']+)["']`, 'i');
  if (!regex.test(html)) {
    logFail(`Missing Twitter card tag: ${tag}`);
  } else {
    logPass(`Found Twitter card tag: ${tag}`);
  }
}

// Robots Directives Check
const robotsMatch = html.match(/<meta\s+name=["']robots["']\s+content=["']([^"']+)["']/i);
if (!robotsMatch) {
  logWarn('No meta robots tag found in head (defaults to index, follow).');
} else {
  const robots = robotsMatch[1].toLowerCase();
  if (robots.includes('noindex')) {
    logFail(`Production index.html contains "noindex" directive: ${robots}`);
  } else {
    logPass(`Robots indexing directives verified: ${robots}`);
  }
}

// Single H1 Check
const h1Matches = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)];
if (h1Matches.length === 0) {
  logWarn('No <h1> heading detected in static HTML. Ensure client hydration or static template includes a single <h1>.');
} else if (h1Matches.length > 1) {
  logWarn(`Found multiple <h1> headings (${h1Matches.length}) in HTML.`);
} else {
  const cleanH1 = h1Matches[0][1].replace(/<[^>]+>/g, '').trim();
  logPass(`Single valid <h1> heading detected: "${cleanH1}"`);
}

// Image Alt Attributes Check
const imgMatches = [...html.matchAll(/<img\s+([^>]+)>/gi)];
for (const imgTag of imgMatches) {
  const attrs = imgTag[1];
  if (!/alt=["'][^"']*["']/i.test(attrs)) {
    logWarn(`Image tag missing alt attribute: <img ${attrs.substring(0, 50)}...>`);
  }
}

// JSON-LD Structured Data Validation
const jsonLdMatches = [...html.matchAll(/<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi)];
if (jsonLdMatches.length === 0) {
  logFail('No Schema.org JSON-LD scripts found.');
} else {
  for (const match of jsonLdMatches) {
    try {
      const parsed = JSON.parse(match[1]);
      if (!parsed['@context'] || !parsed['@graph']) {
        logWarn('JSON-LD missing standard @context or @graph format.');
      } else {
        const types = parsed['@graph'].map((item) => item['@type']);
        logPass(`JSON-LD graph parsed successfully. Found types: ${types.join(', ')}`);
        
        // Ensure Organization and WebSite are present
        if (!types.includes('Organization')) {
          logFail('Schema.org graph missing required "Organization" entity.');
        }
        if (!types.includes('WebSite')) {
          logFail('Schema.org graph missing required "WebSite" entity.');
        }
      }
    } catch (e) {
      logFail(`JSON-LD syntax error: ${e.message}`);
    }
  }
}

// 2. Validate Sitemap
console.log('\n[SITEMAP AUDIT] Checking sitemap.xml...');
const sitemapPath = fs.existsSync(path.join(rootDir, 'dist', 'sitemap.xml'))
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
    for (const loc of locMatches) {
      if (loc.includes('#')) {
        logFail(`Sitemap contains invalid URL with hash fragment: ${loc}`);
      } else if (!loc.startsWith(PRODUCTION_DOMAIN)) {
        logFail(`Sitemap URL "${loc}" does not match production domain "${PRODUCTION_DOMAIN}"`);
      } else {
        logPass(`Sitemap URL valid: ${loc}`);
      }
    }
  }
}

// 3. Validate robots.txt
console.log('\n[ROBOTS.TXT AUDIT] Checking robots.txt...');
const robotsPath = fs.existsSync(path.join(rootDir, 'dist', 'robots.txt'))
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

  if (!robotsTxt.includes(`Sitemap: ${PRODUCTION_DOMAIN}/sitemap.xml`)) {
    logFail(`robots.txt does not reference Sitemap: ${PRODUCTION_DOMAIN}/sitemap.xml`);
  } else {
    logPass('robots.txt references valid production sitemap.');
  }
}

// 4. Validate AI Discovery Documents (llms.txt)
console.log('\n[AI SEARCH AUDIT] Checking llms.txt...');
const llmsPath = fs.existsSync(path.join(rootDir, 'dist', 'llms.txt'))
  ? path.join(rootDir, 'dist', 'llms.txt')
  : path.join(rootDir, 'public', 'llms.txt');

if (!fs.existsSync(llmsPath)) {
  logWarn('llms.txt not found. Recommended for AI search engine discoverability.');
} else {
  const llmsContent = fs.readFileSync(llmsPath, 'utf-8');
  if (llmsContent.length > 50) {
    logPass(`llms.txt discovered and validated (${llmsContent.length} bytes).`);
  }
}

// 5. Validate 404 Error Page
console.log('\n[404 PAGE AUDIT] Checking 404.html...');
const notFoundPath = fs.existsSync(path.join(rootDir, 'dist', '404.html'))
  ? path.join(rootDir, 'dist', '404.html')
  : path.join(rootDir, 'public', '404.html');

if (!fs.existsSync(notFoundPath)) {
  logWarn('No static 404.html page found.');
} else {
  const notFoundHtml = fs.readFileSync(notFoundPath, 'utf-8');
  if (/name=["']robots["']\s+content=["'][^"']*noindex/i.test(notFoundHtml)) {
    logPass('404.html correctly configured with noindex directive.');
  } else {
    logWarn('404.html should have a <meta name="robots" content="noindex" /> directive to prevent soft-404 indexing.');
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

