import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import eslintComments from "eslint-plugin-eslint-comments";
import noOnlyTests from "eslint-plugin-no-only-tests";

export default [
  {
    ignores: ["cjs/**", "node_modules/**", "dist/**", "dev/**", "umd/**", "tsup.config.ts", "vitest.config.ts"],
  },
  {
    files: ["src/**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: import.meta.dirname,
      },
      sourceType: "module",
      ecmaVersion: "latest",
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      "eslint-comments": eslintComments,
      "no-only-tests": noOnlyTests,
    },
    rules: {
      "prefer-const": "warn",
      "no-console": "warn",
      "no-debugger": "warn",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-unnecessary-type-assertion": "warn",
      "@typescript-eslint/no-unnecessary-condition": "warn",
      "@typescript-eslint/no-useless-empty-export": "warn",
      "no-only-tests/no-only-tests": "warn",
      "eslint-comments/no-unused-disable": "warn",
    },
  },
];
