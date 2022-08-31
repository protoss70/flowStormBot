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

prod.entry.app = prod.entry.app.filter(entry => entry !== '@babel/polyfill');
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
		library: "BotUI",
		libraryTarget: "umd" // exposes and know when to use module.exports or exports.
	},
	module: {
		rules: [
			{
				test: /\.(woff(2)?|ttf|eot|svg|png)(\?v=\d+\.\d+\.\d+)?$/,
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
