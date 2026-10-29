import type { UserConfig } from '@commitlint/types';

// Build: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
// Ci: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
// Docs: Documentation only changes
// Feat: A new feature
// Fix: A bug fix
// Perf: A code change that improves performance
// Refactor: A code change that neither fixes a bug nor adds a feature
// Style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
// Test: Adding missing tests or correcting existing tests

const Configuration: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'body-leading-blank': [1, 'always'],
    'body-max-line-length': [2, 'always', 100],
    'footer-leading-blank': [1, 'always'],
    'footer-max-line-length': [2, 'always', 100],
    'header-max-length': [2, 'always', 100],
    'scope-case': [2, 'always', 'lower-case'],
    'subject-case': [2, 'never', ['sentence-case', 'start-case', 'pascal-case', 'upper-case']],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'type-enum': [
      2,
      'always',
      [
        'build',
        'chore',
        'ci',
        'docs',
        'feat',
        'fix',
        'perf',
        'refactor',
        'revert',
        'style',
        'test',
        'translation',
        'security',
        'changeset',
      ],
    ],
  },
};

export default Configuration;
