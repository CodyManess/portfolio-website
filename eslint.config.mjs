import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
})

const eslintConfig = [
  ...compat.config({
    parser: '@typescript-eslint/parser',
    extends: ['next/core-web-vitals', 'next/typescript', 'prettier'],
  }),
]

export default eslintConfig
