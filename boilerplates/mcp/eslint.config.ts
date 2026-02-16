// import reactHooks from 'eslint-plugin-react-hooks';
import eslint from '@eslint/js';
import { defineConfig } from 'eslint/config';
import stylistic from '@stylistic/eslint-plugin';
import * as tsParser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';
import globals from 'globals';
import tseslint, { configs } from 'typescript-eslint';

export default defineConfig(
  eslint.configs.recommended,
  configs.recommended,
  configs.stylistic,
  importPlugin.flatConfigs.recommended,
  importPlugin.flatConfigs.typescript,
  {
    plugins: {
      '@stylistic': stylistic,
      '@typescript-eslint': tseslint.plugin,
    },

    languageOptions: {
      globals: {
        ...globals.node,
      },

      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        project: [
          './tsconfig.json',
        ],
        ecmaFeatures: {},
      },
    },
    rules: {
      // 'comma-style': ['error', 'last'],
      '@stylistic/comma-dangle': ['error', 'always-multiline'],
      '@stylistic/eol-last': ['error', 'always'],
      '@stylistic/function-paren-newline': ['error', 'multiline-arguments'],
      'global-require': 0,
      'import/order': ['error', {
        groups: [
          'type',
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
        ],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      }],
      'import/prefer-default-export': 0,
      '@stylistic/implicit-arrow-linebreak': ['error', 'beside'],
      'arrow-body-style': ['error', 'as-needed'],
      '@stylistic/indent': ['error', 2, { SwitchCase: 1 }],
      '@stylistic/multiline-ternary': ['error', 'always'],
      '@stylistic/newline-per-chained-call': ['error', { 'ignoreChainWithDepth': 2 }],
      '@stylistic/no-multiple-empty-lines': ['error', { 'max': 1, 'maxEOF': 1 }],
      '@stylistic/no-tabs': ['error'],
      'no-var': 2,
      'no-undef': 2,
      'object-curly-spacing': ['error', 'always'],
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/semi': ['error', 'always'],
    },
    settings: {
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.d.ts'],
      },
      'import/resolver': {
        typescript: {
          project: [
            './tsconfig.json',
          ],
        },
      },
    },
  },
  {
    ignores: ['**/dist/*', '**/node_modules/*', '**/.tmp/*'],
  });
