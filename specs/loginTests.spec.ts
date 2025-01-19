import { test, expect } from "../fixtures/baseTest";
import { PageManager } from "../pages/pageManager";
import testData from "../data/testData.json";
import * as dotenv from "dotenv";

dotenv.config();

test.describe("Login Tests", () => {
  test("Login with valid credentials", async ({ page }) => {
    const pm = new PageManager(page);
    const username = process.env.USERNAME || '';
    const password = process.env.PASSWORD || '';
    //Arrange
    await test.step("Navigate to login page", async () => {
      await pm.homePage.navigateToLoginPage();
    });
    //Action
    await test.step("Log in with valid credentials", async () => {
      await pm.loginPage.login(username,password
      );
    });
    //Assertion
    await test.step("Verify that user is logged in and Account Menu is shown", async () => {
      await pm.homePage.isAccountMenuVisible();
    });
  });

  test("Login with invalid credentials", async ({ page }) => {
    const pm = new PageManager(page);

    await test.step("Navigate to login page", async () => {
      await pm.homePage.navigateToLoginPage();
    });

    await test.step("Log in with invalid credentials", async () => {
      await pm.loginPage.login(
        testData.credentials.invalid.username,
        testData.credentials.invalid.password
      );
    });

    await test.step("Verify error message is displayed with Reset Password Link", async () => {
      await expect(pm.loginPage.errorMessageText).toBeVisible();
      await expect(pm.loginPage.resetPasswordLink).toBeVisible();
    });
  });
});
