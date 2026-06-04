# AI Automation Testing

This repository contains Sauce Demo automation testing built with Playwright, TypeScript, `playwright-bdd`, and Allure.

## Main Note

All automation code in this repository was created by AI, including:
- BDD feature files
- step definitions
- page objects
- fixtures and environment loading
- test execution and reporting scripts
- testing documentation

The human role in this project is to provide direction, review the output, and run the automation when needed.

## Test Coverage

The current suite covers two main areas:
- **Login** — valid login, invalid login, field validation, password masking, and basic accessibility.
- **Checkout** — cart behavior, checkout information, summary validation, required field validation, and order completion.

## Folder Structure

```text
features/
  login.feature
  checkout.feature

tests/
  fixtures.ts
  pages/
  steps/
  support/
  testPlans/

scripts/
  run-tests.ts
```

## Folder Summary

- `features/` stores BDD scenarios in Gherkin format.
- `tests/steps/` stores the step implementations for login and checkout.
- `tests/pages/` stores page objects for the Sauce Demo pages under test.
- `tests/fixtures.ts` provides Playwright fixtures and test data.
- `tests/support/env.ts` loads and validates environment variables.
- `tests/testPlans/` stores the test plans used as coverage references.
- `scripts/run-tests.ts` generates BDD output, runs the tests, generates reports, and opens reports locally.

## Environment Setup

Copy `.env.example` to `.env`, then fill in these values:

- `SAUCE_DEMO_BASE_URL`
- `SAUCE_DEMO_STANDARD_USERNAME`
- `SAUCE_DEMO_LOCKED_OUT_USERNAME`
- `SAUCE_DEMO_PROBLEM_USERNAME`
- `SAUCE_DEMO_PERFORMANCE_GLITCH_USERNAME`
- `SAUCE_DEMO_PASSWORD`

## Scripts

- `npm test`
  - generates BDD output
  - runs the full test suite
  - generates the Playwright HTML report
  - generates the Allure report
  - opens the local reports when not running in CI

- `npm run test:report`
  - runs the same flow as `npm test`

- `npm run test:headed`
  - runs the full flow in headed mode

- `npm run test:debug`
  - runs the full flow in debug mode

- `npm run report:open`
  - reopens the existing Playwright HTML report and Allure report

## Report Output

After the test run, the main outputs are available in:
- `playwright-report/`
- `allure-report/`
- `allure-results/`
- `test-results/`

## Repository Goal

This repository demonstrates that an end-to-end web automation suite can be authored entirely by AI while still remaining structured, runnable, and reviewable.