import { loadBigCirclesPreset } from "./index.js";

export { loadBigCirclesPreset } from "./index.js";
export { tsParticles } from "@tsparticles/engine";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadBigCirclesPreset?: typeof loadBigCirclesPreset;
};
globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};

globalObject.loadBigCirclesPreset = loadBigCirclesPreset;
