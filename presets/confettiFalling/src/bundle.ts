import { loadConfettiFallingPreset } from "./index.js";

export { loadConfettiFallingPreset } from "./index.js";
export { tsParticles } from "@tsparticles/engine";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadConfettiFallingPreset?: typeof loadConfettiFallingPreset;
};
globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};

globalObject.loadConfettiFallingPreset = loadConfettiFallingPreset;
