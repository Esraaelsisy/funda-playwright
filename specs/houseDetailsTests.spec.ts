import { test, expect } from "../fixtures/baseTest";
import { authTest, authExpect } from "../fixtures/authTest";
import { PageManager } from "../pages/pageManager";
import testData from "../data/testData.json";
import { LocalizationHelper } from "../utilities/localizationHelper";

test.describe("House Details Page Tests", () => {
  test("@smokeTests House details page loads successfully", async ({ page }) => {
    const pm = new PageManager(page);

    //Action: Navigate to the house details page
    await test.step("Navigate to the house details page", async () => {
      await pm.houseDetailsPage.navigateToHouseDetails(
        testData.house.detailsUrl
      );
    });
    //Assertions
    await test.step("Verify house address", async () => {
      await expect(
        pm.houseDetailsPage.getHouseAddress(testData.house.address)
      ).toBeVisible();
      console.log("House Address is verified");
    });

    await test.step("Verify house postal code", async () => {
      await expect(
        pm.houseDetailsPage.getPostalCode(testData.house.postalCode)
      ).toBeVisible();
      console.log("House Postal Code is verified");
    });

    await test.step("Verify house asking price", async () => {
      await expect(
        pm.houseDetailsPage.getAskingPrice(testData.house.askingPrice)
      ).toBeVisible();
      console.log("House Asking Price is verified");
    });

    await test.step("Verify agency name is visible", async () => {
      await expect(
        pm.houseDetailsPage.getAgencyName(testData.house.agencyName)
      ).toBeVisible();
      console.log("House Agency Name is verified");
    });

    await test.step("Verify agency telephone number is visible", async () => {
      await pm.houseDetailsPage.clickContactAgencyButton();
      await expect(
        pm.houseDetailsPage.getAgencyTelephone(
          testData.house.agencyContact
        )
      ).toBeVisible();
      console.log("House Agency Telephone number is verified");
    });
  });

  authTest(
    "@smokeTests Saving a house to favorites with logged in user",
    async ({ page }) => {
      const pm = new PageManager(page);
      //Action: Navigate to the house details page
      await authTest.step("Navigate to the house details page", async () => {
        await pm.houseDetailsPage.navigateToHouseDetails(
          testData.house.detailsUrl
        );
      });
      //Action: Save the house to Favorites
      await authTest.step("Save the house to favorites", async () => {
        await pm.houseDetailsPage.saveToFavorites();
      });
      //Assertions
      await authTest.step(
        "Verify favorite success message and Favorites Link",
        async () => {
          const expectedMessage = LocalizationHelper.getLocalizedText(
            "messages",
            "favoriteSuccessMessage"
          );
          await expect(pm.houseDetailsPage.favoriteSuccessMessage).toHaveText(
            expectedMessage
          );
          console.log("Favorite Success Message is shown.");
          await expect(pm.houseDetailsPage.favoritesLink).toHaveText(
            "Favorieten"
          );
          console.log("Favorite Success Message has Favorites Link.");
        }
      );
      //Action : Remove the house from favorites
      await authTest.step("Remove this house from favorites ", async () => {
        await pm.houseDetailsPage.removeromFavorites();
      });
    }
  );
});
