// ESLint v9 flat config (CommonJS), with @eslint/js recommended + Prettier
const js = require("@eslint/js");
const prettier = require("eslint-config-prettier");
const globals = require("globals");

module.exports = [
  // Ignore patterns (replacement for .eslintignore)
  {
    ignores: ["node_modules", "dist", ".tmp", ".sass-cache", ".vscode"],
  },
  // Core ESLint recommended rules
  js.configs.recommended,
  // Project browser JS (src)
  {
    files: ["src/**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.browser,
    },
    rules: {},
  },
  // Node/CommonJS config files
  {
    files: ["eslint.config.js", "webpack.config.js", "postcss.config.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "commonjs",
      globals: globals.node,
    },
  },
  // Keep Prettier last to disable formatting-conflicting rules
  prettier,
];
