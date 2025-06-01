import { Page, expect, Locator } from '@playwright/test';

export class CartPage {
  readonly checkoutButton: Locator;
  constructor(private page: Page) {
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  async goto() {
    await this.page.click('.shopping_cart_link');
    await expect(this.page).toHaveURL(/cart/);
  }

  async removeProduct(productName: string) {
    await this.page.locator(`.cart_item:has-text("${productName}") button`).click();
  }

  async assertCartIsEmpty() {
    await expect(this.page.locator('.cart_item')).toHaveCount(0);
  }

  async assertItemInCart(productName: string) {
    const item = this.page.locator('.cart_item').filter({ hasText: productName });
    await expect(item).toBeVisible();
  }

  async checkout() {
    await this.page.click('[data-test="checkout"]');
  }
}