import { loadConfettiPreset } from "./index.js";

export { loadConfettiPreset } from "./index.js";
export { tsParticles } from "@tsparticles/engine";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadConfettiPreset?: typeof loadConfettiPreset;
};
globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};

globalObject.loadConfettiPreset = loadConfettiPreset;
