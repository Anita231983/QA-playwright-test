import { Page, Locator } from '@playwright/test';

export default class OrganizationLocators {
  organizationText: Locator;
  // List page header
  readonly pageTitle: Locator;
  readonly pageDescription: Locator;

  // List page - Search & Filters
  readonly searchInput: Locator;
  readonly statusFilterDropdown: Locator;
  readonly plansFilterDropdown: Locator;
  readonly datesFilterDropdown: Locator;
  readonly filterByDateButton: Locator;

  // List page - Create button
  readonly addOrganizationButton: Locator;

  // List page - Table / List
  readonly organizationTable: Locator;
  readonly organizationRow: Locator;
  readonly organizationNameCell: Locator;
  readonly alertMessage: Locator;
  readonly statusColumn: Locator;
  readonly planColumn: Locator;
  readonly trialEndsColumn: Locator;
  readonly adminColumn: Locator;
  readonly editIcon: Locator;
  readonly deleteIcon: Locator;
  readonly viewIcon: Locator;
  readonly changePlanIcon: Locator;

  // Add Organization form - header
  readonly addOrgFormTitle: Locator;
  readonly organizationForm: Locator;
  readonly backButton: Locator;
  readonly saveChangesButton: Locator;
  readonly cancelButton: Locator;

  // Add Organization form - Organization details
  readonly organizationNameInput: Locator;
  readonly slugInput: Locator;
  readonly statusDropdown: Locator;
  readonly browseFilesButton: Locator;
  readonly imageInput: Locator;
  readonly cropAndUploadButton: Locator;
  readonly imageUploadSuccessAlert: Locator;
  readonly planTypeDropdown: Locator;
  readonly timezoneDropdown: Locator;
  readonly timezoneSearchInput: Locator;
  readonly trialDaysInput: Locator;

  // Add Organization form - Main Admin Details
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly countryCodeDropdown: Locator;
  readonly phoneInput: Locator;
  readonly enableEmailNotificationsToggle: Locator;

  //image upload successful
  readonly imageUploadSuccessalertMessage: Locator;

  //select plan type
  readonly planLocator: Locator;
  readonly planTypeOptionLocator: Locator;

  //select status
  readonly statusLocator: Locator;
  readonly statusOptionLocator: Locator;

  //  Edit Organization page 
  readonly editOrgFormTitle: Locator;
  readonly maxBranchesInput: Locator;
  readonly maxEmployeesInput: Locator;
  readonly maxWebhooksInput: Locator;

  //  Delete Organization modal 
  readonly deleteModalTitle: Locator;
  readonly deleteConfirmInput: Locator;
  readonly deleteOrganizationButton: Locator;
  readonly deleteCancelButton: Locator;

