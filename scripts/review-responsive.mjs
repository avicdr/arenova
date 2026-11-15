import { chromium } from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';

const baseUrl = process.argv[2] || 'http://127.0.0.1:5173';
const outputDir = path.resolve('screenshots', 'review');
const routes = [
  { name: 'home', path: '/' },
  { name: 'pricing', path: '/pricing/' },
  { name: 'about', path: '/about/' },
];
const sizes = [
  { name: 'mobile', width: 390, height: 844 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1440, height: 900 },
];

await fs.mkdir(outputDir, { recursive: true });
const browser = await chromium.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

const report = [];
for (const size of sizes) {
  const context = await browser.newContext({ viewport: size, reducedMotion: 'reduce' });
  for (const route of routes) {
    const page = await context.newPage();
    const errors = [];
    page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto(`${baseUrl}${route.path}`, { waitUntil: 'domcontentloaded', timeout: 30_000 });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(250);
    const metrics = await page.evaluate(() => ({
      title: document.title,
      h1: document.querySelector('h1')?.textContent?.trim(),
      horizontalOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      smallTargets: [...document.querySelectorAll('a, button, input, select, textarea')]
        .filter((element) => {
          const rect = element.getBoundingClientRect();
          const style = getComputedStyle(element);
          return style.display !== 'none' && style.visibility !== 'hidden' && rect.width > 0 && (rect.height < 44 || rect.width < 44);
        }).map((element) => {
          const rect = element.getBoundingClientRect();
          return `${element.tagName.toLowerCase()}:${element.textContent?.trim().slice(0, 28) || element.getAttribute('aria-label') || element.getAttribute('name')}@${Math.round(rect.width)}x${Math.round(rect.height)}`;
        }).slice(0, 20),
    }));
    await page.screenshot({ path: path.join(outputDir, `${route.name}-${size.name}.png`), fullPage: true });
    report.push({ route: route.path, size: size.name, ...metrics, errors });
    await page.close();
  }
  await context.close();
}

const mobile = await browser.newPage({ viewport: sizes[0] });
await mobile.goto(`${baseUrl}/`, { waitUntil: 'domcontentloaded' });
if (await mobile.locator('.menu-toggle').count()) {
  await mobile.locator('.menu-toggle').click();
  await mobile.waitForTimeout(150);
  await mobile.screenshot({ path: path.join(outputDir, 'home-mobile-menu.png') });
  await mobile.locator('.menu-toggle').click();
  await mobile.locator('#contact').scrollIntoViewIfNeeded();
  await mobile.locator('.form-submit').click();
  const validationErrors = await mobile.locator('.field-error').count();
  report.push({ route: '/', size: 'mobile-interactions', validationErrors });
} else {
  report.push({ route: '/', size: 'mobile-interactions', error: 'Menu toggle did not render', body: (await mobile.locator('body').innerText()).slice(0, 500) });
}
await mobile.close();

await browser.close();
await fs.writeFile(path.join(outputDir, 'report.json'), JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
