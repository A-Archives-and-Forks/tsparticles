import EmberRouter from "@ember/routing/router";
// Match the package-scoped module id used in generated bundles.
import config from "@tsparticles/ember-demo/config/environment";

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {});
