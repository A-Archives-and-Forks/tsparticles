import { type IPalette } from "@tsparticles/engine";

// Iris — metallic/galvanized shifting tones (inspired by TWSBI Diamond Iris finish)
export const options: IPalette = {
  name: "Iris",
  background: "#0b0b0b",
  blendMode: "screen",
  colors: {
    fill: {
      enable: true,
      value: [
        "#9EA8D3",
        "#8C7DA1",
        "#6E7C8C",
        "#7FB3D5",
        "#C1A4E6",
      ],
    },
  },
};
