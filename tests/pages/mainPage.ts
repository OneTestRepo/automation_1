import { Locator, Page } from '@playwright/test';
import { LoginPage } from './loginPage';
import { CartPage } from './cartPage';

export class MainPage {
    readonly page: Page;
    readonly products: Locator;
    readonly searchInput: Locator;
    readonly cartLink: Locator;
    readonly loginLink: Locator;

    readonly category = 'Смартфоны';
    readonly url = 'https://www.wildberries.ru/';
  
    constructor(page: Page) {
      this.page = page;
      this.products = page.locator('.product-card');
      this.searchInput = page.locator('.search-catalog__input');
      this.cartLink = page.locator('.j-item-basket .j-wba-header-item');
      this.loginLink = page.locator('.j-b-header-menu .j-main-login');
    }
  
    async goto() {
      await this.page.goto(this.url);
    }

    async searchCategory() {
        await this.searchInput.fill(this.category);
        await this.searchInput.press('Enter');
    }

    async clickOnBasket() {
        for (let index = 0; index < 3; index++) {
            const product = this.products.nth(index);
            await product.hover();
            const basketButton = product.locator('.j-add-to-basket');
            await basketButton.waitFor({state: 'visible'});
            await basketButton.click();
            await this.page.waitForLoadState('networkidle');
        }
    }
  
    async addProducts() {
      await this.goto();
      await this.searchCategory();
      await this.clickOnBasket();
    }

    async goToCard() {
        await this.cartLink.click();
        return new CartPage(this.page);
    }

    async openLoginPage() {
      await this.goto();
      await this.loginLink.waitFor({state: 'visible'});
      await this.loginLink.click();
      return new LoginPage(this.page);
    }
}