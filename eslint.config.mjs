// @ts-check

import { defineConfig, globalIgnores } from 'eslint/config'
import eslint from '@eslint/js'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import testingLibrary from 'eslint-plugin-testing-library'
import jestDom from 'eslint-plugin-jest-dom'
import prettier from 'eslint-config-prettier/flat'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default defineConfig(
  // Override default ignores of eslint-config-next.
  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'coverage/**',
    'next-env.d.ts',
  ]),
  eslint.configs.recommended,
  // Next.js Core Web Vitals (react, react-hooks, jsx-a11y, import, @next/next)
  // and TypeScript preset from eslint-config-next.
  ...nextVitals,
  ...nextTs,
  // Type-aware TypeScript rules scoped to TS/TSX files.
  {
    files: ['**/*.{ts,tsx}'],
    extends: [tseslint.configs.recommendedTypeChecked],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  // Accessibility, React, security, and maintainability rules.
  {
    files: ['**/*.{js,jsx,mjs,ts,tsx,mts,cts}'],
    rules: {
      ...jsxA11y.flatConfigs.recommended.rules,
      'jsx-a11y/alt-text': [
        'error',
        {
          elements: ['img'],
          img: ['Image'],
        },
      ],
      'react-hooks/exhaustive-deps': 'error',
      'react/jsx-no-target-blank': 'error',
      'import/no-anonymous-default-export': 'error',
      'no-console': ['error', { allow: ['warn', 'error'] }],
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-unused-expressions': 'error',
    },
  },
  // Testing Library & jest-dom rules for unit tests.
  {
    files: ['__tests__/**/*.{ts,tsx}', '**/*.{spec,test}.{js,jsx,ts,tsx}'],
    extends: [
      testingLibrary.configs['flat/react'],
      jestDom.configs['flat/recommended'],
    ],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
  },
  {
    files: ['jest.setup.js'],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
  },
  // `@next/next/no-img-element` handles Windows backslashes inconsistently,
  // causing inline disable comments to be flagged as unused on Linux CI.
  {
    files: [
      'src/app/**/opengraph-image.{js,jsx,ts,tsx}',
      'src/app/**/twitter-image.{js,jsx,ts,tsx}',
      'src/app/**/icon.{js,jsx,ts,tsx}',
    ],
    rules: {
      '@next/next/no-img-element': 'off',
    },
  },
  // Keep last to disable formatting rules that conflict with Prettier.
  prettier
)
