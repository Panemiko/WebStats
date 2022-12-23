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
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
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
