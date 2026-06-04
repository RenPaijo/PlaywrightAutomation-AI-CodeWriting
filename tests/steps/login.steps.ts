import { createBdd } from 'playwright-bdd';
import { test } from '../fixtures';
import type { SauceDemoCredentials } from '../fixtures';

const { Given, Then, When } = createBdd(test);

Given('I open the Sauce Demo login page', async ({ loginPage }) => {
  await loginPage.open();
});

Then('the login form is displayed', async ({ loginPage }) => {
  await loginPage.expectLoginFormVisible();
});

When('I sign in with the {string} Sauce Demo account', async ({ loginPage, sauceDemo }, account: string) => {
  await loginPage.signIn(resolveUsername(sauceDemo, account), sauceDemo.password);
});

When(
  'I attempt to sign in with the {string} username and the {string} password',
  async ({ loginPage, sauceDemo }, usernameKind: string, passwordKind: string) => {
    await loginPage.signIn(resolveUsername(sauceDemo, usernameKind), resolvePassword(sauceDemo, passwordKind));
  },
);

Then('I should be redirected to the inventory page', async ({ loginPage }) => {
  await loginPage.expectInventoryPage();
});

Then('I should remain on the Sauce Demo login page', async ({ loginPage }) => {
  await loginPage.expectStillOnLoginPage();
});

Then('I should see the login error {string}', async ({ loginPage }, errorMessage: string) => {
  await loginPage.expectLoginError(errorMessage);
});

When('I fill the password with the valid Sauce Demo password', async ({ loginPage, sauceDemo }) => {
  await loginPage.fillPassword(sauceDemo.password);
});

Then('the password field should mask the entered value', async ({ loginPage }) => {
  await loginPage.expectPasswordMasked();
});

Then('the login controls should expose accessible names', async ({ loginPage }) => {
  await loginPage.expectAccessibleControls();
});

Then('the login controls should be keyboard accessible', async ({ loginPage }) => {
  await loginPage.expectKeyboardNavigation();
});

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

function resolvePassword(sauceDemo: SauceDemoCredentials, key: string): string {
  switch (key) {
    case 'valid':
      return sauceDemo.password;
    case 'invalid':
      return sauceDemo.invalidPassword;
    case 'empty':
      return '';
    default:
      throw new Error(`Unsupported password key: ${key}`);
  }
}
