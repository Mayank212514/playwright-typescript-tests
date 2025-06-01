import { Page, Locator, expect } from '@playwright/test';

export class ProductDetailsPage {
  readonly page: Page;
  readonly title: Locator;
  readonly description: Locator;
  readonly price: Locator;
  readonly addToCartButton: Locator;
  readonly backButton: Locator;

  constructor(page: Page) {
    this.page = page
    this.title = page.locator('.inventory_details_name');
    this.description = page.locator('.inventory_details_desc');
    this.price = page.locator('.inventory_details_price');
    this.addToCartButton = page.locator('button:has-text("Add to cart")');
    this.backButton = page.locator('button:has-text("Back to products")');}

  async assertProductTitle(expectedTitle: string) {
    const actualTitle = await this.page.locator('.inventory_details_name').textContent();
    expect(actualTitle?.trim()).toBe(expectedTitle);
  }

  async assertProductPrice(expectedPrice: string) {
    const actualPrice = await this.page.locator('.inventory_details_price').textContent();
    expect(actualPrice?.trim()).toBe(expectedPrice);
  }

  async assertProductDetails(expected: { title: string; description: string; price: string }) {
    await expect(this.title).toHaveText(expected.title);
    await expect(this.description).toHaveText(expected.description);
    await expect(this.price).toHaveText(expected.price);
  }

  async addToCart() {
    await this.addToCartButton.click();
  }

  async goBackToInventory() {
    await this.backButton.click();
  }
}
