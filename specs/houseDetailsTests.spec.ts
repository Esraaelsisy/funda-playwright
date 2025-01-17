import { test, expect } from "../fixtures/baseTest";
import { authTest, authExpect } from "../fixtures/authTest";
import { PageManager } from "../pages/pageManager";
import testData from "../data/testData.json";

test.describe("House Details Page Tests", () => {
  test("Verify house details page loads successfully", async ({ page }) => {
    const pm = new PageManager(page);

    await test.step("Navigate to the house details page", async () => {
      await pm.houseDetailsPage.navigateToHouseDetails(
        testData.house.detailsUrl
      );
    });

    await test.step("Verify house details are displayed correctly", async () => {
      await pm.houseDetailsPage.verifyHouseDetailsInfo(
        testData.house.address,
        testData.house.postalCode,
        testData.house.askingPrice
      );
    });

    await test.step("Verify agency details are displayed correctly", async () => {
      await pm.houseDetailsPage.verifyAgencyDetails(
        testData.house.agencyName,
        testData.house.agencyContact
      );
    });
  });

  authTest("Verify saving a house to favorites", async ({ page }) => {
    const pm = new PageManager(page);

    await authTest.step("Navigate to the house details page", async () => {
      await pm.houseDetailsPage.navigateToHouseDetails(
        testData.house.detailsUrl
      );
    });

    await authTest.step("Save the house to favorites", async () => {
      await pm.houseDetailsPage.saveToFavorites();
    });
    await authTest.step(
      "Verify favorite success message and Favorites Link",
      async () => {
        await pm.houseDetailsPage.verifyFavoriteSuccessMessage("NL");
      }
    );

    await authTest.step("Remove this house from favorites ", async () => {
      await pm.houseDetailsPage.removeromFavorites();
    });
  });

  test("Verify real estate agency details", async ({ page }) => {
    const pm = new PageManager(page);

    await test.step("Navigate to the house details page", async () => {
      await pm.houseDetailsPage.navigateToHouseDetails(
        testData.house.detailsUrl
      );
    });
  });
});
