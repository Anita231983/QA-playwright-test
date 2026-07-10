import { expect, Page } from '@playwright/test';
import BasePage from './BasePage';
import LoginLocators from '../locators/login.locators';

export default class LoginPage extends BasePage {
  readonly locators: LoginLocators;

  constructor(page: Page) {
    super(page);
    this.locators = new LoginLocators(page);
  }

  async fillEmail(email: string) {
    await this.locators.emailInput.fill(email);
  }

  async fillPassword(password: string) {
    await this.locators.passwordInput.fill(password);
  }

  async clickLoginButton() {
    await this.locators.loginButton.click();
  }

  async loginToChairlyo(email: string, password: string) {
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.clickLoginButton();
    await this.page.waitForLoadState('networkidle');
  }

  async verifyLoginSuccess() {
    await expect(this.locators.alertMessage).toBeVisible();
    await expect(this.locators.alertMessage).toContainText('successful');
  }

  async verifyLoginFailure() {
    await expect(this.locators.alertMessage).toBeVisible();
    await expect(this.locators.alertMessage).toContainText('Invalid credentials');
  }
}

// import { expect, Page } from '@playwright/test';
// import BasePage from './BasePage';
// import LoginLocators from '../locators/login.locators';

// export default class LoginPage extends BasePage {
//   readonly loginLocators: LoginLocators;

//   constructor(page: Page) {
//     super(page);
//     this.loginLocators = new LoginLocators(page);
//   }

//   async fillEmail(email: string) {
//     await this.loginLocators.emailInput.waitFor({
//       state: 'visible',
//       timeout: 5000,
//     });
//     await this.loginLocators.emailInput.fill(email);

//     // Explicit timeout, don't use it in production code, it's just for demonstration purposes
//     await this.page.waitForTimeout(1000);
//   }

//   async verifyEmailFieldValue(email: string) {
//     await expect(this.loginLocators.emailInput).toHaveValue(email);
//   }

//   async verifyPasswordFieldValue(password: string) {
//     await expect(this.loginLocators.passwordInput).toHaveValue(password);
//   }

//   async fillPassword(password: string) {
//     await this.loginLocators.passwordInput.fill(password);
//   }

//   async clickLoginButton() {
//     await this.loginLocators.loginButton.click();
//   }

//   // This method matches your test file
//   async login(email: string, password: string) {
//     await this.fillEmail(email);
//     await this.fillPassword(password);
//     await this.clickLoginButton();
//   }

//   // Keeping your existing method unchanged
//   async loginToChairlyo(email: string, password: string) {
//     await this.loginLocators.emailInput.fill(email);
//     await this.loginLocators.passwordInput.fill(password);
//     await this.loginLocators.loginButton.click();
//   }

//   async verifyLoginSuccess() {
//     await expect(this.loginLocators.alertMessage).toBeVisible();
//     await expect(this.loginLocators.alertMessage).toHaveText(
//       'SuccessLogin successful!'
//     );
//   }

//   async verifyLoginFailure() {
//     await expect(this.loginLocators.alertMessage).toBeVisible();
//     await expect(this.loginLocators.alertMessage).toHaveText(
//       'ErrorInvalid Invalid Credentials'
//     );
//   }

//   async verifyDashboardText() {
//     await expect(this.loginLocators.dashboardText).toBeVisible();
//   }
// }