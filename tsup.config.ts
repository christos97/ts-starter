import { defineConfig } from 'tsup';

const CI = Boolean(process.env.CI);
const SYMLINK_WATCH_MODE = Boolean(process.env.SYMLINK_WATCH_MODE);

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
  watch: !CI && SYMLINK_WATCH_MODE
 });
