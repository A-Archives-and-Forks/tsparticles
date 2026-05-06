import type { IParticlesOptions } from "./IParticlesOptions.js";
import type { ParticlesInstance } from "./ParticlesInstance.js";
import type { RecursivePartial } from "@tsparticles/engine";

export type ParticlesFunc = ((
  idOrOptions?: string | RecursivePartial<IParticlesOptions>,
  sourceOptions?: RecursivePartial<IParticlesOptions>,
) => Promise<ParticlesInstance | undefined>) & {
  version: string;
};
