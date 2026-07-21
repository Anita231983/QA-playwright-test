import { expect, Page, } from '@playwright/test';
import BasePage from './BasePage';
import OrganizationLocators from '../locators/organizations.locator';

export default class OrganizationPage extends BasePage {
  readonly organizationLocators: OrganizationLocators;
  constructor(page: Page) {
    super(page);
    this.organizationLocators = new OrganizationLocators(page);
  }

  async verifyOrganizationPage() {
    await expect(this.page).toHaveURL(/\/organizations$/);
  }

  async clickAddOrganizationButton() {
    await this.organizationLocators.addOrganizationButton.click();
  }

  async verifyAddOrganizationForm() {
    await expect(this.organizationLocators.organizationForm).toBeVisible();
    await expect(this.organizationLocators.addOrgFormTitle).toBeVisible();
  }

  async fillOrganizationName(name: string) {
    await this.organizationLocators.organizationNameInput.fill(name);
  }

  async fillSlug(slug: string) {
    await this.organizationLocators.slugInput.fill(slug);
  }

  async selectStatus(status: string) {
    await this.organizationLocators.statusDropdown.click();
    await this.page.getByTestId('select-group').getByText(status, { exact: true }).click();
  }

  async selectPlanType(planType: string) {
    await this.organizationLocators.planTypeDropdown.click();
    await this.page.getByTestId('select-group').getByText(planType, { exact: true }).click();
  }

  async selectTimezone(timezone: string) {
    await this.organizationLocators.timezoneDropdown.click();
    await this.organizationLocators.timezoneSearchInput.fill(timezone);
    await this.page.getByText(timezone, { exact: false }).first().click();
  }

  async uploadOrganizationImage(filePath: string) {
    await this.organizationLocators.browseFilesButton.setInputFiles(filePath);
    await this.organizationLocators.cropAndUploadButton.click();
    await expect(this.organizationLocators.imageUploadSuccessalertMessage).toBeVisible();
  }

  async fillTrialDays(trialDays: string) {
    await this.organizationLocators.trialDaysInput.fill(trialDays);
  }

  async fillOrganizationDetails(details: { name: string; slug: string; status: string; planType: string; timezone?: string; trialDays?: string; imagePath?: string }) {
    await this.fillOrganizationName(details.name);
    await this.fillSlug(details.slug);
    await this.selectStatus(details.status);
    await this.selectPlanType(details.planType);
    if (details.timezone) {
      await this.selectTimezone(details.timezone);
    }
    if (details.trialDays) {
      await this.fillTrialDays(details.trialDays);
    }
    if (details.imagePath) {
      await this.uploadOrganizationImage(details.imagePath);
    }
  }

  async fillFirstName(firstName: string) {
    await this.organizationLocators.firstNameInput.fill(firstName);
  }

  async fillLastName(lastName: string) {
    await this.organizationLocators.lastNameInput.fill(lastName);
  }

  async fillEmail(email: string) {
    await this.organizationLocators.emailInput.fill(email);
  }

  async fillPassword(password: string) {
    await this.organizationLocators.passwordInput.fill(password);
  }

  async selectCountryCode(countryCode: string) {
    await this.organizationLocators.countryCodeDropdown.click();
    await this.page.getByText(countryCode, { exact: false }).click();
  }

  async fillPhone(phone: string) {
    await this.organizationLocators.phoneInput.fill(phone);
  }

  async toggleEmailNotifications() {
    await this.organizationLocators.enableEmailNotificationsToggle.click();
  }

  async fillMainAdminDetails(admin: { firstName: string; lastName: string; email: string; password: string; phone: string; countryCode?: string; enableEmailNotifications?: boolean }) {
    await this.fillFirstName(admin.firstName);
    await this.fillLastName(admin.lastName);
    await this.fillEmail(admin.email);
    await this.fillPassword(admin.password);
    if (admin.countryCode) {
      await this.selectCountryCode(admin.countryCode);
    }
    await this.fillPhone(admin.phone);
    if (admin.enableEmailNotifications) {
      await this.toggleEmailNotifications();
    }
  }

