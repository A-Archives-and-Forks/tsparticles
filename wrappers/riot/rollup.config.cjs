const { compile } = require('@riotjs/compiler');
const babel = require('@rollup/plugin-babel').babel || require('@rollup/plugin-babel');

// Inline riot plugin to avoid peer-dependency resolution issues with rollup-plugin-riot
const riotPlugin = () => ({
    name: 'riot',
    transform(code, id) {
        if (!id.endsWith('.riot')) return null;
        const { code: compiledCode, map } = compile(code, { file: id });
        return { code: compiledCode, map };
    }
});

const external = ['riot', '@tsparticles/engine'];

const plugins = [
    riotPlugin(),
    babel({
        exclude: 'node_modules/**',
        inputSourceMap: true,
        babelHelpers: 'bundled',
    }),
];

module.exports = [
    {
        input: 'src/riot-particles.riot',
        output: {
            file: 'dist/riot-particles.cjs',
            format: 'cjs',
            sourcemap: true,
            exports: 'named',
        },
        external,
        plugins,
    },
    {
        input: 'src/riot-particles.riot',
        output: {
            file: 'dist/riot-particles.esm.js',
            format: 'esm',
            sourcemap: true,
        },
        external,
        plugins,
    },
];
