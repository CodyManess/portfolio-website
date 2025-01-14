import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
})

const eslintConfig = [
  ...compat.config({
    parser: '@typescript-eslint/parser',
    extends: [
      'next/core-web-vitals', 
      'next/typescript',
      'plugin:jsx-a11y/recommended',
      'eslint-config-prettier',
      'prettier'
    ],
    settings: {
      react: {
        version: 'detect',
      },
    },
  }),
]

export default eslintConfig
