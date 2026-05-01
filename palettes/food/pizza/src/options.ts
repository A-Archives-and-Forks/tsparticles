import { type IPalette } from "@tsparticles/engine";

export const options: IPalette = {
  name: "Pizza",
  background: "#1b1207",
  blendMode: "source-over",
  colors: {
    fill: {
      enable: true,
      value: [
        "#F4D6A0", // crust light
        "#E0B06F", // crust golden
        "#C6863D", // crust brown
        "#D84315", // tomato sauce
        "#B71C1C",
        "#FFD54F", // cheese
        "#2E2E2E", // olives
        "#2E7D32", // basil
      ],
    },
  },
};
