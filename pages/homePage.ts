import { Page, expect } from "@playwright/test";
import { LocalizationHelper } from "../utilities/localizationHelper";

export class HomePage {
  private page: Page;

  private locators = {
    loginButton: () => {
      const login = LocalizationHelper.getLocalizedText("buttons", "login");
      return this.page.getByRole("button", { name: login });
    },
    accountMenu: () =>
      this.page.getByRole("button").filter({ hasText: "Account" }),
    logoutButton: (logoutLabel: string) => {
      const logout = LocalizationHelper.getLocalizedText("buttons", "logout");
      return this.page.getByRole("link", { name: logout });
    },
  };
  constructor(page: Page) {
    this.page = page;
  }
  async navigateToLoginPage() {
    await this.locators.loginButton().click();
    console.log("Login Page is opened.");
  }
  async openAccountMenu() {
    await this.locators.accountMenu().click();
    console.log("Account menu is opened.");
  }
  async isAccountMenuVisible() {
    await expect(this.locators.accountMenu()).toBeVisible();
  }
}
