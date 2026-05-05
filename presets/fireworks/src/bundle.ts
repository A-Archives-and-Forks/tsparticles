import { loadFireworksPreset } from "./index.js";

export { loadFireworksPreset } from "./index.js";
export { tsParticles } from "@tsparticles/engine";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadFireworksPreset?: typeof loadFireworksPreset;
};
globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};

globalObject.loadFireworksPreset = loadFireworksPreset;
