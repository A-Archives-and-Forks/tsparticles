import { configDemoPresets } from "./playgroundConfigDemos";
import { paletteDemos } from "./playgroundPaletteData";
import { presetDemos } from "./playgroundPresetDemos";

export { paletteGroupDefinitions } from "./playgroundPaletteData";

export const demoPresets = [...configDemoPresets, ...presetDemos, ...paletteDemos];

