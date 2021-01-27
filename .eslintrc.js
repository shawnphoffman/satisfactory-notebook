module.exports = {
	extends: 'react-app',
	plugins: ['simple-import-sort'],
	rules: {
		'simple-import-sort/imports': [
			'error',
			{
				groups: [
					['^\\u0000'],
					['^react$', '^react', '^@?\\w'],
					['^(.data-landing)(/.*)'],
					['^(@root|types|data)(/.*)'],
					['^(components|enums|images|loaders|utils|context)(/.*)'],
					[('^\\.\\.(?!/?$)', '^\\.\\./?$')],
					['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
				],
			},
		],
		'sort-imports': 'off',
		'import/order': 'off',
	},
}
