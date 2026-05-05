import { tsParticles } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  tsParticles?: typeof tsParticles;
};
globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.tsParticles = tsParticles;

export * from "./index.js";
