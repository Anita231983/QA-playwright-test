import path from 'path';
import { expect as baseExpect, test as baseTest } from '@playwright/test';
import { ApiClient } from '../api/client/ApiClient';
import { AuthService } from '../api/services/AuthService';
import { OrganizationService } from '../api/services/OrganizationService';
import { OrganizationApiPayload } from '../api/types/organization.types';

export type OrganizationData = {
  name: string;
  slug: string;
  status: string;
  planType: string;
  trialDays?: string;
  imagePath?: string;
  admin: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
  };
};
function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `Missing required environment variable: ${name}. Did you set up your .env file?`
    );
  }
  return value;
}
export function toApiPayload(organizationData: OrganizationData, planTypeId: number): OrganizationApiPayload {
  return {
    admin_email: organizationData.admin.email,
    admin_first_name: organizationData.admin.firstName,
    admin_last_name: organizationData.admin.lastName,
    admin_password: organizationData.admin.password,
    admin_phone: organizationData.admin.phone,
    country: 'np',
    name: organizationData.name,
    organization_logo: '',
    plan_type: planTypeId,
    send_mail_notifications: false,
    slug: organizationData.slug,
    status: organizationData.status,
    timezone: 'Asia/Kathmandu',
    trial_days: organizationData.trialDays ?? '10',
  };
}
 type Fixtures = {
  email: string;
  password: string;
  uiBaseUrl: string;
  apiBaseUrl: string;
  organizationData: OrganizationData;
  apiClient: ApiClient;
  authService: AuthService;
  authToken: string;
  organizationService: OrganizationService;
  planTypeId: number;
};

export const test = baseTest.extend<Fixtures>({
  // email: requireEnv('TEST_EMAIL'),
  // password: requireEnv('TEST_PASSWORD'),
  email: process.env.TEST_EMAIL,
  password: process.env.TEST_PASSWORD,
  uiBaseUrl: process.env.UI_BASE_URL,
  apiBaseUrl: process.env.API_BASE_URL,

  organizationData: async ({}, use) => {
    const uniqueId = Date.now();
    await use({
      name: `Web Development ${uniqueId}`,
      slug: `web-development-${uniqueId}`,
      status: 'Trial',
      planType: 'Claude',
      trialDays: '10',
      imagePath: path.join(__dirname, '..', 'assets', 'images.jpeg'),
      admin: {
        firstName: 'Obin',
        lastName: 'Shrestha',
        email: `obin+${uniqueId}@gmail.com`,
        password: 'Password@123',
        phone: '9801123333',
      },
    });
  },

  apiClient: async ({ request, apiBaseUrl }, use) => {
    await use(new ApiClient(request, apiBaseUrl));
  },

  authService: async ({ apiClient }, use) => {
    await use(new AuthService(apiClient));
  },

  authToken: async ({ authService, email, password }, use) => {
    const token = await authService.loginWithAPI(email, password);
    await use(token);
  },

  organizationService: async ({ apiClient, authToken }, use) => {
    await use(new OrganizationService(apiClient));
  },

  planTypeId: async ({ apiClient, authToken, organizationData }, use) => {
    const response = await apiClient.get(`/api/organizations/plan-types/?search=${encodeURIComponent(organizationData.planType)}`);
    baseExpect(response.ok(), `Fetching plan types failed: ${response.status()} ${await response.text()}`).toBeTruthy();


    const body = await response.json();
    const planType = body.results.find((result: { name: string }) => result.name === organizationData.planType);
    baseExpect(planType, `No plan type found with name "${organizationData.planType}"`).toBeTruthy();


    await use(planType.id);
  },
});

export const expect = baseExpect;



