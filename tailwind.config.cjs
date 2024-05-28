const defaultTheme = require('tailwindcss/defaultTheme');
/** @type {import('tailwindcss').Config} */
module.exports = {
  plugins: [require('tailwindcss/nesting')],
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Andale Mono', ...defaultTheme.fontFamily.sans],
        code: ['JetBrainsMonoNL'],
      },
      colors: {
        primario: '#333333',
        secundario: '#22d0c9',
      },
    },
  },
  darkMode: 'class',
};