  async clickSaveChanges() {
    await this.organizationLocators.saveChangesButton.click();
    
  }

  async clickCancel() {
    await this.organizationLocators.cancelButton.click();
  }

  async clickBack() {
    await this.organizationLocators.backButton.click();
  }

  getOrganizationRowByName(name: string) {
    return this.organizationLocators.organizationRow.filter({ hasText: name });
  }

  async verifyOrganizationCreated(name: string) {
    await expect(this.organizationLocators.alertMessage).toBeVisible();
    await expect(this.getOrganizationRowByName(name)).toBeVisible();
  }
  async captureScreenshot(testInfo:any){
    // screenshoot of specific element

    await this.organizationLocators.organizationNameInput.screenshot({ 
      path: `screenshots/summary.png` });

    // attach to test report

    await testInfo.attach('checkout-state', {
      body: await this.page.screenshot(),
      contentType: 'image/png'
    });

  }

  async addOrganization(org: {
    name: string; slug: string; status: string; planType: string; timezone?: string; trialDays?: string; imagePath?: string;
    admin: { firstName: string; lastName: string; email: string; password: string; phone: string; countryCode?: string; enableEmailNotifications?: boolean };
  }) {
    await this.fillOrganizationDetails(org);
    await this.fillMainAdminDetails(org.admin);
    await this.clickSaveChanges();
  }

  //  Edit Organization 

  async clickEditIconForRow(name: string) {
    await this.getOrganizationRowByName(name).locator('svg').nth(1).click();
  }

  async verifyEditOrganizationForm() {
    await expect(this.organizationLocators.editOrgFormTitle).toBeVisible();
  }

  async updateMaxBranches(value: string) {
    await this.organizationLocators.maxBranchesInput.fill(value);
  }

  async updateMaxEmployees(value: string) {
    await this.organizationLocators.maxEmployeesInput.fill(value);
  }

  async updateMaxWebhooks(value: string) {
    await this.organizationLocators.maxWebhooksInput.fill(value);
  }

  async updateOrganization(details: { maxBranches?: string; maxEmployees?: string; maxWebhooks?: string }) {
    if (details.maxBranches) {
      await this.updateMaxBranches(details.maxBranches);
    }
    if (details.maxEmployees) {
      await this.updateMaxEmployees(details.maxEmployees);
    }
    if (details.maxWebhooks) {
      await this.updateMaxWebhooks(details.maxWebhooks);
    }
    await this.clickSaveChanges();
  }

  //  Delete Organization 

  async clickDeleteIconForRow(name: string) {
    await this.getOrganizationRowByName(name).locator('svg').nth(3).click();
  }

  async verifyDeleteModal() {
    await expect(this.organizationLocators.deleteModalTitle).toBeVisible();
  }

  async confirmDelete() {
    await this.organizationLocators.deleteConfirmInput.fill('Delete Organization');
    await this.organizationLocators.deleteOrganizationButton.click();
  }

  async cancelDelete() {
    await this.organizationLocators.deleteCancelButton.click();
  }

  async deleteOrganization(name: string) {
    await this.clickDeleteIconForRow(name);
    await this.verifyDeleteModal();
    await this.confirmDelete();
  }

