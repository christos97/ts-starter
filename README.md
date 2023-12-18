# TS-Starter: TypeScript Starter Template for VSCode

Welcome to TS-Starter, a dead-simple TypeScript starter template for Visual Studio Code, crafted to provide a seamless development experience for TypeScript projects.

## Features

- **Build Tools**: Integrated with `tsup` (ESBuild) for efficient and flexible build processes, supporting both `CommonJS` and `ESM` formats.
- **Linter and Formatter**: `ESLint` and `Prettier` are configured to ensure code quality and consistency.
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
   ```

## Environment Setup

- Copy `.env.example` to `.env` and `.env.development`:
  ```sh
  cp .env.example .env
  cp .env.example .env.development
  rm .env.example
  ```
- Fill in the actual values in `.env` and `.env.development` as per your development and production environments.

### Available Scripts

- `build`: Builds the project in both CJS and ESM formats.
- `build:cjs`: Builds the project in CommonJS format.
- `build:esm`: Builds the project in ECMAScript Module format.
- `clean`: Cleans the project by removing the dist directory and node modules.
- `format`: Formats the codebase using Prettier and syncs package configurations.
- `lint`: Lints the codebase using ESLint.
- `start`: Runs the application in ESM format.
- `start`:cjs: Runs the application in CJS format.
- `start`:esm: Runs the application in ESM format.

### Handling Environment Variables in CI/CD Pipeline:
- `GitHub Secrets for Production/CI`:
For environment variables that are sensitive or specific to production and CI environments (like API keys or service credentials), we use GitHub Secrets. This approach ensures that these variables are securely stored and are not exposed in the codebase or in the CI logs

- `Setting Up GitHub Secrets`:
  - Add Secrets to your repository
    - Navigate to your GitHub repository.
    - Click on the Settings tab.
    - Go to Secrets and choose Actions.
    - Use New repository secret to add each environment variable as a secret.

  - Name your Secrets
    - Name your secrets in a clear and consistent manner. For example, PROD_API_BASE_URL for the production API base URL

- `Using Secrets in GitHub Actions Workflow`: In the GitHub Actions workflow, these secrets are accessed and set as environment variables. Here's an example from our workflow configuration:.

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    # ... other configurations ...
    steps:
      # ... previous steps ...
      env:
          CI: true
          # API_BASE_URL: ${{ secrets.API_BASE_URL }}
          # API_KEY: ${{ secrets.API_KEY }}s
