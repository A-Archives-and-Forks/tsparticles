const path = require("path");

// Tell Turbopack to consider the workspace root when resolving modules.
// This lets Turbopack find packages that pnpm places in the virtual store
// at the repository root (common in pnpm workspaces) and avoids MODULE_UNPARSABLE
// errors like "Could not parse module '[project]/node_modules/.pnpm/.../next/app.js'".
module.exports = {
  turbopack: {
    // Adjust this if your monorepo root is at a different relative level.
    root: path.resolve(__dirname, "..", ".."),
  },
};
