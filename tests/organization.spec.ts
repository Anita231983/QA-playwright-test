import { test, expect } from '../fixtures/fixtures';

test.describe('Organizations - Create Organization', () => {

  test('Create a new organization', async ({ organizationsPage, baseUrl }) => {
    await organizationsPage.navigateToChairlyo(baseUrl.replace('/login', '/organizations'));

    await organizationsPage.createOrganization({
      orgName: 'Test Salon',
      slug: 'test-salon',
      status: 'Trial',
      planType: 'Claude',
      firstName: 'Obin',
      lastName: 'Bade',
      email: 'obin@gmail.com',
      password: 'testpassword123',
      phone: '9800000000',
    });

    await expect(organizationsPage.locators.organizationRow.first()).toBeVisible();
  });

});