  constructor(page: Page) {
    this.organizationText = page.getByRole('heading', { name: 'Organizations' });
    // List page header
    this.pageTitle = page.getByRole('heading', { name: 'Organization' });
    this.pageDescription = page.getByText('Manage all studio organizations');

    // List page - Search & Filters
    this.searchInput = page.getByPlaceholder('Search...');
    this.statusFilterDropdown = page.getByText('All Status');
    this.plansFilterDropdown = page.getByText('All Plans');
    this.datesFilterDropdown = page.getByText('All Dates');
    this.filterByDateButton = page.getByRole('button', { name: 'Filter by date' });

    // List page - Create button
    this.addOrganizationButton = page.getByRole('button', { name: 'Add Organization' });

    // List page - Table / List
    this.organizationTable = page.locator('table');
    this.organizationRow = page.locator('table tbody tr');
    this.organizationNameCell = page.locator('table tbody tr td:first-child');
    this.statusColumn = page.getByText(/Trial|Active|Suspended/);
    this.planColumn = page.locator('table thead').getByText('PLAN');
    this.trialEndsColumn = page.locator('table thead').getByText('TRIAL ENDS');
    this.adminColumn = page.locator('table thead').getByText('ADMIN');

    // Actions column icons order: view, edit, change plan, delete
    this.viewIcon = page.locator('table tbody tr').locator('svg').nth(0);
    this.editIcon = page.locator('table tbody tr').locator('svg').nth(1);
    this.changePlanIcon = page.locator('table tbody tr').locator('svg').nth(2);
    this.deleteIcon = page.locator('table tbody tr').locator('svg').nth(3);

    this.alertMessage = page.locator('[role="alert"]');

    // Add Organization form - header
    this.addOrgFormTitle = page.getByRole('heading', { name: 'Add Organization' });
    this.organizationForm = page.locator(`div > div.flex > form`);
    this.backButton = page.locator('button.rounded-xl.h-9.w-9');
    this.saveChangesButton = page.getByRole('button', { name: 'Save Changes' });
    this.cancelButton = page.getByRole('button', { name: 'Cancel' });

    // Add Organization form - Organization details
    this.organizationNameInput = page.getByPlaceholder('e.g. Web Development');
    this.slugInput = page.getByPlaceholder('e.g. beauty-salon');
    this.statusDropdown = page.getByText('e.g Trial');
    this.browseFilesButton = page.getByText('Browse Files', { exact: true });
    this.imageInput = page.locator('#image-input');
    this.cropAndUploadButton = page.getByRole('button', { name: 'Crop & Upload' });
    this.imageUploadSuccessAlert = page.getByText('The Image has been successfully uploaded');
    this.planTypeDropdown = page.getByText('e.g Monthly');
    this.timezoneDropdown = page.getByText('Kathmandu (+05:45)');
    this.timezoneSearchInput = page.getByPlaceholder('Search city or region...');
    this.trialDaysInput = page.locator('#trial_days');

    //status type
    this.statusLocator = page.getByRole('combobox').filter({ hasText: 'e.g Trial' });
    this.statusOptionLocator = page.getByLabel('Trial').getByText('Trial');

    //plan type
    this.planLocator = page.getByRole('combobox').filter({ hasText: 'e.g Monthly' });
    this.planTypeOptionLocator = page.getByRole('option', { name: 'Claude' });

    //image upload success
    this.imageUploadSuccessalertMessage = page.locator('[role="alert"]');

    // Add Organization form - Main Admin Details
    this.firstNameInput = page.getByPlaceholder('e.g. Obin Bade');
    this.lastNameInput = page.getByPlaceholder('e.g. Shrestha');
    this.emailInput = page.getByPlaceholder('e.g. obin@gmail.com');
    this.passwordInput = page.locator('input[type="password"]');
    this.countryCodeDropdown = page.locator('button').filter({ hasText: '+977' });
    this.phoneInput = page.getByRole('textbox', { name: 'Enter phone number' });
    this.enableEmailNotificationsToggle = page.getByRole('switch');

    // Edit Organization page 
    this.editOrgFormTitle = page.getByRole('heading', { name: 'Edit Organization' });
    this.maxBranchesInput = page.getByLabel('Max Branches');
    this.maxEmployeesInput = page.getByLabel('Max Employees');
    this.maxWebhooksInput = page.getByLabel('Max Webhooks');

    //  Delete Organization modal 
    this.deleteModalTitle = page.getByRole('heading', { name: 'Delete Organization' });
    this.deleteConfirmInput = page.getByPlaceholder('Type Delete Organization here');
    this.deleteOrganizationButton = page.getByRole('button', { name: 'Delete Organization' });
    this.deleteCancelButton = page.getByRole('button', { name: 'Cancel' });
  }
}

// import { Locator, Page } from '@playwright/test';

// export default class OrganizationsLocators {
//   // List page header
//   readonly pageTitle: Locator;
//   readonly pageDescription: Locator;

//   // List page - Search & Filters
//   readonly searchInput: Locator;
//   readonly statusFilterDropdown: Locator;
//   readonly plansFilterDropdown: Locator;
//   readonly datesFilterDropdown: Locator;
//   readonly filterByDateButton: Locator;

//   // List page - Create button
//   readonly addOrganizationButton: Locator;

//   // List page - Table / List
//   readonly organizationTable: Locator;
//   readonly organizationRow: Locator;
//   readonly organizationNameCell: Locator;
//   readonly statusColumn: Locator;
//   readonly planColumn: Locator;
//   readonly trialEndsColumn: Locator;
//   readonly adminColumn: Locator;
//   readonly editIcon: Locator;
//   readonly deleteIcon: Locator;

//   // Add Organization form - header
//   readonly addOrgFormTitle: Locator;
//   readonly organizationForm: Locator;
//   readonly backButton: Locator;
//   readonly saveChangesButton: Locator;
//   readonly cancelButton: Locator;

//   // Add Organization form - Organization details
//   readonly organizationNameInput: Locator;
//   readonly slugInput: Locator;
//   readonly statusDropdown: Locator;
//   readonly browseFilesButton: Locator;
//   readonly imageInput: Locator;
//   readonly cropAndUploadButton: Locator;
//   readonly imageuploadSuccessAlert: Locator;
//   readonly planTypeDropdown: Locator;
//   readonly trialDaysInput: Locator;
//   readonly timezoneDropdown: Locator;
//   readonly timezoneSearchInput: Locator;
//   readonly imageUploadInput: Locator;

