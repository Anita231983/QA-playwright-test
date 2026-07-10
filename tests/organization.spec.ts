import { test, expect } from '../fixtures/fixtures';

test.describe('Organizations - Create Organization', () => {

  test.beforeEach(async ({ loginPage, baseUrl, email, password }) => {
    await loginPage.navigateToChairlyo(baseUrl);
    await loginPage.loginToChairlyo(email, password);
  });

  test('Create a new organization', async ({ organizationsPage, page }) => {
    await page.goto('/organizations');

    const uniqueId = Date.now();

    await organizationsPage.createOrganization({
      orgName: `Test Salon ${uniqueId}`,
      slug: `test-salon-${uniqueId}`,
      status: 'Trial',
      planType: 'Claude',
      trialDays: '10',
      firstName: 'Obin',
      lastName: 'Bade',
      email: `obin${uniqueId}@gmail.com`,
      password: 'TestPassword123',
      phone: '9800000000',
    });

    await expect(organizationsPage.locators.organizationRow.first()).toBeVisible();
  });

});