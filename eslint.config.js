import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import { fixupConfigRules } from "@eslint/compat";
import { rules } from "eslint-plugin-react/configs/all";


export default [
  {files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    rules : {
      'react/react-in-jsx-scope' : 'off',
    'react-hooks/exhaustive-deps' : 'off'
    }
  },
  { languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } } },
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...fixupConfigRules(pluginReactConfig),
];