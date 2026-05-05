import type { ExternalData } from "../types";
import type { ExternalOption } from "rollup";
import { getUmdGlobalForExternal } from "./umdPolicy";

interface Params {
  additionalExternals?: ExternalData[];
  bundle?: boolean;
}

const defaultGlobal = "window";

const getRootGlobal = (external: ExternalData): string => {
  const root = external.data?.root;

  if (Array.isArray(root)) {
    return root.filter((t): t is string => typeof t === "string").join(".") || defaultGlobal;
  }

  return typeof root === "string" ? root : defaultGlobal;
};

export const getExternal = ({ bundle, additionalExternals = [] }: Params): ExternalOption => {
  if (bundle) {
    return additionalExternals.filter(e => !e.bundle).map(e => e.name);
  }


  return [
    ...additionalExternals.map(e => e.name),
    /^tsparticles$/,
    /^tsparticles-/,
    /^@tsparticles\//,
  ];
};

export const getGlobals = (
  additionalExternals: ExternalData[] = [],
  bundle?: boolean
) => {
  const globalsAdditional = bundle ? additionalExternals.filter(e => !e.bundle) : additionalExternals;
  const additionalMap = new Map(globalsAdditional.map(e => [e.name, getRootGlobal(e)]));

  return (id: string) => {
    if (additionalMap.has(id)) {
      return additionalMap.get(id) ?? defaultGlobal;
    }

    const tsparticlesGlobal = getUmdGlobalForExternal(id);

    if (tsparticlesGlobal) {
      return tsparticlesGlobal;
    }

    return defaultGlobal;
  };
};
