module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: { react: { version: "18.2" } },
  plugins: ["react-refresh"],
  rules: {
    "comma-dangle": 0,
    "spaced-comment": 0,
    "import/no-duplicates": 0,
    "object-curly-newline": 0,
    "no-console": 0,
    "import/extensions": 0,
    'no-unused-vars': 'warn',
    quotes: ["error", "single"],

    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
  },
};
