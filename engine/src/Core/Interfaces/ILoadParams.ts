import type { ISourceOptions } from "../../Types/ISourceOptions.js";
import type { SingleOrMultiple } from "../../Types/SingleOrMultiple.js";

/**
 * Loader params for options local object
 */
export interface ILoadParams {
  /**
   * The source element for loading.
   *
   * - HTMLElement: used to resolve/create the DOM canvas that will be transferred
   *   to OffscreenCanvas for rendering.
   * - OffscreenCanvas: used directly as render target.
   */
  element?: HTMLElement | OffscreenCanvas;

  /**
   * The id assigned to the container
   */
  id?: string;

  /**
   * The index of the chosen element of the options array, if an array is given. If not specified, a random index will be used
   */
  index?: number;

  /**
   * The options object or the options array to laod
   */
  options?: SingleOrMultiple<ISourceOptions>;

  /**
   * The url or the url array used to get options
   */
  url?: SingleOrMultiple<string>;
}
