import { defineConfig, type Options } from 'tsup';

const CI = Boolean(process.env.CI);

const options: Options = {
  sourcemap: CI,
  minify: CI,
  splitting: CI,
  clean: CI,
  format: ['esm', 'cjs'],
  dts: CI,
  entry: ['src/index.ts'],
  target: 'es2021',
 }

export default defineConfig(options);
