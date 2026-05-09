import { loadAll } from "./index.js";

export * from "@tsparticles/engine";
export { loadAll } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadAll?: typeof loadAll;
};
globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};

globalObject.loadAll = loadAll;
