import { test } from '@playwright/test';
import { LoginPage } from '../pageObject/LoginPage';
import { InventoryPage } from '../pageObject/InventoryPage';
import { CartPage } from '../pageObject/CartPage';

test.describe('Cart Tests', () => {
  const username = 'standard_user';
  const password = 'secret_sauce';
  const productName = 'Sauce Labs Backpack';

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    //await loginPage.goto();
    await loginPage.login(username, password);
  });

  test('Add product to cart', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    await inventoryPage.assertOnInventoryPage();
    await inventoryPage.addProductToCart(productName);
    await inventoryPage.assertCartItemCount(1);

    await cartPage.goto();
    await page.locator('.cart_item:has-text("' + productName + '")').waitFor();
  });

  test('Remove product from cart', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    await inventoryPage.addProductToCart(productName);
    await cartPage.goto();
    await cartPage.removeProduct(productName);
    await cartPage.assertCartIsEmpty();
  });
});
