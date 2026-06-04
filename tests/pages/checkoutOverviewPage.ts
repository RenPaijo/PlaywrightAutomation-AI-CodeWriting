import { expect, Locator, Page } from '@playwright/test';

export class SauceDemoCheckoutOverviewPage {
  readonly title: Locator;
  readonly itemNames: Locator;
  readonly paymentInfoValue: Locator;
  readonly shippingInfoValue: Locator;
  readonly itemTotalLabel: Locator;
  readonly taxLabel: Locator;
  readonly totalLabel: Locator;
  readonly finishButton: Locator;
  readonly cancelButton: Locator;

  constructor(private readonly page: Page) {
    this.title = page.locator('[data-test="title"]');
    this.itemNames = page.locator('[data-test="inventory-item-name"]');
    this.paymentInfoValue = page.locator('[data-test="payment-info-value"]');
    this.shippingInfoValue = page.locator('[data-test="shipping-info-value"]');
    this.itemTotalLabel = page.locator('[data-test="subtotal-label"]');
    this.taxLabel = page.locator('[data-test="tax-label"]');
    this.totalLabel = page.locator('[data-test="total-label"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.cancelButton = page.locator('[data-test="cancel"]');
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/\/checkout-step-two\.html$/, { timeout: 15000 });
    await expect(this.title).toHaveText('Checkout: Overview');
    await expect(this.finishButton).toBeVisible();
  }

  async expectItemNames(itemNames: string[]): Promise<void> {
    await expect(this.itemNames).toHaveText(itemNames);
  }

  async expectPaymentInformation(text: string): Promise<void> {
    await expect(this.paymentInfoValue).toHaveText(text);
  }

  async expectShippingInformation(text: string): Promise<void> {
    await expect(this.shippingInfoValue).toHaveText(text);
  }

  async expectItemTotal(text: string): Promise<void> {
    await expect(this.itemTotalLabel).toHaveText(text);
  }

  async expectTax(text: string): Promise<void> {
    await expect(this.taxLabel).toHaveText(text);
  }

  async expectTotal(text: string): Promise<void> {
    await expect(this.totalLabel).toHaveText(text);
  }

  async finish(): Promise<void> {
    await this.finishButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }
}
