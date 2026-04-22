const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');

	module.exports = {
		mode: "none",
		entry: "./src/index.tsx", // Point to main file
		resolve: {
			extensions: ['.js', '.jsx', '.ts', '.tsx'],
		},
	output: {
		path: __dirname + "/dist",
		filename: "bundle.js"
	},
		// merged with alias above
	performance: {
		hints: false
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: [
					"style-loader", 						// creates style nodes from JS strings
					"css-loader", 							// translates CSS into CommonJS
					"sass-loader" 							// compiles Sass to CSS, using Node Sass by default
				]
			},
			{
				test: /\.css$/,
				use: [
					"style-loader", 						// creates style nodes from JS strings
					"css-loader"							// translates CSS into CommonJS
				]
			},
			{
				test: /\.(js|jsx|tsx|ts)$/,   // All ts and tsx files will be process by
				loader: 'babel-loader',			// first babel-loader, then ts-loader
				exclude: /node_modules/				// ignore node_modules
			}
		]
	},
    devServer: {
        // Serve demo source and built output so dynamic chunks emitted
        // by other packages (eg. wrappers) are reachable during dev.
        static: [
            path.resolve(__dirname, 'src'),
            path.resolve(__dirname, 'dist'),
            path.resolve(__dirname, '..', '..', 'wrappers', 'inferno', 'dist'),
        ],
        historyApiFallback: true,
    },
	plugins: [
		new HtmlWebpackPlugin(
			{
				template: "./src/index.html",
				inject: "body"
			}
		),
		new CleanWebpackPlugin({
			verbose: true
		})
	]
};
