import type { ConfigParams } from "../types";
import type { RollupOptions } from "rollup";
import { createSingleConfig } from "./createSingleConfig";

export const createConfig = (params: ConfigParams): RollupOptions[] => {
  const configs = [createSingleConfig(params, false, false), createSingleConfig(params, true, false)];

  if (params.includeLazy) {
    configs.push(createSingleConfig(params, false, true), createSingleConfig(params, true, true));
  }

  return configs;
};
