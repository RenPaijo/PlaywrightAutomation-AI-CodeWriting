import { expect, Locator, Page } from '@playwright/test';

export class SauceDemoLoginPage {
  readonly appLogo: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly inventoryTitle: Locator;
  readonly inventoryContainer: Locator;
  readonly inventoryItems: Locator;

  constructor(private readonly page: Page) {
    this.appLogo = page.locator('.login_logo');
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
    this.inventoryTitle = page.locator('[data-test="title"]');
    this.inventoryContainer = page.locator('.inventory_list');
    this.inventoryItems = page.locator('.inventory_item');
  }

  async open(): Promise<void> {
    await this.page.goto('/');
  }

  async expectLoginFormVisible(): Promise<void> {
    await expect(this.page).toHaveURL(/\/$/);
    await expect(this.appLogo).toHaveText('Swag Labs');
    await expect(this.usernameInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.loginButton).toBeVisible();
  }

  async signIn(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await expect(this.usernameInput).toHaveValue(username);
    await this.passwordInput.fill(password);
    await expect(this.passwordInput).toHaveValue(password);
    await this.loginButton.click();
  }

  async fillPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
    await expect(this.passwordInput).toHaveValue(password);
  }

  async expectInventoryPage(): Promise<void> {
    await expect(this.page).toHaveURL(/\/inventory\.html$/, { timeout: 15000 });
    await expect(this.inventoryTitle).toHaveText('Products');
    await expect(this.inventoryContainer).toBeVisible();
    await expect(this.inventoryItems.first()).toBeVisible();
  }

  async expectStillOnLoginPage(): Promise<void> {
    await expect(this.page).toHaveURL(/\/$/);
    await expect(this.loginButton).toBeVisible();
  }

  async expectLoginError(message: string): Promise<void> {
    await expect(this.errorMessage).toHaveText(message);
  }

  async expectPasswordMasked(): Promise<void> {
    await expect(this.passwordInput).toHaveAttribute('type', 'password');
  }

  async expectAccessibleControls(): Promise<void> {
    await expect(this.page.getByRole('textbox', { name: 'Username' })).toBeVisible();
    await expect(this.page.getByRole('textbox', { name: 'Password' })).toBeVisible();
    await expect(this.page.getByRole('button', { name: 'Login' })).toBeVisible();
  }

  async expectKeyboardNavigation(): Promise<void> {
    await this.page.mouse.click(1, 1);
    await this.page.keyboard.press('Tab');
    await expect(this.usernameInput).toBeFocused();
    await this.page.keyboard.press('Tab');
    await expect(this.passwordInput).toBeFocused();
    await this.page.keyboard.press('Tab');
    await expect(this.loginButton).toBeFocused();
  }
}
