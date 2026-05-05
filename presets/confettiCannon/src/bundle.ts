import { loadConfettiCannonPreset } from "./index.js";

export { loadConfettiCannonPreset } from "./index.js";
export { tsParticles } from "@tsparticles/engine";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadConfettiCannonPreset?: typeof loadConfettiCannonPreset;
};
globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};

globalObject.loadConfettiCannonPreset = loadConfettiCannonPreset;
