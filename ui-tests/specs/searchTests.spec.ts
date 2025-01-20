import { test, expect } from "../fixtures/baseTest";
import { PageManager } from "../pages/pageManager";
import testData from "../data/testData.json";
import { LocalizationHelper } from "../utilities/localizationHelper";

test.describe("Search Functionality Tests", () => {
  test("@smokeTests Search with valid location returns relevant results", async ({
    page,
  }) => {
    const pm = new PageManager(page);

    //Arrangement
    await test.step("Navigate to the homepage", async () => {
      await page.goto("/");
    });
    //Action
    await test.step("Perform a search with a valid location", async () => {
      await pm.homePage.performSearch(
        LocalizationHelper.getLocalizedText("buttons", "buy"),
        testData.locations.validLocation
      );
    });
    //Asserations
    await test.step("Verify that search results are displayed for that exact location", async () => {
      await expect(pm.searchPage.searchResultsLocation).toContainText(
        testData.locations.validLocation
      );
    });
    await test.step("Verify that search results count is not 0", async () => {
      await expect(pm.searchPage.noResultsMessage).not.toBeVisible();
    });
  });

  test("@smokeTests Search in Rent with valid location and certain price range returns results", async ({
    page,
  }) => {
    const pm = new PageManager(page);
    //Arrangement
    await test.step("Navigate to the homepage", async () => {
      await page.goto("/");
    });
    //Action
    await test.step("Perform a search with a valid location", async () => {
      await pm.homePage.performSearch(
        LocalizationHelper.getLocalizedText("buttons", "rent"),
        testData.locations.validLocation
      );
    });
    //Action
    await test.step("Filter a search with a defined price range", async () => {
      await pm.searchPage.defineSearchPriceRange(
        testData.searchCriteria.rent.minPrice,
        testData.searchCriteria.rent.maxPrice
      );
    });
    //Asserations
    await test.step("Verify that search results are displayed for that location", async () => {
      const priceText = await pm.searchPage.resultPrice.textContent();
      const numericValue = priceText
        ? parseInt(priceText.replace(/[^\d]/g, ""))
        : 0;
      expect(numericValue).toBeGreaterThanOrEqual(
        Number(testData.searchCriteria.rent.minPrice)
      );
      expect(numericValue).toBeLessThanOrEqual(
        Number(testData.searchCriteria.rent.maxPrice)
      );
    });

    await test.step("Verify that search results are shown within the defined price", async () => {
      await expect(pm.searchPage.searchResultsLocation).toContainText(
        testData.locations.validLocation
      );
    });

    await test.step("Verify that search results count is not 0", async () => {
      await expect(pm.searchPage.noResultsMessage).not.toBeVisible();
    });
  });

  test("@negativeTests Search with invalid location shows no results message", async ({
    page,
  }) => {
    const pm = new PageManager(page);
    //Arrangement
    await test.step("Navigate to the homepage", async () => {
      await page.goto("/");
    });
    //Action
    await test.step("Perform a search with an invalid location", async () => {
      await pm.homePage.performSearch(
        "Koop",
        testData.locations.invalidLocation
      );
    });
    //Asserations
    await test.step("Verify that no results message is displayed", async () => {
      await expect(pm.searchPage.noResultsMessage).toBeVisible();
    });
    await test.step("Verify that search results count is 0", async () => {
      await expect(pm.searchPage.searchResultsCount).toHaveText(
        "0 koopwoningen"
      );
    });
  });
});
