import { buildMap, type ParticlesBuildType } from "./buildMap";
import { createConfig } from "./config/createConfig";
import { getUmdPolicyData } from "./config/umdPolicy";
import type { ParticlesBuildParams } from "./types";

export const createParticlesBuild = (
  type: ParticlesBuildType,
  params: ParticlesBuildParams
) => {
  const def = buildMap[type];

  if (!def) {
    throw new Error(`Unknown build type: ${type}`);
  }

  const dir = params.dir,
    version = params.version,
    additionalExternals = params.additionalExternals,
    moduleName = params.moduleName,
    bundle = params.bundle,
    umdPolicy = getUmdPolicyData(type, moduleName),
    banner = def.banner(params),
    minBanner = def.minBanner(params),
    base = createConfig({
      entry: {
        format: def.format,
        name: moduleName,
        bundle: false,
      },
      version,
      banner,
      minBanner,
      dir,
      bundle: false,
      includeLazy: false,
      umdPolicy,
      additionalExternals,
    });

  if (def.hasBundle && (bundle ?? true)) {
    return [
      ...base,
      ...createConfig({
        entry: {
          format: def.format,
          name: moduleName
            ? `${moduleName}.bundle`
            : "bundle",
          bundle: true,
        },
        version,
        banner,
        minBanner,
        dir,
        bundle: true,
        includeLazy: false,
        umdPolicy,
        additionalExternals,
      }),
    ];
  }

  return base;
};
