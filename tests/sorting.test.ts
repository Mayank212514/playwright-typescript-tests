import { test, expect } from '@playwright/test';
import { LoginPage } from '../pageObject/LoginPage';
import { InventoryPage } from '../pageObject/InventoryPage';

test('Verify sorting by price (low to high)', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  //await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await inventoryPage.assertOnInventoryPage();
  //await inventoryPage.sortBy('Price (low to high)');
  await inventoryPage.sortBy('lohi'); // 'lohi' is the value for "Price (low to high)"

  const prices = await inventoryPage.getAllProductPrices();
  const sorted = [...prices].sort((a, b) => a - b);

  expect(prices).toEqual(sorted);
});
