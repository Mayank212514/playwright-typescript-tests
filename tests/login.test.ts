import { test } from '@playwright/test';
import { LoginPage } from '../pageObject/LoginPage';
import { InventoryPage } from '../pageObject/InventoryPage';
import { allure } from 'allure-playwright';
import { attachConsoleLogs } from '../utils/allureHelper';

test.describe('Login Tests', () => {
  test('Login with valid credentials', async ({ page }) => {
    const login = new LoginPage(page);
    const inventory = new InventoryPage(page);

    await login.login('standard_user', 'secret_sauce');
    //await login.login('standard_user', 'secret_sauce');
    await inventory.assertOnInventoryPage();
  });

  test('Login with invalid credentials', async ({ page }) => {
    const login = new LoginPage(page);
    const logs: string[] = [];

    // Capture browser logs
    page.on('console', msg => logs.push(`[${msg.type()}] ${msg.text()}`));

    await login.login('standard_user', 'wrong_pass');
    //await login.login('wrong_user', 'wrong_pass');
    await login.assertLoginError();

    attachConsoleLogs(logs, 'Browser Console Log');
  });
});
