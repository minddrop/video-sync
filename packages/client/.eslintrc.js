module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    // https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin#recommended-configs
    'eslint:recommended', // https://eslint.org/docs/rules/
    'plugin:@typescript-eslint/recommended', // plugin:@typescript-eslint/eslint-recommended を内包 (https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin/src/configs)
    'plugin:react/recommended',

    // https://github.com/prettier/eslint-config-prettier#installation
    // plugin:prettier/recommended は利用しない (https://prettier.io/docs/en/integrating-with-linters.html)
    'prettier',
    'prettier/@typescript-eslint',
    'prettier/react'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {},
}
