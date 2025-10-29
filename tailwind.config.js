/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'surface-background': {
          light: '#ffffff',
          dark: '#403c3c',
        }
      }
    },
  },
  plugins: [],
}
