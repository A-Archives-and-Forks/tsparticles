import type { Container, RecursivePartial } from "@tsparticles/engine";
import type { IConfettiOptions } from "./IConfettiOptions.js";

/**
 *
 */
export type ConfettiFirstParam = string | RecursivePartial<IConfettiOptions>;

/**
 *
 * @param idOrOptions - the id used for the canvas, or if not using two parameters, the animation configuration object
 * @param confettiOptions - the animation configuration object, this parameter is mandatory only if providing an id
 * @returns the container of the animation, or undefined if no canvas was found
 */
export type ConfettiFunc = (
  idOrOptions: ConfettiFirstParam,
  confettiOptions?: RecursivePartial<IConfettiOptions>,
) => Promise<Container | undefined>;
