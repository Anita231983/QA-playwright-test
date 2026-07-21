import { expect, test, toApiPayload } from '../fixtures/fixtures';
import LoginPage from '../pages/loginPage';
import OrganizationPage from '../pages/OrganizationPage';
import DashboardPage from '../pages/DashboardPage';

test.describe('Verify organization Page', () => {
    let loginPage: LoginPage;
    let organizationPage: OrganizationPage;
    let dashboardPage: DashboardPage;

    test.beforeEach('Navigate to Chairlyo Login Page', async ({ uiBaseUrl, page, email, password }) => {
            loginPage = new LoginPage(page);
            organizationPage = new OrganizationPage(page);
            dashboardPage = new DashboardPage(page);
           await loginPage.navigateToChairlyo(uiBaseUrl);
            await loginPage.loginToChairlyo(email, password);
            await loginPage.verifyLoginSuccess();
        }
    );
    test('Navigate to Organization Page', async () => {
        await dashboardPage.goToOrganizations();
        await organizationPage.verifyOrganizationPage();
    });
    test('Add a new Organization', async ({ organizationData ,page}, testInfo) => {
        test.slow();

        await dashboardPage.goToOrganizations();
        await organizationPage.verifyOrganizationPage();
        await organizationPage.clickAddOrganizationButton();

        await page.screenshot({ path: 'screenshots/homepage.png', fullPage: true });

        await testInfo.attach('checkout-state', {
            body: await page.screenshot(),
            contentType: 'image/png',
        });

        await organizationPage.verifyAddOrganizationForm();
        await organizationPage.addOrganization(organizationData);
        await organizationPage.verifyOrganizationCreated(organizationData.name);
    });

    test.describe('API-assisted setup', () => {
        let createdOrganizationSlug: string | undefined;

        test.afterEach(async ({ organizationService }) => {
            if (createdOrganizationSlug) {
                await organizationService.deleteOrganization(createdOrganizationSlug);
                createdOrganizationSlug = undefined;
            }
        });

        test('Organization created via API is visible in the UI list',async ({ organizationService, organizationData, planTypeId }) => {
            const created = await organizationService.createOrganization(toApiPayload(organizationData, planTypeId));
            createdOrganizationSlug = created.slug;

            await dashboardPage.goToOrganizations();
            await organizationPage.verifyOrganizationPage();
            await expect(organizationPage.getOrganizationRowByName(organizationData.name)).toBeVisible();
            }
        );

        test('API asisted test',async ({ organizationService, organizationData, planTypeId }) => {
            const created = await organizationService.createOrganization(toApiPayload(organizationData, planTypeId));
            createdOrganizationSlug = created.slug;

            await dashboardPage.goToOrganizations();
            await organizationPage.verifyOrganizationPage();
            await expect(organizationPage.getOrganizationRowByName(organizationData.name)).toBeVisible();
            }
        );

        test('Edit Organization that are created with API',async ({ organizationService, organizationData, planTypeId }) => {
           const organization = await organizationService.createOrganization(toApiPayload(organizationData, planTypeId)); 
           createdOrganizationSlug = organization.slug;

            await dashboardPage.goToOrganizations();
            await organizationPage.verifyOrganizationPage();
            await expect(organizationPage.getOrganizationRowByName(organizationData.name)).toBeVisible();

            await organizationPage.clickEditIconForRow(organizationData.name);
            await organizationPage.verifyEditOrganizationForm();
            await organizationPage.updateOrganization({ maxBranches: '50', maxEmployees: '100' });
           });

        test('Delete Organization that are created with API',async ({ organizationService, organizationData, planTypeId }) => {
          const organization = await organizationService.createOrganization(toApiPayload(organizationData, planTypeId)); 
          createdOrganizationSlug = organization.slug;

          await dashboardPage.goToOrganizations();
          await organizationPage.verifyOrganizationPage();
          await expect(organizationPage.getOrganizationRowByName(organizationData.name)).toBeVisible();

          await organizationPage.deleteOrganization(organizationData.name);
          await expect( organizationPage.getOrganizationRowByName(organizationData.name)).toHaveCount(0);
           createdOrganizationSlug = undefined; // already removed via UI, skip afterEach API cleanup
            }
        );
    });
});

