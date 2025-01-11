import nextPlugin from '@next/eslint-plugin-next';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';
import reactPlugin from 'eslint-plugin-react';
import hooksPlugin from 'eslint-plugin-react-hooks';
import importPlugin from 'eslint-plugin-import';
import a11yPlugin from 'eslint-plugin-jsx-a11y';

const config = [
  {
    files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
        tsconfigRootDir: '.',
      },
    },
  },
  {
    ignores: [
      '**/node_modules/',
      '**/.pnpm-store/',
      '**/.next/',
      '**/out/',
      '**/dist/',
      '**/build/',
      '**/pnpm-lock.yaml',
      '**/.pnpm-debug.log',
      '**/.eslintcache',
      '**/next-env.d.ts',
      '*.config.{js,ts,mjs}',
      '**/tsconfig.json',
      '**/.env*',
      '**/.idea/',
      '**/.DS_Store',
    ],
  },
  {
    name: 'eslint/recommended',
    rules: js.configs.recommended.rules,
  },
  ...tseslint.configs.recommended,
  {
    name: 'import/recommended',
    plugins: {
      import: importPlugin,
    },
    settings: {
      'import/resolver': {
        node: true,
        typescript: true,
      },
    },
    rules: {
      ...importPlugin.configs.recommended.rules,
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal'],
          pathGroups: [
            {
              pattern: 'react',
              group: 'external',
              position: 'before',
            },
          ],
          'newlines-between': 'always',
        },
      ],
    },
  },
  {
    name: 'jsx-a11y/recommended',
    plugins: {
      'jsx-a11y': a11yPlugin,
    },
    rules: a11yPlugin.configs.recommended.rules,
  },
  {
    name: 'react/jsx-runtime',
    plugins: {
      react: reactPlugin,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: reactPlugin.configs['jsx-runtime'].rules,
  },
  {
    name: 'react-hooks/recommended',
    plugins: {
      'react-hooks': hooksPlugin,
    },
    rules: hooksPlugin.configs.recommended.rules,
  },
  {
    name: 'next/core-web-vitals',
    plugins: {
      '@next/next': nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
    },
  },
  {
    name: 'typescript-strict',
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
    },
  },
  {
    name: 'promises',
    rules: {
      'no-async-promise-executor': 'error',
      'no-await-in-loop': 'warn',
      'prefer-promise-reject-errors': 'error',
    },
  },
  {
    name: 'prettier/config',
    ...eslintConfigPrettier,
  },
  {
    name: 'project-custom',
    rules: {
      semi: ['error', 'always'],
      '@typescript-eslint/no-unused-vars': 1,
    },
  },
];

export default config;
