import { test as base, expect as baseExpect } from "@playwright/test";
import { acceptCookies } from "../utilities/cookieHelper";

export const test = base.extend<{}>({
  context: async ({ browser }, use) => {
    const context = await browser.newContext({
      userAgent: process.env.USER_AGENT,
      viewport: { width: 1920, height: 1080 },
    });
    await use(context);
  },
  page: async ({ page }, use) => {
    await page.goto("/");
    await acceptCookies(page);
    await use(page);
  },
});
export { baseExpect as expect };
