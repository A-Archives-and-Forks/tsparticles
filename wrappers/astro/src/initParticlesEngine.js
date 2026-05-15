import { tsParticles } from "@tsparticles/engine";

// Minimal JS runtime copy of the TypeScript initParticlesEngine implementation.
// Kept in src as a .js file so consumers (Vite/dev server/browser) can import it
// directly from node_modules without requiring TS/.astro compilation.

let initialized = false;
let initPromise = undefined;
let initCallback = undefined;

export async function initParticlesEngine(init) {
  if (initialized) {
    return;
  }

  if (initPromise) {
    if (initCallback !== init) {
      throw new Error("initParticlesEngine callback must be stable across the app lifecycle.");
    }

    await initPromise;

    return;
  }

  initCallback = init;
  initPromise = (async () => {
    if (init) {
      await init(tsParticles);
    }

    // Some engine builds require an explicit init call to register plugins.
    if (typeof tsParticles.init === "function") {
      await tsParticles.init();
    }

    initialized = true;
  })().catch(error => {
    initPromise = undefined;
    initCallback = undefined;
    initialized = false;

    throw error;
  });

  await initPromise;
}

export function isParticlesEngineInitialized() {
  return initialized;
}

export async function waitForParticlesEngineInitialization() {
  await (initPromise ?? Promise.resolve());
}