// import { expect, test, toApiPayload } from '../fixtures/fixtures';
// import LoginPage from '../pages/LoginPage';
// import OrganizationPage from '../pages/OrganizationPage';
// import DashboardPage from '../pages/DashboardPage';

// test.describe('Verify organization Page', () => {
//     let loginPage: LoginPage;
//     let organizationPage: OrganizationPage;
//     let dashboardPage: DashboardPage;

//     test.beforeEach('Navigate to Chairlyo Login Page', async ({ uiBaseUrl, page, email, password }) => {
//             loginPage = new LoginPage(page);
//             organizationPage = new OrganizationPage(page);
//             dashboardPage = new DashboardPage(page);
//            await loginPage.navigateToChairlyo(uiBaseUrl);
//             await loginPage.loginToChairlyo(email, password);
//             await loginPage.verifyLoginSuccess();
//             await loginPage.verifyDashboardText();
//         }
//     );
//     test('Navigate to Organization Page', async () => {
        
//     });
//     test('Add a new Organization', async ({ organizationData ,page}) => {
        




















//         //        createdOrganizationSlug = undefined;
//         //
//         //    }
//         // });
//         test('Organization created via API is visible in the UI list',async ({ organizationService, organizationData, planTypeId }) => {
//          await organizationService.createOrganization(toApiPayload(organizationData, planTypeId));

//       // createdOrganizationSlug = created.slug;
//          await dashboardPage.gotoOrganizationPage();
//         await organizationPage.verifyOrganizationPage();
//         await expect(organizationPage.getOrganizationRowByName(organizationData.name)).toBeVisible();
//             }
//         );

//         test('API asisted test',async ({ organizationService, organizationData, planTypeId }) => {
//          await organizationService.createOrganization(toApiPayload(organizationData, planTypeId));
//          await dashboardPage.gotoOrganizationPage();
//          await organizationPage.verifyOrganizationPage();
//          await expect(organizationPage.getOrganizationRowByName(organizationData.name)).toBeVisible();
//             }
//         );

//         test('Edit Organization that are created with API',async ({ organizationService, organizationData, planTypeId }) => {
//            const organization = await organizationService.createOrganization(toApiPayload(organizationData, planTypeId)); 
//            createdOrganizationSlug = organization.slug;

//             await dashboardPage.gotoOrganizationPage();
//             await organizationPage.verifyOrganizationPage();
//             await expect(organizationPage.getOrganizationRowByName(organizationData.name)).toBeVisible();

//             await organizationPage.editOrganization(organizationData.name, '20');
//             await expect(organizationPage.organizationLocators.alertMessage).toBeVisible();
//            });

//     test('Delete Organization that are created with API',async ({ organizationService, organizationData, planTypeId }) => {
//       const organization = await organizationService.createOrganization(toApiPayload(organizationData, planTypeId)); 
//       createdOrganizationSlug = organization.slug;

//       await dashboardPage.gotoOrganizationPage();
//       await organizationPage.verifyOrganizationPage();
//       await expect(organizationPage.getOrganizationRowByName(organizationData.name)).toBeVisible();

//       await organizationPage.deleteOrganization(organizationData.name);
//       await expect( organizationPage.getOrganizationRowByName(organizationData.name)).toHaveCount(0);
//        createdOrganizationSlug = undefined; // already removed via UI, skip afterEach API cleanup
//         }
//     );
// });






      








    
// // import { test, expect } from '../fixtures/fixtures';


// // test.describe('Organizations - Create Organization', () => {

// //   test.beforeEach('Navigate to Chairlyo Login Page', async ({ baseUrl, page, loginPage }) => {
// //     await loginPage.navigateToChairlyo(baseUrl);
// //   });
  

