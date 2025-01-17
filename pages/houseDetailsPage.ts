import { Page, Locator, expect } from "@playwright/test";
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
    contactAgencyButton: () =>
      this.page
        .getByRole("button")
        .filter({ hasText: "Toon telefoonnummer" })
        .first(),
    houseAgencyTelephoneNumber: (agencyTelephone: string) =>
      this.page.getByRole("button", { name: agencyTelephone }),

    // Saving & unsaving to Favorites Locators
    saveToFavoritesButton: () =>
      this.page.getByRole("button", { name: "Bewaren" }).first(),
    alreadySavedToFavoritesButton: () =>
      this.page.locator('button[title="Huis verwijderen"]').first(),
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

  async verifyHouseDetailsInfo(
    address: string,
    postalCode: string,
    askingPrice: string
  ): Promise<void> {
    await expect(this.locators.houseAddress(address)).toBeVisible();
    console.log("House Address is verified");
    await expect(this.locators.housePostalCode(postalCode)).toBeVisible();
    console.log("House Postal Code is verified");
    await expect(this.locators.houseAskingPrice(askingPrice)).toBeVisible();
    console.log("House Asking price is verified");
  }

  async verifyAgencyDetails(
    agencyName: string,
    agencyTelephone: string
  ): Promise<void> {
    await expect(this.locators.houseAgencyName(agencyName)).toBeVisible();
    console.log("House Agency Name is verified");
    await this.locators.contactAgencyButton().click();
    await expect(
      this.locators.houseAgencyTelephoneNumber(agencyTelephone)
    ).toBeVisible();
    console.log("House Agency Telephonenumber is verified");
  }

  async verifyFavoriteSuccessMessage(language: string): Promise<void> {
    const expectedMessage = LocalizationHelper.getLocalizedText(
      language,
      "favoriteSuccessMessage"
    );
    const link = this.locators.favoritesLink();
    await expect(this.locators.favoriteSuccessMessage()).toHaveText(
      expectedMessage
    );
    await expect(link).toHaveText("Favorieten");
  }
}
