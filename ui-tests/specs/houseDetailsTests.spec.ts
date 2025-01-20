import { test, expect } from "../fixtures/baseTest";
import { authTest, authExpect } from "../fixtures/authTest";
import { PageManager } from "../pages/pageManager";
import testData from "../data/testData.json";
import { LocalizationHelper } from "../utilities/localizationHelper";

test.describe("House Details Page Tests", () => {
  test("@smokeTests House Info are shown correctly in House Details Page", async ({
    page,
  }) => {
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

    //Assertions for detailed house info section

    await test.step("Verify house asking price in details section", async () => {
      await expect(
        pm.houseDetailsPage.getdetailedHouseInfo(
          LocalizationHelper.getLocalizedText("buttons", "askingPrice")
        )
      ).toHaveText(testData.house.details.askingPrice);
      console.log("House Asking Price is verified in details section");
    });

    await test.step("Verify house asking price per M2 in details section", async () => {
      await expect(
        pm.houseDetailsPage.getdetailedHouseInfo(
          LocalizationHelper.getLocalizedText("buttons", "askingPricePerM2")
        )
      ).toContainText(testData.house.details.askingPricePerM2);
      console.log("House Asking Price per m2 is verified in details section");
    });

    await test.step("Verify house living area in details section", async () => {
      await expect(
        pm.houseDetailsPage.getdetailedHouseInfo(
          LocalizationHelper.getLocalizedText("buttons", "livingArea")
        )
      ).toHaveText(testData.house.details.livingArea);
      console.log("House Living Area is verified in details section");
    });

    await test.step("Verify house status in details section", async () => {
      await expect(
        pm.houseDetailsPage.getdetailedHouseInfo(
          LocalizationHelper.getLocalizedText("buttons", "houseStatus")
        )
      ).toHaveText(testData.house.details.houseStatus);
      console.log("House Status is verified in details section");
    });

    await test.step("Verify house type in details section", async () => {
      await expect(
        pm.houseDetailsPage.getdetailedHouseInfo(
          LocalizationHelper.getLocalizedText("buttons", "houseType")
        )
      ).toContainText(testData.house.details.houseType);
      console.log("House Type is verified in details section");
    });

    await test.step("Verify house number of rooms in details section", async () => {
      await expect(
        pm.houseDetailsPage.getdetailedHouseInfo(
          LocalizationHelper.getLocalizedText("buttons", "numberOfRooms")
        )
      ).toHaveText(testData.house.details.numberOfRooms);
      console.log("House Number of Rooms is verified in details section");
    });

    await test.step("Verify house instruction year in details section", async () => {
      await expect(
        pm.houseDetailsPage.getdetailedHouseInfo(
          LocalizationHelper.getLocalizedText("buttons", "yearOfConstruction")
        )
      ).toHaveText(testData.house.details.yearOfConstruction);
      console.log("House Instruction Year is verified in details section");
    });
  });

  test("@smokeTests Agency Info are shown correctly in House Details Page", async ({
    page,
  }) => {
    const pm = new PageManager(page);

    //Action: Navigate to the house details page
    await test.step("Navigate to the house details page", async () => {
      await pm.houseDetailsPage.navigateToHouseDetails(
        testData.house.detailsUrl
      );
    });
    //Assertions
    await test.step("Verify agency name is visible", async () => {
      await expect(
        pm.houseDetailsPage.getAgencyName(testData.house.agencyName)
      ).toBeVisible();
      console.log("House Agency Name is verified");
    });

    await test.step("Verify agency telephone number is visible", async () => {
      await pm.houseDetailsPage.clickContactAgencyButton();
      await expect(
        pm.houseDetailsPage.getAgencyTelephone(testData.house.agencyContact)
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
