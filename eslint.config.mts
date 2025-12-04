import eslintJS from '@eslint/js';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier/flat';
import { defineConfig, globalIgnores } from 'eslint/config';

const jsConfig = defineConfig([
  {
    name: 'project/javascript-recommended',
    files: ['**/*.{js,mjs,ts,tsx}'],
    ...eslintJS.configs.recommended,
    rules: { 'no-console': ['warn', { allow: ['warn', 'error'] }] },
  },
]);

const customConfig = defineConfig([
  {
    name: 'project/typescript-custom',
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          varsIgnorePattern: '^_',
          argsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      '@typescript-eslint/consistent-type-imports': [
        'warn',
        {
          prefer: 'type-imports',
          fixStyle: 'separate-type-imports',
        },
      ],
    },
  },
]);

const eslintConfig = defineConfig([
  globalIgnores(['.next/**', 'out/**', 'build/**', 'public/**', 'next-env.d.ts', 'yarn.lock']),
  ...nextVitals,
  ...jsConfig,
  ...nextTs,
  ...customConfig,
  prettier,
]);

export default eslintConfig;
