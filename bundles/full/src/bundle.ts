import { loadFull } from "./index.js";

export * from "@tsparticles/engine";
export { loadFull } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadFull?: typeof loadFull;
};
globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};

globalObject.loadFull = loadFull;
