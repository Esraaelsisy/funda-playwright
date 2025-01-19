import { test, expect } from "../fixtures/baseTest";
import { PageManager } from "../pages/pageManager";
import testData from "../data/testData.json";

test.describe("Search Functionality Tests", () => {
  test("Search with valid location returns results", async ({ page }) => {
    const pm = new PageManager(page);

    //Arrangement
    await test.step("Navigate to the homepage", async () => {
      await page.goto("/");
    });
    //Action
    await test.step("Perform a search with a valid location", async () => {
      await pm.searchPage.performSearch(
        "Koop",
        testData.locations.validLocation
      );
    });
    //Asserations
    await test.step("Verify that search results are displayed for that location", async () => {
      await expect(pm.searchPage.searchResultsLocation).toContainText(
        testData.locations.validLocation
      );
    });
    await test.step("Verify that search results count is not 0", async () => {
      await expect(pm.searchPage.searchResultsCount).not.toHaveText(
        "0 koopwoningen"
      );
    });
  });

  test("Search in Rent with valid location and certain price range returns results", async ({
    page,
  }) => {
    const pm = new PageManager(page);
//Arrangement
    await test.step("Navigate to the homepage", async () => {
      await page.goto("/");
    });
//Action
    await test.step("Perform a search with a valid location", async () => {
      await pm.searchPage.performSearch(
        "Huur",
        testData.locations.validLocation
      );
    });
//Action
    await test.step("Filter a search with a defined price range", async () => {
      await pm.searchPage.defineSearchPriceRange("1000", "2000");
    });
//Asserations
    await test.step("Verify that search results are displayed for that location", async () => {
      const priceText = await pm.searchPage.resultPrice.textContent();
      const numericValue = priceText
        ? parseInt(priceText.replace(/[^\d]/g, ""))
        : 0; 
      expect(numericValue).toBeGreaterThanOrEqual(1000);
      expect(numericValue).toBeLessThanOrEqual(2000);
    });

    await test.step("Verify that search results are shown within the defined price", async () => {
      await expect(pm.searchPage.searchResultsLocation).toContainText(
        testData.locations.validLocation
      );
    });

    await test.step("Verify that search results count is not 0", async () => {
      await expect(pm.searchPage.searchResultsCount).not.toHaveText(
        "0 huurwoningen"
      );
    });
  });

  test("Search with invalid location shows no results message", async ({
    page,
  }) => {
    const pm = new PageManager(page);
    //Arrangement
    await test.step("Navigate to the homepage", async () => {
      await page.goto("/");
    });
    //Action
    await test.step("Perform a search with an invalid location", async () => {
      await pm.searchPage.performSearch(
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
