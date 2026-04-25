import { type Engine } from "@tsparticles/engine/lazy";

declare const __VERSION__: string;

/**
 * Loads the slime bundle with all plugins needed for running the tsParticles Slim package.
 * This function must be called to make tsParticles Slim work.
 * This function is not mandatory, the plugins can be loaded manually, or using other plugin bundles.
 * If this function is not called, the \@tsparticles/slim package/dependency can be safely removed.
 * This function is called automatically using CDN bundle files.
 * @param engine - the engine to use for loading all plugins
 */
export async function loadSlim(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(async e => {
    const [
        { loadBasic },

        { loadExternalParallaxInteraction },
        { loadExternalAttractInteraction },
        { loadExternalBounceInteraction },
        { loadExternalBubbleInteraction },
        { loadExternalConnectInteraction },
        { loadExternalDestroyInteraction },
        { loadExternalGrabInteraction },
        { loadExternalPauseInteraction },
        { loadExternalPushInteraction },
        { loadExternalRemoveInteraction },
        { loadExternalRepulseInteraction },
        { loadExternalSlowInteraction },
        { loadParticlesAttractInteraction },
        { loadParticlesCollisionsInteraction },
        { loadParticlesLinksInteraction },

        { loadEasingQuadPlugin },
        { loadInteractivityPlugin },

        { loadEmojiShape },
        { loadImageShape },
        { loadLineShape },
        { loadPolygonShape },
        { loadSquareShape },
        { loadStarShape },

        { loadLifeUpdater },
        { loadPaintUpdater },
        { loadRotateUpdater },
      ] = await Promise.all([
        import("@tsparticles/basic/lazy"),

        import("@tsparticles/interaction-external-parallax/lazy"),
        import("@tsparticles/interaction-external-attract/lazy"),
        import("@tsparticles/interaction-external-bounce/lazy"),
        import("@tsparticles/interaction-external-bubble/lazy"),
        import("@tsparticles/interaction-external-connect/lazy"),
        import("@tsparticles/interaction-external-destroy/lazy"),
        import("@tsparticles/interaction-external-grab/lazy"),
        import("@tsparticles/interaction-external-pause/lazy"),
        import("@tsparticles/interaction-external-push/lazy"),
        import("@tsparticles/interaction-external-remove/lazy"),
        import("@tsparticles/interaction-external-repulse/lazy"),
        import("@tsparticles/interaction-external-slow/lazy"),
        import("@tsparticles/interaction-particles-attract/lazy"),
        import("@tsparticles/interaction-particles-collisions/lazy"),
        import("@tsparticles/interaction-particles-links/lazy"),

        import("@tsparticles/plugin-easing-quad/lazy"),
        import("@tsparticles/plugin-interactivity/lazy"),

        import("@tsparticles/shape-emoji"),
        import("@tsparticles/shape-image"),
        import("@tsparticles/shape-line"),
        import("@tsparticles/shape-polygon"),
        import("@tsparticles/shape-square"),
        import("@tsparticles/shape-star"),

        import("@tsparticles/updater-life"),
        import("@tsparticles/updater-paint"),
        import("@tsparticles/updater-rotate"),
      ]),
      loadInteractivityForSlim = async (e: Engine): Promise<void> => {
        await loadInteractivityPlugin(e);

        await Promise.all([
          loadExternalParallaxInteraction(e),
          loadExternalAttractInteraction(e),
          loadExternalBounceInteraction(e),
          loadExternalBubbleInteraction(e),
          loadExternalConnectInteraction(e),
          loadExternalDestroyInteraction(e),
          loadExternalGrabInteraction(e),
          loadExternalPauseInteraction(e),
          loadExternalPushInteraction(e),
          loadExternalRemoveInteraction(e),
          loadExternalRepulseInteraction(e),
          loadExternalSlowInteraction(e),

          loadParticlesAttractInteraction(e),
          loadParticlesCollisionsInteraction(e),
          loadParticlesLinksInteraction(e),
        ]);
      };

    await Promise.all([
      loadBasic(e),

      loadInteractivityForSlim(e),

      loadEasingQuadPlugin(e),

      loadEmojiShape(e),
      loadImageShape(e),
      loadLineShape(e),
      loadPolygonShape(e),
      loadSquareShape(e),
      loadStarShape(e),

      loadLifeUpdater(e),
      loadPaintUpdater(e),
      loadRotateUpdater(e),
    ]);
  });
}
