import { loadBasic } from "./index.js";

export * from "@tsparticles/engine";
export { loadBasic } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadBasic?: typeof loadBasic;
};
globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};

globalObject.loadBasic = loadBasic;
