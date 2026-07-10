import { test, expect } from '../fixtures/fixtures';

test.describe('Dashboard - Chairlyo', () => {

  test.beforeEach(async ({ loginPage, dashboardPage, baseUrl, email, password }) => {
    await loginPage.navigateToChairlyo(baseUrl);
    await loginPage.loginToChairlyo(email, password);
  });

  test('Dashboard should show all stat cards', async ({ dashboardPage }) => {
    await expect(dashboardPage.locators.totalOrganizationsCard).toBeVisible();
    await expect(dashboardPage.locators.activeOrganizationsCard).toBeVisible();
    await expect(dashboardPage.locators.trialOrganizationsCard).toBeVisible();
    await expect(dashboardPage.locators.suspendedOrganizationsCard).toBeVisible();
    await expect(dashboardPage.locators.totalUsersCard).toBeVisible();
    await expect(dashboardPage.locators.expiringSoonCard).toBeVisible();
  });

  test('Sidebar navigation links should be visible', async ({ dashboardPage }) => {
    await expect(dashboardPage.locators.dashboardLink).toBeVisible();
    await expect(dashboardPage.locators.organizationsLink).toBeVisible();
    await expect(dashboardPage.locators.plansAndPricingLink).toBeVisible();
    await expect(dashboardPage.locators.platformSettingsLink).toBeVisible();
  });

  test('Clicking Organizations link should navigate to Organizations page', async ({ dashboardPage, page }) => {
    await dashboardPage.goToOrganizations();
    await expect(page).toHaveURL(/organizations/);
  });

  test('User name should be visible on dashboard', async ({ dashboardPage }) => {
    await expect(dashboardPage.locators.userName).toBeVisible();
  });

});