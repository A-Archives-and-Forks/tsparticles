import { loadSquaresPreset } from "./index.js";

export { loadSquaresPreset } from "./index.js";
export { tsParticles } from "@tsparticles/engine";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadSquaresPreset?: typeof loadSquaresPreset;
};
globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};

globalObject.loadSquaresPreset = loadSquaresPreset;
