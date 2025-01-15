import { test as base, expect as baseExpect } from './baseTest';
import { PageManager } from '../pages/pageManager';
import testData from '../data/testData.json';

export const authTest = base.extend<{}>({
  page: async ({ page }, use) => {
    const pm = new PageManager(page);
    const { username, password } = testData.credentials.valid;
    await pm.homePage.navigateToLoginPage();
    await pm.loginPage.login(username, password);
    await page.waitForSelector('.user-profile');
    await use(page);
  },
});
export { baseExpect as authExpect };