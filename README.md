# TS-Starter: TypeScript Starter Template for VSCode

Welcome to TS-Starter, a dead-simple TypeScript starter template for Visual Studio Code, crafted to provide a seamless development experience for TypeScript projects.

## Features

- **TypeScript Support**: Utilize the full power of TypeScript for scalable and maintainable code.
- **Build Tools**: Integrated with `tsup` for efficient and flexible build processes, supporting both CommonJS and ESM formats.
- **Linter and Formatter**: ESLint and Prettier are configured to ensure code quality and consistency.
- **Environment Variables**: Support for `.env` and `.env.development` files to manage environment-specific configurations using `dotenv`.
- **Concurrent Tasks**: Use of `concurrently` for running multiple scripts simultaneously.
- **Package Management**: Managed with `pnpm` for efficient and fast dependency resolution.

## Getting Started

1. **Clone the Repository**:
   ```sh
    git clone https://github.com/christos97/ts-starter.git
    cd ts-starter
   ```
2. **Install Dependencies**
   ```sh
    pnpm install
   ```
3. **Start dev server**
   ```sh
   pnpm start
   Scripts

- `build`: Builds the project in both CJS and ESM formats.
- `build:cjs`: Builds the project in CommonJS format.
- `build:esm`: Builds the project in ECMAScript Module format.
- `clean`: Cleans the project by removing the dist directory and node modules.
- `format`: Formats the codebase using Prettier and syncs package configurations.
- `lint`: Lints the codebase using ESLint.
- `start`: Runs the application in ESM format.
- `start`:cjs: Runs the application in CJS format.
- `start`:esm: Runs the application in ESM format.
