import { Page } from "@playwright/test";
import { LoginPage } from "./loginPage";
import { HomePage } from "./homePage";
import { SearchPage } from "./searchPage";
import { HouseDetailsPage } from "./houseDetailsPage";
import { AgencyContactPage } from "./agencyContactPage";

export class PageManager {
  page: Page;
  loginPage: LoginPage;
  homePage: HomePage;
  searchPage: SearchPage;
  houseDetailsPage: HouseDetailsPage;
  agencyContactPage: AgencyContactPage;

  constructor(page: Page) {
    this.page = page;
    this.loginPage = new LoginPage(page);
    this.homePage = new HomePage(page);
    this.searchPage = new SearchPage(page);
    this.houseDetailsPage = new HouseDetailsPage(page);
    this.agencyContactPage = new AgencyContactPage(page);
  }
}
