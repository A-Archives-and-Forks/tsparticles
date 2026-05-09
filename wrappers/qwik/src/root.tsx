import { Particles, initParticlesEngine } from "./components/particles";
import { loadFull } from "tsparticles";
import { component$, useVisibleTask$ } from "@builder.io/qwik";

// Initialize the particles engine on the client only. Calling initParticlesEngine
// at module scope runs during SSR and won't set the client-side initialization
// state, which makes <Particles /> throw when it renders in the browser.
export default component$(() => {
  useVisibleTask$(async () => {
    await initParticlesEngine(async engine => {
      await loadFull(engine);
    });
  });

  return (
    <>
      <head>
        <meta charSet="utf-8" />
        <title>Qwik Particles App</title>
      </head>
      <body>
        <Particles
          id="tsparticles"
          options={{
            background: {
              color: {
                value: "#000",
              },
            },
            particles: {
              paint: {
                fill: {
                  enable: true,
                },
              },
              number: {
                value: 100,
              },
              move: {
                enable: true,
              },
              links: {
                enable: true,
              },
            },
          }}
        />
      </body>
    </>
  );
});
