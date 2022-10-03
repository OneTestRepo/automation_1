import { Locator, Page, selectors } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly phonePrifixDropDown: Locator;
    readonly phonePrifixOption: Locator;
    readonly phoneInput: Locator;
    readonly requestCodeButton: Locator;
    readonly loginCodeMessage: Locator;
    readonly confirmCodeInput: Locator;
    readonly smsCaptchaCode: Locator;

    constructor(page: Page) {
        this.page = page;
        this.phonePrifixDropDown = page.locator('.form-block__dropdown');
        this.phoneInput = page.locator('.input-item');
        this.requestCodeButton = page.locator('#requestCode');
        this.loginCodeMessage = page.locator('.login__code-message');
        this.confirmCodeInput = page.locator('.j-input-confirm-code');
        this.smsCaptchaCode = page.locator('#smsCaptchaCode');
    }

    async selectPhonePrefix(prefix = '+7') {
        await this.phonePrifixDropDown.waitFor({state: 'visible'});
        await this.phonePrifixDropDown.click();

        // waits for the opacity transition for the drop down
        await this.page.waitForFunction((selector) => {
            const element = document.querySelector(selector);
            const opacity = window.getComputedStyle(element!).getPropertyValue('opacity');
            return opacity === '1';
        }, '.drop-list');
           
        const phonePrifixOption = this.page.locator('.drop-select', {hasText: prefix});
        await phonePrifixOption.click();
    }

    async fillPhoneInput(phoneNumbr = '8888888888') {
        await this.phoneInput.waitFor({state: 'visible'});
        await this.phoneInput.click();
        await this.phoneInput.fill(phoneNumbr);
    }

    async enterPhoneNumber() {
        await this.selectPhonePrefix('+7');
        await this.fillPhoneInput();
        await this.requestCodeButton.click();

        await this.page.waitForTimeout(1000);
    }

}