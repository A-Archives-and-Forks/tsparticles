import { loadHyperspacePreset } from "./index.js";

export { loadHyperspacePreset } from "./index.js";
export { tsParticles } from "@tsparticles/engine";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadHyperspacePreset?: typeof loadHyperspacePreset;
};
globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};

globalObject.loadHyperspacePreset = loadHyperspacePreset;
