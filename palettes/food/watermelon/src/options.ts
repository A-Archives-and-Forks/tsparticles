import { type IPalette } from "@tsparticles/engine";

export const options: IPalette = {
  name: "Watermelon",
  // light background to match the white rind and inner flesh
  background: "#FFF9F9",
  blendMode: "source-over",
  colors: {
    fill: {
      enable: true,
      value: [
        "#FFFFFF", // inner white / rind edge
        "#FFF5F6", // pale pink highlight
        "#FF6B6B", // juicy pink
        "#FF2A2A",
        "#C62828", // deeper red
        "#000000", // seeds
        "#4CAF50", // rind light
        "#2E7D32",
        "#1B5E20", // rind dark
      ],
    },
  },
};
