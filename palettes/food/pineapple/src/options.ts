import { type IPalette } from "@tsparticles/engine";

export const options: IPalette = {
  name: "Pineapple",
  background: "#0b1007",
  blendMode: "source-over",
  colors: {
    fill: {
      enable: true,
      value: [
        "#F9A825", // yellow flesh
        "#FBC02D",
        "#FFD54F",
        "#8BC34A", // leaves
        "#689F38",
        "#4E342E", // core/darker bits
      ],
    },
  },
};
