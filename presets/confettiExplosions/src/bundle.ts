import { loadConfettiExplosionsPreset } from "./index.js";

export { loadConfettiExplosionsPreset } from "./index.js";
export { tsParticles } from "@tsparticles/engine";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadConfettiExplosionsPreset?: typeof loadConfettiExplosionsPreset;
};
globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};

globalObject.loadConfettiExplosionsPreset = loadConfettiExplosionsPreset;
