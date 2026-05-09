const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;
const webpack = require('webpack');

// Export a function to read the webpack mode (argv.mode). We only
// externalize 'inferno' in production builds to avoid runtime interop
// issues during local development where the demo and wrapper might
// resolve different Inferno builds. In development the wrapper will
// bundle Inferno so the demo consumes the same runtime shape.
module.exports = (env, argv) => {
  const isProd = argv && argv.mode === 'production';

  const externals = [
    {
      tsparticles: {
        commonjs: 'tsparticles',
        commonjs2: 'tsparticles',
        amd: 'tsparticles',
        root: 'window',
      },
    },
    'fast-deep-equal',
  ];

  // Externalize Inferno to ensure a single runtime instance is used by the
  // application. This avoids mixing different Inferno builds (which can
  // cause class/transpilation mismatch errors like "Cannot call a class
  // constructor Component without |new|"). The demo's webpack config
  // aliases 'inferno' to the dev ESM entry during development so the
  // correct runtime is provided.
  externals.push({
    inferno: {
      commonjs: 'inferno',
      commonjs2: 'inferno',
      amd: 'inferno',
      root: 'Inferno',
    },
  });

  return {
    mode: 'none',
    entry: './src/index.ts', // Point to main file
    externals,
    // Disable code-splitting for the library build so the distributed
    // particles.js file contains everything and does not require
    // additional chunk files (eg. 960.particles.js). This prevents
    // runtime ChunkLoadError when the host app serves assets from a
    // different dev-server origin/port.
    optimization: {
      splitChunks: false,
      runtimeChunk: false,
    },
    output: {
      path: __dirname + '/dist',
      filename: 'particles.js',
      libraryTarget: 'commonjs',
      // Ensure library runtime uses the site root as the publicPath so
      // dynamically loaded chunks are requested from the same origin
      // and port as the hosting application. This avoids cases where
      // document.currentScript or other heuristics pick a different
      // dev-server host/port and cause ChunkLoadError.
      publicPath: '/',
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      // Prefer Inferno's dev entry point when resolving packages during
      // development so bundled wrapper and the demo share the same runtime
      // shape (hooks are exported as named exports from the dev ESM entry).
      // Also add an explicit alias in development to avoid silent fallbacks.
      mainFields: isProd ? ['module', 'main'] : ['dev:module', 'module', 'main'],
      alias: isProd
        ? {}
        : {
            inferno: require.resolve('inferno/dist/index.dev.mjs'),
          },
    },
    performance: {
      hints: false,
    },
    module: {
      rules: [
        {
          test: /\.(tsx|ts)$/, // All ts and tsx files will be process by
          loader: 'babel-loader', // first babel-loader, then ts-loader
          // Use the package-level .babelrc to control transpilation targets so
          // native ES class semantics are preserved (avoids calling class
          // constructors as functions at runtime). When options are present
          // here they override .babelrc, so we only enable babelrc resolution.
          options: {
            babelrc: true,
          },
          exclude: /node_modules/, // ignore node_modules
        },
      ],
    },
    devServer: {
      contentBase: 'src/',
      historyApiFallback: true,
    },
    plugins: [
      new CleanWebpackPlugin({
        verbose: true,
      }),
      // Force a single output chunk for the library to avoid runtime
      // network requests for split chunks (eg. 960.particles.js). This
      // guarantees the wrapper is a single file consumers can load
      // without needing the dev server to host additional chunks.
      new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }),
    ],
  };
};
