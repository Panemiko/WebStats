const {
  violetDark,
  cyanDark,
  mauveDark,
  limeDark,
  slateDark,
  tomatoDark,
} = require('@radix-ui/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      ...violetDark,
      ...cyanDark,
      ...mauveDark,
      ...limeDark,
      ...slateDark,
      ...tomatoDark,
    },
  },
  plugins: [],
}
