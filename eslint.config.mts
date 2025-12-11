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
import { configs as tseslintConfigs } from 'typescript-eslint';

const ignoreConfig = defineConfig([
  {
    name: 'project/ignores',
    ignores: ['.next/**', 'out/**', 'build/**', 'public/**', 'next-env.d.ts', 'yarn.lock'],
  },
]);

const jsConfig = defineConfig([
  {
    name: 'project/javascript-recommended',
    files: ['**/*.{js,mjs,ts,tsx}'],
    extends: [eslintJS.configs.recommended],
    rules: { 'no-console': ['warn', { allow: ['warn', 'error'] }] },
  },
]);

const tsConfig = defineConfig([
  {
    name: 'project/typescript-recommended',
    files: ['**/*.{ts,mts,tsx,mjs}'],
    extends: [...tseslintConfigs.recommended],
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
      // Disable rules that conflict with TypeScript's own error checking
      '@typescript-eslint/no-unsafe-assignment': 'warn',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/triple-slash-reference': 'off',
      // disabled next rule due to bug:
      // https://github.com/typescript-eslint/typescript-eslint/issues/11732
      // https://github.com/eslint/eslint/issues/20272
      '@typescript-eslint/unified-signatures': 'off',
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
    },
  },
  {
    name: 'project/javascript-disable-type-check',
    files: ['**/*.{js,mjs,cjs}'],
    ...tseslintConfigs.disableTypeChecked,
  },
]);

const reactConfig = defineConfig([
  {
    name: 'project/react',
    files: ['**/*.{jsx,tsx}'],
    plugins: {
      react,
      'react-hooks': reactHooks,
    },
    rules: {
      ...react.configs.recommended.rules,
      ...reactHooks.configs.flat.recommended.rules,

      // Customizations for modern React/Next.js
      'react/react-in-jsx-scope': 'off', // Not needed in Next.js
      'react/prop-types': 'off', // Use TypeScript instead
      'react/no-unknown-property': 'off', // Conflicts with custom attributes
      'react/jsx-no-target-blank': 'off', // Next.js handles this
    },
    settings: {
      react: {
        version: 'detect', // Automatically detect React version
      },
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.mts', '.cts', '.tsx', '.d.ts'],
      },
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
        typescript: {
          alwaysTryTypes: true,
        },
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
      ...next.configs.recommended.rules,
      ...next.configs['core-web-vitals'].rules,
      'jsx-a11y/alt-text': ['warn', { elements: ['img'], img: ['Image'] }],
      'jsx-a11y/media-has-caption': 'warn',
      'jsx-a11y/aria-props': 'warn',
      'jsx-a11y/aria-proptypes': 'warn',
      'jsx-a11y/aria-unsupported-elements': 'warn',
      'jsx-a11y/role-has-required-aria-props': 'warn',
      'jsx-a11y/role-supports-aria-props': 'warn',
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
