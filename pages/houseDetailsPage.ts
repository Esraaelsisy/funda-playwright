import { Page, Locator } from "@playwright/test";
import { LocalizationHelper } from "../utilities/localizationHelper";

export class HouseDetailsPage {
  private page: Page;

  private locators = {
    //House Details Locators
    houseAddress: (address: string) =>
      this.page.locator("h1").getByText(address, { exact: true }).first(),
    housePostalCode: (postalCode: string) =>
      this.page.locator("h1").getByText(postalCode, { exact: true }),
    houseAskingPrice: (askingPrice: string) =>
      this.page.getByText(askingPrice, { exact: true }),

    //House Agency Locators
    houseAgencyName: (agencyName: string) =>
      this.page.locator("h3").getByTitle(agencyName),
    contactAgencyButton: () => {
      const showTelephone = LocalizationHelper.getLocalizedText(
        "buttons",
        "showTelephone"
      );
      return this.page
        .getByRole("button")
        .filter({ hasText: showTelephone })
        .first();
    },
    houseAgencyTelephoneNumber: (agencyTelephone: string) =>
      this.page.getByRole("button", { name: agencyTelephone }),
    agencyContactUsButton: () => {
      const contact = LocalizationHelper.getLocalizedText("buttons", "contact");
      return this.page.getByRole("link", { name: contact }).first();
    },
    agencyRequestViewingButton: () => {
      const requestViewing = LocalizationHelper.getLocalizedText(
        "buttons",
        "requestViewing"
      );
      return this.page.getByRole("link", { name: requestViewing }).first();
    },

    // Saving & unsaving to Favorites Locators
    saveToFavoritesButton: () => {
      const saveToFavorite = LocalizationHelper.getLocalizedText(
        "buttons",
        "saveToFavorite"
      );
      return this.page.getByRole("button", { name: saveToFavorite }).first();
    },
    alreadySavedToFavoritesButton: () => {
      const removeFromFavorite = LocalizationHelper.getLocalizedText(
        "buttons",
        "removeFromFavorite"
      );
      return this.page.getByTitle(removeFromFavorite).first();
    },
    favoriteSuccessMessage: () => this.page.locator("h4.font-semibold"),
    favoritesLink: () => this.page.locator('a[href*="favorieten/"]').first(),
  };

  constructor(page: Page) {
    this.page = page;
  }
  async navigateToHouseDetails(houseUrl: string): Promise<void> {
    await this.page.goto(houseUrl);
    console.log("House details page has been opened.");
  }
  async openAgencyContactUsPage(): Promise<void> {
    await this.locators.agencyContactUsButton().click();
    console.log("Agency Contact page has been opened.");
  }
  async openRequestVieweingPage(): Promise<void> {
    await this.locators.agencyRequestViewingButton().click();
    console.log("Request a viewing page has been opened.");
  }
  async saveToFavorites(): Promise<void> {
    if (await this.locators.alreadySavedToFavoritesButton().isVisible()) {
      await this.locators.alreadySavedToFavoritesButton().click();
    } else {
      console.log(
        "This housed is not saved to Favorites before. Proceeding to save the house."
      );
    }
    await this.locators.saveToFavoritesButton().click();
    console.log("House has been saved to favorites.");
  }
  async removeromFavorites(): Promise<void> {
    await this.locators.alreadySavedToFavoritesButton().click();
    console.log("House has been removed from favorites.");
  }
  async clickContactAgencyButton(): Promise<void> {
    await this.locators.contactAgencyButton().click();
    console.log("Contact Button is clicked and telephone number is shown.");
  }
  getHouseAddress(address: string) {
    return this.locators.houseAddress(address);
  }
  getPostalCode(postalCode: string) {
    return this.locators.housePostalCode(postalCode);
  }
  getAskingPrice(askingPrice: string) {
    return this.locators.houseAskingPrice(askingPrice);
  }
  getAgencyName(agencyName: string) {
    return this.locators.houseAgencyName(agencyName);
  }
  getAgencyTelephone(agencyTelephone: string) {
    return this.locators.houseAgencyTelephoneNumber(agencyTelephone);
  }
  get favoriteSuccessMessage(): Locator {
    return this.locators.favoriteSuccessMessage();
  }
  get favoritesLink(): Locator {
    return this.locators.favoritesLink();
  }
}
