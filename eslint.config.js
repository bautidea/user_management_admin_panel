import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";

export default {
  overrides: [
    {
      files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      plugins: ["@typescript-eslint", "react"],
      rules: {
        "react/react-in-jsx-scope": "off",
      },
    },
  ],
  settings: {
    react: {
      version: "detect",
    },
  },
  globals: globals.browser,
  ...pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginReactConfig,
};
