import { loadBubblesPreset } from "./index.js";

export { loadBubblesPreset } from "./index.js";
export { tsParticles } from "@tsparticles/engine";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadBubblesPreset?: typeof loadBubblesPreset;
};
globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};

globalObject.loadBubblesPreset = loadBubblesPreset;
