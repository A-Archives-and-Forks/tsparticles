import type { ISourceOptions } from "@tsparticles/engine";

export type DemoCategory = "background" | "interactive" | "seasonal";
export type DemoKind = "config" | "palette" | "preset" | "shape";
export type PlaygroundMode = "all" | "configs" | "palettes" | "presets" | "shapes";

export type DemoPreset = {
  key: string;
  title: string;
  description: string;
  category: DemoCategory;
  kind: DemoKind;
  recipePath: string;
  options: ISourceOptions;
};

export type PaletteGroupDefinition = {
  title: string;
  slugs: readonly string[];
};
