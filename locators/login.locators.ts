import { Locator, Page } from '@playwright/test';

export default class LoginLocators {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly alertMessage: Locator;
  readonly dashboardText: Locator;

  constructor(page: Page) {
    this.emailInput = page.locator('[type="email"]');
    this.passwordInput = page.locator('[name="password"]');
    this.loginButton = page.getByRole('button', { name: 'Log in' });
    this.alertMessage = page.getByRole('alert');
    this.dashboardText = page.getByText('Dashboard').nth(1)
  }
}