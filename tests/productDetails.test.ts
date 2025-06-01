import { test } from '@playwright/test';
import { LoginPage } from '../pageObject/LoginPage';
import { InventoryPage } from '../pageObject/InventoryPage';
import { ProductDetailsPage } from '../pageObject/ProductDetailsPage';
import { CartPage } from '../pageObject/CartPage';

/*test('Verify product details page displays correct title and price', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const productDetailsPage = new ProductDetailsPage(page);

  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');

  const productName = 'Sauce Labs Backpack';
  const expectedPrice = '$29.99';

  await inventoryPage.openProductDetails(productName);
  await productDetailsPage.assertProductTitle(productName);
  await productDetailsPage.assertProductPrice(expectedPrice);
});*/

test('Verify product details and add to cart from product detail page', async ({ page }) => {
  const login = new LoginPage(page);
  const inventory = new InventoryPage(page);
  const productDetails = new ProductDetailsPage(page);
  const cart = new CartPage(page);

  //await login.goto();
  await login.login('standard_user', 'secret_sauce');
  await inventory.assertOnInventoryPage();

  // Go to product detail page
  await page.click('.inventory_item_name', { timeout: 5000 }); // Click first product

  await productDetails.assertProductDetails({
    title: 'Sauce Labs Backpack',
    description: 'carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.',
    price: '$29.99',
  });

  await productDetails.addToCart();
  await productDetails.goBackToInventory();
  await inventory.goToCart();

  await cart.assertItemInCart('Sauce Labs Backpack');
});
