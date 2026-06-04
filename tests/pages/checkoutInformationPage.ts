import { expect, Locator, Page } from '@playwright/test';
import type { CheckoutCustomerInfo } from '../fixtures';

export class SauceDemoCheckoutInformationPage {
  readonly title: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly cancelButton: Locator;
  readonly errorMessage: Locator;

  constructor(private readonly page: Page) {
    this.title = page.locator('[data-test="title"]');
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.cancelButton = page.locator('[data-test="cancel"]');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/\/checkout-step-one\.html$/, { timeout: 15000 });
    await expect(this.title).toHaveText('Checkout: Your Information');
    await expect(this.firstNameInput).toBeVisible();
    await expect(this.lastNameInput).toBeVisible();
    await expect(this.postalCodeInput).toBeVisible();
  }

  async submitCustomerInfo(customerInfo: CheckoutCustomerInfo): Promise<void> {
    await this.firstNameInput.fill(customerInfo.firstName);
    await this.lastNameInput.fill(customerInfo.lastName);
    await this.postalCodeInput.fill(customerInfo.postalCode);
    await this.continueButton.click();
  }

  async submitCustomerInfoWithoutField(
    customerInfo: CheckoutCustomerInfo,
    missingField: 'first name' | 'last name' | 'postal code',
  ): Promise<void> {
    await this.firstNameInput.fill(missingField === 'first name' ? '' : customerInfo.firstName);
    await this.lastNameInput.fill(missingField === 'last name' ? '' : customerInfo.lastName);
    await this.postalCodeInput.fill(missingField === 'postal code' ? '' : customerInfo.postalCode);
    await this.continueButton.click();
  }

  async expectError(message: string): Promise<void> {
    await expect(this.errorMessage).toHaveText(message);
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }
}
