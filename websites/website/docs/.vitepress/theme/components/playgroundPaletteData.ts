import type { ISourceOptions } from "@tsparticles/engine";

import type { DemoPreset, PaletteGroupDefinition } from "./playgroundTypes";

export const paletteGroupDefinitions: readonly PaletteGroupDefinition[] = [
  {
    title: "Atmosphere",
    slugs: [
      "colored-smoke-amber",
      "colored-smoke-blue",
      "colored-smoke-green",
      "colored-smoke-magenta",
      "colored-smoke-orange",
      "colored-smoke-purple",
      "colored-smoke-rainbow",
      "colored-smoke-red",
      "colored-smoke-teal",
      "dust-haze",
      "fog-morning",
      "volcanic-ash",
    ],
  },
  {
    title: "Atmospheric",
    slugs: [
      "heat-duality",
      "heat-haze",
      "lightning",
      "shockwave",
      "smoke-cold",
      "smoke-warm",
      "sunrise-gold",
      "sunset-binary",
      "thermal-map",
      "thunderstorm",
    ],
  },
  {
    title: "Confetti",
    slugs: [
      "confetti",
      "confetti-gold",
      "confetti-monochrome-blue",
      "confetti-monochrome-green",
      "confetti-monochrome-pink",
      "confetti-monochrome-purple",
      "confetti-monochrome-red",
      "confetti-neon",
      "confetti-pastel",
      "confetti-patriotic",
      "confetti-rainbow",
      "confetti-winter",
    ],
  },
  {
    title: "Earth",
    slugs: [
      "caustics",
      "desert-sand",
      "mud-and-dirt",
      "oil-slick",
      "rock-and-gravel",
      "rust-and-corrosion",
      "skin-and-organic",
    ],
  },
  {
    title: "Fantasy",
    slugs: [
      "bioluminescence",
      "blood-and-gore",
      "fairy-dust",
      "holy-light",
      "ice-magic",
      "ice-triad",
      "iris",
      "jellyfish-glow",
      "mermaid",
      "poison-and-venom",
      "unicorn",
    ],
  },
  {
    title: "Food",
    slugs: [
      "apple",
      "apple-green",
      "apple-red",
      "avocado",
      "bell-peppers",
      "berries",
      "cherry",
      "citrus-twist",
      "gingerbread-house",
      "grapes",
      "macaron",
      "melon",
      "pineapple",
      "pizza",
      "sakura",
      "salad",
      "spice-rack",
      "steak",
      "sushi",
      "tropical-fruits",
      "watermelon",
    ],
  },
  {
    title: "Fire",
    slugs: ["candlelight", "fire", "fire-seed", "full-fire-gradient", "lava-lamp", "metal-sparks", "molten-metal"],
  },
  {
    title: "Fireworks",
    slugs: [
      "fireworks-blue",
      "fireworks-blue-stroke",
      "fireworks-copper",
      "fireworks-copper-stroke",
      "fireworks-gold",
      "fireworks-gold-stroke",
      "fireworks-green",
      "fireworks-green-stroke",
      "fireworks-ice",
      "fireworks-ice-stroke",
      "fireworks-multicolor",
      "fireworks-multicolor-stroke",
      "fireworks-neon",
      "fireworks-neon-stroke",
      "fireworks-pastel",
      "fireworks-pastel-stroke",
      "fireworks-purple",
      "fireworks-purple-stroke",
      "fireworks-rainbow",
      "fireworks-rainbow-stroke",
      "fireworks-red",
      "fireworks-red-stroke",
      "fireworks-silver",
      "fireworks-silver-stroke",
    ],
  },
  {
    title: "Impact",
    slugs: [
      "bullet-hit",
      "explosion-debris",
      "glass-burst",
      "meteor-impact",
      "nuclear-glow",
      "shockwave-blast",
      "splatter-dark",
    ],
  },
  {
    title: "Monochromatic",
    slugs: [
      "monochrome-blues",
      "monochrome-brown",
      "monochrome-cyan",
      "monochrome-gold",
      "monochrome-greens",
      "monochrome-noir",
      "monochrome-oranges",
      "monochrome-pinks",
      "monochrome-purples",
      "monochrome-reds",
      "monochrome-silver",
      "monochrome-teal",
      "monochrome-white",
      "monochrome-yellows",
    ],
  },
  {
    title: "Nature",
    slugs: [
      "autumn-leaves",
      "cherry-blossom",
      "dandelion-seeds",
      "earthy-nature",
      "fireflies",
      "forest-canopy",
      "pollen-and-spores",
      "snowfall",
      "spring-bloom",
    ],
  },
  {
    title: "Optics",
    slugs: [
      "bokeh-cold",
      "bokeh-gold",
      "bokeh-pastel",
      "holographic-shimmer",
      "laser-scatter",
      "lens-flare-dust",
      "prism-spectrum",
    ],
  },
  {
    title: "Pastel",
    slugs: ["pastel-cool", "pastel-dream", "pastel-mint", "pastel-sunset", "pastel-warm"],
  },
  {
    title: "Space",
    slugs: [
      "aurora-borealis",
      "cosmic-radiation",
      "dark-matter",
      "galaxy-dust",
      "lagoon",
      "nebula",
      "portal",
      "pulsar",
      "solar-wind",
      "supernova",
    ],
  },
  {
    title: "Spectrum",
    slugs: [
      "acid-pair",
      "cmy-secondaries",
      "duality-blue-yellow",
      "duality-green-magenta",
      "duality-red-cyan",
      "full-spectrum",
      "okabe-ito-accessible",
      "prism-scatter",
      "rainbow",
      "rgb-primaries",
    ],
  },
  {
    title: "Tech",
    slugs: [
      "crt-phosphor",
      "glitch",
      "hologram",
      "lofi-warm",
      "matrix-rain",
      "neon-city",
      "network-nodes",
      "plasma-arc",
      "vaporwave",
    ],
  },
  {
    title: "Vibrant",
    slugs: ["vibrant", "vibrant-electric", "vibrant-neon", "vibrant-retro", "vibrant-tropical"],
  },
  {
    title: "Water",
    slugs: [
      "deep-ocean",
      "foam-and-bubbles",
      "fog-coastal",
      "ink-in-water",
      "rain",
      "rising-bubbles",
      "water",
      "water-splash",
    ],
  },
] as const;

const paletteNames = paletteGroupDefinitions.flatMap((group) => group.slugs) as readonly string[];

function toTitleCase(value: string): string {
  return value
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function createPaletteOptions(palette: string): ISourceOptions {
  return {
    palette,
    particles: {
      move: {
        enable: true,
        speed: 1.6,
      },
      number: {
        value: 65,
      },
      shape: {
        type: "circle",
      },
      size: {
        value: {
          min: 3,
          max: 6,
        },
      },
    },
  };
}

export const paletteDemos: DemoPreset[] = paletteNames.map((palette) => ({
  category: "background",
  description: `Palette demo using ${palette} from the palettes project.`,
  key: `palette-${palette}`,
  kind: "palette",
  options: createPaletteOptions(palette),
  recipePath: "/demos/palettes",
  title: `${toTitleCase(palette)} Palette`,
}));
