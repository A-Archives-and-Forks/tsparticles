import { type IPalette } from "@tsparticles/engine";

export const options: IPalette = {
  name: "Steak",
  background: "#120a07",
  blendMode: "source-over",
  colors: {
    fill: {
      enable: true,
      value: [
        "#4E342E", // crust sear
        "#C62828", // medium red
        "#8E240F",
        "#3E2723",
        "#FFD54F", // butter/juices
      ],
    },
  },
};
