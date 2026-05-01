import { type IPalette } from "@tsparticles/engine";

export const options: IPalette = {
  name: "Sushi",
  background: "#0b1b16",
  blendMode: "source-over",
  colors: {
    fill: {
      enable: true,
      value: [
        "#FFFFFF", // rice
        "#F0F0F0",
        "#FF7043", // salmon
        "#D84315",
        "#1B5E20", // avocado
        "#2E7D32",
        "#1A237E", // seaweed
      ],
    },
  },
};
