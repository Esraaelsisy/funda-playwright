// utilities/cookieHelper.ts
import { Page } from '@playwright/test';

export async function acceptCookies(page: Page): Promise<void> {
  const cookiePopup = page.locator('.didomi-popup-view');
  const acceptButton = page.locator('#didomi-notice-agree-button'); // Selector for "Accept All" button

  if (await cookiePopup.isVisible()) {
    await acceptButton.click();
  }
}