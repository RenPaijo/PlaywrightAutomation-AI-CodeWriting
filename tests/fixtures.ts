import { faker } from '@faker-js/faker';
import { expect } from '@playwright/test';
import { test as base } from 'playwright-bdd';
import { SauceDemoCartPage } from './pages/cartPage';
import { SauceDemoCheckoutCompletePage } from './pages/checkoutCompletePage';
import { SauceDemoCheckoutInformationPage } from './pages/checkoutInformationPage';
import { SauceDemoCheckoutOverviewPage } from './pages/checkoutOverviewPage';
import { SauceDemoInventoryPage } from './pages/inventoryPage';
import { SauceDemoLoginPage } from './pages/loginPage';
import { env } from './support/env';

export type SauceDemoCredentials = {
  baseUrl: string;
  standardUsername: string;
  lockedOutUsername: string;
  problemUsername: string;
  performanceGlitchUsername: string;
  password: string;
  invalidUsername: string;
  invalidPassword: string;
};

export type CheckoutCustomerInfo = {
  firstName: string;
  lastName: string;
  postalCode: string;
};

export const test = base.extend<{
  sauceDemo: SauceDemoCredentials;
  checkoutCustomerInfo: CheckoutCustomerInfo;
  loginPage: SauceDemoLoginPage;
  inventoryPage: SauceDemoInventoryPage;
  cartPage: SauceDemoCartPage;
  checkoutInformationPage: SauceDemoCheckoutInformationPage;
  checkoutOverviewPage: SauceDemoCheckoutOverviewPage;
  checkoutCompletePage: SauceDemoCheckoutCompletePage;
}>({
  sauceDemo: async ({}, use) => {
    await use({
      baseUrl: env.baseUrl,
      standardUsername: env.standardUsername,
      lockedOutUsername: env.lockedOutUsername,
      problemUsername: env.problemUsername,
      performanceGlitchUsername: env.performanceGlitchUsername,
      password: env.password,
      invalidUsername: 'wrong_user',
      invalidPassword: 'wrong_password',
    });
  },

  checkoutCustomerInfo: async ({}, use, testInfo) => {
    const customerInfo = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      postalCode: faker.location.zipCode('#####'),
    };

    await testInfo.attach('checkout-customer-info', {
      body: Buffer.from(JSON.stringify(customerInfo, null, 2)),
      contentType: 'application/json',
    });

    await use(customerInfo);
  },

  loginPage: async ({ page }, use) => {
    await use(new SauceDemoLoginPage(page));
  },

  inventoryPage: async ({ page }, use) => {
    await use(new SauceDemoInventoryPage(page));
  },

  cartPage: async ({ page }, use) => {
    await use(new SauceDemoCartPage(page));
  },

  checkoutInformationPage: async ({ page }, use) => {
    await use(new SauceDemoCheckoutInformationPage(page));
  },

  checkoutOverviewPage: async ({ page }, use) => {
    await use(new SauceDemoCheckoutOverviewPage(page));
  },

  checkoutCompletePage: async ({ page }, use) => {
    await use(new SauceDemoCheckoutCompletePage(page));
  },
});

export { expect };
