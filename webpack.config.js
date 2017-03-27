module.exports = {
	entry: './js/personalization.dev.js',
	output: {
		path: __dirname + '/js',
		filename: 'personalization.js'
	},
	module: {
		loaders: [{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel-loader',
			query:
			{
				presets: ['es2015']
			}
		}]
	}
};