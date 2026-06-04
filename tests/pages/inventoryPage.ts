import { expect, Locator, Page } from '@playwright/test';

export class SauceDemoInventoryPage {
  readonly inventoryTitle: Locator;
  readonly inventoryItems: Locator;
  readonly shoppingCartLink: Locator;
  readonly shoppingCartBadge: Locator;

  constructor(private readonly page: Page) {
    this.inventoryTitle = page.locator('[data-test="title"]');
    this.inventoryItems = page.locator('.inventory_item');
    this.shoppingCartLink = page.locator('[data-test="shopping-cart-link"]');
    this.shoppingCartBadge = page.locator('[data-test="shopping-cart-badge"]');
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/\/inventory\.html$/, { timeout: 15000 });
    await expect(this.inventoryTitle).toHaveText('Products');
    await expect(this.inventoryItems.first()).toBeVisible();
  }

  async addItemToCart(itemName: string): Promise<void> {
    const itemCard = this.getInventoryItem(itemName);
    await expect(itemCard).toBeVisible();
    await itemCard.getByRole('button', { name: 'Add to cart' }).click();
    await expect(itemCard.getByRole('button', { name: 'Remove' })).toBeVisible();
  }

  async openCart(): Promise<void> {
    await this.shoppingCartLink.click();
  }

  async expectCartBadgeCount(count: number): Promise<void> {
    await expect(this.shoppingCartBadge).toHaveText(String(count));
  }

  async expectCartBadgeHidden(): Promise<void> {
    await expect(this.shoppingCartBadge).toHaveCount(0);
  }

  private getInventoryItem(itemName: string): Locator {
    return this.page.locator('.inventory_item').filter({
      has: this.page.locator('[data-test="inventory-item-name"]', { hasText: itemName }),
    });
  }
}
