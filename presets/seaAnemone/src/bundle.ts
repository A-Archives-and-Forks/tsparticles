import { loadSeaAnemonePreset } from "./index.js";

export { loadSeaAnemonePreset } from "./index.js";
export { tsParticles } from "@tsparticles/engine";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadSeaAnemonePreset?: typeof loadSeaAnemonePreset;
};
globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};

globalObject.loadSeaAnemonePreset = loadSeaAnemonePreset;
