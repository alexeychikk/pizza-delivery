module.exports = {
	extends: ["prettier", "prettier/@typescript-eslint"],
	env: {
		es6: true,
		node: true,
	},
	parser: "@typescript-eslint/parser",
	parserOptions: {
		project: "tsconfig.json",
		sourceType: "module",
	},
	plugins: [
		"eslint-plugin-jsdoc",
		"eslint-plugin-prefer-arrow",
		"eslint-plugin-import",
		"eslint-plugin-unicorn",
		"eslint-plugin-no-null",
		"@typescript-eslint",
	],
	rules: {
		"@typescript-eslint/adjacent-overload-signatures": "error",
		"@typescript-eslint/array-type": [
			"error",
			{
				default: "array",
			},
		],
		"@typescript-eslint/await-thenable": "error",
		"@typescript-eslint/ban-types": "off",
		"@typescript-eslint/consistent-type-assertions": "error",
		"@typescript-eslint/consistent-type-definitions": "off",
		"@typescript-eslint/dot-notation": "error",
		"@typescript-eslint/explicit-member-accessibility": [
			"error",
			{
				accessibility: "explicit",
				overrides: {
					constructors: "no-public",
				},
			},
		],
		"@typescript-eslint/indent": "off",
		"@typescript-eslint/member-delimiter-style": [
			"off",
			{
				multiline: {
					delimiter: "semi",
					requireLast: true,
				},
				singleline: {
					delimiter: "semi",
					requireLast: false,
				},
			},
		],
		"@typescript-eslint/member-ordering": "error",
		"@typescript-eslint/naming-convention": [
			"error",
			{
				selector: "variable",
				format: ["camelCase", "UPPER_CASE", "PascalCase"],
				leadingUnderscore: "allow",
				trailingUnderscore: "forbid",
			},
		],
		"@typescript-eslint/no-empty-interface": "off",
		"@typescript-eslint/no-explicit-any": "error",
		"@typescript-eslint/no-extraneous-class": "error",
		"@typescript-eslint/no-floating-promises": "error",
		"@typescript-eslint/no-for-in-array": "error",
		"@typescript-eslint/no-inferrable-types": "off",
		"@typescript-eslint/no-misused-new": "error",
		"@typescript-eslint/no-namespace": "off",
		"@typescript-eslint/no-non-null-assertion": "off",
		"@typescript-eslint/no-parameter-properties": "error",
		"@typescript-eslint/no-require-imports": "error",
		"@typescript-eslint/no-shadow": "error",
		"@typescript-eslint/no-this-alias": "error",
		"@typescript-eslint/no-unnecessary-qualifier": "error",
		"@typescript-eslint/no-unnecessary-type-arguments": "error",
		"@typescript-eslint/no-unnecessary-type-assertion": "error",
		"@typescript-eslint/no-unused-expressions": "error",
		"@typescript-eslint/no-use-before-define": "off",
		"@typescript-eslint/no-var-requires": "error",
		"@typescript-eslint/prefer-for-of": "error",
		"@typescript-eslint/prefer-function-type": "error",
		"@typescript-eslint/prefer-namespace-keyword": "off",
		"@typescript-eslint/prefer-readonly": "off",
		"@typescript-eslint/promise-function-async": "off",
		"@typescript-eslint/quotes": [
			"error",
			"double",
			{
				avoidEscape: true,
			},
		],
		"@typescript-eslint/restrict-plus-operands": "error",
		"@typescript-eslint/semi": ["error", "always"],
		"@typescript-eslint/strict-boolean-expressions": "off",
		"@typescript-eslint/triple-slash-reference": [
			"error",
			{
				path: "always",
				types: "prefer-import",
				lib: "always",
			},
		],
		"@typescript-eslint/type-annotation-spacing": "off",
		"@typescript-eslint/unified-signatures": "error",
		"arrow-parens": ["off", "always"],
		"brace-style": ["off", "off"],
		"comma-dangle": "off",
		complexity: "error",
		"constructor-super": "error",
		curly: "error",
		"default-case": "error",
		"eol-last": "off",
		eqeqeq: ["error", "smart"],
		"guard-for-in": "error",
		"id-blacklist": [
			"error",
			"any",
			"Number",
			"number",
			"String",
			"string",
			"Boolean",
			"boolean",
			"Undefined",
			"undefined",
		],
		"id-match": "error",
		"import/no-default-export": "off",
		"import/no-deprecated": "off",
		"import/no-extraneous-dependencies": "off",
		"import/no-internal-modules": "off",
		"import/no-unassigned-import": "error",
		"import/order": "error",
		"jsdoc/check-alignment": "error",
		"jsdoc/check-indentation": "error",
		"jsdoc/newline-after-description": "error",
		"jsdoc/no-types": "error",
		"linebreak-style": "off",
		"max-classes-per-file": "off",
		"max-len": "off",
		"max-lines": "error",
		"new-parens": "off",
		"newline-per-chained-call": "off",
		"no-bitwise": "error",
		"no-caller": "error",
		"no-cond-assign": "error",
		"no-console": [
			"error",
			{
				allow: [
					"warn",
					"dir",
					"timeLog",
					"trace",
					"assert",
					"clear",
					"count",
					"countReset",
					"group",
					"groupEnd",
					"debug",
					"info",
					"dirxml",
					"error",
					"groupCollapsed",
					"Console",
					"profile",
					"profileEnd",
					"timeStamp",
					"context",
				],
			},
		],
		"no-constant-condition": "error",
		"no-control-regex": "error",
		"no-debugger": "error",
		"no-duplicate-case": "error",
		"no-duplicate-imports": "error",
		"no-empty": "error",
		"no-eval": "error",
		"no-extra-bind": "error",
		"no-extra-semi": "off",
		"no-fallthrough": "off",
		"no-invalid-regexp": "error",
		"no-invalid-this": "off",
		"no-irregular-whitespace": "off",
		"no-magic-numbers": "off",
		"no-multi-str": "off",
		"no-multiple-empty-lines": "off",
		"no-new-func": "error",
		"no-new-wrappers": "error",
		"no-null/no-null": "off",
		"no-octal": "error",
		"no-octal-escape": "error",
		"no-redeclare": "error",
		"no-regex-spaces": "error",
		"no-restricted-imports": "off",
		"no-restricted-syntax": ["error", "ForInStatement"],
		"no-return-await": "error",
		"no-sequences": "error",
		"no-shadow": "off",
		"no-sparse-arrays": "error",
		"no-template-curly-in-string": "error",
		"no-throw-literal": "error",
		"no-trailing-spaces": "off",
		"no-undef-init": "error",
		"no-underscore-dangle": "off",
		"no-unsafe-finally": "error",
		"no-unused-labels": "error",
		"no-var": "error",
		"no-void": "off",
		"object-shorthand": "off",
		"one-var": ["error", "never"],
		"padding-line-between-statements": [
			"off",
			{
				blankLine: "always",
				prev: "*",
				next: "return",
			},
		],
		"prefer-arrow/prefer-arrow-functions": "off",
		"prefer-const": "error",
		"prefer-object-spread": "error",
		"prefer-template": "error",
		"quote-props": "off",
		radix: "off",
		"space-before-function-paren": "off",
		"space-in-parens": ["off", "never"],
		"use-isnan": "error",
		"valid-typeof": "off",
		yoda: "error",
	},
};
