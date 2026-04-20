import Controller from "@ember/controller";
import { tracked } from "@glimmer/tracking";
import type { Container, Engine } from "@tsparticles/engine";
import { loadSnowPreset } from "@tsparticles/preset-snow";
import { initParticlesEngine } from "@tsparticles/ember/utils/init-particles-engine";
import { loadFull } from "tsparticles";
import { CONFETTI_OPTIONS, LINK_OPTIONS } from "../utils/options";

export default class ApplicationController extends Controller {
  @tracked isConfettiVisible = false;

  options = LINK_OPTIONS;
  confetti = CONFETTI_OPTIONS;

  constructor(...args: unknown[]) {
    super(...args);

    // Defer particles engine initialization to client runtime. Ember apps
    // may run in FastBoot (server) where window/document are not available.
    // Guard and initialize only on the client.
    if (typeof window !== "undefined") {
      void initParticlesEngine(async (engine: Engine) => {
        await loadFull(engine);
        await loadSnowPreset(engine);
      });
    }
  }

  loadedCallback(container: Container) {
    console.log("Particles loaded", container);
  }
}
