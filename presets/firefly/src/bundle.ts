import { loadFireflyPreset } from "./index.js";

export { loadFireflyPreset } from "./index.js";
export { tsParticles } from "@tsparticles/engine";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadFireflyPreset?: typeof loadFireflyPreset;
};
globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};

globalObject.loadFireflyPreset = loadFireflyPreset;
