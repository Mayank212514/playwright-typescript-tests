import { Page, expect, Locator } from '@playwright/test';

export class CheckoutPage {
  readonly confirmationMessage: Locator;
  constructor(private page: Page) {
    this.confirmationMessage = page.locator('.complete-header');
  }

  async fillInformation(firstName: string, lastName: string, zip: string) {
    await this.page.fill('[data-test="firstName"]', firstName);
    await this.page.fill('[data-test="lastName"]', lastName);
    await this.page.fill('[data-test="postalCode"]', zip);
  }

  async continue() {
    await this.page.locator('.submit-button').click();
  }

  async finish() {
    await this.page.locator('#finish').click();
  }

  async assertOrderComplete() {
    await expect(this.page.locator('.complete-header')).toHaveText('Thank you for your order!');
  }

  orderCompleteMessage() {
    return this.confirmationMessage;
  }
}
