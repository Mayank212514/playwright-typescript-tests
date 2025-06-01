import { Page, Locator, expect } from '@playwright/test';
import { allure } from 'allure-playwright';
import { attachScreenshot } from '../utils/allureHelper';


export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMsg: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('#user-name');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#login-button');
    this.errorMsg = page.locator('[data-test="error"]');
  }

  async login(username: string, password: string) {
    await allure.step('Go to login page', async () => {
      await this.page.goto('https://www.saucedemo.com/');
    });

    await allure.step('Fill in username and password', async () => {
      await this.usernameInput.fill(username);
      await this.passwordInput.fill(password);
    });

    await allure.step('Click login button', async () => {
      await this.loginButton.click();
    });

    await attachScreenshot(this.page, 'After login attempt');
  }

  async assertLoginError(expectedText?: string) {
    await allure.step('Check login error message', async () => {
      await expect(this.errorMsg).toBeVisible();
      if (expectedText) {
      await expect(this.errorMsg).toContainText(expectedText);
    }
    });
  }

  /*async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async assertLoginError(expectedText?: string) {
    await expect(this.errorMsg).toBeVisible();
    if (expectedText) {
      await expect(this.errorMsg).toContainText(expectedText);
    }
  }*/

  errorMessage() {
    return this.errorMsg;
  }
}
