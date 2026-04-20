import { Particles, initParticlesEngine } from "../../../wrappers/qwik/src/components/particles";
import type { Engine } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import { useVisibleTask$ } from "@builder.io/qwik";

// Run initialization on the client only. useVisibleTask$ ensures the
// callback runs in the browser when the component becomes visible.
useVisibleTask$(async () => {
  await initParticlesEngine(async (engine: Engine) => {
    await loadSlim(engine);
  });
});

export default function Root() {
  return (
    <>
      <head>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <title>tsParticles Qwik Demo</title>
      </head>
      <body>
        <main>
          <h1>tsParticles Qwik Demo</h1>
          <Particles
            id="tsparticles"
            options={{
              fullScreen: {
                zIndex: -1,
              },
              particles: {
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
        </main>
      </body>
    </>
  );
}
