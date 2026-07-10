import { Page } from '@playwright/test';
import BasePage from './BasePage';
import DashboardLocators from '../locators/dashboard.locators';

export default class DashboardPage extends BasePage {
  readonly locators: DashboardLocators;

  constructor(page: Page) {
    super(page);
    this.locators = new DashboardLocators(page);
  }

  async goToOrganizations() {
    await this.locators.organizationsLink.click();
  }

  async logout() {
    await this.locators.logoutButton.click();
  }
}
// import { Page } from '@playwright/test';
// import BasePage from './BasePage';
// import DashboardLocators from '../locators/dashboard.locators';

// export default class DashboardPage extends BasePage {
//   readonly locators: DashboardLocators;

//   constructor(page: Page) {
//     super(page);
//     this.locators = new DashboardLocators(page);
//   }

//   async goToOrganizations() {
//     await this.locators.organizationsLink.click();
//   }

//   async logout() {
//     await this.locators.logoutButton.click();
//   }
// }