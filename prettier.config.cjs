/** @type {import("prettier").Config} */
module.exports = {
  singleQuote: true,
  jsxSingleQuote: true,
  trailingComma: 'es5',
  bracketSpacing: true,
  jsxBracketSameLine: false,
  tabWidth: 2,
  semi: false,
  printWidth: 80,
  plugins: [require.resolve('prettier-plugin-tailwindcss')],
}
