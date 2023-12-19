/**
 * @fileoverview This file is used to define the environment variables used in the project.
 * - Local development uses .env.development
 * - CI (github actions) uses .env
 */
import dotenv from 'dotenv';

const CI = Boolean(process.env.CI);

dotenv.config({ path: CI ? '.env' : '.env.development' });

/**
 * @description Environment variables used in the project.
 * - Add new variables here defined in .env or .env.development
 */
const env = {
  CI,
  API_BASE_URL: String(process.env.API_BASE_URL),
  API_CUSTOM_HEADERS: String(process.env.API_CUSTOM_HEADERS),
  // Add new variables below ...
} as const;
type env = typeof env;

export default env;
export type { env as Env };
