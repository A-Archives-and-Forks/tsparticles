import { render, version } from "inferno";
import { Incrementer } from "./components/Incrementer";
import { tsParticles } from "@tsparticles/engine";
import { loadFull } from "tsparticles";
import "./main.css";
import configs from "@tsparticles/configs";

// Note: initialization is handled by ParticlesProvider below. Keep
// this file minimal and client-only as the provider will call the
// provided init callback only on the client.

const container = document.getElementById("app");

function App() {
  return (
    <div>
      <div id="tsparticles" />
      <h1>{`Welcome to Inferno ${version} TSX`}</h1>
      <Incrementer name={"Crazy button"} />
    </div>
  );
}

// Render the app wrapped in the provider so initialization is
// completed before children mount. The provider will call the
// callback and then render its children when ready.
void (async () => {
  // Render the app first so the DOM node is available, then register
  // plugins and initialize tsParticles (so plugins are available before
  // we load the particle container).
  render(<App />, container);

  try {
    await loadFull(tsParticles);

    // ensure engine init if required by the runtime
    if (typeof tsParticles.init === "function") {
      // eslint-disable-next-line no-console
      console.log("demo: calling tsParticles.init()");
      await tsParticles.init();
    }

    // finally load the particles into the div with id 'tsparticles'
    // eslint-disable-next-line no-console
    console.log("demo: calling tsParticles.load()");
    await tsParticles.load({ id: "tsparticles", options: configs.basic });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error("demo: tsParticles init/load failed", e);
  }
})();
