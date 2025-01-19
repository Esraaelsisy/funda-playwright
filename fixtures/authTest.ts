import { test as base, expect as baseExpect } from "./baseTest";
import { PageManager } from "../pages/pageManager";
import * as dotenv from 'dotenv';

dotenv.config();

export const authTest = base.extend<{}>({
  page: async ({ page }, use) => {
    const pm = new PageManager(page);
    const { USERNAME: username, PASSWORD: password } = process.env; 
    if (!username || !password) {
      throw new Error('Environment variables USERNAME and PASSWORD must be set in .env');
    }
    await pm.homePage.navigateToLoginPage();
    await pm.loginPage.login(username, password);
    await pm.homePage.isAccountMenuVisible();
    await use(page);
  },
});

export { baseExpect as authExpect };