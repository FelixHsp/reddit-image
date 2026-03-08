import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const url = process.env.URL || 'http://127.0.0.1:4176/';
const jsonPath = process.env.JSON_PATH || path.resolve('input-thread.json');
const outDir = process.env.OUT_DIR || path.resolve('exports');

fs.mkdirSync(outDir, { recursive: true });
const payload = fs.readFileSync(jsonPath, 'utf8');

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ acceptDownloads: true });
const page = await context.newPage();

await page.goto(url, { waitUntil: 'networkidle' });
await page.locator('textarea').fill(payload);
await page.getByRole('button', { name: 'Load Data' }).click();

const [download] = await Promise.all([
  page.waitForEvent('download', { timeout: 120000 }),
  page.getByRole('button', { name: /Export All as ZIP|Exporting/ }).click()
]);

const fileName = download.suggestedFilename() || 'reddit-images.zip';
const outPath = path.join(outDir, `auto-${Date.now()}-${fileName}`);
await download.saveAs(outPath);

console.log(outPath);
await browser.close();
