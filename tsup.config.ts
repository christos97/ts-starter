import { defineConfig, type Options } from 'tsup';

const CI = Boolean(process.env.CI);

console.warn('CI', CI);

const options: Options = {
  sourcemap: CI,
  minify: CI,
  splitting: CI,
  clean: CI,
  format: 'esm',
  dts: CI,
  entry: ['src/index.ts'],
  target: 'es2021',
 }

export default defineConfig(options);
