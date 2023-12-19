import { defineConfig } from 'tsup';

const CI = Boolean(process.env.CI);

export default defineConfig({
  entry: ['src/index.ts'],
  format: 'esm',
  target: 'es2021',
  clean: true,
  sourcemap: 'inline',
  minify: CI,
  splitting: CI,
  dts: CI,
 });
