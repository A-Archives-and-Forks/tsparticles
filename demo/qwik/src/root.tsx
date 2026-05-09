import { Particles, initParticlesEngine } from "../../../wrappers/qwik/src/components/particles";
import type { Engine } from "@tsparticles/engine";
import { loadFull } from "tsparticles";
import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";

// Run initialization on the client only. useVisibleTask$ ensures the
// callback runs in the browser when the component becomes visible.
export default component$(() => {
  const particlesReady = useSignal(false);

  useVisibleTask$(async () => {
    await initParticlesEngine(async (engine: Engine) => {
      await loadFull(engine);
    });

    particlesReady.value = true;
  });

  return (
    <>
      <head>
        <meta charset="utf-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <title>tsParticles Qwik Demo</title>
      </head>
      <body>
        <main>
          <h1>tsParticles Qwik Demo</h1>
          {particlesReady.value && (
            <Particles
              id="tsparticles"
              options={{
                background: {
                  color: {
                    value: "#000",
                  },
                },
                fullScreen: {
                  zIndex: -1,
                },
                particles: {
                  paint: {
                    fill: {
                      enable: true,
                    },
                  },
                  links: {
                    enable: true,
                  },
                  move: {
                    enable: true,
                  },
                  number: {
                    value: 80,
                  },
                },
              }}
            />
          )}
        </main>
      </body>
    </>
  );
});
