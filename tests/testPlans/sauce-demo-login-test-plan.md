# Sauce Demo Login Test Plan

## Application Overview

Rencana pengujian untuk halaman login Sauce Demo yang mencakup alur positif, negatif, dan edge case utama.

## Automation Targets

- Feature file: `features/login.feature`
- Step definitions: `tests/steps/login.steps.ts`
- Page object: `tests/pages/loginPage.ts`
- Fixtures: `tests/fixtures.ts`
- Environment data: `.env`, `.env.example`, `tests/support/env.ts`

## Environment Variables

- `SAUCE_DEMO_BASE_URL`
- `SAUCE_DEMO_STANDARD_USERNAME`
- `SAUCE_DEMO_LOCKED_OUT_USERNAME`
- `SAUCE_DEMO_PROBLEM_USERNAME`
- `SAUCE_DEMO_PERFORMANCE_GLITCH_USERNAME`
- `SAUCE_DEMO_PASSWORD`

## Test Scenarios

### 1. Positive Login with Valid Credentials

1. Navigate to the Sauce Demo login page
   - expect: Login page is displayed with username, password fields, and login button
2. Enter the `standard_user` username
   - expect: Username field contains `standard_user`
3. Enter the valid Sauce Demo password
   - expect: Password field contains the configured password
4. Click the login button
   - expect: User is redirected to `/inventory.html`
   - expect: Products title and inventory list are visible

### 2. Negative Login with Invalid Password

1. Navigate to the Sauce Demo login page
   - expect: Login page is displayed
2. Enter the `standard_user` username
   - expect: Username field contains `standard_user`
3. Enter an invalid password
   - expect: Password field contains the invalid value
4. Click the login button
   - expect: Login fails
   - expect: Error message `Epic sadface: Username and password do not match any user in this service` is displayed

### 3. Negative Login with Invalid Username

1. Navigate to the Sauce Demo login page
   - expect: Login page is displayed
2. Enter an invalid username
   - expect: Username field contains the invalid value
3. Enter the valid Sauce Demo password
   - expect: Password field contains the configured password
4. Click the login button
   - expect: Login fails
   - expect: Error message for invalid credentials is displayed

### 4. Negative Login with Empty Credentials

1. Navigate to the Sauce Demo login page
   - expect: Login page is displayed
2. Leave username empty
   - expect: Username field is empty
3. Leave password empty
   - expect: Password field is empty
4. Click the login button
   - expect: Login fails
   - expect: Error message `Epic sadface: Username is required` is displayed

### 5. Negative Login with Empty Password

1. Navigate to the Sauce Demo login page
   - expect: Login page is displayed
2. Enter the `standard_user` username
   - expect: Username field contains `standard_user`
3. Leave password empty
   - expect: Password field is empty
4. Click the login button
   - expect: Login fails
   - expect: Error message `Epic sadface: Password is required` is displayed

### 6. Negative Login with Empty Username

1. Navigate to the Sauce Demo login page
   - expect: Login page is displayed
2. Leave username empty
   - expect: Username field is empty
3. Enter the valid Sauce Demo password
   - expect: Password field contains the configured password
4. Click the login button
   - expect: Login fails
   - expect: Error message `Epic sadface: Username is required` is displayed

### 7. Edge Case Login with Locked Out User

1. Navigate to the Sauce Demo login page
   - expect: Login page is displayed
2. Enter the `locked_out_user` username
   - expect: Username field contains `locked_out_user`
3. Enter the valid Sauce Demo password
   - expect: Password field contains the configured password
4. Click the login button
   - expect: Login fails
   - expect: Error message `Epic sadface: Sorry, this user has been locked out.` is displayed

### 8. Edge Case Login with Problem User

1. Navigate to the Sauce Demo login page
   - expect: Login page is displayed
2. Enter the `problem_user` username
   - expect: Username field contains `problem_user`
3. Enter the valid Sauce Demo password
   - expect: Password field contains the configured password
4. Click the login button
   - expect: User is redirected to the products page
   - expect: Inventory is visible after login

### 9. Edge Case Login with Performance Glitch User

1. Navigate to the Sauce Demo login page
   - expect: Login page is displayed
2. Enter the `performance_glitch_user` username
   - expect: Username field contains `performance_glitch_user`
3. Enter the valid Sauce Demo password
   - expect: Password field contains the configured password
4. Click the login button
   - expect: Login succeeds
   - expect: Products page loads within the extended login wait used by automation

### 10. Validation of Password Masking and Accessibility

1. Navigate to the Sauce Demo login page
   - expect: Login page is displayed
2. Enter the valid Sauce Demo password
   - expect: Password input masks characters
   - expect: Password field uses `type="password"`
3. Verify login button and inputs are accessible
   - expect: Username, password, and login button expose accessible names
   - expect: Username, password, and login button are reachable by keyboard navigation
