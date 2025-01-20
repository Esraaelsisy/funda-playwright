import { Page, expect } from "@playwright/test";
import { LocalizationHelper } from "../utilities/localizationHelper";

export class HomePage {
  private page: Page;

  private locators = {
    //Header section Locators --> For more locators like (Mijn Huis,Favoriten), better to move it a sperated page file.
    loginButton: () => {
      const login = LocalizationHelper.getLocalizedText("buttons", "login");
      return this.page.getByRole("button", { name: login });
    },
    accountMenu: () =>
      this.page.getByRole("button").filter({ hasText: "Account" }),

    // Account Menu Locators --> for more locators, better to move it to a sperated page file.
    logoutButton: (logoutLabel: string) => {
      const logout = LocalizationHelper.getLocalizedText("buttons", "logout");
      return this.page.getByRole("link", { name: logout });
    },

    // Search Section Locators
    searchCategory: (searchCategory: string) =>
      this.page.locator('button[data-text="' + searchCategory + '"]'),
    searchInput: () => this.page.getByTestId("search-box"),
    dropdownList: () => this.page.getByRole("listbox"),
    dropdownOption: (index: number) =>
      this.page.getByTestId("SearchBox-location-suggestion").nth(index),
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

  async performSearch(category: string, location: string): Promise<void> {
    await this.locators.searchCategory(category).click();
    console.log(`Clicking on the search category button for: "${category}".`);
    await this.locators.searchInput().fill(location);
    console.log(`Filling the search input with location: "${location}".`);
    await this.locators.dropdownList().waitFor({ state: "visible" });
    console.log("Waiting for the dropdown list to become visible.");
    await this.locators.dropdownOption(0).click();
    console.log("Selecting the first option from the dropdown list.");
    console.log("Search action completed successfully.");
  }
}
