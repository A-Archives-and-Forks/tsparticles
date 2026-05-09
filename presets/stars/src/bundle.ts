import { loadStarsPreset } from "./index.js";

export { loadStarsPreset } from "./index.js";
export { tsParticles } from "@tsparticles/engine";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadStarsPreset?: typeof loadStarsPreset;
};
globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};

globalObject.loadStarsPreset = loadStarsPreset;
