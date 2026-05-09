import type { IParticlesOptions } from "./IParticlesOptions.js";
import type { RecursivePartial } from "@tsparticles/engine";

export type ParticlesOptions = RecursivePartial<IParticlesOptions>;

export * from "./particles.js";
