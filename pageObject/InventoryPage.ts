import { Page, expect, Locator } from '@playwright/test';

export class InventoryPage {
  readonly cartLink: Locator;
  constructor(private page: Page) {
    this.page = page;
    this.cartLink = page.locator('.shopping_cart_link');
  }

  async assertOnInventoryPage() {
    await expect(this.page).toHaveURL(/.*inventory\.html/);
    await expect(this.page.locator('.product_sort_container')).toBeVisible();
    await expect(this.page.locator('.inventory_list')).toBeVisible();

  }

  async addProductToCart(productName: string) {
    await this.page.locator(`.inventory_item:has-text("${productName}") button`).click();
  }

  async assertCartItemCount(expected: number) {
    const badge = this.page.locator('.shopping_cart_badge');
    if (expected > 0) {
      await expect(badge).toHaveText(String(expected));
    } else {
      await expect(badge).toHaveCount(0);
    }
  }

  async openProductDetails(productName: string) {
  await this.page.locator('.inventory_item_name', { hasText: productName }).click();
  }

  async goToCart() {
    await this.cartLink.click();
  }
  
  async sortBy(optionValue: string) {
    const dropdown = this.page.locator('.product_sort_container');
    await dropdown.waitFor({ state: 'visible' }); // wait for dropdown to be visible
    await dropdown.selectOption(optionValue);
}


  async getProductPrices(): Promise<number[]> {
    const prices = await this.page.locator('.inventory_item_price').allTextContents();
    return prices.map(p => parseFloat(p.replace('$', '')));
  }

  async getAllProductPrices(): Promise<number[]> {
    const priceTexts = await this.page.$$eval('.inventory_item_price', elements =>
      elements.map(el => el.textContent?.replace('$', '').trim())
    );
    return priceTexts.map(p => parseFloat(p!));
  }

}
