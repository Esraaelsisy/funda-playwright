import { Page, Locator } from "@playwright/test";
import { LocalizationHelper } from "../utilities/localizationHelper";

export class SearchPage {
  private page: Page;

  private locators = {
    searchCategory: (searchCategory: string) =>
      this.page.locator('button[data-text="' + searchCategory + '"]'),
    searchInput: () => this.page.getByTestId("search-box"),
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
    dropdownList: () => this.page.getByRole("listbox"),
    dropdownOption: (index: number) =>
      this.page.getByTestId("SearchBox-location-suggestion").nth(index),
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
