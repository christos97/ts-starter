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
  API_BASE_URL: String(process.env.API_BASE_URL),
  API_CUSTOM_HEADERS: String(process.env.API_CUSTOM_HEADERS),
} as const;

const env = Object.assign({}, ENV_VARS);
type env = typeof env;

export default env;
