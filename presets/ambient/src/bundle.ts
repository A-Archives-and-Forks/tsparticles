import { loadAmbientPreset } from "./index.js";

export { loadAmbientPreset } from "./index.js";
export { tsParticles } from "@tsparticles/engine";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadAmbientPreset?: typeof loadAmbientPreset;
};
globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};

globalObject.loadAmbientPreset = loadAmbientPreset;
