// @ts-check

import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import next from 'eslint-config-next'
import prettier from 'eslint-config-prettier'
import globals from 'globals'

export default tseslint.config(
  {
    ignores: [
      '.next/**',
      'node_modules/**',
      'out/**',
      'build/**',
      'next-env.d.ts',
    ],
  },
  next,
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
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
