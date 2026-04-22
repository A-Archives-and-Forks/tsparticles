import { tsParticles, getLogger, type Engine } from "@tsparticles/engine";

export type ParticlesPluginRegistrar = (engine: Engine) => Promise<void> | void;

let initialized = false;
let initPromise: Promise<void> | undefined;

export async function initParticlesEngine(init?: ParticlesPluginRegistrar): Promise<void> {
	if (initialized) {
		return;
	}

	if (initPromise) {
		// A previous initialization is already in progress. Don't throw if the
		// init callback identity changed (HMR or remounts) — just await the
		// existing initialization so callers see a consistent initialized state.
		await initPromise;

		return;
	}

	initPromise = (async () => {
		if (init) {
			getLogger().log("initParticlesEngine: calling init callback");

			await init(tsParticles);
		}

		// Call engine init when available
		getLogger().log("initParticlesEngine: calling tsParticles.init()");

		await tsParticles.init();

		initialized = true;
	})().catch((error: unknown) => {
		initPromise = undefined;
		initialized = false;

		throw error;
	});

	await initPromise;
}

export function isParticlesEngineInitialized(): boolean {
	return initialized;
}

export async function waitForParticlesEngineInitialization(): Promise<void> {
	await (initPromise ?? Promise.resolve());
}
