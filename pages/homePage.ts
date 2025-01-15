import { Page, Locator } from "@playwright/test";

export class HomePage {
  private page: Page;
  private loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginButton = page.getByRole("button", { name: "Inloggen" });
  }

  async navigateToLoginPage() {
    await this.loginButton.click();
  }
}
