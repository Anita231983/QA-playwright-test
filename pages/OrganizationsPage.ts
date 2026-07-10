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
    await this.page.getByText(status, { exact: true }).click();
  }

  async selectPlanType(planName: string) {
    await this.locators.planTypeDropdown.click();
    await this.page.getByText(planName, { exact: true }).click();
  }

  async selectTimezone(city: string) {
    await this.locators.timezoneDropdown.click();
    await this.locators.timezoneSearchInput.fill(city);
    await this.page.getByText(city, { exact: false }).first().click();
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
    await this.selectPlanType(data.planType);
    // Timezone default (Kathmandu) राख्ने भए यो call नचाहिन्छ:
    // await this.selectTimezone('Kathmandu');

    await this.locators.firstNameInput.fill(data.firstName);
    await this.locators.lastNameInput.fill(data.lastName);
    await this.locators.emailInput.fill(data.email);
    await this.locators.passwordInput.fill(data.password);
    await this.locators.phoneInput.fill(data.phone);

    await this.locators.saveChangesButton.click();
  }

  async cancelOrganizationCreation() {
    await this.locators.cancelButton.click();
  }
}

// import { expect, Page } from '@playwright/test';
// import BasePage from './BasePage';
// import OrganizationsLocators from '../locators/organizations.locator';

// export default class OrganizationsPage extends BasePage {
//   readonly locators: OrganizationsLocators;

//   constructor(page: Page) {
//     super(page);
//     this.locators = new OrganizationsLocators(page);
//   }

//   async createOrganization(name: string) {
//     await this.locators.addOrganizationButton.click();
//     await this.locators.organizationNameInput.fill(name);
//     await this.locators.saveButton.click();
//   }

//   async editOrganization(newName: string) {
//     await this.locators.editButton.click();
//     await this.locators.organizationNameInput.fill(newName);
//     await this.locators.updateButton.click();
//   }

//   async deleteOrganization() {
//     await this.locators.deleteButton.click();
//     await this.locators.confirmDeleteButton.click();
//   }

//   async searchOrganization(name: string) {
//     await this.locators.searchInput.fill(name);
//   }

//   async verifyOrganizationExists(name: string) {
//     await expect(this.locators.organizationNameCell.filter({ hasText: name })).toBeVisible();
//   }
// }