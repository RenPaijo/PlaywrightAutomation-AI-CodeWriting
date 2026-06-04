import { createBdd } from 'playwright-bdd';
import { test } from '../fixtures';
import type { CheckoutCustomerInfo, SauceDemoCredentials } from '../fixtures';

const { Given, Then, When } = createBdd(test);

Given('I am logged into Sauce Demo as the {string} account', async ({ loginPage, sauceDemo }, account: string) => {
  await loginPage.open();
  await loginPage.signIn(resolveUsername(sauceDemo, account), sauceDemo.password);
});

Then('I should be on the inventory page', async ({ inventoryPage }) => {
  await inventoryPage.expectLoaded();
});

When('I add the Sauce Demo items {string} to the cart', async ({ inventoryPage }, rawItems: string) => {
  for (const itemName of parseItemList(rawItems)) {
    await inventoryPage.addItemToCart(itemName);
  }
});

When('I open the shopping cart', async ({ inventoryPage }) => {
  await inventoryPage.openCart();
});

Then('the shopping cart badge should show {int} items', async ({ inventoryPage }, count: number) => {
  await inventoryPage.expectCartBadgeCount(count);
});

Then('the shopping cart badge should not be shown', async ({ inventoryPage }) => {
  await inventoryPage.expectCartBadgeHidden();
});

Then('the cart should be displayed', async ({ cartPage }) => {
  await cartPage.expectLoaded();
});

Then('the cart should list the Sauce Demo items {string}', async ({ cartPage }, rawItems: string) => {
  await cartPage.expectItemNames(parseItemList(rawItems));
});

Then('the cart should contain {int} items', async ({ cartPage }, count: number) => {
  await cartPage.expectItemCount(count);
});

Then('each cart item should have quantity {int}', async ({ cartPage }, quantity: number) => {
  await cartPage.expectEachItemQuantity(quantity);
});

When('I continue shopping from the cart', async ({ cartPage }) => {
  await cartPage.continueShopping();
});

When('I proceed to checkout', async ({ cartPage }) => {
  await cartPage.proceedToCheckout();
});

Then('the checkout information page should be displayed', async ({ checkoutInformationPage }) => {
  await checkoutInformationPage.expectLoaded();
});

When(
  'I submit checkout information with generated customer data',
  async ({ checkoutInformationPage, checkoutCustomerInfo }) => {
    await checkoutInformationPage.submitCustomerInfo(checkoutCustomerInfo);
  },
);

When(
  'I submit checkout information without the {string} field',
  async ({ checkoutInformationPage, checkoutCustomerInfo }, missingField: string) => {
    await checkoutInformationPage.submitCustomerInfoWithoutField(
      checkoutCustomerInfo,
      resolveMissingField(missingField),
    );
  },
);

Then('I should remain on the checkout information page', async ({ checkoutInformationPage }) => {
  await checkoutInformationPage.expectLoaded();
});

Then('I should see the checkout information error {string}', async ({ checkoutInformationPage }, message: string) => {
  await checkoutInformationPage.expectError(message);
});

Then('I should be on the checkout overview page', async ({ checkoutOverviewPage }) => {
  await checkoutOverviewPage.expectLoaded();
});

Then('the checkout overview should list the Sauce Demo items {string}', async ({ checkoutOverviewPage }, rawItems: string) => {
  await checkoutOverviewPage.expectItemNames(parseItemList(rawItems));
});

Then('the checkout summary should show payment information {string}', async ({ checkoutOverviewPage }, text: string) => {
  await checkoutOverviewPage.expectPaymentInformation(text);
});

Then('the checkout summary should show shipping information {string}', async ({ checkoutOverviewPage }, text: string) => {
  await checkoutOverviewPage.expectShippingInformation(text);
});

Then('the checkout summary should show item total {string}', async ({ checkoutOverviewPage }, text: string) => {
  await checkoutOverviewPage.expectItemTotal(text);
});

Then('the checkout summary should show tax {string}', async ({ checkoutOverviewPage }, text: string) => {
  await checkoutOverviewPage.expectTax(text);
});

Then('the checkout summary should show total {string}', async ({ checkoutOverviewPage }, text: string) => {
  await checkoutOverviewPage.expectTotal(text);
});

When('I cancel checkout from the overview page', async ({ checkoutOverviewPage }) => {
  await checkoutOverviewPage.cancel();
});

When('I finish the checkout', async ({ checkoutOverviewPage }) => {
  await checkoutOverviewPage.finish();
});

Then('I should see the order completion confirmation', async ({ checkoutCompletePage }) => {
  await checkoutCompletePage.expectLoaded();
});

function parseItemList(rawItems: string): string[] {
  return rawItems
    .split(',')
    .map((item) => item.trim())
    .filter((item) => item.length > 0);
}

function resolveUsername(sauceDemo: SauceDemoCredentials, key: string): string {
  switch (key) {
    case 'standard':
      return sauceDemo.standardUsername;
    case 'locked out':
      return sauceDemo.lockedOutUsername;
    case 'problem':
      return sauceDemo.problemUsername;
    case 'performance glitch':
      return sauceDemo.performanceGlitchUsername;
    case 'invalid':
      return sauceDemo.invalidUsername;
    case 'empty':
      return '';
    default:
      throw new Error(`Unsupported username key: ${key}`);
  }
}

function resolveMissingField(field: string): 'first name' | 'last name' | 'postal code' {
  switch (field) {
    case 'first name':
    case 'last name':
    case 'postal code':
      return field;
    default:
      throw new Error(`Unsupported checkout field: ${field}`);
  }
}
