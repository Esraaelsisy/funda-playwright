import { Page, Locator } from "@playwright/test";

export class HomePage {
  private page: Page;

  private locators = {
    loginButton: () => this.page.getByRole("button", { name: "Inloggen" }),
    accountMenu: () =>
      this.page.getByRole("button").filter({ hasText: "Account" }),
    logoutButton: () =>
      this.page.getByRole('link', { name: 'Uitloggen' })
  };

  constructor(page: Page) {
    this.page = page;
  }
  async navigateToLoginPage() {
    await this.locators.loginButton().click();
  }

  async openAccountMenu() {
    await this.locators.accountMenu().click();
  }

  get accountMenu() {
    return this.locators.accountMenu;
  }
}
