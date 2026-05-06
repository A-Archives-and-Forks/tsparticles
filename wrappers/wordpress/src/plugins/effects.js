import { __ } from "@wordpress/i18n";
import { handlePlugin, transformLoadableObject } from "../utils";

const group = __("Effects"),
	effects = [
		{
			name: "effect-bubble",
			description: __("Bubble"),
			group,
			load: async engine => {
				const { loadBubbleEffect } = await import("@tsparticles/effect-bubble");

				await loadBubbleEffect(engine);
			},
		},
		{
			name: "effect-filter",
			description: __("Filter"),
			group,
			load: async engine => {
				const { loadFilterEffect } = await import("@tsparticles/effect-filter");

				await loadFilterEffect(engine);
			},
		},
		{
			name: "effect-particles",
			description: __("Particles"),
			group,
			load: async engine => {
				const { loadParticlesEffect } = await import("@tsparticles/effect-particles");

				await loadParticlesEffect(engine);
			},
		},
		{
			name: "effect-shadow",
			description: __("Shadow"),
			group,
			load: async engine => {
				const { loadShadowEffect } = await import("@tsparticles/effect-shadow");

				await loadShadowEffect(engine);
			},
		},
		{
			name: "effect-trail",
			description: __("Trail"),
			group,
			load: async engine => {
				const { loadTrailEffect } = await import("@tsparticles/effect-trail");

				await loadTrailEffect(engine);
			},
		},
	];

export function getEffects() {
	return transformLoadableObject(effects);
}

export async function handleEffects(pluginName, engine) {
	return handlePlugin(effects, pluginName, engine);
}
