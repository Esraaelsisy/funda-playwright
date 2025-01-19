import { Page } from "@playwright/test";
import { LocalizationHelper } from "../utilities/localizationHelper";

export class LoginPage {
  private page: Page;

  private locators = {
    usernameInput: () => this.page.locator("#UserName"),
    passwordInput: () => this.page.locator("#Password"),
    loginButton: () => this.page.getByRole("button", { name: "Log in" }),
    errorMessage: () => {
      const errorMessage = LocalizationHelper.getLocalizedText(
        "messages",
        "loginError"
      );
      return this.page.locator("p").filter({
        hasText: errorMessage,
      });
    },
    resetPasswordLink: () => {
      const resetPassword = LocalizationHelper.getLocalizedText(
        "messages",
        "resetPassword"
      );
      return this.page
        .locator('a[href="/wachtwoord/vergeten"]')
        .filter({ hasText: resetPassword });
    },
  };

  constructor(page: Page) {
    this.page = page;
  }

  async login(username: string, password: string) {
    await this.locators.usernameInput().fill(username);
    console.log(`Entered username: "${username}" into the username field.`);
    await this.locators.passwordInput().fill(password);
    console.log(`Entered password: "[PROTECTED]" into the password field.`);
    await this.locators.loginButton().click();
    console.log("Clicked the login submit button.");
  }

  get errorMessageText() {
    return this.locators.errorMessage();
  }

  get resetPasswordLink() {
    return this.locators.resetPasswordLink();
  }

  async clickResetPassword() {
    await this.locators.resetPasswordLink().click();
    console.log("Reset Password link is clicked.");
  }
}
