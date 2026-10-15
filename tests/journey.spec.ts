import { expect, test, type Page } from '@playwright/test';
import { questions } from '../src/data/questions';

const storageKey = 'arcana-mbti:progress';
const levelQuestions = (level: number) => questions.filter(q => q.levelId === level);
async function noOverflow(page: Page) { expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true); }
const group = (page: Page, question: { statement: string }) => page.getByRole('radiogroup', { name: `“${question.statement}”`, exact: true });

test('complete journey, persistence, revision, collection and confirmed reset', async ({ page }) => {
  const runtimeErrors: string[] = [];
  page.on('pageerror', error => runtimeErrors.push(error.message));
  await page.goto('/');
  await expect(page.getByRole('heading', { name: /Kenali Dirimu/ })).toBeVisible();
  await page.getByRole('link', { name: 'Mulai Tes', exact: true }).first().click();
  await expect(page).toHaveURL(/\/levels$/);
  await expect(page.getByRole('button', { name: /Selesaikan Level/ })).toHaveCount(3);
  for (const route of ['/test/2', '/test/0', '/test/nope', '/result']) { await page.goto(route); await expect(page).toHaveURL(/\/levels$/); }
  await page.getByRole('link', { name: 'Mainkan Level' }).click();
  const level1 = levelQuestions(1);
  await expect(page.getByTestId('question-item')).toHaveCount(level1.length);
  await expect(page.getByRole('button', { name: 'Selesaikan Level', exact: true })).toBeDisabled();
  await group(page, level1[0]).getByRole('radio', { name: '3 — Netral', exact: true }).click();
  await page.reload();
  await expect(group(page, level1[0]).getByRole('radio', { name: '3 — Netral', exact: true })).toBeChecked();
  await group(page, level1[0]).getByRole('radio', { name: '5 — Sangat Sesuai', exact: true }).click();
  await expect(group(page, level1[0]).getByRole('radio', { name: '5 — Sangat Sesuai', exact: true })).toBeChecked();
  await group(page, level1[0]).getByRole('radio', { name: '3 — Netral', exact: true }).click();
  for (let level = 1; level <= 4; level++) {
    const bank = levelQuestions(level);
    await expect(page.getByTestId('question-item')).toHaveCount(bank.length);
    for (const question of bank) await group(page, question).getByRole('radio', { name: '3 — Netral', exact: true }).click();
    await page.getByRole('button', { name: 'Selesaikan Level', exact: true }).click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(page.getByRole('heading', { name: `Level ${level} Selesai!` })).toBeVisible();
    if (level < 4) {
      await page.getByRole('link', { name: 'Lihat Perjalanan', exact: true }).click(); await page.reload();
      const nextCard = page.getByRole('article', { name: new RegExp(`Level ${level + 1}:`) });
      await expect(nextCard.getByRole('link', { name: 'Mainkan Level' })).toBeVisible();
      await nextCard.getByRole('link', { name: 'Mainkan Level' }).click();
    } else await page.getByRole('link', { name: 'Buka Kartu MBTI-mu', exact: true }).click();
  }
  await expect(page).toHaveURL(/\/result$/);
  await expect(page.getByRole('heading', { name: 'Sang Komandan (ENTJ)' })).toBeVisible();
  await expect(page.locator('.flip-stage')).toHaveClass(/is-revealed/);
  await expect(page.getByAltText('Kartu hasil MBTI ENTJ — Sang Komandan')).toHaveAttribute('src', /ENTJ/);
  await expect(page.getByTestId('score-EI')).toContainText('50%');
  await page.reload(); await expect(page.getByRole('heading', { name: 'Sang Komandan (ENTJ)' })).toBeVisible();
  await page.getByRole('link', { name: 'Lihat Kartu Tipe Lain', exact: true }).click();
  await expect(page.locator('.collection-grid .collection-card')).toHaveCount(16);
  await page.getByRole('button', { name: 'Diplomat', exact: true }).click();
  await expect(page.locator('.collection-grid .collection-card')).toHaveCount(4);
  await page.getByRole('link', { name: 'Lihat INFJ — Sang Advokat', exact: true }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await expect(page.getByRole('dialog').getByRole('heading', { name: /Sang Advokat/ }).first()).toBeVisible();
  await page.keyboard.press('Escape'); await expect(page.getByRole('dialog')).toHaveCount(0);
  await page.getByRole('link', { name: 'Kartu Saya' }).click();
  await expect(page.getByRole('heading', { name: 'Sang Komandan (ENTJ)' })).toBeVisible();
  await page.goto('/test/1?page=1');
  await group(page, levelQuestions(1)[0]).getByRole('radio', { name: '1 — Sangat Tidak Sesuai', exact: true }).click();
  await page.getByRole('link', { name: 'Kartu Saya' }).click();
  await expect(page.getByRole('heading', { name: 'Sang Arsitek (INTJ)' })).toBeVisible();
  await expect(page.getByTestId('score-EI')).toContainText('44%');
  await expect(page.getByTestId('score-EI')).toContainText('56%');
  await page.reload(); await expect(page.getByRole('heading', { name: 'Sang Arsitek (INTJ)' })).toBeVisible();
  await page.getByRole('button', { name: 'Ulangi Tes', exact: true }).click();
  await page.getByRole('button', { name: 'Batal', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Sang Arsitek (INTJ)' })).toBeVisible();
  await page.getByRole('button', { name: 'Ulangi Tes', exact: true }).click();
  await page.getByRole('button', { name: 'Ya, ulangi tes', exact: true }).click();
  await expect(page).toHaveURL(/\/levels$/);
  await expect(page.getByRole('button', { name: /Selesaikan Level/ })).toHaveCount(3);
  expect(await page.evaluate(key => localStorage.getItem(key), storageKey)).toBeNull();
  expect(runtimeErrors).toEqual([]);
});

test('malformed storage and unknown routes fail safely', async ({ page }) => {
  for (const saved of ['{broken', '{"version":0,"answers":{}}', '{"version":1,"answers":null,"highestUnlockedLevel":4}']) {
    await page.goto('/');
    await page.evaluate(({ key, value }) => localStorage.setItem(key, value), { key: storageKey, value: saved });
    await page.goto('/result'); await expect(page).toHaveURL(/\/levels$/);
    await expect(page.getByRole('link', { name: 'Mainkan Level' })).toHaveCount(1);
  }
  await page.goto('/cards/XXXX'); await expect(page).toHaveURL(/\/cards$/);
  await page.goto('/test/99'); await expect(page).toHaveURL(/\/levels$/);
});

test('keyboard answers, persistence and responsive layouts', async ({ page }) => {
  await page.goto('/test/1');
  await expect(page).toHaveURL(/page=1/);
  const scale = group(page, levelQuestions(1)[0]);
  const first = scale.getByRole('radio', { name: '1 — Sangat Tidak Sesuai', exact: true });
  await first.focus(); await page.keyboard.press('ArrowRight');
  await expect(scale.getByRole('radio', { name: '2 — Tidak Sesuai', exact: true })).toBeChecked();
  await page.keyboard.press('End');
  await expect(scale.getByRole('radio', { name: '5 — Sangat Sesuai', exact: true })).toBeChecked();
  await expect(group(page, levelQuestions(1)[1]).getByRole('radio', { checked: true })).toHaveCount(0);
  await page.reload();
  await expect(scale.getByRole('radio', { name: '5 — Sangat Sesuai', exact: true })).toBeChecked();
  for (const width of [320, 375, 768, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of ['/', '/levels', '/test/1?page=1', '/cards', '/cards/INTJ']) {
      await page.goto(route); await noOverflow(page);
      if (route === '/test/1?page=1') {
        const radios = page.getByRole('radio'); await expect(radios).toHaveCount(levelQuestions(1).length * 5);
        for (const radio of await radios.all()) expect((await radio.boundingBox())!.width).toBeGreaterThanOrEqual(44);
      }
    }
  }
});

test('result responsive layout, asset integrity and reduced motion', async ({ page }) => {
  await page.goto('/');
  const saved = { version: 1, answers: Object.fromEntries(questions.map(q => [q.id, 'INFJ'.includes(q.direction) ? 5 : 1])), highestUnlockedLevel: 4 };
  await page.evaluate(({ key, value }) => localStorage.setItem(key, JSON.stringify(value)), { key: storageKey, value: saved });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const width of [320, 375, 768, 1280]) {
    await page.setViewportSize({ width, height: 900 }); await page.goto('/result');
    await expect(page.getByRole('heading', { name: 'Sang Advokat (INFJ)' })).toBeVisible();
    await expect(page.locator('.flip-stage')).toHaveClass(/is-revealed/); await noOverflow(page);
    await page.screenshot({ path: `test-results/result-${width}.png`, fullPage: true });
  }
  await page.goto('/cards');
  for (const img of await page.locator('.collection-grid img').all()) {
    await img.scrollIntoViewIfNeeded(); await expect(img).toBeVisible();
    await expect.poll(() => img.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0)).toBe(true);
  }
  for (const [width, device] of [[1280, 'desktop'], [375, 'mobile']] as const) {
    await page.setViewportSize({ width, height: 900 });
    for (const [name, route] of [['landing', '/'], ['levels', '/levels'], ['question', '/test/1?page=1'], ['collection', '/cards']]) {
      await page.goto(route); await page.screenshot({ path: `test-results/${name}-${device}.png`, fullPage: true });
    }
  }
});

test('blocked storage remains playable with clear feedback', async ({ page }) => {
  await page.addInitScript(() => { Object.defineProperty(window, 'localStorage', { get: () => { throw new DOMException('Storage blocked', 'SecurityError'); } }); });
  await page.goto('/test/1'); await expect(page.getByRole('status')).toContainText('Penyimpanan browser tidak tersedia');
  const scale = group(page, levelQuestions(1)[0]);
  await scale.getByRole('radio', { name: '3 — Netral', exact: true }).click();
  await expect(scale.getByRole('radio', { name: '3 — Netral', exact: true })).toBeChecked();
  await expect(page.getByTestId('question-item').first()).toContainText('Terjawab');
});
