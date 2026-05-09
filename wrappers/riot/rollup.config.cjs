const riot = require('rollup-plugin-riot');
const babel = require('@rollup/plugin-babel').babel || require('@rollup/plugin-babel');

module.exports = {
    input: 'src/riot-particles.riot',
    output: {
        file: 'dist/riot-particles.js',
        format: 'iife',
        sourcemap: true,
        globals: {
            riot: 'riot',
            '@tsparticles/engine': 'window'
        }
    },
    external: [
        'riot',
        '@tsparticles/engine'
    ],
    plugins: [
        riot(),
        babel({
            exclude: 'node_modules/**',
            inputSourceMap: true,
        }),
    ]
};
