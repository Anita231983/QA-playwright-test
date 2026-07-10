import { expect, test } from '../fixtures/fixtures';
import LoginPage from '../pages/loginPage';

test.describe('Login', () => {
  let loginPage: LoginPage;

  test.beforeEach('Navigate to Chairlyo Login Page', async ({ baseUrl, page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateToChairlyo(baseUrl);
  });

  test('Login with valid credentials', async ({ email, password }) => {
    // Different ways to locate the Email field

    // CSS Attribute Selector (Recommended for this demo)
    // await loginPage.fillEmail(email);
    // await loginPage.fillEmail(email);

    await loginPage.loginToChairlyo(email, password);
    await loginPage.verifyLoginSuccess();

    // ID Selector
    // await page.locator('#email').fill(email);

    // Name Attribute
    // await page.locator('[name="email"]').fill(email);

    // By Role
    // await page.getByRole('textbox', { name: 'Email*' }).fill(email);

    //  By Placeholder
//     await page.getByPlaceholder('e.g. xyz@gmail.com').fill(email);

//     // Different ways to locate the Password field

//     // CSS Attribute Selector
//     await page.locator('[name="password"]').fill(password);

//     // ID Selector
//     // await page.locator('#password').fill(password);

//     // By Label
//     // await page.getByLabel('Password').fill(password);

//     // Different ways to locate the Login button

//     // By Role (Recommended)
//     await page.getByRole('button', { name: 'log in' }).click();

//     // By Placeholder
//     // await page.getByPlaceholder('e.g. xyz@gmail.com').fill(email);

//     // Different ways to locate the Password field

//     // CSS Attribute Selector
//     await page.locator('[name="password"]').fill(password);

//     // ID Selector
//     // await page.locator('#password').fill(password);

//     // By Label
//     // await page.getByLabel('Password').fill(password);

//     // Different ways to locate the Login button

//     // By Role (Recommended)
//     await page.getByRole('button', { name: 'log in' }).click();



  });

});

//import { test, expect } from '@playwright/test';
// import LoginPage from '../pages/loginPage';

// test.describe('Login', () => {
//   const email = 'admin@chairlyo.com';
//   const password = 'adminpassword';
//   const baseUrl = 'https://stage.chairlyo.com/login';
//   let loginPage: LoginPage;

//   test.beforeEach('Navigate to Chairlyo Login Page', async ({ page }) => {
//     loginPage = new LoginPage(page);
//     await loginPage.navigateToChairlyo(baseUrl);
//   });

//   test('Login with valid credentials', async ({ page }) => {
//     await loginPage.loginToChairlyo(email, password);
//     await loginPage.verifyLoginSuccess();
//     await loginPage.verifyDashboardText();

//     //await expect(page.getByText('Dashboard').nth(1)).toBeVisible();
//   });

//   test('verify email and password field values', async () => {
//     //Email input field value verification
//     await loginPage.fillEmail(email);
//     await loginPage.verifyEmailFieldValue(email);

//     //Password input field value verification
//     await loginPage.fillPassword(password);
//     await loginPage.verifyPasswordFieldValue(password);

//     //Click on login button
//     await loginPage.clickLoginButton();

//     //Verify login success
//     await loginPage.verifyLoginSuccess();
//     await loginPage.verifyDashboardText();
//   });
// });

// test.skip('test', async ({ page }) => {
// });

  //   
  // import { test, expect } from '@playwright/test';

// test.describe('Login', () => {
//   const email = 'admin@chairlyo.com';
//   const password = 'adminpassword';
//   const baseUrl = 'https://stage.chairlyo.com/login';

//   test.beforeEach('Navigate to Chairlyo Login Page', async ({ page }) => {
//     await page.goto(baseUrl);
//   });

  // test('Login with valid credentials', async ({ page }) => {
  //   // Different ways to locate the Email field

    // CSS Attribute Selector (Recommended for this demo)
//     await page.locator('[type="email"]').fill(email);

//     await loginPage.loginToChairlyo(email, password);
//     await loginPage.verifyLoginSuccess();

//     //getByText is used to locate the element with text Dashboard when there is no any locator available
//     await expect(page.getByText('Dashboard')).toBeVisible();

//     // ID Selector
//     // await page.locator('#email').fill(email);

//     // Name Attribute
//     // await page.locator('[name="email"]').fill(email);

//     // By Role
//     // await page.getByRole('textbox', { name: 'Email*' }).fill(email);

//     // By Placeholder
//     // await page.getByPlaceholder('e.g. xyz@gmail.com').fill(email);

//     // Different ways to locate the Password field

//     // CSS Attribute Selector
//     await page.locator('[name="password"]').fill(password);

//     // ID Selector
//     // await page.locator('#password').fill(password);

//     // By Label
//     // await page.getByLabel('Password').fill(password);

//     // Different ways to locate the Login button

//     // By Role (Recommended)
//     await page.getByRole('button', { name: 'log in' }).click();

