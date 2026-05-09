import { loadSnowPreset } from "./index.js";

export { loadSnowPreset } from "./index.js";
export { tsParticles } from "@tsparticles/engine";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadSnowPreset?: typeof loadSnowPreset;
};
globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};

globalObject.loadSnowPreset = loadSnowPreset;
