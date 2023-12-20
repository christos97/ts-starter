import { defineConfig } from 'tsup';

const CI = Boolean(process.env.CI);

export default defineConfig({
  entry: ['src/index.ts'],
  format: 'esm',
  target: 'es2021',
  clean: true,
  treeshake: false,
  sourcemap: CI ? 'inline' : true,
  splitting: CI,
  minify: CI,
  dts: CI,
 });
