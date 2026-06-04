import { expect, Locator, Page } from '@playwright/test';

export class SauceDemoCartPage {
  readonly cartTitle: Locator;
  readonly cartItems: Locator;
  readonly cartItemNames: Locator;
  readonly cartItemQuantities: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;

  constructor(private readonly page: Page) {
    this.cartTitle = page.locator('[data-test="title"]');
    this.cartItems = page.locator('.cart_item');
    this.cartItemNames = page.locator('[data-test="inventory-item-name"]');
    this.cartItemQuantities = page.locator('[data-test="item-quantity"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/\/cart\.html$/, { timeout: 15000 });
    await expect(this.cartTitle).toHaveText('Your Cart');
    await expect(this.checkoutButton).toBeVisible();
  }

  async expectItemNames(itemNames: string[]): Promise<void> {
    await expect(this.cartItemNames).toHaveText(itemNames);
  }

  async expectItemCount(count: number): Promise<void> {
    await expect(this.cartItems).toHaveCount(count);
  }

  async expectEachItemQuantity(quantity: number): Promise<void> {
    const expected = Array.from({ length: await this.cartItemQuantities.count() }, () => String(quantity));
    await expect(this.cartItemQuantities).toHaveText(expected);
  }

  async continueShopping(): Promise<void> {
    await this.continueShoppingButton.click();
  }

  async proceedToCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }
}
