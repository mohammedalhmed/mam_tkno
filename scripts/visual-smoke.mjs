import { mkdir, rm, writeFile } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import { setTimeout as wait } from 'node:timers/promises';
import { chromium } from 'playwright';

const projectRoot = new URL('..', import.meta.url).pathname;
const outputRoot = `${projectRoot}artifacts/visual`;
const port = Number(process.env.VISUAL_PORT ?? 4173);
const baseUrl = process.env.VISUAL_BASE_URL ?? `http://127.0.0.1:${port}`;
const viewports = [
  { width: 390, height: 844 },
  { width: 768, height: 1024 },
];
const routes = [
  { name: 'home', path: '/' },
  { name: 'bellabox-case-study', path: '/case-studies/bellabox' },
];

let serverProcess;

const log = (message) => console.log(`[visual-smoke] ${message}`);

async function waitForServer(url, timeoutMs = 15_000) {
  const startedAt = Date.now();
  while (Date.now() - startedAt < timeoutMs) {
    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch {
      // The dev server is still starting.
    }
    await wait(250);
  }
  throw new Error(`Timed out waiting for ${url}`);
}

function startLocalServer() {
  if (process.env.VISUAL_BASE_URL) return;
  serverProcess = spawn('pnpm', ['exec', 'vite', '--host', '127.0.0.1', '--port', String(port)], {
    cwd: projectRoot,
    stdio: ['ignore', 'pipe', 'pipe'],
    detached: true,
  });
  serverProcess.stdout.on('data', (chunk) => process.stdout.write(`[visual-server] ${chunk}`));
  serverProcess.stderr.on('data', (chunk) => process.stderr.write(`[visual-server] ${chunk}`));
}

async function main() {
  await rm(outputRoot, { recursive: true, force: true });
  await mkdir(outputRoot, { recursive: true });

  startLocalServer();
  await waitForServer(baseUrl);

  const browser = await chromium.launch({
    executablePath: process.env.CHROMIUM_PATH ?? '/usr/bin/chromium',
    headless: true,
    args: ['--no-sandbox', '--disable-dev-shm-usage'],
  });

  const results = [];
  try {
    for (const viewport of viewports) {
      for (const route of routes) {
        const page = await browser.newPage({ viewport });
        const url = `${baseUrl}${route.path}`;
        await page.goto(url, { waitUntil: 'networkidle' });
        await page.evaluate(() => document.fonts?.ready);
        await page.waitForTimeout(250);

        const importantImage = route.name === 'home'
          ? page.locator('.project-media__image').first()
          : page.locator('.case-study-work img').first();
        if (await importantImage.count()) {
          await importantImage.scrollIntoViewIfNeeded();
          await page.waitForTimeout(250);
          const loaded = await importantImage.evaluate((image) => image.complete && image.naturalWidth > 0);
          if (!loaded) throw new Error(`Important project image did not load for ${route.path} at ${viewport.width}px.`);
        }
        await page.evaluate(() => window.scrollTo(0, 0));
        await page.waitForTimeout(150);

        const metrics = await page.evaluate(() => ({
          viewport: window.innerWidth,
          scrollWidth: document.documentElement.scrollWidth,
          bodyWidth: document.body.scrollWidth,
          serviceCards: document.querySelectorAll('#services .service-card').length,
          firstProjectImagePosition: document.querySelector('.project-media__image')
            ? getComputedStyle(document.querySelector('.project-media__image')).objectPosition
            : null,
        }));

        if (metrics.scrollWidth > metrics.viewport || metrics.bodyWidth > metrics.viewport) {
          throw new Error(`${route.path} at ${viewport.width}px has horizontal overflow (${metrics.scrollWidth}px / ${metrics.bodyWidth}px).`);
        }

        if (route.name === 'home') {
          const firstServiceCard = page.locator('#services .service-card').first();
          await firstServiceCard.scrollIntoViewIfNeeded();
          await page.waitForTimeout(650);
          const revealedCards = await page.locator('#services .service-card.is-visible').count();
          if (metrics.serviceCards < 1 || revealedCards < 1) {
            throw new Error(`Expected service cards and reveal state at ${viewport.width}px.`);
          }

          const serviceMetrics = await page.evaluate(() => {
            const category = document.querySelector('#services .service-system__category-info');
            const firstCard = document.querySelector('#services .service-card');
            return {
              categoryTextAlign: category ? getComputedStyle(category).textAlign : null,
              categoryWidth: category ? Math.round(category.getBoundingClientRect().width) : null,
              firstCardWidth: firstCard ? Math.round(firstCard.getBoundingClientRect().width) : null,
            };
          });
          if (viewport.width === 390 && serviceMetrics.categoryTextAlign !== 'center') {
            throw new Error('Expected centered service category heading at 390px.');
          }

          const serviceFilePath = `${outputRoot}/${viewport.width}/services.png`;
          await page.screenshot({ path: serviceFilePath, fullPage: false });
          metrics.serviceFocus = { ...serviceMetrics, filePath: serviceFilePath };
        }

        const filePath = `${outputRoot}/${viewport.width}/${route.name}.png`;
        await mkdir(filePath.slice(0, filePath.lastIndexOf('/')), { recursive: true });
        await page.screenshot({ path: filePath, fullPage: true });
        results.push({ viewport: `${viewport.width}x${viewport.height}`, route: route.path, filePath, ...metrics });
        await page.close();
      }
    }
  } finally {
    await browser.close();
    if (serverProcess?.pid) {
      try {
        process.kill(-serverProcess.pid, 'SIGTERM');
      } catch {
        serverProcess.kill('SIGTERM');
      }
    }
  }

  const reportPath = `${outputRoot}/report.json`;
  await writeFile(reportPath, `${JSON.stringify({ baseUrl, results }, null, 2)}\n`);
  log(`passed ${results.length} viewport/route checks`);
  results.forEach((result) => log(`${result.viewport} ${result.route} -> ${result.filePath}`));
  log(`report -> ${reportPath}`);
}

main().catch((error) => {
  console.error(`[visual-smoke] failed: ${error.message}`);
  if (serverProcess?.pid) {
    try {
      process.kill(-serverProcess.pid, 'SIGTERM');
    } catch {
      serverProcess.kill('SIGTERM');
    }
  }
  process.exitCode = 1;
});
