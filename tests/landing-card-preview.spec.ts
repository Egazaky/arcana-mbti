import { expect, test } from '@playwright/test';

for (const width of [1280, 375]) {
  test(`landing card previews stay on the landing page at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    const landing = page.locator('.hero');
    const originalLanding = await landing.elementHandle();

    for (const type of ['INTJ', 'INFJ', 'ENFP']) {
      const card = page.getByRole('link', { name: `Jelajahi kartu ${type}`, exact: true });
      // The side cards are intentionally fanned underneath the centre card.
      await card.focus();
      const scrollBefore = await page.evaluate(() => window.scrollY);
      await card.press('Enter');
      const dialog = page.getByRole('dialog');
      await expect(dialog).toBeVisible();
      expect(new URL(page.url()).pathname).toBe('/');
      expect(await originalLanding!.evaluate(element => element.isConnected)).toBe(true);
      await expect(page.locator('.cards-page')).toHaveCount(0);
      await expect(dialog.locator('.detail-hero img')).toHaveAttribute('alt', new RegExp(type));
      const originalDialog = await dialog.elementHandle();
      const otherType = type === 'INTJ' ? 'INTP' : 'INFP';
      const peer = dialog.locator('.peer-links').getByRole('link', { name: new RegExp(`^${otherType}`) });
      await peer.click();
      await expect(dialog.locator('.detail-hero img')).toHaveAttribute('alt', new RegExp(otherType));
      expect(new URL(page.url()).pathname).toBe('/');
      expect(await originalDialog!.evaluate(element => element.isConnected && (element as HTMLDialogElement).open)).toBe(true);
      await expect(peer).toBeFocused();

      if (type === 'INFJ') await page.keyboard.press('Escape');
      else await dialog.getByRole('button', { name: 'Tutup dialog' }).click();
      await expect(dialog).toHaveCount(0);
      await expect(page).toHaveURL('http://127.0.0.1:5173/');
      await expect(card).toBeFocused();
      expect(await page.evaluate(() => window.scrollY)).toBe(scrollBefore);
    }
  });
}

test('featured landing cards preserve position and support browser back', async ({ page }) => {
  await page.goto('/');
  const card = page.locator('.featured-grid').getByRole('link', { name: 'Lihat INTP — Sang Logikawan', exact: true });
  await card.scrollIntoViewIfNeeded();
  const scrollBefore = await page.evaluate(() => window.scrollY);
  await card.click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  expect(new URL(page.url()).pathname).toBe('/');
  await page.goBack();
  await expect(dialog).toHaveCount(0);
  await expect(card).toBeFocused();
  expect(await page.evaluate(() => window.scrollY)).toBe(scrollBefore);
  await page.goForward();
  await expect(dialog).toBeVisible();
  await page.reload();
  await expect(dialog).toBeVisible();
  await expect(page.locator('.hero')).toHaveCount(1);
  await page.keyboard.press('Escape');
  await expect(page).toHaveURL('http://127.0.0.1:5173/');
  await page.getByRole('link', { name: 'Lihat Kartu Tipe Lain', exact: true }).click();
  await expect(page).toHaveURL(/\/cards$/);
});
