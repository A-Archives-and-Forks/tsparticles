import { particles } from "./index.js";

export { particles } from "./index.js";
export type { ParticlesOptions } from "./index.js";
export * from "@tsparticles/engine";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  particles?: typeof particles;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};

globalObject.particles = particles;
