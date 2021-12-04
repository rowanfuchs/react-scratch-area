module.exports = [
	{
		test: /\.js?$/,
		exclude: /(node_modules|bower_components|public)/,
		loader: 'babel',
		query: {
		  presets: ['es2015', 'react'],
		}
	},
  {
		test: /\.png/,
		exclude: /(node_modules|bower_components)/,
		loader: "url-loader?limit=10000&mimetype=image/png"
	}
]
