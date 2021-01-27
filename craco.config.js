const { loaderByName, getLoader } = require('@craco/craco')
const transformBabelLoader = require('./config/transformBabelLoader')
const presetReact = require('@babel/preset-react').default
const presetCRA = require('babel-preset-react-app')

module.exports = {
	babel: {
		pluginOptions: (babelLoaderOptions, { env, paths }) => {
			const origBabelPresetReactAppIndex = babelLoaderOptions.presets.findIndex(preset => {
				return preset[0].includes('babel-preset-react-app')
			})

			if (origBabelPresetReactAppIndex === -1) {
				return babelLoaderOptions
			}

			const overridenBabelPresetReactApp = (...args) => {
				const babelPresetReactAppResult = presetCRA(...args)
				const origPresetReact = babelPresetReactAppResult.presets.find(preset => {
					return preset[0] === presetReact
				})
				Object.assign(origPresetReact[1], {
					importSource: '@welldone-software/why-did-you-render',
				})
				return babelPresetReactAppResult
			}

			babelLoaderOptions.presets[origBabelPresetReactAppIndex] = overridenBabelPresetReactApp

			return babelLoaderOptions
		},
	},
	webpack: {
		configure: webpackConfig => {
			// console.log(JSON.stringify(webpackConfig.module.rules, null, 2))
			// throw 'test'
			const lm = getLoader(webpackConfig, loaderByName('babel-loader'))
			const loader = lm.match.loader
			webpackConfig.module.rules[1].oneOf[2] = transformBabelLoader(loader)
			return webpackConfig
		},
	},
	jest: {
		configure: jestConfig => {
			// jestConfig.transform['^.+\\.(js|jsx|ts|tsx)$'] = require.resolve('./config/babelTransform.js')
			return jestConfig
		},
	},
}
