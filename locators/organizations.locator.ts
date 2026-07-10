import { Locator, Page } from '@playwright/test';

export default class OrganizationsLocators {
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
  readonly statusColumn: Locator;
  readonly planColumn: Locator;
  readonly trialEndsColumn: Locator;
  readonly adminColumn: Locator;
  readonly editIcon: Locator;
  readonly deleteIcon: Locator;

  // Add Organization form - header
  readonly addOrgFormTitle: Locator;
  readonly backButton: Locator;
  readonly saveChangesButton: Locator;
  readonly cancelButton: Locator;

  // Add Organization form - Organization details
  readonly organizationNameInput: Locator;
  readonly slugInput: Locator;
  readonly statusDropdown: Locator;
  readonly browseFilesButton: Locator;
  readonly planTypeDropdown: Locator;
  readonly timezoneDropdown: Locator;
  readonly timezoneSearchInput: Locator;

  // Add Organization form - Main Admin Details
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly countryCodeDropdown: Locator;
  readonly phoneInput: Locator;
  readonly enableEmailNotificationsToggle: Locator;

  constructor(page: Page) {
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
    this.addOrganizationButton = page.getByRole('button', { name: 'Add Organiz' });

    // List page - Table / List
    this.organizationTable = page.locator('table');
    this.organizationRow = page.locator('table tbody tr');
    this.organizationNameCell = page.locator('table tbody tr td:first-child');
    this.statusColumn = page.getByText(/Trial|Active|Suspended/);
    this.planColumn = page.locator('table thead').getByText('PLAN');
    this.trialEndsColumn = page.locator('table thead').getByText('TRIAL ENDS');
    this.adminColumn = page.locator('table thead').getByText('ADMIN');
    this.editIcon = page.locator('table tbody tr').locator('svg').nth(1);
    this.deleteIcon = page.locator('table tbody tr').locator('svg').nth(3);

    // Add Organization form - header
    this.addOrgFormTitle = page.getByRole('heading', { name: 'Add Organization' });
    // DevTools बाट confirm भएको: role=button, class मा rounded-xl h-9 w-9 border-neutral-200
    this.backButton = page.locator('button.rounded-xl.h-9.w-9');
    this.saveChangesButton = page.getByRole('button', { name: 'Save Changes' });
    this.cancelButton = page.getByRole('button', { name: 'Cancel' });

    // Add Organization form - Organization details
    this.organizationNameInput = page.getByPlaceholder('e.g. Web Development');
    this.slugInput = page.getByPlaceholder('e.g. beauty-salon');
    this.statusDropdown = page.getByText('e.g Trial');
    this.browseFilesButton = page.getByRole('button', { name: 'Browse Files' });
    this.planTypeDropdown = page.getByText('e.g Monthly');
    this.timezoneDropdown = page.getByText('Kathmandu (+05:45)');
    this.timezoneSearchInput = page.getByPlaceholder('Search city or region...');

    // Add Organization form - Main Admin Details
    this.firstNameInput = page.getByPlaceholder('e.g. Obin Bade');
    this.lastNameInput = page.getByPlaceholder('e.g. Shrestha');
    this.emailInput = page.getByPlaceholder('e.g. obin@gmail.com');
    this.passwordInput = page.locator('input[type="password"]');
    this.countryCodeDropdown = page.locator('button').filter({ hasText: '+977' });
    this.phoneInput = page.locator('input[type="tel"]');
    // DevTools बाट confirm भएको: role="switch"
    this.enableEmailNotificationsToggle = page.getByRole('switch');
  }
}

// import { Locator, Page } from '@playwright/test';

// export default class OrganizationsLocators {
//   // Create
//   readonly addOrganizationButton: Locator;
//   readonly organizationNameInput: Locator;
//   readonly saveButton: Locator;

//   // Edit
//   readonly editButton: Locator;
//   readonly updateButton: Locator;

//   // Delete
//   readonly deleteButton: Locator;
//   readonly confirmDeleteButton: Locator;

//   // Search
//   readonly searchInput: Locator;

//   // Table/List
//   readonly organizationTable: Locator;
//   readonly organizationRow: Locator;
//   readonly organizationNameCell: Locator;

//   constructor(page: Page) {
//     // Create
//     this.addOrganizationButton = page.getByRole('button', { name: 'Add Organization' });
//     this.organizationNameInput = page.locator('[name="organizationName"]');
//     this.saveButton = page.getByRole('button', { name: 'Save' });

//     // Edit
//     this.editButton = page.getByRole('button', { name: 'Edit' });
//     this.updateButton = page.getByRole('button', { name: 'Update' });

//     // Delete
//     this.deleteButton = page.getByRole('button', { name: 'Delete' });
//     this.confirmDeleteButton = page.getByRole('button', { name: 'Confirm' });

//     // Search
//     this.searchInput = page.getByPlaceholder('Search organizations');

//     // Table/List
//     this.organizationTable = page.locator('table');
//     this.organizationRow = page.locator('table tbody tr');
//     this.organizationNameCell = page.locator('table tbody tr td:first-child');
//   }
// }