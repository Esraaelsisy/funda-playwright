import { Page } from "@playwright/test";
import { LoginPage } from "./loginPage";
import { HomePage } from "./homePage";
import { SearchPage } from "./searchPage";
import { HouseDetailsPage } from "./houseDetailsPage";
import { FavoritesPage } from "./favoritesPage";
import { RealEstateAgencyPage } from "./realEstateAgencyPage";

export class PageManager {
  page: Page;
  loginPage: LoginPage;
  homePage: HomePage;
  searchPage: SearchPage;
  houseDetailsPage: HouseDetailsPage;
  favoritesPage: FavoritesPage;
  realEstateAgencyPage: RealEstateAgencyPage;

  constructor(page: Page) {
    this.page = page;
    this.loginPage = new LoginPage(page);
    this.homePage = new HomePage(page);
    this.searchPage = new SearchPage(page);
    this.houseDetailsPage = new HouseDetailsPage(page);
    this.favoritesPage = new FavoritesPage(page);
    this.realEstateAgencyPage = new RealEstateAgencyPage(page);
  }
}
