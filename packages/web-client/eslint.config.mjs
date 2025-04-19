import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import reacteslint from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import storybooklint from 'eslint-plugin-storybook';
import globals from 'globals';
import path from 'path';
import tseslint from 'typescript-eslint';
import { fileURLToPath } from 'url';

const PROJECT_STRUCTURE = {
    app: 1,
    pages: 1,
    entities: {
        '**': 1,
    },
    shared: {
        api: 1,
        assets: 1,
        config: {
            '**': 1,
        },
        consts: {
            '**': 1,
        },
        lib: {
            '**': 1,
        },
        store: 1,
        viewer: 1,
        ui: {
            atoms: 1,
            molecules: 1,
            organisms: 1,
        },
    },
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
    resolvePluginsRelativeTo: __dirname,
});

export default tseslint.config(
    { ignores: ['dist', '.storybook'] },
    {
        extends: [
            js.configs.recommended,
            ...tseslint.configs.recommended,
            reacteslint.configs.flat.recommended,
            storybooklint.configs['flat/recommended'],
            ...compat.config({
                globals: {
                    Any: 'readonly',
                },
                plugins: ['kisszaya-fsd-plugin'],
                rules: {
                    'kisszaya-fsd-plugin/fsd-relative-path': [
                        'warn',
                        {
                            alias: '@/',
                            projectStructure: PROJECT_STRUCTURE,
                        },
                    ],
                    'kisszaya-fsd-plugin/absolute-public-api-imports': [
                        'warn',
                        {
                            alias: '@/',
                            projectStructure: PROJECT_STRUCTURE,
                        },
                    ],
                    'kisszaya-fsd-plugin/layer-imports': [
                        'warn',
                        {
                            alias: '@/',
                            projectStructure: PROJECT_STRUCTURE,
                        },
                    ],
                },
            }),
        ],
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
        },
        plugins: {
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            'react/react-in-jsx-scope': 'off',
            'react-refresh/only-export-components': [
                'warn',
                { allowConstantExport: true },
            ],
            'react/jsx-curly-brace-presence': [
                'error',
                { props: 'never', children: 'ignore' },
            ],
            '@typescript-eslint/no-explicit-any': 'error',
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                },
            ],
            'react/prop-types': 0,
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
    },
    {
        files: ['src/shared/**/*.{ts,tsx}'],
        rules: {
            '@typescript-eslint/no-empty-object-type': 'off',
        },
    },
);
