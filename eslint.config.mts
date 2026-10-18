import css from '@eslint/css';
import eslintJS from '@eslint/js';
import next from '@next/eslint-plugin-next';
import prettier from 'eslint-config-prettier/flat';
import importPlugin from 'eslint-plugin-import';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import { createRequire } from 'node:module';
import eslintTS from 'typescript-eslint';

const require = createRequire(import.meta.url);
const { version: reactVersion } = require('react/package.json') as { version: string };

const ignoreConfig = defineConfig([
  {
    name: 'project/ignores',
    ignores: [
      '.next/**',
      'out/**',
      'build/**',
      'public/**',
      'next-env.d.ts',
      'pnpm-lock.yaml',
      'tests/artifacts/**',
      'tests/reports/**',
      '.next-docs/**',
      'coverage/**',
    ],
  },
]);

const jsConfig = defineConfig([
  {
    name: 'project/javascript',
    files: ['**/*.{js,mjs,ts,tsx}'],
    extends: [eslintJS.configs.recommended],
    rules: {
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'preserve-caught-error': ['warn'],
    },
  },
]);

const tsConfig = defineConfig([
  {
    name: 'project/typescript',
    files: ['**/*.{ts,mts,tsx,mjs}'],
    extends: [eslintTS.configs.recommended],
    languageOptions: {
      parserOptions: {
        // Automatically detects tsconfig.json
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
        ecmaFeatures: {
          jsx: true,
        },
        warnOnUnsupportedTypeScriptVersion: true,
      },
      globals: { ...globals.browser, ...globals.node },
    },
    rules: {
      // Soften any-leakage detection — untyped API payloads (CMS, fetch) make these noisy
      '@typescript-eslint/no-unsafe-assignment': 'warn',
      '@typescript-eslint/no-unsafe-call': 'warn',
      // Prefer import over /// <reference> (kept off for generated files like next-env.d.ts)
      '@typescript-eslint/triple-slash-reference': 'off',
      // Allow ts-expect-error and ts-ignore with descriptions
      '@typescript-eslint/ban-ts-comment': [
        'error',
        {
          'ts-expect-error': 'allow-with-description',
          'ts-ignore': 'allow-with-description',
          'ts-nocheck': false,
          'ts-check': false,
          minimumDescriptionLength: 3,
        },
      ],
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
      '@typescript-eslint/consistent-type-definitions': ['warn', 'type'],
    },
  },
  {
    name: 'project/javascript-disable-type-check',
    files: ['**/*.{js,mjs,cjs}'],
    ...eslintTS.configs.disableTypeChecked,
  },
]);

const reactConfig = defineConfig([
  {
    name: 'project/react',
    files: ['**/*.{jsx,tsx}'],
    extends: [reactHooks.configs.flat.recommended],
    plugins: {
      react,
    },
    rules: {
      ...react.configs.recommended.rules,

      // Customizations for modern React/Next.js
      'react/react-in-jsx-scope': 'off', // Not needed in Next.js
      'react/prop-types': 'off', // Use TypeScript instead
      'react/no-unknown-property': 'off', // Conflicts with custom attributes
      'react/jsx-no-target-blank': 'off', // Next.js handles this
    },
    settings: {
      react: {
        version: reactVersion,
      },
    },
  },
]);

const nextConfig = defineConfig([
  {
    name: 'project/next',
    files: ['**/*.{jsx,tsx}'],
    plugins: {
      '@next/next': next,
      'jsx-a11y': jsxA11yPlugin,
      import: importPlugin,
    },
    rules: {
      ...next.configs['core-web-vitals'].rules,
      ...jsxA11yPlugin.flatConfigs.recommended.rules,
      'jsx-a11y/alt-text': ['warn', { elements: ['img'], img: ['Image'] }],
      'import/no-anonymous-default-export': 'warn',
    },
  },
]);

const cssConfig = defineConfig([
  {
    name: 'project/css',
    files: ['**/*.css'],
    plugins: {
      css,
    },
    language: 'css/css',
    rules: {
      ...css.configs.recommended.rules,
      'css/no-invalid-properties': ['error', { allowUnknownVariables: true }],
      'css/use-baseline': ['warn', { available: 'newly' }],
      'css/no-important': 'warn',
    },
  },
]);

const eslintConfig = defineConfig([
  ...ignoreConfig,
  ...jsConfig,
  ...tsConfig,
  ...reactConfig,
  ...nextConfig,
  ...cssConfig,
  prettier,
]);

export default eslintConfig;