//   organizationData: async ({}, use) => {
//     const uniqueId = Date.now();
//     await use({
//       name: `Web Development ${uniqueId}`,
//       slug: `web-development-${uniqueId}`,
//       status: 'Trial',
//       planType: 'Claude',
//       trialDays: '10',
//       imagePath: path.join(__dirname, '..', 'assets', 'images.jpeg'),
//       admin: {
// export const test = base.extend<MyFixtures>({
//   loginPage: async ({ page }, use) => {
//     await use(new LoginPage(page));
//   },
//   dashboardPage: async ({ page }, use) => {
//     await use(new DashboardPage(page));
//   },
//   organizationPage: async ({ page }, use) => {
//     await use(new OrganizationPage(page));
//   },
//   organizationData: async ({}, use) => {
//     const uniqueId = Date.now();
//     await use({
//       name: `Test Salon ${uniqueId}`,
//       slug: `test-salon-${uniqueId}`,
//       status: 'Trial',
//       planType: 'Claude',
//       trialDays: '10',
//       imagePath: path.join(__dirname, '../assets/test-image.png'),
//       admin: {
//         firstName: 'Obin',
//         lastName: 'Bade',
//         email: `obin${uniqueId}@gmail.com`,
//         password: 'TestPassword123',
//         phone: '9800000000',
//       },
//     });
//   },
//   email: 'admin@chairlyo.com',
//   password: 'adminpassword',
//   baseUrl: 'https://stage.chairlyo.com/login',
// });

// export { expect };
// // import { test as base, expect } from '@playwright/test';
// // import LoginPage from '../pages/loginPage';
// // import DashboardPage from '../pages/DashboardPage';
// // import OrganizationsPage from '../pages/OrganizationsPage';

// // type MyFixtures = {
// //   loginPage: LoginPage;
// //   dashboardPage: DashboardPage;
// //   organizationsPage: OrganizationsPage;
// //   email: string;
// //   password: string;
// //   baseUrl: string;
// // };

// // export const test = base.extend<MyFixtures>({
// //   loginPage: async ({ page }, use) => {
// //     await use(new LoginPage(page));
// //   },
// //   dashboardPage: async ({ page }, use) => {
// //     await use(new DashboardPage(page));
// //   },
// //   organizationsPage: async ({ page }, use) => {
// //     await use(new OrganizationsPage(page));
// //   },
// //   email: 'admin@chairlyo.com',
// //   password: 'adminpassword',
// //   baseUrl: 'https://stage.chairlyo.com/login',
// // });

// // export { expect };


// // // import { expect as baseExpect, test as baseTest } from '@playwright/test';

// // // type Fixtures = {
// // //  email: string;
// // //   password: string;
// // //  baseUrl: string;
// // // };

// // // export const test = baseTest.extend<Fixtures>({
// // //  email: 'admin@chairlyo.com',
// // //   password: 'adminpassword',
// // //   baseUrl: 'https://stage.chairlyo.com/login',
// // // });

// // // export const expect = baseExpect;

// // // import { test as base, expect } from '@playwright/test';
// // // import LoginPage from '../pages/loginPage';
// // // import DashboardPage from '../pages/DashboardPage';
// // // import OrganizationsPage from '../pages/OrganizationsPage';

// // // type MyFixtures = {
// // //   loginPage: LoginPage;
// // //   dashboardPage: DashboardPage;
// // //   organizationsPage: OrganizationsPage;
// // //   validEmail: string;
// // //   validPassword: string;
// // //   baseUrl: string;
// // // };

// // // export const test = base.extend<MyFixtures>({
// // //   loginPage: async ({ page }, use) => {
// // //     await use(new LoginPage(page));
// // //   },
// // //   dashboardPage: async ({ page }, use) => {
// // //     await use(new DashboardPage(page));
// // //   },
// // //   organizationsPage: async ({ page }, use) => {
// // //     await use(new OrganizationsPage(page));
// // //   },
// // //   validEmail: 'admin@chairlyo.com',
// // //   validPassword: 'adminpassword',
// // //   baseUrl: 'https://stage.chairlyo.com/login',
// // // });

// // // export { expect };