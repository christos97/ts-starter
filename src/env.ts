/**
 * @fileoverview This file is used to define the environment variables used in the project.
 * - Local development uses .env.development
 * - CI (github actions) uses .env
 */
import dotenv from 'dotenv';

const CI = Boolean(process.env.CI);

dotenv.config({ path: CI ? '.env' : '.env.development' });

const env = {
  // Default variables
  CI,

  // Custom variables
  MY_CUSTOM_VAR: process.env.MY_CUSTOM_VAR,
  ANOTHER_VAR: process.env.ANOTHER_VAR,
  // Add more variables here as defined in .env or .env.development
} as const;
type env = typeof env;

export { env };
export default env;
