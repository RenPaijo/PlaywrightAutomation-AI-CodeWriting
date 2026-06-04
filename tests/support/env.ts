import path from 'node:path';
import dotenv from 'dotenv';

const envFilePath = path.resolve(process.cwd(), '.env');
let hasLoadedEnv = false;

type RequiredEnvName =
  | 'SAUCE_DEMO_BASE_URL'
  | 'SAUCE_DEMO_STANDARD_USERNAME'
  | 'SAUCE_DEMO_LOCKED_OUT_USERNAME'
  | 'SAUCE_DEMO_PROBLEM_USERNAME'
  | 'SAUCE_DEMO_PERFORMANCE_GLITCH_USERNAME'
  | 'SAUCE_DEMO_PASSWORD';

export function loadEnv(): void {
  if (hasLoadedEnv) {
    return;
  }

  dotenv.config({ path: envFilePath, quiet: true });
  hasLoadedEnv = true;
}

loadEnv();

function getRequiredEnv(name: RequiredEnvName): string {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}. Add it to .env or GitHub Secrets.`);
  }

  return value;
}

export const env = {
  baseUrl: getRequiredEnv('SAUCE_DEMO_BASE_URL'),
  standardUsername: getRequiredEnv('SAUCE_DEMO_STANDARD_USERNAME'),
  lockedOutUsername: getRequiredEnv('SAUCE_DEMO_LOCKED_OUT_USERNAME'),
  problemUsername: getRequiredEnv('SAUCE_DEMO_PROBLEM_USERNAME'),
  performanceGlitchUsername: getRequiredEnv('SAUCE_DEMO_PERFORMANCE_GLITCH_USERNAME'),
  password: getRequiredEnv('SAUCE_DEMO_PASSWORD'),
} as const;
