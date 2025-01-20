import { Locator, Page } from "@playwright/test";
import { LocalizationHelper } from "../utilities/localizationHelper";

export class AgencyContactPage {
  private page: Page;

  private locators = {
    //Agency Details Locators
    agencyNameLink: (agencyName: string) =>
      this.page.getByRole("link", {
        name: agencyName,
      }),
    contactAgencyButton: () => {
      const showTelephone = LocalizationHelper.getLocalizedText(
        "buttons",
        "showTelephone"
      );
      return this.page
        .getByRole("button")
        .filter({ hasText: showTelephone })
        .first();
    },

    //Contact Form Locators
    contactMessageInput: () => this.page.locator("#questionInput"),
    contactEmailInput: () => this.page.locator("#emailAddress"),
    contactFirstNameInput: () => this.page.locator("#firstName"),
    contactLastNameInput: () => this.page.locator("#lastName"),
    contactTelephoneInput: () => this.page.locator("#phoneNumber"),
    contactSubmitButton: () => {
      const contactFormSubmit = LocalizationHelper.getLocalizedText(
        "buttons",
        "contactFormSubmit"
      );
      return this.page.getByRole("button", { name: contactFormSubmit });
    },

    //Viewing Form Locators
    viewingRequestCheckbox: () => this.page.locator("#checkbox-viewingRequest"),
    viewingDayCheckbox: (daySelector: string) =>
      this.page.locator(`label[for="checkbox-${daySelector}"]`),
    viewingTimeCheckbox: (timeSelector: string) =>
      this.page.locator(`label[for="checkbox-${timeSelector}"]`),

    // Contact form confirmation
    confrimationMessageHeader: () => {
      const contactFormConfirmationLabel = LocalizationHelper.getLocalizedText(
        "buttons",
        "contactFormConfirmationHeader"
      );
      return this.page.locator(
        `//h2[contains(text(), '${contactFormConfirmationLabel}')]`
      );
    },
    emailConfirmationLabel: (email: string) =>
      this.page.locator(`span.block:text("${email}")`),
    telephoneConfirmationLabel: (telephone: string) =>
      this.page.locator(`span.block:text("${telephone}")`),
  };

  constructor(page: Page) {
    this.page = page;
  }
  async contactAgency(
    message: string,
    email: string,
    firstName: string,
    lastName: string,
    telephone: string
  ): Promise<void> {
    console.log(
      "Waiting for the contact page to be completely loaded before filling it."
    );
    await this.page.waitForLoadState("networkidle");
    await this.locators.contactMessageInput().fill(message);
    console.log(
      `Message: "${message}" has been added to the Agency contact form.`
    );
    await this.locators.contactEmailInput().fill(email);
    console.log(`Email: "${email}" has been added to the Agency contact form.`);
    await this.locators.contactFirstNameInput().fill(firstName);
    console.log(
      `First Name: "${firstName}" has been added to the Agency contact form.`
    );
    await this.locators.contactLastNameInput().fill(lastName);
    console.log(
      `Last Name: "${lastName}" has been added to the Agency contact form.`
    );
    await this.locators.contactTelephoneInput().fill(telephone);
    console.log(
      `Telephone: "${telephone}" has been added to the Agency contact form.`
    );
    await this.locators.contactSubmitButton().click();
    console.log("The Agency contact form has been submitted.");
  }
  async requestViewing(viewingDay: string, viewinTime: string): Promise<void> {
    await this.locators.viewingRequestCheckbox().click();
    console.log("Selected Viewing a request checkbox.");
    console.log(
      "Waiting for the contact page to be completely loaded before selecting viewing info."
    );
    await this.page.waitForLoadState("networkidle");
    await this.locators.viewingDayCheckbox(viewingDay).click();
    console.log("Selected day : '${viewingDay}' as a vieiwng day.");
    await this.locators.viewingTimeCheckbox(viewinTime).click();
    console.log("Selected time : " + viewinTime + " as a vieiwng time.");
  }
  get confirmationMessageHeader(): Locator {
    this.page.waitForLoadState("networkidle");
    return this.locators.confrimationMessageHeader();
  }
  getEmailConfirmationLabel(email: string) {
    return this.locators.emailConfirmationLabel(email);
  }
  getTelephoneConfirmationLabel(telephone: string) {
    return this.locators.telephoneConfirmationLabel(telephone);
  }
}
