import { test, expect } from "../fixtures/baseTest";
import { PageManager } from "../pages/pageManager";
import testData from "../data/testData.json";
import { authTest } from "../fixtures/authTest";

test.describe("Real Estate Agency Interaction Tests", () => {
  test("@smokeTests Contact an Agency for a certain house without loggin in", async ({
    page,
  }) => {
    const pm = new PageManager(page);
    //Arrangement
    await test.step("Navigate to the house details page", async () => {
      await pm.houseDetailsPage.navigateToHouseDetails(
        testData.house.detailsUrl
      );
    });
    await test.step("Navigate to real estate agency Contact Us page", async () => {
      await pm.houseDetailsPage.openAgencyContactUsPage();
    });
    //Action
    await test.step("Fill and Submit a contact us form", async () => {
      await pm.agencyContactPage.contactAgency(
        testData.realEstateAgency.contactDetails.contactMessage,
        testData.realEstateAgency.contactDetails.contactEmail,
        testData.realEstateAgency.contactDetails.contactFirstName,
        testData.realEstateAgency.contactDetails.contactLastName,
        testData.realEstateAgency.contactDetails.contactTelephone
      );
    });
    //Assertions
    await test.step("Verify contact form confirmation message header", async () => {
      await expect(
        pm.agencyContactPage.confirmationMessageHeader
      ).toBeVisible();
      console.log("Contact form confirmation header is shown.");
    });

    await test.step("Verify email confirmation label is displayed correctly", async () => {
      await expect(
        pm.agencyContactPage.getEmailConfirmationLabel(
          testData.realEstateAgency.contactDetails.contactEmail
        )
      ).toBeVisible();
      console.log(
        "Contact form confirmation has the correct email address shown."
      );
    });

    await test.step("Verify telephone confirmation label is displayed correctly", async () => {
      await expect(
        pm.agencyContactPage.getTelephoneConfirmationLabel(
          testData.realEstateAgency.contactDetails.contactTelephone
        )
      ).toBeVisible();
      console.log("Contact form confirmation has the correct telephone shown.");
    });
  });

  test("@smokeTests Request a Viewing for a certain house without loggin in", async ({
    page,
  }) => {
    const pm = new PageManager(page);
    //Arrangement
    await test.step("Navigate to the house details page", async () => {
      await pm.houseDetailsPage.navigateToHouseDetails(
        testData.house.detailsUrl
      );
    });
    await test.step("Navigate to request a Viewing page", async () => {
      await pm.houseDetailsPage.openRequestVieweingPage();
    });

    //Action
    await test.step("Select Viewing Day and time", async () => {
      await pm.agencyContactPage.requestViewing("Ma", "'s morgens");
    });
    await test.step("Fill and Submit a contact us form", async () => {
      await pm.agencyContactPage.contactAgency(
        testData.realEstateAgency.contactDetails.contactMessage,
        testData.realEstateAgency.contactDetails.contactEmail,
        testData.realEstateAgency.contactDetails.contactFirstName,
        testData.realEstateAgency.contactDetails.contactLastName,
        testData.realEstateAgency.contactDetails.contactTelephone
      );
    });

    //Assertions
    await test.step("Verify contact form confirmation message header", async () => {
      await expect(
        pm.agencyContactPage.confirmationMessageHeader
      ).toBeVisible();
      console.log("Contact form confirmation header is shown.");
    });

    await test.step("Verify email confirmation label is displayed correctly", async () => {
      await expect(
        pm.agencyContactPage.getEmailConfirmationLabel(
          testData.realEstateAgency.contactDetails.contactEmail
        )
      ).toBeVisible();
      console.log(
        "Contact form confirmation has the correct email address shown."
      );
    });

    await test.step("Verify telephone confirmation label is displayed correctly", async () => {
      await expect(
        pm.agencyContactPage.getTelephoneConfirmationLabel(
          testData.realEstateAgency.contactDetails.contactTelephone
        )
      ).toBeVisible();
      console.log("Contact form confirmation has the correct telephone shown.");
    });
  });
});
