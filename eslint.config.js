import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'


export default [
	{ files: ['**/*.{js,mjs,cjs,ts}'] },
	{ languageOptions: { globals: globals.browser } },
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
	{
		rules: {
			'indent': ['error', 'tab'],
			'quotes': ['error', 'single'],
			'semi': ['error', 'never'],
			'object-curly-newline': ['error', { 'multiline': true }],
			'no-duplicate-imports': 'error',
			'no-extra-parens': 'error',
			'no-trailing-spaces': 'error',
			'object-curly-spacing': ['error', 'always'],
			'comma-spacing': ['error', { 'before': false, 'after': true }],
		}
	}
]