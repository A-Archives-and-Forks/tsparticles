import { __ } from "@wordpress/i18n";

export function getEasings(group, localizeFn) {
	return [
		{
			name: "plugin-easing-back",
			description: localizeFn(__("Back")),
			group,
			load: async engine => {
				const { loadEasingBackPlugin } = await import("@tsparticles/plugin-easing-back");

				await loadEasingBackPlugin(engine);
			},
		},
		{
			name: "plugin-easing-bounce",
			description: localizeFn(__("Bounce")),
			group,
			load: async engine => {
				const { loadEasingBouncePlugin } = await import("@tsparticles/plugin-easing-bounce");

				await loadEasingBouncePlugin(engine);
			},
		},
		{
			name: "plugin-easing-circ",
			description: localizeFn(__("Circ")),
			group,
			load: async engine => {
				const { loadEasingCircPlugin } = await import("@tsparticles/plugin-easing-circ");

				await loadEasingCircPlugin(engine);
			},
		},
		{
			name: "plugin-easing-cubic",
			description: localizeFn(__("Cubic")),
			group,
			load: async engine => {
				const { loadEasingCubicPlugin } = await import("@tsparticles/plugin-easing-cubic");

				await loadEasingCubicPlugin(engine);
			},
		},
		{
			name: "plugin-easing-elastic",
			description: localizeFn(__("Elastic")),
			group,
			load: async engine => {
				const { loadEasingElasticPlugin } = await import("@tsparticles/plugin-easing-elastic");

				await loadEasingElasticPlugin(engine);
			},
		},
		{
			name: "plugin-easing-expo",
			description: localizeFn(__("Expo")),
			group,
			load: async engine => {
				const { loadEasingExpoPlugin } = await import("@tsparticles/plugin-easing-expo");

				await loadEasingExpoPlugin(engine);
			},
		},
		{
			name: "plugin-easing-gaussian",
			description: localizeFn(__("Gaussian")),
			group,
			load: async engine => {
				const { loadEasingGaussianPlugin } = await import("@tsparticles/plugin-easing-gaussian");

				await loadEasingGaussianPlugin(engine);
			},
		},
		{
			name: "plugin-easing-linear",
			description: localizeFn(__("Linear")),
			group,
			load: async engine => {
				const { loadEasingLinearPlugin } = await import("@tsparticles/plugin-easing-linear");

				await loadEasingLinearPlugin(engine);
			},
		},
		{
			name: "plugin-easing-quad",
			description: localizeFn(__("Quad")),
			group,
			load: async engine => {
				const { loadEasingQuadPlugin } = await import("@tsparticles/plugin-easing-quad");

				await loadEasingQuadPlugin(engine);
			},
		},
		{
			name: "plugin-easing-quart",
			description: localizeFn(__("Quart")),
			group,
			load: async engine => {
				const { loadEasingQuartPlugin } = await import("@tsparticles/plugin-easing-quart");

				await loadEasingQuartPlugin(engine);
			},
		},
		{
			name: "plugin-easing-quint",
			description: localizeFn(__("Quint")),
			group,
			load: async engine => {
				const { loadEasingQuintPlugin } = await import("@tsparticles/plugin-easing-quint");

				await loadEasingQuintPlugin(engine);
			},
		},
		{
			name: "plugin-easing-sigmoid",
			description: localizeFn(__("Sigmoid")),
			group,
			load: async engine => {
				const { loadEasingSigmoidPlugin } = await import("@tsparticles/plugin-easing-sigmoid");

				await loadEasingSigmoidPlugin(engine);
			},
		},
		{
			name: "plugin-easing-sine",
			description: localizeFn(__("Sine")),
			group,
			load: async engine => {
				const { loadEasingSinePlugin } = await import("@tsparticles/plugin-easing-sine");

				await loadEasingSinePlugin(engine);
			},
		},
		{
			name: "plugin-easing-smoothstep",
			description: localizeFn(__("Smoothstep")),
			group,
			load: async engine => {
				const { loadEasingSmoothstepPlugin } = await import("@tsparticles/plugin-easing-smoothstep");

				await loadEasingSmoothstepPlugin(engine);
			},
		},
	];
}
