import { loadTemplatePreset } from "./index.js";


import { loadTemplatePreset } from "./index.js";
import { tsParticles } from "@tsparticles/engine";

void loadTemplatePreset(tsParticles);

export { loadTemplatePreset, tsParticles };

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadTemplatePreset?: typeof loadTemplatePreset;
};
globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};

globalObject.loadTemplatePreset = loadTemplatePreset;
