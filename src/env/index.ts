/**
 * @fileoverview This file is used to define the environment variables used in the project.
 * - Local development uses .env.development
 * - CI (github actions) uses .env
 */
import dotenv from 'dotenv';

const CI = Boolean(process.env.CI);

dotenv.config({ path: CI ? '.env' : '.env.development' });

// Add more variables here as defined in .env or .env.development
const ENV_VARS = {
  MY_CUSTOM_VAR: String(process.env.MY_CUSTOM_VAR),
  ANOTHER_VAR: Number(process.env.ANOTHER_VAR),
} as const;

const DEFAULT_ENV_VARS = {
  CI,
} as const;

const env = {
  ...DEFAULT_ENV_VARS,
  ...ENV_VARS,
} as const;
type env = typeof env;

export default env;
