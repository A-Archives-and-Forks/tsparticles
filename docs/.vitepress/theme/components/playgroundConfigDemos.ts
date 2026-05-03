import type { ISourceOptions } from "@tsparticles/engine";
import configs from "@tsparticles/configs";

import type { DemoPreset } from "./playgroundTypes";

/**
 * Keys from @tsparticles/configs to hide from the website playground.
 * Add exact key names to exclude specific configs.
 */
export const excludedConfigKeys: readonly string[] = ["test"];

/**
 * Key prefixes from @tsparticles/configs to hide from the website playground.
 * Keys starting with any of these prefixes will be excluded.
 * Palette configs are already available in the dedicated palettes repository.
 */
export const excludedConfigKeyPrefixes: readonly string[] = ["palette-"];

function isSourceOptions(value: unknown): value is ISourceOptions {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function toTitleCase(value: string): string {
  return value
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .split(/[-_\s]+/)
    .filter((part) => part.length > 0)
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}

const configEntries = Object.entries(configs)
  .filter(
    ([key, value]) =>
      !excludedConfigKeys.includes(key) &&
      !excludedConfigKeyPrefixes.some((prefix) => key.startsWith(prefix)) &&
      isSourceOptions(value),
  )
  .sort(([left], [right]) => left.localeCompare(right));

export const configDemoPresets: DemoPreset[] = configEntries.map(([key, options]) => ({
  key: `config-${key[0].toLowerCase()}${key.slice(1)}`,
  title: `${toTitleCase(key)} Config`,
  description: `Configuration preset for ${key}.`,
  category: "background",
  kind: "config",
  recipePath: "/demos/configs",
  options,
}));

