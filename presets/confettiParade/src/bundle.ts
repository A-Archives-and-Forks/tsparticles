import { loadConfettiParadePreset } from "./index.js";

export { loadConfettiParadePreset } from "./index.js";
export { tsParticles } from "@tsparticles/engine";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadConfettiParadePreset?: typeof loadConfettiParadePreset;
};
globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};

globalObject.loadConfettiParadePreset = loadConfettiParadePreset;
