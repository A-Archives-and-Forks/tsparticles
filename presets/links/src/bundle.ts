import { loadLinksPreset } from "./index.js";

export { loadLinksPreset } from "./index.js";
export { tsParticles } from "@tsparticles/engine";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadLinksPreset?: typeof loadLinksPreset;
};
globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};

globalObject.loadLinksPreset = loadLinksPreset;
