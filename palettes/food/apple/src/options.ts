import { type IPalette } from "@tsparticles/engine";

export const options: IPalette = {
  name: "Apple",
  background: "#0b0f08",
  blendMode: "source-over",
  colors: {
    fill: {
      enable: true,
      value: [
        "#FFF8E1", // inner flesh
        "#FFF3CF",
        "#D32F2F", // red skin
        "#E53935",
        "#FF7043",
        "#8BC34A", // green apple accents
        "#689F38",
        "#4E342E", // stem
      ],
    },
  },
};
