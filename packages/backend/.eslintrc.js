module.exports = {
    env: {
        es6: true,
        node: true,
        jest: true
    },
    extends: [
        'airbnb',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
    ],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly'
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 2018,
        sourceType: 'module'
    },
    plugins: [
        'import',
        '@typescript-eslint',
        'simple-import-sort',
        'unused-imports'
    ],
    rules: {
        indent: ['error', 4, { SwitchCase: 1 }],
        'react/jsx-indent-props': [1, 4],
        semi: ['error', 'never'],
        'object-curly-spacing': ['error', 'always'],
        'react/jsx-indent': [2, 4],
        'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],
        'react/jsx-tag-spacing': ['error', {
            closingSlash: 'never',
            beforeSelfClosing: 'allow',
            afterOpening: 'never',
            beforeClosing: 'never'
        }],
        'no-unused-vars': [0],
        'react/no-array-index-key': [1],
        'react/prop-types': [0],
        'react/destructuring-assignment': [0, 'never'],
        'react/jsx-one-expression-per-line': [0, 'literal'],
        'import/prefer-default-export': [0],
        'import/extensions': [1, 'never'],
        '@typescript-eslint/no-unused-vars': ['error', {
            vars: 'all',
            args: 'after-used',
            ignoreRestSiblings: false
        }],
        'simple-import-sort/imports': 'error',
        'simple-import-sort/exports': 'error',
        'unused-imports/no-unused-imports-ts': 'error',
        'react/jsx-props-no-spreading': [0],
        'import/no-unresolved': [0],
        'import/no-extraneous-dependencies': [0],
        'no-else-return': 'off',
        'padded-blocks': 'off',
        'max-len': ['error', 120],
        'no-use-before-define': [0],
        'arrow-body-style': 'off',
        'comma-dangle': 'off',
        'no-trailing-spaces': [0],
        'react/jsx-closing-bracket-location': [1, 'after-props'],
        'linebreak-style': 0,
        '@typescript-eslint/member-delimiter-style': [2],
        'no-underscore-dangle': 'off'
    }
}
