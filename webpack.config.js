let path = require('path');
const src = path.join(__dirname, './src');
const dist = path.join(__dirname, './dist');

module.exports = {
	context: src,
	entry: [
		'webpack-dev-server/client?http://localhost:5555',
   		'webpack/hot/only-dev-server',
   		src + '/index.js'
	],
	output: {
		path: dist,
		publicPath: '/',
		filename: 'main.min.js'
	},

	devServer: {
		contentBase: dist,
		inline: true,
		port: 5555,
		hot: true
	},
	module: {
		loaders: [
			{
				loader: 'babel',
				test: /\.js$/,
				exclude: /node_modules/,
				query: {
					presets: ['es2015', 'react']
				}
			},

			{
				test: /\.scss$/,
				loaders: ['style', 'css', 'sass']
			}
		]
	}
};
