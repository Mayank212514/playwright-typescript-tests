import { test, expect } from '@playwright/test';
import { LoginPage } from '../pageObject/LoginPage';
import { InventoryPage } from '../pageObject/InventoryPage';
import { CartPage } from '../pageObject/CartPage';
import { CheckoutPage } from '../pageObject/CheckoutPage';

test.describe('E2E User Flows', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);

    //await loginPage.goto();
  });

  test('Successful login, add item, and complete checkout', async () => {
    await loginPage.login('standard_user', 'secret_sauce');
    await inventoryPage.assertOnInventoryPage();

    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    await inventoryPage.goToCart();

    await cartPage.assertItemInCart('Sauce Labs Backpack');
    await cartPage.checkout();

    await checkoutPage.fillInformation('John', 'Doe', '12345');
    await checkoutPage.continue();
    await checkoutPage.finish();

    await expect(checkoutPage.orderCompleteMessage()).toHaveText('Thank you for your order!');
  });

  test('Locked out user cannot login', async () => {
    await loginPage.login('locked_out_user', 'secret_sauce');
    await loginPage.assertLoginError('Sorry, this user has been locked out.');
  });

  test('Verify sorting by price low to high', async () => {
    await loginPage.login('standard_user', 'secret_sauce');
    await inventoryPage.assertOnInventoryPage();

    await inventoryPage.sortBy('lohi');
    const prices = await inventoryPage.getProductPrices();

    // Check if prices array is sorted ascending
    const sortedPrices = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sortedPrices);
  });

  test('Complete purchase flow with multiple items', async () => {
    await loginPage.login('standard_user', 'secret_sauce');
    await inventoryPage.assertOnInventoryPage();

    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    await inventoryPage.addProductToCart('Sauce Labs Bolt T-Shirt');
    await inventoryPage.goToCart();

    await cartPage.assertItemInCart('Sauce Labs Backpack');
    await cartPage.assertItemInCart('Sauce Labs Bolt T-Shirt');

    await cartPage.checkout();
    await checkoutPage.fillInformation('Jane', 'Smith', '54321');
    await checkoutPage.continue();
    await checkoutPage.finish();

    await expect(checkoutPage.orderCompleteMessage()).toHaveText('Thank you for your order!');
  });
});
