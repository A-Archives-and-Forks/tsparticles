const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');

	module.exports = {
		mode: "none",
		entry: "./src/index.tsx", // Point to main file
	resolve: {
		extensions: ['.js', '.jsx', '.ts', '.tsx'],
		// Prefer Inferno's dev entry point when resolving packages so hooks are
		// exported from the main package (this helps avoid the need for
		// inferno-hooks). The 'dev:module' field is used by Inferno to point
		// to an entry that exposes hooks. Additionally add an explicit alias
		// to the dev entry to ensure webpack resolves the correct build in
		// development environments where mainFields might not be honored.
		mainFields: ['dev:module', 'module', 'main'],
        // Force-resolve Inferno to its development ESM entry so that hooks
        // are available as named exports during development. This is an
        // unconditional alias to avoid silent fallbacks that end up
        // bundling a production-like entry and breaking hooks resolution.
        alias: {
            inferno: require.resolve('inferno/dist/index.dev.mjs'),
        },
	},
	output: {
		path: __dirname + "/dist",
		filename: "bundle.js",
		// Ensure chunks are requested from the same origin as the served app.
		// This prevents webpack's automatic publicPath from picking up a
		// different host/port (eg. localhost:8080) and avoids ChunkLoadError
		// when the dev-server runs on a different port.
		publicPath: "/",
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
        static: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'dist')],
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
