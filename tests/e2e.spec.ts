import { test, expect } from '@playwright/test';
import { MainPage } from './pages/mainPage';

test.describe('E2E тесты интернет магазина Wildberries', () => {
  test('Открыть главную страницу, найти смартфоны, добавить три в корзину и проверить их добавление', async ({ page }) => {
    const mainPage = new MainPage(page);
    await mainPage.addProducts();
    const cartPage = await mainPage.goToCard();
    
    expect(await cartPage.productsCount()).toEqual(3);
  });
  
  test('Открыть страницу авторизации, заполнить форму, запросить код и проверить что появилось поле ввода кода или капча', async ({ page }) => {
    const mainPage = new MainPage(page);
    const loginPage = await mainPage.openLoginPage();
    await loginPage.enterPhoneNumber();

    expect(await loginPage.confirmCodeInput.isVisible() || await loginPage.smsCaptchaCode.isVisible()).toBeTruthy();
  });
})

