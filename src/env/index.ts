/**
 * @fileoverview This file is used to define the environment variables used in the project.
 * - Local development uses .env.development
 * - CI (github actions) uses .env
 */
import dotenv from 'dotenv';
import { parseEnv, z } from 'znv';

const IS_GITHUB_ACTIONS = Boolean(process.env.CI);

dotenv.config({ path: IS_GITHUB_ACTIONS ? '.env' : '.env.development' });

/**
 * @description Environment variables used in the project.
 * - Add new variables here defined in .env or .env.development
 */

const env = parseEnv(process.env, {
  CI: z.boolean().optional().default(IS_GITHUB_ACTIONS),
  API_BASE_URL: z.string(),
  API_CUSTOM_HEADERS: z.string(),
  // Add new variables below ...
});
type env = typeof env;

Object.freeze(env);

export default env;
export type { env as Env };
