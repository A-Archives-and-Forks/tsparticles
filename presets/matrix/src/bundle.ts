import { loadMatrixPreset } from "./index.js";

export { loadMatrixPreset } from "./index.js";
export { tsParticles } from "@tsparticles/engine";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadMatrixPreset?: typeof loadMatrixPreset;
};
globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};

globalObject.loadMatrixPreset = loadMatrixPreset;