//   // Add Organization form - Main Admin Details
//   readonly firstNameInput: Locator;
//   readonly lastNameInput: Locator;
//   readonly emailInput: Locator;
//   readonly passwordInput: Locator;
//   readonly countryCodeDropdown: Locator;
//   readonly phoneInput: Locator;
//   readonly enableEmailNotificationsToggle: Locator;
//   // image upload successful
//   readonly imageUploadSuccessalertMessage: Locator;

//   //select plan type
//   readonly planTypeOption: Locator;
//   readonly statusOptionLocator: Locator;

//   // selct status
//   readonly statusLocator: Locator;
//   readonly statusOptionLocator: Locator;

//   constructor(page: Page) {
//     this.organizationText = page.getByRole('heading', { name: 'Organization' });
//     // List page header
//     this.pageTitle = page.getByRole('heading', { name: 'Organization' });
//     this.pageDescription = page.getByText('Manage all studio organizations');

//     // List page - Search & Filters
//     this.searchInput = page.getByPlaceholder('Search...');
//     this.statusFilterDropdown = page.getByText('All Status');
//     this.plansFilterDropdown = page.getByText('All Plans');
//     this.datesFilterDropdown = page.getByText('All Dates');
//     this.imageUploadInput = page.getByLabel(
//   'Browse files to uploadPNG, JPG, WEBP up to 5MBBrowse Files'
// );
//     this.filterByDateButton = page.getByRole('button', { name: 'Filter by date' });

//     // List page - Create button
//     this.addOrganizationButton = page.getByRole('button', { name: 'Add Organiz' });

//     // List page - Table / List
//     this.organizationTable = page.locator('table');
//     this.organizationRow = page.locator('table tbody tr');
//     this.organizationNameCell = page.locator('table tbody tr td:first-child');
//     this.statusColumn = page.getByText(/Trial|Active|Suspended/);
//     this.planColumn = page.locator('table thead').getByText('PLAN');
//     this.trialEndsColumn = page.locator('table thead').getByText('TRIAL ENDS');
//     this.adminColumn = page.locator('table thead').getByText('ADMIN');
//     this.editIcon = page.locator('table tbody tr').locator('svg').nth(1);
//     this.deleteIcon = page.locator('table tbody tr').locator('svg').nth(3);


//     // Add Organization form - header
//     this.addOrgFormTitle = page.getByRole('heading', { name: 'Add Organization' });
//     this.organizationForm = page.locator('div > div.flex >form');
//     this.backButton = page.locator('button.rounded-xl.h-9.w-9');
//     this.saveChangesButton = page.getByRole('button', { name: 'Save Changes' });
//     this.cancelButton = page.getByRole('button', { name: 'Cancel' });

//     // Add Organization form - Organization details
//     this.organizationNameInput = page.getByPlaceholder('e.g. Web Development');
//     this.slugInput = page.getByPlaceholder('e.g. beauty-salon');
//     this.statusDropdown = page.getByText('e.g Trial');
//     this.browseFilesButton = page.getByRole('button', { name: 'Browse Files' });
//     this.imageInput = page.locator('#image-input');
//     this.cropAndUploadButton = page.getByRole('button', { name: 'Crop and Upload' }); 
//     this.imageuploadSuccessAlert = page.getByText('Image has been successfully uploaded.');
//     this.planTypeDropdown = page.getByText('e.g Monthly');
//     this.trialDaysInput = page.getByPlaceholder('e.g. 10');
//     this.timezoneDropdown = page.getByText('Kathmandu (+05:45)');
//     this.timezoneSearchInput = page.getByPlaceholder(/search city/i);

//     // image upload success
//     this.imageUploadSuccessalertMessage = page.locator('[role="alert"]');

//     // Add Organization form - Main Admin Details
//     this.firstNameInput = page.getByPlaceholder('e.g. Obin Bade');
//     this.lastNameInput = page.getByPlaceholder('e.g. Shrestha');
//     this.emailInput = page.getByPlaceholder('e.g. obin@gmail.com');
//     this.passwordInput = page.locator('input[type="password"]');
//     this.countryCodeDropdown = page.locator('button').filter({ hasText: '+977' });
//     this.phoneInput = page.locator('label:has-text("Phone")').locator('..').locator('input');

//     this.enableEmailNotificationsToggle = page.getByRole('switch');
//   }
// }