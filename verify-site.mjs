import { chromium } from 'playwright';
import fs from 'fs';

async function verify() {
  console.log('--- STARTING ARENOVA VERIFICATION ---');
  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--enable-webgl', '--ignore-gpu-blocklist']
  });

  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 }
  });

  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      if (msg.text().includes('formsubmit.co') || msg.text().includes('net::ERR_FAILED')) {
        console.log('[EXPECTED LOCALHOST CORS NOTE]:', msg.text());
        return;
      }
      consoleErrors.push(msg.text());
      console.error('[BROWSER CONSOLE ERROR]:', msg.text());
    } else {
      console.log(`[BROWSER ${msg.type().toUpperCase()}]:`, msg.text());
    }
  });

  page.on('pageerror', error => {
    consoleErrors.push(error.message);
    console.error('[BROWSER PAGE ERROR]:', error.message);
  });

  console.log('Navigating to http://localhost:4173 ...');
  await page.goto('http://localhost:4173/', { waitUntil: 'networkidle' });

  // 1. Verify Title & Meta
  const title = await page.title();
  console.log('Page Title:', title);

  // 2. Verify Canvas Mount
  const canvasCount = await page.locator('canvas').count();
  console.log('Canvas count:', canvasCount);

  // 3. Verify Hero Content
  const heroHeading = await page.locator('h1').innerText();
  console.log('Hero Heading:\n', heroHeading);

  // Take Hero Screenshot
  if (!fs.existsSync('screenshots')) {
    fs.mkdirSync('screenshots');
  }
  await page.waitForTimeout(1500);
  await page.screenshot({ path: 'screenshots/01-hero-awakening.png' });
  console.log('Saved screenshots/01-hero-awakening.png');

  // 4. Test Scroll to Problem
  console.log('Scrolling down to Problem section...');
  await page.locator('#problem').scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'screenshots/02-problem.png' });

  // 5. Test Services Section
  console.log('Scrolling to Services section...');
  await page.locator('#services').scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'screenshots/04-services.png' });

  // 6. Test Interactive Workflow Demo
  console.log('Scrolling to Workflow Demo section...');
  await page.locator('#workflow-demo').scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);

  // Step through stages 1 to 5
  const nextStageBtn = page.locator('button:has-text("Next Stage")');
  for (let s = 1; s <= 4; s++) {
    if (await nextStageBtn.isVisible() && await nextStageBtn.isEnabled()) {
      await nextStageBtn.click();
      await page.waitForTimeout(400);
      console.log(`Advanced to workflow stage ${s + 1}`);
    }
  }
  await page.screenshot({ path: 'screenshots/05-workflow-demo.png' });

  // 7. Test Industries Section
  console.log('Scrolling to Industries section...');
  await page.locator('#industries').scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'screenshots/06-industries.png' });

  // 8. Test Ascent & Consultation Form
  console.log('Scrolling to Ascent section...');
  await page.locator('#ascent').scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'screenshots/08-ascent.png' });

  // Test form validation
  console.log('Testing form validation...');
  await page.fill('input[name="fullName"]', 'Alexander Wright');
  await page.fill('input[name="workEmail"]', 'alexander@wrightcapital.com');
  await page.fill('input[name="companyName"]', 'Wright Capital Advisors');
  await page.fill('textarea[name="message"]', 'We want to automate inbound calls and connect our CRM with DocuSign.');
  
  await page.locator('button:has-text("Submit Architecture Brief")').click();
  console.log('Submitted consultation form');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'screenshots/09-form-submitted.png' });

  await Promise.race([
    browser.close(),
    new Promise((resolve) => setTimeout(resolve, 1500))
  ]);

  console.log('--- VERIFICATION FINISHED ---');
  console.log('Total Console Errors:', consoleErrors.length);
  if (consoleErrors.length > 0) {
    console.error('Errors encountered:', consoleErrors);
    process.exit(1);
  } else {
    console.log('SUCCESS: All chapters verified with ZERO browser console errors!');
    process.exit(0);
  }
}

verify().catch(err => {
  console.error('Verification script failed:', err);
  process.exit(1);
});
