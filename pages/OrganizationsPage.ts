import { expect, Page } from '@playwright/test';
import BasePage from './BasePage';
import OrganizationsLocators from '../locators/organizations.locator';

export default class OrganizationsPage extends BasePage {
  readonly locators: OrganizationsLocators;

  constructor(page: Page) {
    super(page);
    this.locators = new OrganizationsLocators(page);
  }

  async searchOrganization(name: string) {
    await this.locators.searchInput.fill(name);
  }

  async openAddOrganizationForm() {
    await this.locators.addOrganizationButton.click();
  }

  async goBack() {
    await this.locators.backButton.click();
  }

  async getOrganizationRowCount() {
    return await this.locators.organizationRow.count();
  }

  async verifyOrganizationExists(name: string) {
    await expect(this.locators.organizationNameCell.filter({ hasText: name })).toBeVisible();
  }

  async selectStatus(status: 'Trial' | 'Active' | 'Suspended') {
    await this.locators.statusDropdown.click();
    await this.page.getByRole('option', { name: status, exact: true }).click();
    await this.page.waitForTimeout(300);
  }

  async selectPlanType(planName: string) {
    await this.locators.planTypeDropdown.click();
    await this.page.getByRole('option', { name: planName, exact: true }).click();
    await this.page.waitForTimeout(300);
  }

  async selectTimezone(city: string) {
    await this.locators.timezoneDropdown.click();
    await this.locators.timezoneSearchInput.fill(city);
    await this.page.getByRole('option', { name: city }).first().click();
  }

  async toggleEmailNotifications() {
    await this.locators.enableEmailNotificationsToggle.click();
  }

  async verifyEmailNotificationsState(checked: boolean) {
    await expect(this.locators.enableEmailNotificationsToggle).toHaveAttribute(
      'aria-checked',
      checked ? 'true' : 'false'
    );
  }

  async createOrganization(data: {
    orgName: string;
    slug: string;
    status: 'Trial' | 'Active' | 'Suspended';
    planType: string;
    trialDays: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
  }) {
    await this.openAddOrganizationForm();

    await this.locators.organizationNameInput.fill(data.orgName);
    await this.locators.slugInput.fill(data.slug);

    await this.selectStatus(data.status);
    await this.locators.trialDaysInput.fill(data.trialDays);
    await this.page.waitForTimeout(300);
    await this.selectPlanType(data.planType);

    await this.locators.firstNameInput.fill(data.firstName);
    await this.locators.lastNameInput.fill(data.lastName);
    await this.locators.emailInput.fill(data.email);
    await this.locators.passwordInput.fill(data.password);
    await this.locators.phoneInput.fill(data.phone);

    await this.locators.saveChangesButton.click();
    await this.page.waitForLoadState('networkidle');

    
    await this.page.goto('/organizations');
    await this.page.waitForLoadState('networkidle');
  }

  async cancelOrganizationCreation() {
    await this.locators.cancelButton.click();
  }
}