import { Page, Locator } from "@playwright/test";

export class LoginPage {
  private page: Page;

  private locators = {
    usernameInput: () => this.page.locator("#UserName"),
    passwordInput: () => this.page.locator("#Password"),
    loginButton: () => this.page.getByRole("button", { name: "Log in" }),
    errorMessage: () =>
      this.page.locator("p").filter({
        hasText:
          "Het e-mailadres en wachtwoord komen niet overeen met onze gegevens",
      }),
    resetPasswordLink: () =>
      this.page
        .locator('a[href="/wachtwoord/vergeten"]')
        .filter({ hasText: "reset je wachtwoord" }),
  };

  constructor(page: Page) {
    this.page = page;
  }

  async login(username: string, password: string) {
    await this.locators.usernameInput().fill(username);
    await this.locators.passwordInput().fill(password);
    await this.locators.loginButton().click();
  }

  get errorMessageText() {
    return this.locators.errorMessage();
  }

  get resetPasswordLink() {
    return this.locators.errorMessage();
  }

  async clickResetPassword() {
    await this.locators.resetPasswordLink().click();
  }
}
