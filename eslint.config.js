import js from "@eslint/js";

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        console: "readonly",
        process: "readonly",
        Buffer: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
        global: "readonly",
        setTimeout: "readonly",
        clearTimeout: "readonly",
        setInterval: "readonly",
        clearInterval: "readonly"
      }
    },
    rules: {
      // Indentation: 2 spaces (tabs converted to 2 spaces)
      "indent": ["error", 2],

      // Max line length: 89 characters
      "max-len": ["error", {
        code: 89,
        tabWidth: 2,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true
      }],

      // Semicolons: required
      "semi": ["error", "always"],

      // Double quotes
      "quotes": ["error", "double"],

      // Formatting rules
      "no-trailing-spaces": "error",
      "eol-last": "error",
      "comma-spacing": ["error", { before: false, after: true }],
      "key-spacing": ["error", { beforeColon: false, afterColon: true }],
      "space-before-blocks": "error",
      "space-before-function-paren": ["error", {
        anonymous: "always",
        named: "never",
        asyncArrow: "always"
      }],
      "space-in-parens": ["error", "never"],
      "space-infix-ops": "error",
      "object-curly-spacing": ["error", "always"],
      "array-bracket-spacing": ["error", "never"],
      "computed-property-spacing": ["error", "never"],

      // Code quality rules
      "no-unused-vars": ["error", {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_"
      }],
      "no-console": "off",
      "prefer-const": "error",
      "no-var": "error",

      // ES6+ rules
      "arrow-spacing": "error",
      "template-curly-spacing": ["error", "never"],

      // Line breaks and spacing
      "comma-dangle": ["error", "never"],
      "no-multiple-empty-lines": ["error", { max: 2, maxEOF: 1 }],
      "padded-blocks": ["error", "never"],

      // Function and class formatting
      "brace-style": ["error", "1tbs", { allowSingleLine: true }],
      "curly": ["error", "all"]
    },
    files: ["**/*.js", "**/*.mjs"],
    ignores: [
      "node_modules/**",
      "dist/**",
      "build/**",
      "coverage/**"
    ]
  }
];
