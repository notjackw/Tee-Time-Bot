const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  const apiCalls = [];
  page.on('response', async (res) => {
    const url = res.url();
    if (url.includes('/api/')) {
      apiCalls.push(`${res.status()} ${res.request().method()} ${url}`);
    }
  });

  console.log('=== First load ===');
  await page.goto('https://georgewright.cps.golf/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(4000);
  console.log('cookies:', (await context.cookies()).map(c => c.name).join(', '));
  console.log(apiCalls.join('\n'));

  console.log('=== Reload (clearance cookie should now be set) ===');
  apiCalls.length = 0;
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForTimeout(5000);
  console.log('cookies:', (await context.cookies()).map(c => c.name).join(', '));
  console.log(apiCalls.join('\n'));

  await page.screenshot({ path: '/private/tmp/claude-501/-Users-jackwilliams-Hello-World-golfbot/a8304d72-7a0f-434c-911c-46de457aaa29/scratchpad/gw-reload.png', fullPage: true });

  const bodyText = await page.evaluate(() => document.body.innerText);
  console.log('--- BODY TEXT after reload ---');
  console.log(bodyText.slice(0, 1500));

  await browser.close();
})();
