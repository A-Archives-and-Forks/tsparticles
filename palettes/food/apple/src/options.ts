import { type IPalette } from "@tsparticles/engine";

export const options: IPalette = {
  name: "Apple",
  background: "#0b0f08",
  blendMode: "multiply",
  colors: {
    fill: {
      enable: true,
      value: [
        "#FFF8E1",
        "#FFE0B2",
        "#E53935",
        "#C62828",
        "#AD2A2F",
        "#A5D6A7",
        "#81C784",
        "#66BB6A",
        "#6D4C41",
      ],
    },
  },
};

export const appleRed: IPalette = {
  name: "Apple Red",
  background: "#0b0f08",
  blendMode: "multiply",
  colors: {
    fill: {
      enable: true,
      value: [
        "#FFF8E1", // inner flesh light
        "#FFE0B2",
        "#FFCC80",
        "#E53935", // red skin
        "#C62828",
        "#AD2A2F",
        "#6D4C41", // stem
      ],
    },
  },
};

export const appleGreen: IPalette = {
  name: "Apple Green",
  background: "#0b0f08",
  blendMode: "multiply",
  colors: {
    fill: {
      enable: true,
      value: [
        "#F1F8E9", // light flesh
        "#DCEDC8",
        "#C5E1A5",
        "#AED581",
        "#9CCC65", // green skin
        "#7CB342",
        "#558B2F",
        "#33691E",
        "#6D4C41", // stem
      ],
    },
  },
};
