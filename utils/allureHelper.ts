import { Page } from '@playwright/test';
import { allure } from 'allure-playwright';

export async function attachScreenshot(page: Page, name: string = 'screenshot') {
  const buffer = await page.screenshot();
  allure.attachment(name, buffer, 'image/png');
}

export function attachConsoleLogs(logs: string[], name: string = 'console logs') {
  const content = logs.join('\n');
  allure.attachment(name, content, 'text/plain');
}
