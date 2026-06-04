import path from 'node:path';
import { spawn, spawnSync } from 'node:child_process';
import process from 'node:process';

const nodeCommand = process.execPath;
const cliArgs = process.argv.slice(2);
const isCi = process.env.CI === 'true' || process.env.CI === '1';
const openReportsOnlyFlag = '--open-reports-only';
const openReportsOnly = cliArgs.includes(openReportsOnlyFlag);
const playwrightArgs = cliArgs.filter((arg) => arg !== openReportsOnlyFlag);
const bddgenCli = path.resolve('node_modules/playwright-bdd/dist/cli/index.js');
const playwrightCli = path.resolve('node_modules/@playwright/test/cli.js');
const allureCli = path.resolve('node_modules/allure/cli.js');

if (openReportsOnly) {
  openReports(true);
  process.exit(0);
}

const generationStatus = runCommand([bddgenCli]);
if (generationStatus !== 0) {
  process.exit(generationStatus);
}

const testStatus = runCommand([playwrightCli, 'test', ...playwrightArgs]);
const allureStatus = runCommand([allureCli, 'generate', 'allure-results', '-o', 'allure-report']);

if (!isCi) {
  openReports(allureStatus === 0);
}

process.exit(testStatus !== 0 ? testStatus : allureStatus);

function runCommand(args: string[]): number {
  const result = spawnSync(nodeCommand, args, {
    stdio: 'inherit',
    env: process.env,
  });

  if (result.error) {
    throw result.error;
  }

  return result.status ?? 1;
}

function openDetached(args: string[]): void {
  const child = spawn(nodeCommand, args, {
    detached: true,
    stdio: 'ignore',
    env: process.env,
  });

  child.unref();
}

function openReports(shouldOpenAllure: boolean): void {
  openDetached([playwrightCli, 'show-report', 'playwright-report']);

  if (shouldOpenAllure) {
    openDetached([allureCli, 'open', 'allure-report']);
  }
}
