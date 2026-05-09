import { loadTrianglesPreset } from "./index.js";

export { loadTrianglesPreset } from "./index.js";
export { tsParticles } from "@tsparticles/engine";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadTrianglesPreset?: typeof loadTrianglesPreset;
};
globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};

globalObject.loadTrianglesPreset = loadTrianglesPreset;
