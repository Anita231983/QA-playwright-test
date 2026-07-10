import { Locator, Page } from '@playwright/test';

export default class DashboardLocators {
  readonly dashboardLink: Locator;
  readonly organizationsLink: Locator;
  readonly plansAndPricingLink: Locator;
  readonly platformSettingsLink: Locator;
  readonly userName: Locator;
  readonly logoutButton: Locator;

  readonly totalOrganizationsCard: Locator;
  readonly activeOrganizationsCard: Locator;
  readonly trialOrganizationsCard: Locator;
  readonly suspendedOrganizationsCard: Locator;
  readonly totalUsersCard: Locator;
  readonly expiringSoonCard: Locator;

  constructor(page: Page) {
    this.dashboardLink = page.getByRole('link', { name: 'Dashboard' });
    this.organizationsLink = page.getByRole('link', { name: 'Organizations' });
    this.plansAndPricingLink = page.getByRole('link', { name: 'Plans & Pricing' });
    this.platformSettingsLink = page.getByRole('link', { name: 'Platform Settings' });
    this.userName = page.getByText('System Admin');
    this.logoutButton = page.locator('a:has(svg)').last();

    this.totalOrganizationsCard = page.getByText('Total Organizations');
    this.activeOrganizationsCard = page.getByText('Active Organizations');
    this.trialOrganizationsCard = page.getByText('Trial Organizations');
    this.suspendedOrganizationsCard = page.getByText('Suspended Organizations');
    this.totalUsersCard = page.getByText('Total Users');
    this.expiringSoonCard = page.getByText('Expiring Soon');
  }
}