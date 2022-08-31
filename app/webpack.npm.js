const { mergeWithRules } = require('webpack-merge');
const prod = require('./webpack.prod.js');
const CopyPkgJsonPlugin = require("copy-pkg-json-webpack-plugin");
const RemovePlugin = require('remove-files-webpack-plugin');

const cleanWebpack = new RemovePlugin({
	after: {
		root: './dist',
		include: [
			'index.html'
		]
	}
})

delete prod.output.libraryExport;

module.exports = mergeWithRules({
	module: {
		rules: {
			test: "match",
			use: {
				loader: "replace",
			},
		},
	}
})(prod, {
	output: {
		libraryTarget: "umd" // exposes and know when to use module.exports or exports.
	},
	module: {
		rules: [
			{
				test: /\.(png|jpe?g|gif|svg|webp|ico)$/i,
				use: [
					{
						loader: 'url-loader',
					}
				]
			}
		]
	},
	plugins: [
		new CopyPkgJsonPlugin({
			remove: ['devDependencies', 'dependencies', 'scripts'],
		}),
		cleanWebpack,
	],
});