  async verifyOrganizationDeleted(name: string) {
    await expect(this.getOrganizationRowByName(name)).not.toBeVisible();
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
//   async verifyOrganizationPage() {
//     await expect(this.page).toHaveURL(/organizations/);
//   }
//   async clickAddOrganizationButton() {
//     await this.locators.addOrganizationButton.click();
//   }
//   async verifyAddOrganizationForm() {
//     await expect(this.locators.organizationForm).toBeVisible();
//     await expect(this.locators.addOrgFormTitle).toBeVisible();
//   }

//   async fillOrganizationName(name: string) {
//     await this.locators.organizationNameInput.fill(name);
//   }
// //  async verifyAddOrganizationForm() {
//  // await expect(this.organizationLocators.organizationForm).toBeVisible();
//  // await expect(this.organizationLocators.addOrgFormTitle).toBeVisible();
// //}



// async fillSlug(slug: string) {
//   await this.locators.slugInput.fill(slug);
// }

// async selectStatus(status: string) {
//   await this.locators.statusDropdown.click();
//   await this.page
//     .getByTestId('select-group')
//     .getByText(status, { exact: true })
//     .click();
// }

// async selectPlanType(planType: string) {
//   await this.locators.planTypeDropdown.click();
//   await this.page
//     .getByTestId('select-group')
//     .getByText(planType, { exact: true })
//     .click();
// }

// async selectTimezone(timezone: string) {
//   await this.locators.timezoneDropdown.click();
//   await this.locators.timezoneSearchInput.fill(timezone);
//   await this.page
//     .getByText(timezone, { exact: false })
//     .first()
//     .click();
// }

//   async openAddOrganizationForm() {
    
//     await this.locators.addOrganizationButton.click();
//   }
// async uploadOrganizationImage(imagePath: string) {
//   await this.locators.imageUploadInput.setInputFiles('assets\images.jpeg');
// }
//   async goBack() {
//     await this.locators.backButton.click();
//   }

//   async getOrganizationRowCount() {
//     return await this.locators.organizationRow.count();
//   }

//   async verifyOrganizationExists(name: string) {
//     await expect(this.locators.organizationNameCell.filter({ hasText: name })).toBeVisible();
//   }

//   async selectStatus(status: 'Trial' | 'Active' | 'Suspended') {
//     await this.locators.statusDropdown.click();
//     await this.page.getByRole('option', { name: status, exact: true }).click();
//     await this.page.waitForTimeout(300);
//   }

//   async selectPlanType(planName: string) {
//     await this.locators.planTypeDropdown.click();
//     await this.page.getByRole('option', { name: planName, exact: true }).click();
//     await this.page.waitForTimeout(300);
//   }

//   async selectTimezone(city: string) {
//     await this.locators.timezoneDropdown.click();
//     await this.locators.timezoneSearchInput.fill(city);
//     await this.page.getByRole('option', { name: city }).first().click();
//   }

//   async toggleEmailNotifications() {
//     await this.locators.enableEmailNotificationsToggle.click();
//   }

//   async verifyEmailNotificationsState(checked: boolean) {
//     await expect(this.locators.enableEmailNotificationsToggle).toHaveAttribute(
//       'aria-checked',
//       checked ? 'true' : 'false'
//     );
//   }

//   async createOrganization(data: {
//     orgName: string;
//     slug: string;
//     status: 'Trial' | 'Active' | 'Suspended';
//     planType: string;
//     trialDays: string;
//     firstName: string;
//     lastName: string;
//     email: string;
//     password: string;
//     phone: string;
//   }) {
//     await this.openAddOrganizationForm();

//     await this.locators.organizationNameInput.fill(data.orgName);
//     await this.locators.slugInput.fill(data.slug);

//     await this.selectStatus(data.status);
//     await this.locators.trialDaysInput.fill(data.trialDays);
//     await this.page.waitForTimeout(300);
//     await this.selectPlanType(data.planType);

//     await this.locators.firstNameInput.fill(data.firstName);
//     await this.locators.lastNameInput.fill(data.lastName);
//     await this.locators.emailInput.fill(data.email);
//     await this.locators.passwordInput.fill(data.password);
//     await this.locators.phoneInput.fill(data.phone);

//     await this.locators.saveChangesButton.click();
//     await this.page.waitForLoadState('networkidle');

    
//     await this.page.goto('/organizations');
//     await this.page.waitForLoadState('networkidle');
//   }

//   async cancelOrganizationCreation() {
//     await this.locators.cancelButton.click();
//   }
// }