import { test, expect } from '@playwright/test';
import { LoginPage } from '../pageObject/LoginPage';

test.describe('Negative Login Tests', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    //await loginPage.login();
  });

  test('Login with invalid username', async () => {
    await loginPage.login('invalid_user', 'secret_sauce');
    await expect(loginPage.errorMessage()).toContainText('Epic sadface: Username and password do not match any user in this service');
  });

  test('Login with invalid password', async () => {
    await loginPage.login('standard_user', 'wrong_password');
    await expect(loginPage.errorMessage()).toContainText('Epic sadface: Username and password do not match any user in this service');
  });

  test('Login with empty credentials', async () => {
    await loginPage.login('', '');
    await expect(loginPage.errorMessage()).toContainText('Epic sadface: Username is required');
  });

  test('Locked out user', async () => {
    await loginPage.login('locked_out_user', 'secret_sauce');
    await loginPage.assertLoginError('Epic sadface: Sorry, this user has been locked out.');
  });
});
