import { chromium } from 'playwright';
import fs from 'fs';

async function verifyMobile() {
  console.log('--- STARTING MOBILE VIEWPORT VERIFICATION ---');
  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--enable-webgl', '--ignore-gpu-blocklist']
  });

  const page = await browser.newPage({
    viewport: { width: 390, height: 844 }, // iPhone 14 / standard mobile viewport
    isMobile: true,
    hasTouch: true,
  });

  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });

  await page.goto('http://localhost:4173/', { waitUntil: 'networkidle' });

  if (!fs.existsSync('screenshots/mobile')) {
    fs.mkdirSync('screenshots/mobile', { recursive: true });
  }

  // 1. Mobile Hero
  await page.screenshot({ path: 'screenshots/mobile/01-hero-mobile.png' });
  console.log('Saved screenshots/mobile/01-hero-mobile.png');

  // 2. Open Mobile Menu
  const menuBtn = page.locator('button[aria-label="Toggle menu"]');
  if (await menuBtn.isVisible()) {
    await menuBtn.click();
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'screenshots/mobile/02-menu-open-mobile.png' });
    console.log('Saved screenshots/mobile/02-menu-open-mobile.png');
    // Close menu by clicking a link in drawer
    await page.getByRole('button', { name: 'System Demo', exact: true }).click();
    await page.waitForTimeout(800);
  }

  // 3. Mobile Workflow Demo
  await page.screenshot({ path: 'screenshots/mobile/03-workflow-mobile.png' });
  console.log('Saved screenshots/mobile/03-workflow-mobile.png');

  // 4. Mobile Ascent / Form
  await page.locator('#ascent').scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'screenshots/mobile/04-ascent-mobile.png' });
  console.log('Saved screenshots/mobile/04-ascent-mobile.png');

  await browser.close();

  console.log('Mobile verification finished with', consoleErrors.length, 'errors.');
}

verifyMobile().catch(err => {
  console.error('Mobile verification failed:', err);
  process.exit(1);
});
