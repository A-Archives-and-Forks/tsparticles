import { initPjs } from "./index.js";

export * from "@tsparticles/engine";
export { initPjs } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  initPjs?: typeof initPjs;
};
globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};

globalObject.initPjs = initPjs;
