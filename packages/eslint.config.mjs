import typescriptEslintEslintPlugin from "@typescript-eslint/eslint-plugin";
import _import from "eslint-plugin-import";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import { fixupPluginRules } from "@eslint/compat";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all,
});

export default [
    {
        ignores: [
            "**/.eslintrc.js",
            "**/eslint.config.mjs",
            "**/eslint.config.js",
            "**/*.spec.*"
        ],
    },
    ...compat.extends(
        "plugin:@typescript-eslint/recommended",
        "plugin:prettier/recommended",
    ),
    {
        plugins: {
            "@typescript-eslint": typescriptEslintEslintPlugin,
            import: fixupPluginRules(_import),
            "simple-import-sort": simpleImportSort,
        },

        languageOptions: {
            globals: {
                ...globals.node,
                ...globals.jest,
            },

            parser: tsParser,
            ecmaVersion: 5,
            sourceType: "module",

            parserOptions: {
                project: "tsconfig.json",
                tsconfigRootDir: ".",
            },
        },
        rules: {
            "@typescript-eslint/interface-name-prefix": "off",
            "@typescript-eslint/explicit-function-return-type": "off",
            "@typescript-eslint/explicit-module-boundary-types": "off",
            "@typescript-eslint/no-explicit-any": "off",

            "@typescript-eslint/no-unused-vars": [
                "error",
                {
                    argsIgnorePattern: "^_",
                    varsIgnorePattern: "^_",
                    caughtErrorsIgnorePattern: "^_",
                },
            ],

            "@typescript-eslint/consistent-type-definitions": [
                "error",
                "interface",
            ],
            "@typescript-eslint/no-inferrable-types": "error",
            "@typescript-eslint/no-non-null-assertion": "warn",
            "@typescript-eslint/no-var-requires": "error",

            "@typescript-eslint/no-empty-function": [
                "error",
                {
                    allow: ["constructors"],
                },
            ],

            "simple-import-sort/imports": "error",
            "simple-import-sort/exports": "error",
            "import/first": "error",
            "import/newline-after-import": "error",
            "import/no-duplicates": "error",

            "import/order": [
                "error",
                {
                    groups: [
                        ["builtin", "external"],
                        "internal",
                        ["parent", "sibling", "index"],
                    ],
                    "newlines-between": "always",
                },
            ],

            "import/no-extraneous-dependencies": [
                "error",
                {
                    devDependencies: false,
                },
            ],

            "no-console": "error",
            "no-debugger": "error",
            "prefer-const": "error",
            eqeqeq: ["error", "always"],
        },
    },
    {
        files: ["tests/**/*.ts"],
        rules: {
            "import/no-extraneous-dependencies": [
                "error",
                {
                    devDependencies: true,
                },
            ],
            "@typescript-eslint/no-unused-vars": "off"
        }
    }
];