// //   test.skip('Navigate to Organization Page', async ({ dashboardPage, organizationPage, email, password, loginPage }) => {
// //     await loginPage.loginToChairlyo(email, password);
// //     await dashboardPage.goToOrganizations();
// //     await organizationPage.verifyOrganizationPage();
// //   });

// //   test('Add a new Organization', async ({ dashboardPage,page, organizationPage, organizationData, email, password, loginPage },testInfo) => {
// //     test.slow()
// //     await loginPage.loginToChairlyo(email, password);
// //     await dashboardPage.goToOrganizations();
// //     await organizationPage.verifyOrganizationPage();

    

// //     await organizationPage.clickAddOrganizationButton();
// //     // full page screenshot
// //     await page.screenshot({ path: 'screenshots/homepage.png', fullPage: true });
// //     // screenshot of a specific element
// //     await page.locator('.checkout-summary').screenshot({ path: 'screenshots/checkout-summary.png' });

// //     // attach to test report
// //     await testInfo.attach('checkout-state',{
// //       body: await page.screenshot(),
// //       contentType: 'image/png'
// //     });

// //     await organizationPage.verifyAddOrganizationForm();
// //     await organizationPage.addOrganization(organizationData);
// //     await organizationPage.verifyOrganizationCreated(organizationData.name);
// //     });


// //     test('Update an existing organization', async ({ dashboardPage, organizationPage, organizationData, email, password, loginPage }) => {
// //     await loginPage.loginToChairlyo(email, password);
// //     await dashboardPage.goToOrganizations();
// //     await organizationPage.verifyOrganizationPage();

// //     await organizationPage.clickAddOrganizationButton();
// //     await organizationPage.addOrganization(organizationData);
// //     await organizationPage.verifyOrganizationCreated(organizationData.name);

// //     // for edit
// //     await organizationPage.clickEditIconForRow(organizationData.name);
// //     await organizationPage.updateOrganization({ maxBranches: '50', maxEmployees: '100' });
// //     });
  
// //  test('Delete an existing organization', async ({ dashboardPage,page, organizationPage, organizationData, email, password, loginPage }) => {
// //     await loginPage.loginToChairlyo(email, password);
// //     await dashboardPage.goToOrganizations();
// //     await organizationPage.verifyOrganizationPage();

// //     // pahila naya organization banaउने
// //     await organizationPage.clickAddOrganizationButton();
// //     await organizationPage.addOrganization(organizationData);
// //     await organizationPage.verifyOrganizationCreated(organizationData.name);

// //     // ab delete garने
// //     await organizationPage.deleteOrganization(organizationData.name);
// //     await organizationPage.verifyOrganizationDeleted(organizationData.name);
// //     // full page screenshot
// //     await page.screenshot({ path: 'screenshots/organizationtable.png', fullPage: true });

// //   });

// // });
// // // import { test, expect } from '../fixtures/fixtures';

// // // test.describe('Organizations - Create Organization', () => {

// // //   test.beforeEach(async ({ loginPage, baseUrl, email, password }) => {
// // //     await loginPage.navigateToChairlyo(baseUrl);
// // //     await loginPage.loginToChairlyo(email, password);
// // //   });

// // //   test('Create a new organization', async ({ organizationsPage, page }) => {
// // //     await page.goto('/organizations');

// // //     const uniqueId = Date.now();

// // //     await organizationsPage.createOrganization({
// // //       orgName: `Test Salon ${uniqueId}`,
// // //       slug: `test-salon-${uniqueId}`,
// // //       status: 'Trial',
// // //       planType: 'Claude',
// // //       trialDays: '10',
// // //       firstName: 'Obin',
// // //       lastName: 'Bade',
// // //       email: `obin${uniqueId}@gmail.com`,
// // //       password: 'TestPassword123',
// // //       phone: '9800000000',
// // //     });

// // //     await expect(organizationsPage.locators.organizationRow.first()).toBeVisible();
// // //   });

// // });