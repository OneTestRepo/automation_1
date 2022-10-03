import { Locator, Page } from '@playwright/test';

export class CartPage {
    readonly page: Page;
    readonly productCards: Locator;
    readonly basketSection: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productCards = page.locator('.accordion__list-item');
        this.basketSection = page.locator('#basketForm');
    }

    async productsCount() {
        await this.basketSection.waitFor();
        return await this.productCards.count();
    }
}