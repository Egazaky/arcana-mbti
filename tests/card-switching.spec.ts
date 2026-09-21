import { expect, test } from '@playwright/test';

for (const width of [1280, 375]) {
  test(`switching profile types keeps the dialog open and stable at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/cards/INTP');
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    const originalDialog = await dialog.elementHandle();

    for (const code of ['ENTJ', 'ENTP', 'INTJ', 'INTP']) {
      const peer = dialog.locator('.peer-links').getByRole('link', { name: new RegExp(`^${code}`) });
      await peer.scrollIntoViewIfNeeded();
      await peer.click();
      await expect(page).toHaveURL(new RegExp(`/cards/${code}$`));
      // Reopening a newly mounted native dialog flashes its backdrop and resets focus/scroll.
      expect(await originalDialog!.evaluate(element => element.isConnected && (element as HTMLDialogElement).open)).toBe(true);
      await expect(dialog.locator('.detail-hero img')).toHaveAttribute('alt', new RegExp(code));
      await expect(peer).toBeFocused();
      await expect(peer).toBeInViewport();
      await expect(dialog.locator('.peer-links .current')).toContainText(code);
      expect(await page.evaluate(() => document.body.style.overflow)).toBe('hidden');
    }

    await page.goBack();
    await expect(page).toHaveURL(/\/cards\/INTJ$/);
    expect(await originalDialog!.evaluate(element => element.isConnected && (element as HTMLDialogElement).open)).toBe(true);
    await page.keyboard.press('Escape');
    await expect(page).toHaveURL(/\/cards$/);
    await expect(dialog).toHaveCount(0);
    expect(await page.evaluate(() => document.body.style.overflow)).not.toBe('hidden');
  });
}

test('opening, switching and closing a profile preserves the gallery position', async ({ page }) => {
  await page.goto('/cards');
  const card = page.getByRole('link', { name: 'Lihat ISTJ — Sang Logistikawan', exact: true });
  await card.scrollIntoViewIfNeeded();
  const galleryScroll = await page.evaluate(() => window.scrollY);
  expect(galleryScroll).toBeGreaterThan(0);
  await card.click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await dialog.locator('.peer-links').getByRole('link', { name: /^ISFJ/ }).click();
  await expect(page).toHaveURL(/\/cards\/ISFJ$/);
  expect(await page.evaluate(() => window.scrollY)).toBe(galleryScroll);
  await page.keyboard.press('Escape');
  await expect(dialog).toHaveCount(0);
  await expect(card).toBeFocused();
  expect(await page.evaluate(() => window.scrollY)).toBe(galleryScroll);
});
