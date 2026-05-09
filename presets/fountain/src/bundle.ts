import { loadFountainPreset } from "./index.js";

export { loadFountainPreset } from "./index.js";
export { tsParticles } from "@tsparticles/engine";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadFountainPreset?: typeof loadFountainPreset;
};
globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};

globalObject.loadFountainPreset = loadFountainPreset;
