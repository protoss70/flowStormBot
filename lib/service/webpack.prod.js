const path = require('path');
const RemovePlugin = require('remove-files-webpack-plugin');

const cleanWebpack = new RemovePlugin({
	before: {
		include: [
			'./dist'
		]
	}
})

module.exports = {
	mode: "production",
	entry: [
		'babel-polyfill',
		'./src/index.js',
	],
	output: {
		filename: 'bot-service.js',
		path: path.resolve(__dirname, 'dist'),
		library: 'botService',
		libraryTarget: 'window',
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
						plugins: [
							'@babel/plugin-proposal-class-properties',
							'@babel/plugin-transform-runtime',
						],
					},
				},
			},
		],
	},
	plugins: [
		cleanWebpack,
	],
};
