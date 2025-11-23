import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";
import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

const eslintConfig = [...nextCoreWebVitals, ...nextTypescript, ...compat.config({
  extends: ['prettier'],

  rules: {
    'no-console': [
      'warn',
      {
        allow: ['debug', 'info', 'warn', 'error'],
      },
    ],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        args: 'all',
        argsIgnorePattern: '^_',
        caughtErrors: 'all',
        caughtErrorsIgnorePattern: '^_',
        destructuredArrayIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        ignoreRestSiblings: true,
      },
    ],
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-unused-expressions': 'warn',
    '@typescript-eslint/consistent-type-imports': [
      'warn',
      {
        prefer: 'type-imports',
      },
    ],
  }
}), {
  ignores: [
    '**/.next',
    '**/.cache',
    '**/package-lock.json',
    '**/public',
    '**/node_modules',
    '**/next-env.d.ts',
    '**/yarn.lock',
  ],
}];

export default eslintConfig;
