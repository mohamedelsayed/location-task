// See https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin for the list of available rules

module.exports = {
	'root': true,
	'parser': '@typescript-eslint/parser',
	'parserOptions': {
		'tsconfigRootDir': __dirname,
		'project': './tsconfig.json',
		'ecmaVersion': 2019
	},
	'plugins': [
		'@typescript-eslint'
	],
	'extends': [
		'eslint:recommended',
		'standard', 
		'plugin:node/recommended', 
		'plugin:import/errors',
    	'plugin:@typescript-eslint/eslint-recommended',
    	'plugin:@typescript-eslint/recommended',
		'plugin:import/typescript',
		'plugin:promise/recommended',
		'plugin:@typescript-eslint/recommended-requiring-type-checking'
	],
	'settings': {
		'node': {
			'tryExtensions': ['.ts']
		}
	},
	'rules': {
			'indent': ['error', 'tab', {
				SwitchCase: 1,
				VariableDeclarator: 1,
				outerIIFEBody: 1,
				MemberExpression: 1,
				FunctionDeclaration: {parameters: 1, body: 1},
				FunctionExpression: {parameters: 1, body: 1},
				CallExpression: {arguments: 1},
				ArrayExpression: 1,
				ObjectExpression: 1,
				ImportDeclaration: 1,
				flatTernaryExpressions: false,
				ignoreComments: false,
				ignoredNodes: ['JSXAttribute']
			}],
			'no-tabs': 'off',
			'no-dupe-class-members': 'error',
			'padded-blocks': ['error', {classes: 'always'}],
			'lines-between-class-members': 'error',
			'semi': ['error', 'always'],
			'semi-style': ['error', 'last'],
			'no-extra-semi': ['error'],
			'arrow-parens': ['error', 'always'],
			'operator-linebreak': ['error', 'before'],
			'camelcase': 'off',
			'no-unused-vars': ['warn', {
				caughtErrors: 'none',
				ignoreRestSiblings: false
			}],
			'new-cap': ['error'],
			'no-mixed-spaces-and-tabs': 'warn',
			'no-mixed-operators': 'error',
			'max-len': ['error', {
				code: 120,
				tabWidth: 4,
				ignoreStrings: false,
				ignoreTemplateLiterals: false
	
			}],
			'standard/no-callback-literal': 'off',
			'complexity': ['error', {
				max: 20
			}],
			'no-confusing-arrow': ['error', {
				allowParens: true
			}],
			'arrow-spacing': 'error',
			'array-bracket-newline': ['error', 'consistent'],
			'object-curly-newline': ['error', {multiline: true, consistent: true}],
			'generator-star-spacing': ['error', {before: false, after: true}],
			'arrow-body-style': ['error', 'as-needed'],
			'object-curly-spacing': ['error', 'never'],
			'node/no-extraneous-require': ['off'],
			'no-process-exit': ['off'],
			'node/shebang': ['off'],
			'quote-props': ['error', 'consistent-as-needed'],
			'function-paren-newline': ['error', 'consistent'],
			'node/exports-style': ['error', 'module.exports'],
			'node/prefer-global/url': ['error', 'never'],
			'node/prefer-global/buffer': ['error', 'always'],
			'node/prefer-global/console': ['error', 'always'],
			'node/prefer-global/process': ['error', 'always'],
			'node/prefer-global/url-search-params': ['error', 'never'],
			'import/order': ['error', {'newlines-between': 'never'}],
			'import/no-self-import': ['error'],
			'import/no-cycle': ['warn'],
			'import/no-deprecated': ['warn'],
			'import/newline-after-import': ['error'],
			'import/no-unresolved': ['error', {caseSensitive: true, commonjs: true}],
			'import/no-unused-modules': ['error', {unusedExports: true}],
			'import/no-amd': ['error'],
			'node/no-unpublished-require': 'error',
			'no-async-promise-executor': 'error',
			'no-console': 'error',
			'no-setter-return': 'error',
			'consistent-return': 'error',
			'prefer-promise-reject-errors': 'error',
			'no-use-before-define': ['error', {
				functions: false,
				classes: true,
				variables: true,
			}],
			'no-mixed-requires': 'error',
			'array-bracket-spacing': ['error', 'never'],
			'computed-property-spacing': ['error', 'never'],
			'one-var-declaration-per-line': ['error', 'initializations'],
			'operator-assignment': 'warn',
			'prefer-object-spread': 'warn',
			'space-before-function-paren': ['error', {
				anonymous: 'never',
				named: 'never',
				asyncArrow: 'always',
			}],
			'switch-colon-spacing': ['error', {
				after: true,
				before: false,
			}],
			'no-var': 'error',
			'prefer-const': 'error',
			'prefer-rest-params': 'error',
			'prefer-spread': 'warn',
			'prefer-template': 'error',
			'no-useless-concat': 'error',
		'node/no-missing-import': ['error', {
			// Added to allow import of dynamic import for dotenv/config module which is a `.js` file
			'tryExtensions': ['.ts', '.js']
		}],

		"node/no-extraneous-import": ["error", {
			"allowModules": ['long'],
		}],

		// https://github.com/mysticatea/eslint-plugin-node/issues/205
		'node/no-unsupported-features/es-syntax': ['error', {
			'ignores': ['modules']
		}],

		'@typescript-eslint/ban-ts-comment': ['error', {
			'ts-check': true,
			'ts-expect-error': 'allow-with-description',
			'ts-ignore': 'allow-with-description',
			'ts-nocheck': 'allow-with-description',
			'minimumDescriptionLength': 10
		}],

		'@typescript-eslint/promise-function-async': 'error',
		'@typescript-eslint/switch-exhaustiveness-check': 'error',
		'@typescript-eslint/type-annotation-spacing': 'error',
		'@typescript-eslint/unified-signatures': 'warn',

		// https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/indent.md
		// "indent": "off",
		// "@typescript-eslint/indent": ["error"]
		// Used by standard js

		// https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/keyword-spacing.md
		'keyword-spacing': 'off',
		'@typescript-eslint/keyword-spacing': ['error', {
			'before': true,
			'after': true
		}],

		// https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/lines-between-class-members.md
		'lines-between-class-members': 'off',
		'@typescript-eslint/lines-between-class-members': 'error',

		// https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-array-constructor.md
		'no-array-constructor': 'off',
		'@typescript-eslint/no-array-constructor': 'error',

		// https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-dupe-class-members.md
		'no-dupe-class-members': 'off',
		'@typescript-eslint/no-dupe-class-members': 'error',

		// https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-extra-parens.md
		'no-extra-parens': 'off',
		'@typescript-eslint/no-extra-parens': ['error', 'functions'],

		// https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-extra-semi.md
		'no-extra-semi': 'off',
		'@typescript-eslint/no-extra-semi': 'error',

		// https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/semi.md
		'semi': 'off',
		'@typescript-eslint/semi': ['error', 'always'],

		// https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-magic-numbers.md
		'no-magic-numbers': 'off',

		// https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/brace-style.md
		'brace-style': 'off',
		'@typescript-eslint/brace-style': ['error', '1tbs', {'allowSingleLine': true}],

		// https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/comma-spacing.md
		'comma-spacing': 'off',
		'@typescript-eslint/comma-spacing': ['error', {'before': false, 'after': true}],

		// https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/default-param-last.md
		'default-param-last': 'off',
		'@typescript-eslint/default-param-last': 'error',

		// https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/dot-notation.md
		'dot-notation': 'off',
		'@typescript-eslint/dot-notation': ['error', {'allowKeywords': true}],

		// https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/func-call-spacing.md
		'func-call-spacing': 'off',
		'@typescript-eslint/func-call-spacing': ['error', 'never'],

		// https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unused-expressions.md
		'no-unused-expressions': 'off',
		'@typescript-eslint/no-unused-expressions': ['error', {
			'allowShortCircuit': true,
			'allowTernary': true,
			'allowTaggedTemplates': true
		}],

		// https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unused-vars.md
		// https://github.com/typescript-eslint/typescript-eslint/issues/1856
		'no-unused-vars': 'off',
		'@typescript-eslint/no-unused-vars': ['warn', {
			argsIgnorePattern: '^_$',
			caughtErrors: 'none',
			ignoreRestSiblings: false
		}],

		// https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/restrict-template-expressions.md
		'@typescript-eslint/restrict-template-expressions': ['error', {
			allowNumber: true,
			allowBoolean: true
		}],

		// https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-use-before-define.md
		// https://github.com/typescript-eslint/typescript-eslint/issues/1856
		'no-use-before-define': 'off',
		'@typescript-eslint/no-use-before-define': ['error', {
			typedefs: true,
			enums: true,
			functions: false,
			classes: true,
			variables: true
		}],

		// https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-useless-constructor.md
		'no-useless-constructor': 'off',
		'@typescript-eslint/no-useless-constructor': 'error',

		// https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/quotes.md
		'quotes': 'off',
		'@typescript-eslint/quotes': ['error', 'single', {'avoidEscape': true, 'allowTemplateLiterals': false}],

		// https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/return-await.md
		'no-return-await': 'off',
		'@typescript-eslint/return-await': ['error', 'in-try-catch'],

		// https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/space-before-function-paren.md
		'space-before-function-paren': 'off',
		'@typescript-eslint/space-before-function-paren': ['error', {
			'anonymous': 'never',
			'named': 'never',
			'asyncArrow': 'always'
		}],

		// https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-invalid-this.md
		'no-invalid-this': 'off',
		'@typescript-eslint/no-invalid-this': 'error',

		// https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-misused-promises.md
		'@typescript-eslint/no-misused-promises': ['error', {
			'checksVoidReturn': false
		}],

		// https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/member-delimiter-style.md
		'@typescript-eslint/member-delimiter-style': ['error', {
			"multiline": {
				"delimiter": "semi",
				"requireLast": true
			},
			"singleline": {
				"delimiter": "semi",
				"requireLast": true
			},
		}]
	},
	'overrides': [
		{
			'files': ['test/**'],
			'plugins': ['mocha'],
			'extends': ['plugin:mocha/recommended'],
			'rules': {
				'node/no-missing-import': ['error', {
					'allowModules': ['chai']
				}],
				'node/no-missing-require': ['error', {
					'allowModules': ['chai']
				}]
			}
		},
		{
			'files': ['test/**/*.js'],
			'rules': {
				'@typescript-eslint/no-var-requires': ['off'],
				'@typescript-eslint/no-unsafe-call': ['off'],
				'@typescript-eslint/no-unsafe-member-access': ['off'],
				'node/no-missing-require': ['off'],
				'@typescript-eslint/no-unsafe-assignment': ['off']
			}
		},
		{
			'files': ['test/**/*.ts'],
			'rules': {
				// To allow chai.expect assets
				'@typescript-eslint/no-unused-expressions': ['off']
			}
		}
	]
};
