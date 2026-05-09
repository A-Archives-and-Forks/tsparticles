import type { IConfettiOptions } from "./IConfettiOptions.js";
import type { RecursivePartial } from "@tsparticles/engine";

/**
 * The {@link confetti} parameter object definition
 */
export interface ConfettiParams {
  /**
   *
   */
  canvas?: HTMLCanvasElement;

  /**
   *
   */
  id: string;

  /**
   *
   */
  options: RecursivePartial<IConfettiOptions>;
}
