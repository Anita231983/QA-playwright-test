import { test as base, expect } from '@playwright/test';
import LoginPage from '../pages/loginPage';
import DashboardPage from '../pages/DashboardPage';
import OrganizationsPage from '../pages/OrganizationsPage';

type MyFixtures = {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  organizationsPage: OrganizationsPage;
  email: string;
  password: string;
  baseUrl: string;
};

export const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },
  organizationsPage: async ({ page }, use) => {
    await use(new OrganizationsPage(page));
  },
  email: 'admin@chairlyo.com',
  password: 'adminpassword',
  baseUrl: 'https://stage.chairlyo.com/login',
});

export { expect };


// import { expect as baseExpect, test as baseTest } from '@playwright/test';

// type Fixtures = {
//  email: string;
//   password: string;
//  baseUrl: string;
// };

// export const test = baseTest.extend<Fixtures>({
//  email: 'admin@chairlyo.com',
//   password: 'adminpassword',
//   baseUrl: 'https://stage.chairlyo.com/login',
// });

// export const expect = baseExpect;

// import { test as base, expect } from '@playwright/test';
// import LoginPage from '../pages/loginPage';
// import DashboardPage from '../pages/DashboardPage';
// import OrganizationsPage from '../pages/OrganizationsPage';

// type MyFixtures = {
//   loginPage: LoginPage;
//   dashboardPage: DashboardPage;
//   organizationsPage: OrganizationsPage;
//   validEmail: string;
//   validPassword: string;
//   baseUrl: string;
// };

// export const test = base.extend<MyFixtures>({
//   loginPage: async ({ page }, use) => {
//     await use(new LoginPage(page));
//   },
//   dashboardPage: async ({ page }, use) => {
//     await use(new DashboardPage(page));
//   },
//   organizationsPage: async ({ page }, use) => {
//     await use(new OrganizationsPage(page));
//   },
//   validEmail: 'admin@chairlyo.com',
//   validPassword: 'adminpassword',
//   baseUrl: 'https://stage.chairlyo.com/login',
// });

// export { expect };