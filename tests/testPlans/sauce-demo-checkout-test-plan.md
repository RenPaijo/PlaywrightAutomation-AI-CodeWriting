# Sauce Demo Cart and Checkout Test Plan

## Application Overview

Rencana pengujian ini mencakup alur setelah login pada Sauce Demo: inventory, cart, checkout information, checkout overview, hingga checkout completion.

## Automation Targets

- Feature file: `features/checkout.feature`
- Step definitions: `tests/steps/checkout.steps.ts`
- Page objects:
  - `tests/pages/inventoryPage.ts`
  - `tests/pages/cartPage.ts`
  - `tests/pages/checkoutInformationPage.ts`
  - `tests/pages/checkoutOverviewPage.ts`
  - `tests/pages/checkoutCompletePage.ts`
- Shared login page object: `tests/pages/loginPage.ts`
- Shared fixtures: `tests/fixtures.ts`

## Test Data

- Account: `standard_user`
- Password: `secret_sauce`
- Checkout information: generated with `@faker-js/faker`
- Primary products for deterministic assertions:
  - `Sauce Labs Backpack` — `$29.99`
  - `Sauce Labs Bike Light` — `$9.99`

## Coverage Matrix

### 1. Positive — Continue Shopping from Cart

1. Login with `standard_user`
   - expect: Inventory page is displayed
2. Add `Sauce Labs Backpack` to cart
   - expect: Cart badge shows `1`
3. Open cart page
   - expect: Cart contains `Sauce Labs Backpack`
4. Click **Continue Shopping**
   - expect: User returns to inventory page
   - expect: Cart badge still shows `1`

### 2. Positive — Complete Checkout with Generated Customer Data

1. Login with `standard_user`
   - expect: Inventory page is displayed
2. Add `Sauce Labs Backpack` to cart
   - expect: Cart badge shows `1`
3. Open cart page
   - expect: Cart contains exactly one item
   - expect: Quantity is `1`
4. Proceed to checkout
   - expect: Checkout information page is displayed
5. Fill first name, last name, and postal code with faker data
   - expect: Continue action succeeds
6. Review checkout overview
   - expect: Overview page lists `Sauce Labs Backpack`
7. Click **Finish**
   - expect: Checkout complete page is displayed
   - expect: Success header and confirmation text are visible

### 3. Positive — Verify Two-Item Checkout Summary Totals

1. Login with `standard_user`
   - expect: Inventory page is displayed
2. Add `Sauce Labs Backpack` and `Sauce Labs Bike Light`
   - expect: Cart badge shows `2`
3. Open cart page
   - expect: Cart lists both items in insertion order
4. Proceed to checkout and submit faker customer data
   - expect: Checkout overview page is displayed
5. Review summary values
   - expect: Payment info is `SauceCard #31337`
   - expect: Shipping info is `Free Pony Express Delivery!`
   - expect: Item total is `Item total: $39.98`
   - expect: Tax is `Tax: $3.20`
   - expect: Total is `Total: $43.18`
6. Click **Finish**
   - expect: Checkout complete page is displayed

### 4. Negative — Missing Required Checkout Information

1. Login with `standard_user`
   - expect: Inventory page is displayed
2. Add `Sauce Labs Backpack` to cart and proceed to checkout
   - expect: Checkout information page is displayed
3. Submit the form with one required field missing
   - expect: Missing first name shows `Error: First Name is required`
   - expect: Missing last name shows `Error: Last Name is required`
   - expect: Missing postal code shows `Error: Postal Code is required`
   - expect: User remains on checkout information page

### 5. Edge Case — Cancel from Checkout Overview

1. Login with `standard_user`
   - expect: Inventory page is displayed
2. Add `Sauce Labs Backpack` and continue to checkout overview with faker customer data
   - expect: Overview page is displayed
3. Click **Cancel** on the overview page
   - expect: User returns to inventory page
   - expect: Cart badge still shows `1`

## Notes

- The automated suite intentionally uses stable item combinations so totals remain deterministic.
- Faker data is only used on **Checkout: Your Information** to keep checkout-input coverage realistic without hardcoded personal data.
