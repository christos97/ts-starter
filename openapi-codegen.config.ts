import { existsSync, mkdirSync, writeFileSync } from 'fs';

import { generateSchemaTypes } from '@openapi-codegen/typescript';
import { defineConfig } from '@openapi-codegen/cli';

const apiName = process.env.API_NAME || 'elorus';

if (!existsSync(`./${apiName}.json`)) {
  throw new Error(`./${apiName}.json does not exist.`);
}

const openapiFolder = `./src/openapi/${apiName}`;

if (!existsSync(openapiFolder)) {
  mkdirSync(openapiFolder);
}

function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

writeFileSync(
  `${openapiFolder}/index.ts`,
  `export type * as ${capitalizeFirstLetter(apiName)}  from './${apiName}Schemas';`,
);

const config = defineConfig({
  [apiName]: {
    from: {
      source: 'file',
      relativePath: `./${apiName}.json`,
    },
    outputDir: `src/openapi/${apiName}`,
    to: async (context) => {
      await generateSchemaTypes(context, {
        filenamePrefix: apiName,
      });
    },
  },
});

export default config;
