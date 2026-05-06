import { __ } from "@wordpress/i18n";
import { handlePlugin, transformLoadableObject } from "../utils";

const group = __("Paths"),
	paths = [
		{
			name: "path-branches",
			description: __("Branches"),
			group,
			load: async engine => {
				const { loadBranchesPath } = await import("@tsparticles/path-branches");

				await loadBranchesPath(engine);
			},
		},
		{
			name: "path-brownian",
			description: __("Brownian"),
			group,
			load: async engine => {
				const { loadBrownianPath } = await import("@tsparticles/path-brownian");

				await loadBrownianPath(engine);
			},
		},
		{
			name: "path-curl-noise",
			description: `${__("Curl")} ${__("Noise")}`,
			group,
			load: async engine => {
				const { loadCurlNoisePath } = await import("@tsparticles/path-curl-noise");

				await loadCurlNoisePath(engine);
			},
		},
		{
			name: "path-curves",
			description: __("Curves"),
			group,
			load: async engine => {
				const { loadCurvesPath } = await import("@tsparticles/path-curves");

				await loadCurvesPath(engine);
			},
		},
		{
			name: "path-fractal-noise",
			description: `${__("Fractal")} ${__("Noise")}`,
			group,
			load: async engine => {
				const { loadFractalNoisePath } = await import("@tsparticles/path-fractal-noise");

				await loadFractalNoisePath(engine);
			},
		},
		{
			name: "path-grid",
			description: __("Grid"),
			group,
			load: async engine => {
				const { loadGridPath } = await import("@tsparticles/path-grid");

				await loadGridPath(engine);
			},
		},
		{
			name: "path-levy",
			description: __("Levy"),
			group,
			load: async engine => {
				const { loadLevyPath } = await import("@tsparticles/path-levy");

				await loadLevyPath(engine);
			},
		},
		{
			name: "path-perlin-noise",
			description: `${__("Perlin")} ${__("Noise")}`,
			group,
			load: async engine => {
				const { loadPerlinNoisePath } = await import("@tsparticles/path-perlin-noise");

				await loadPerlinNoisePath(engine);
			},
		},
		{
			name: "path-polygon",
			description: __("Polygon"),
			group,
			load: async engine => {
				const { loadPolygonPath } = await import("@tsparticles/path-polygon");

				await loadPolygonPath(engine);
			},
		},
		{
			name: "path-random",
			description: __("Random"),
			group,
			load: async engine => {
				const { loadRandomPath } = await import("@tsparticles/path-random");

				await loadRandomPath(engine);
			},
		},
		{
			name: "path-simplex-noise",
			description: `${__("Simplex")} ${__("Noise")}`,
			group,
			load: async engine => {
				const { loadSimplexNoisePath } = await import("@tsparticles/path-simplex-noise");

				await loadSimplexNoisePath(engine);
			},
		},
		{
			name: "path-spiral",
			description: __("Spiral"),
			group,
			load: async engine => {
				const { loadSpiralPath } = await import("@tsparticles/path-spiral");

				await loadSpiralPath(engine);
			},
		},
		{
			name: "path-svg",
			description: __("SVG"),
			group,
			load: async engine => {
				const { loadSVGPath } = await import("@tsparticles/path-svg");

				await loadSVGPath(engine);
			},
		},
		{
			name: "path-zig-zag",
			description: `${__("Zig")} ${__("Zag")}`,
			group,
			load: async engine => {
				const { loadZigZagPath } = await import("@tsparticles/path-zig-zag");

				await loadZigZagPath(engine);
			},
		},
	];

export function getPaths() {
	return transformLoadableObject(paths);
}

export async function handlePaths(pluginName, engine) {
	return handlePlugin(paths, pluginName, engine);
}
