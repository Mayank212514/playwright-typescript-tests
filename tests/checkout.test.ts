import { test, expect } from '@playwright/test';
import { LoginPage } from '../pageObject/LoginPage';
import { InventoryPage } from '../pageObject/InventoryPage';
import { CartPage } from '../pageObject/CartPage';
import { CheckoutPage } from '../pageObject/CheckoutPage';

test('Complete checkout (happy path)', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  //await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');

  const productName = 'Sauce Labs Backpack';
  await inventoryPage.addProductToCart(productName);
  await cartPage.goto();

  await cartPage.checkout();
  await checkoutPage.fillInformation('John', 'Doe', '12345');
  await checkoutPage.continue();
  await checkoutPage.finish();

  await checkoutPage.assertOrderComplete();
});
