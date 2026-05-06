import type { RangeValue, SingleOrMultiple } from "@tsparticles/engine";

export interface IParticlesOptions {
  collisions?: boolean;
  color?: string;
  count?: number;
  links?: boolean;
  linksColor?: string;
  linksLength?: number;
  opacity?: number;
  radius?: RangeValue;
  shape?: SingleOrMultiple<string>;
  speed?: RangeValue;
}
