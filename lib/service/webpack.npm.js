const { merge } = require('webpack-merge');
const prod = require('./webpack.prod.js');
const CopyPkgJsonPlugin = require("copy-pkg-json-webpack-plugin");

prod.entry = prod.entry.filter(entry => entry !== 'babel-polyfill');

module.exports = merge(prod, {
	output: {
		libraryTarget: "umd"
	},
	plugins: [
		new CopyPkgJsonPlugin({
			remove: ['devDependencies', 'dependencies', 'scripts', 'module'],
			replace: {
				main: 'bot-service.js',
			}
		}),
	],
});
