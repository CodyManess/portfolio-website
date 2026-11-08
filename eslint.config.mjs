// @ts-check

import { defineConfig, globalIgnores } from 'eslint/config'
import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import nextVitals from 'eslint-config-next/core-web-vitals'
import prettier from 'eslint-config-prettier/flat'
import globals from 'globals'

export default defineConfig(
  globalIgnores([
    '.next/**',
    'node_modules/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),
  // Base Next.js rules (react, react-hooks, jsx-a11y, import, @next/next) with
  // Core Web Vitals-impacting rules upgraded from warnings to errors.
  nextVitals,
  eslint.configs.recommended,
  tseslint.configs.recommended,
  {
    files: ['**/*.{spec,test}.{js,jsx,ts,tsx}', 'jest.setup.js'],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
  },
  prettier
)
