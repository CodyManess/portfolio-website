// @ts-check

import { defineConfig, globalIgnores } from 'eslint/config'
import eslint from '@eslint/js'
import eslintComments from '@eslint-community/eslint-plugin-eslint-comments/configs'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'
import betterTailwindcss from 'eslint-plugin-better-tailwindcss'
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
  // Enforce explicit descriptions and scoped disables on ESLint directive comments.
  eslintComments.recommended,
  {
    rules: {
      '@eslint-community/eslint-comments/require-description': [
        'error',
        { ignore: ['eslint-enable'] },
      ],
    },
  },
  // Tailwind CSS v4 class validation, conflict detection, and ordering.
  betterTailwindcss.configs['recommended-error'],
  {
    settings: {
      'better-tailwindcss': {
        entryPoint: 'src/app/globals.css',
      },
    },
    rules: {
      // Single-line className strings are formatted by Prettier; multi-line
      // template-literal wrapping would churn components and conflict.
      'better-tailwindcss/enforce-consistent-line-wrapping': 'off',
    },
  },
  // Strict type-aware TypeScript rules scoped to TS/TSX files.
  {
    files: ['**/*.{ts,tsx}'],
    extends: [tseslint.configs.strictTypeChecked],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  // Accessibility, React, import hygiene, security, and maintainability rules.
  {
    files: ['**/*.{js,jsx,mjs,ts,tsx,mts,cts}'],
    rules: {
      ...jsxA11y.flatConfigs.strict.rules,
      'jsx-a11y/alt-text': [
        'error',
        {
          elements: ['img'],
          img: ['Image'],
        },
      ],
      'jsx-a11y/anchor-ambiguous-text': 'error',
      'jsx-a11y/prefer-tag-over-role': 'error',
      'react-hooks/exhaustive-deps': 'error',
      'react-hooks/void-use-memo': 'error',
      'react/button-has-type': 'error',
      'react/jsx-no-leaked-render': 'error',
      'react/jsx-no-target-blank': 'error',
      'react/jsx-no-useless-fragment': 'error',
      'react/no-array-index-key': 'error',
      'react/self-closing-comp': 'error',
      'import/first': 'error',
      'import/newline-after-import': 'error',
      'import/no-anonymous-default-export': 'error',
      // Cycle graph traversal is too slow for interactive editor/local linting; enforce in CI only.
      'import/no-cycle': process.env.CI === 'true' ? 'error' : 'off',
      'import/no-duplicates': 'error',
      'import/no-mutable-exports': 'error',
      'no-console': ['error', { allow: ['warn', 'error'] }],
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'separate-type-imports' },
      ],
      '@typescript-eslint/no-confusing-void-expression': [
        'error',
        { ignoreArrowShorthand: true },
      ],
      '@typescript-eslint/no-import-type-side-effects': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-unused-expressions': 'error',
      '@typescript-eslint/restrict-template-expressions': [
        'error',
        { allowNumber: true },
      ],
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
