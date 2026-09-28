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
          websiteTypeCards: document.querySelectorAll('#website-types .website-type-card').length,
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
              outputDisplay: firstCard ? getComputedStyle(firstCard.querySelector('.service-card__outputs')).display : null,
              outputItems: firstCard ? Array.from(firstCard.querySelectorAll('.service-card__outputs li')).map((item) => Math.round(item.getBoundingClientRect().width)) : [],
            };
          });
          if (viewport.width === 390 && serviceMetrics.categoryTextAlign !== 'center') {
            throw new Error('Expected centered service category heading at 390px.');
          }
          if (viewport.width === 390 && serviceMetrics.outputDisplay !== 'flex') {
            throw new Error('Expected horizontal flex service outputs at 390px.');
          }

          const serviceFilePath = `${outputRoot}/${viewport.width}/services.png`;
          await page.screenshot({ path: serviceFilePath, fullPage: false });
          metrics.serviceFocus = { ...serviceMetrics, filePath: serviceFilePath };

          if (metrics.websiteTypeCards !== 6) {
            throw new Error(`Expected six website type cards at ${viewport.width}px.`);
          }
          const typeCards = page.locator('#website-types .website-type-card');
          await typeCards.nth(4).locator('button').click();
          await page.waitForTimeout(100);
          let builder = page.locator('#website-type-builder');
          if (!await builder.getAttribute('class').then((value) => value?.includes('is-modal')) || await builder.locator('.website-type-builder__backdrop').count() !== 1 || await builder.locator('.website-type-builder__close').count() !== 1) {
            throw new Error(`Expected a focused modal with backdrop and close button at ${viewport.width}px.`);
          }
          const modalGeometry = await builder.evaluate((element) => {
            const dialog = element.querySelector('.website-type-builder__dialog')?.getBoundingClientRect();
            const input = element.querySelector('input')?.getBoundingClientRect();
            const header = document.querySelector('header')?.getBoundingClientRect();
            return { dialogWidth: dialog?.width ?? 0, dialogHeight: dialog?.height ?? 0, dialogTop: dialog?.top ?? -1, inputTop: input?.top ?? -1, inputHeight: input?.height ?? 0, headerBottom: header?.bottom ?? 0 };
          });
          if (modalGeometry.dialogWidth < 280 || modalGeometry.dialogHeight < 240 || modalGeometry.inputTop < 0 || modalGeometry.inputHeight < 20 || modalGeometry.dialogTop < modalGeometry.headerBottom - 1) {
            throw new Error(`Modal opened without a visible input surface at ${viewport.width}px.`);
          }
          await builder.locator('[data-builder-step="3"]').click();
          const bookingMetrics = await builder.evaluate((element) => ({
            selectedCode: element.querySelector('.canva-kicker')?.textContent ?? null,
            defaultCorePages: element.querySelectorAll('.website-type-builder__options--pages input:checked').length,
          }));
          await builder.locator('[data-builder-step="4"]').click();
          const hasBookingPayment = await builder.textContent().then((text) => text?.includes('دفع مقدم أو عربون') ?? false);
          if (!bookingMetrics.selectedCode?.includes('WEB-05') || bookingMetrics.defaultCorePages < 5 || !hasBookingPayment) {
            throw new Error(`Type-specific booking brief options did not update at ${viewport.width}px.`);
          }
          await builder.locator('.website-type-builder__backdrop').dispatchEvent('click');
          if ((await builder.getAttribute('class'))?.includes('is-modal')) {
            throw new Error(`Backdrop click did not close the modal at ${viewport.width}px.`);
          }
          await typeCards.nth(1).locator('button').click();
          await page.waitForTimeout(120);
          builder = page.locator('#website-type-builder');
          const builderMetrics = await builder.evaluate((element) => ({
            selectedCode: element.querySelector('.canva-kicker')?.textContent ?? null,
            stepCount: element.querySelectorAll('[data-builder-step]').length,
            hasLegacyServicesHeading: element.textContent?.includes('الخدمات التي تريد مناقشتها') ?? false,
            isModal: element.classList.contains('is-modal'),
          }));
          if (!builderMetrics.selectedCode?.includes('WEB-02') || builderMetrics.stepCount !== 5 || builderMetrics.hasLegacyServicesHeading || !builderMetrics.isModal) {
            throw new Error(`Website type builder did not initialize correctly at ${viewport.width}px.`);
          }
          await builder.locator('[data-builder-step="3"]').click();
          const corePageMetrics = await builder.evaluate((element) => ({
            corePageOptions: element.querySelectorAll('.website-type-builder__options--pages input').length,
            defaultCorePages: element.querySelectorAll('.website-type-builder__options--pages input:checked').length,
          }));
          await builder.locator('[data-builder-step="4"]').click();
          const featureOptions = await builder.locator('.website-type-builder__feature-options input').count();
          await builder.locator('.website-type-builder__show-more').click();
          const expandedFeatureOptions = await builder.locator('.website-type-builder__feature-options input').count();
          if (corePageMetrics.corePageOptions < 5 || corePageMetrics.defaultCorePages < 5 || featureOptions !== 4 || expandedFeatureOptions <= featureOptions) {
            throw new Error(`Core pages or optional features did not initialize at ${viewport.width}px.`);
          }
          await builder.locator('[data-builder-step="1"]').click();
          await builder.locator('.website-type-builder__step-button').last().click();
          const missingBriefError = await builder.locator('.website-type-builder__error').count();
          if (missingBriefError !== 1) {
            throw new Error(`Incomplete brief did not show required-field feedback at ${viewport.width}px.`);
          }
          const identityFields = builder.locator('.website-type-builder__field input[required]');
          for (let index = 0; index < await identityFields.count(); index += 1) await identityFields.nth(index).fill(`هوية اختبار ${index + 1}`);
          await builder.locator('[data-builder-step="2"]').click();
          const typeFields = builder.locator('.website-type-builder__field input[required], .website-type-builder__field textarea[required]');
          for (let index = 0; index < await typeFields.count(); index += 1) await typeFields.nth(index).fill(`تفصيل اختبار ${index + 1}`);
          await builder.locator('[data-builder-step="4"]').click();
          await builder.locator('.website-type-builder__feature-options input').first().check();
          await builder.locator('[data-builder-step="5"]').click();
          const updatedWhatsappHref = await builder.locator('.website-type-builder__submit').getAttribute('href');
          if (!updatedWhatsappHref?.includes('wa.me/')) {
            throw new Error(`Completed brief did not enable the WhatsApp handoff at ${viewport.width}px.`);
          }
          await builder.scrollIntoViewIfNeeded();
          await page.waitForTimeout(150);
          const websiteTypesFilePath = `${outputRoot}/${viewport.width}/website-types.png`;
          await page.screenshot({ path: websiteTypesFilePath, fullPage: false });
          metrics.websiteTypeFocus = { ...builderMetrics, ...corePageMetrics, featureOptions, expandedFeatureOptions, completedBriefMessage: true, filePath: websiteTypesFilePath };
          await page.keyboard.press('Escape');
          if ((await builder.getAttribute('class'))?.includes('is-modal')) {
            throw new Error(`Escape did not close the modal at ${viewport.width}px.`);
          }
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
