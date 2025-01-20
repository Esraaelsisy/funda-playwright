import { Page, Locator } from "@playwright/test";
import { LocalizationHelper } from "../utilities/localizationHelper";

export class SearchPage {
  private page: Page;

  private locators = {
    // Search Results Locators
    searchResults: () =>
      this.page.getByTestId("pageHeader").locator("div").first(),
    searchResultsLocation: () =>
      this.page.getByTestId("pageHeader").locator("div").last(),
    noResultsMessage: () => {
      const noResults = LocalizationHelper.getLocalizedText(
        "messages",
        "noResults"
      );
      return this.page.getByRole("heading", { name: noResults });
    },

    //Filters Section Locators --> For more locators(like #of slaapkammers, availability), better to move it to a sperated page file.
    filterButton: () =>
      this.page.locator(
        'button:has(span[data-testid="ButtonBarFilterButton"])'
      ),
    minPriceInput: () =>
      this.page.getByTestId("FilterRangepriceMin").getByPlaceholder("0"),
    maxPriceInput: () =>
      this.page
        .getByTestId("FilterRangepriceMax")
        .getByPlaceholder("Geen max."),
    resultPrice: () =>
      this.page
        .locator('[data-testid="listingDetailsAddress"]')
        .first()
        .locator("..")
        .locator('div.font-semibold div.truncate:has-text("€")'),
  };
  constructor(page: Page) {
    this.page = page;
  }
  get searchResultsCount(): Locator {
    return this.locators.searchResults();
  }
  get searchResultsLocation(): Locator {
    return this.locators.searchResultsLocation();
  }
  get noResultsMessage(): Locator {
    return this.locators.noResultsMessage();
  }
  get resultPrice(): Locator {
    return this.locators.resultPrice();
  }
  async defineSearchPriceRange(
    minPrice: string,
    maxPrice: string
  ): Promise<void> {
    await this.locators.minPriceInput().waitFor({ state: "visible" });
    await this.locators.minPriceInput().fill(minPrice);
    console.log(`Filling in the minimum price with: "${minPrice}".`);
    await this.locators.maxPriceInput().waitFor({ state: "visible" });
    await this.locators.maxPriceInput().fill(maxPrice);
    console.log(`Filling in the maximum price with: "${maxPrice}".`);
    console.log("Price range has been successfully defined.");
  }
}
