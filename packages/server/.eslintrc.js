module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    // https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin#recommended-configs
    "eslint:recommended", // https://eslint.org/docs/rules/
    "plugin:@typescript-eslint/recommended", // plugin:@typescript-eslint/eslint-recommended を内包 (https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin/src/configs)
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  rules: {},
};
