import DefaultTheme from "vitepress/theme";
import type { Theme } from "vitepress";

import "./custom.css";
import AppLayout from "./components/AppLayout.vue";
import PlaygroundBundlesPanel from "./components/PlaygroundBundlesPanel.vue";
import PlaygroundPanel from "./components/PlaygroundPanel.vue";
import { initPlaygroundFeaturesOnce } from "./components/playgroundLoaders";

const theme: Theme = {
  extends: DefaultTheme,
  Layout: AppLayout,
  enhanceApp({ app }) {
    app.component("PlaygroundBundlesPanel", PlaygroundBundlesPanel);
    app.component("PlaygroundPanel", PlaygroundPanel);

    if (typeof globalThis.window !== "undefined") {
      void initPlaygroundFeaturesOnce().catch((error) => {
        console.error("[playground] Feature preload failed.", error);
      });
    }
  },
};

export default theme;
