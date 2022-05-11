const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')
// https://play.tailwindcss.com/KDVQG5ULlM
module.exports = {
  content: ['index.html', './src/**/*.{js,jsx,ts,tsx,vue,html}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        amber: colors.amber,
        lime: colors.lime,
        rose: colors.rose,
        orange: colors.orange
      },
      screens: {
        ...defaultTheme.screens
      }
    }
  },
  plugins: []
}
