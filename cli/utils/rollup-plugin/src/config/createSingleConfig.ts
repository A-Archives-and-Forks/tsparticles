import fs from "node:fs";
import path from "node:path";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import terser from "@rollup/plugin-terser";
import { visualizer } from "rollup-plugin-visualizer";
import { getEntry } from "./entry";
import { getExternal, getGlobals } from "./externals";
import { getUmdGlobalsBootstrap } from "./umdPolicy";
import type { ConfigParams, UmdBuildKind, UmdPolicyData } from "../types";
import type { Plugin, RollupOptions } from "rollup";

const toJsBanner = (text: string): string => {
  return `/* ${text} */`;
};

const temporaryUmdGlobal = "tsparticlesInternalExports";
const lazyWrapperVirtualPrefix = "\0tsparticles-lazy-wrapper:";

// Public export predicate per kind
const getPublicExports = (exports: string[], kind: UmdBuildKind): string[] => {
  const fixedPublicMap: Record<Exclude<UmdBuildKind, "bundle" | "package">, string> = {
    confetti: "confetti",
    engine: "tsParticles",
    fireworks: "fireworks",
    pjs: "initPjs",
  };

  if (kind === "bundle") {
    // Bundles expose load* functions AND the tsParticles instance (needed for bundle users)
    return exports.filter(t => /^load[A-Z]/.test(t) || t === "tsParticles");
  }

  if (kind === "package") {
    return exports.filter(t => /^load[A-Z]/.test(t));
  }

  const requiredExport = fixedPublicMap[kind];

  if (!exports.includes(requiredExport)) {
    throw new Error(`UMD public export policy violated: missing ${requiredExport}`);
  }

  return [requiredExport];
};

const validatePublicExports = (publicExports: string[], allExports: string[], kind: UmdBuildKind): void => {
  const fixedPublicMap: Record<Exclude<UmdBuildKind, "bundle" | "package">, string> = {
    confetti: "confetti",
    engine: "tsParticles",
    fireworks: "fireworks",
    pjs: "initPjs",
  };

  if (kind !== "bundle" && kind !== "package") {
    const required = fixedPublicMap[kind];

    if (!allExports.includes(required)) {
      throw new Error(`UMD public export policy violated: missing ${required}`);
    }

    if (publicExports.length !== 1 || publicExports[0] !== required) {
      throw new Error(`UMD public export policy violated: ${kind} can expose only ${required}`);
    }

    return;
  }

  // For bundle/package: only load* (and tsParticles for bundle) are allowed on window
  const invalid = publicExports.filter(t => !/^load[A-Z]/.test(t) && t !== "tsParticles");

  if (invalid.length > 0) {
    throw new Error(
      `UMD public export policy violated: only load* exports (and tsParticles for bundles) are allowed on window, found ${invalid.join(", ")}`
    );
  }
};

/**
 * Build the namespace initialization expression to use as the UMD factory's first argument.
 * Example: scope = "__tsParticlesInternals.engine"
 * Result: "(global.__tsParticlesInternals = global.__tsParticlesInternals || {}, global.__tsParticlesInternals.engine = global.__tsParticlesInternals.engine || {})"
 *
 * This is used to REPLACE `global.window = global.tsparticlesInternalExports || {}` in the UMD wrapper,
 * so that rollup writes all exports directly into the correct namespace object.
 */
const buildGlobalNamespaceInit = (scope: string): string => {
  const segments = scope.split(".");
  const inits: string[] = [];
  let currentPath = "global";

  for (const segment of segments) {
    currentPath += `.${segment}`;
    inits.push(`${currentPath} = ${currentPath} || {}`);
  }

  return `(${inits.join(", ")})`;
};

/**
 * Replace the UMD factory's exports target (global.window = ...) with the correct namespace path.
 * This makes rollup write all `exports.X = X` directly into __tsParticlesInternals.<scope>.
 */
const redirectUmdExportsToNamespace = (code: string, scope: string): string => {
  const namespaceInit = buildGlobalNamespaceInit(scope);

  return code
    // multi-dependency case: factory(global.window = ..., globalDep1, ...)
    .replaceAll(`factory(global.window = global.${temporaryUmdGlobal} || {}, `, `factory(${namespaceInit}, `)
    .replaceAll(`factory(global.window = {}, `, `factory(${namespaceInit}, `)
    // single case: factory(global.window = ...)
    .replaceAll(`factory(global.window = global.${temporaryUmdGlobal} || {})`, `factory(${namespaceInit})`)
    .replaceAll(`factory(global.window = {})`, `factory(${namespaceInit})`);
};

/**
 * Build the code that copies public exports from the namespace to window.
 * Reads from globalThis.__tsParticlesInternals.<scope>.<export> after the factory has run.
 */
const buildWindowExposureCode = (scope: string, publicExports: string[]): string => {
  if (publicExports.length === 0) {
    return "";
  }

  const assignments = publicExports.map(exp => `${exp}: (globalThis.${scope} || {}).${exp}`).join(", ");

  return `Object.assign(globalThis.window || globalThis, { ${assignments} });\n`;
};

const buildBundleEngineAliasCode = (umdPolicy: UmdPolicyData): string => {
  if (umdPolicy.kind !== "bundle") {
    return "";
  }

  // Keep backward compatibility for packages that still resolve engine externals from internals.engine.
  return (
    `globalThis.__tsParticlesInternals = globalThis.__tsParticlesInternals || {};\n` +
    `if (!globalThis.__tsParticlesInternals.engine || !globalThis.__tsParticlesInternals.engine.tsParticles) {\n` +
    `  globalThis.__tsParticlesInternals.engine = globalThis.${umdPolicy.scope} || {};\n` +
    `}\n`
  );
};

const buildLazyRuntimePath = (name: string): string => {
  return `chunks/${name}.js`;
};

const getLazyRuntimeInputPath = (dir: string): string => {
  return path.resolve(dir, "dist/browser/index.lazy.js");
};

const parseNamedExports = (content: string): string[] => {
  const exports = new Set<string>();

  for (const match of content.matchAll(/export\s+(?:async\s+)?(?:function|class|const|let|var)\s+([A-Za-z_$][\w$]*)/g)) {
    exports.add(match[1]);
  }

  for (const match of content.matchAll(/export\s*{([^}]+)}(?!\s*from)/g)) {
    const values = match[1]
      .split(",")
      .map(value => value.trim())
      .filter(Boolean)
      .map(value => value.split(/\s+as\s+/).pop()?.trim())
      .filter((value): value is string => Boolean(value));

    for (const value of values) {
      exports.add(value);
    }
  }

  return [...exports];
};

const resolveLazyEntryExports = (filePath: string, visited = new Set<string>()): string[] => {
  if (visited.has(filePath) || !fs.existsSync(filePath)) {
    return [];
  }

  visited.add(filePath);

  const content = fs.readFileSync(filePath, "utf8");
  const exports = new Set(parseNamedExports(content));

  for (const match of content.matchAll(/export\s+(?:\*|{[^}]+})\s+from\s+["'](.+?)["']/g)) {
    const specifier = match[1];

    if (!specifier.startsWith(".")) {
      continue;
    }

    const resolvedPath = path.resolve(path.dirname(filePath), specifier);
    const normalizedPath = path.extname(resolvedPath) ? resolvedPath : `${resolvedPath}.js`;

    for (const value of resolveLazyEntryExports(normalizedPath, visited)) {
      exports.add(value);
    }
  }

  return [...exports];
};

const createLazyWrapperEntryPlugin = (params: ConfigParams, min: boolean): Plugin => {
  const { dir, umdPolicy } = params;
  const { name } = getEntry({ ...params.entry, dir, min, lazy: true });
  const runtimePath = buildLazyRuntimePath(name);
  const runtimeInputPath = getLazyRuntimeInputPath(dir);
  const lazyExports = resolveLazyEntryExports(runtimeInputPath);
  const publicExports = getPublicExports(
    [...new Set(umdPolicy.kind === "bundle" ? [...lazyExports, "tsParticles"] : lazyExports)],
    umdPolicy.kind,
  );
  const needsEngineExports = publicExports.includes("tsParticles") || umdPolicy.kind === "bundle";
  const exportedDeclarations = publicExports
    .filter(exp => exp !== "tsParticles")
    .map(
      exp =>
        `const ${exp} = async (...args) => { const module = await getLazyModule(); return module.${exp}(...args); };`,
    )
    .join("\n");
  const tsParticlesExport = publicExports.includes("tsParticles")
    ? "const tsParticles = engineExports.tsParticles;"
    : "";
  const namedExports = publicExports.join(", ");
  const engineBootstrap = needsEngineExports
    ? [
        "globalThis.__tsParticlesInternals = globalThis.__tsParticlesInternals || {};",
        "globalThis.__tsParticlesInternals.engine = globalThis.__tsParticlesInternals.engine || engineExports;",
      ].join("\n")
    : "";
  const imports = needsEngineExports ? 'import * as engineExports from "@tsparticles/engine";\n' : "";
  const source = `${imports}
const currentScript = typeof document !== "undefined" ? document.currentScript : undefined;
const runtimeUrl = new URL("${runtimePath}", currentScript?.src ?? globalThis.location?.href ?? "/").href;
let lazyModulePromise;
const dynamicImport = new Function("path", "return import(path);");
const getLazyModule = () => {
  lazyModulePromise ??= dynamicImport(runtimeUrl);

  return lazyModulePromise;
};
${engineBootstrap}
${tsParticlesExport}
${exportedDeclarations}
export { ${namedExports} };
`;

  return {
    name: "tsparticles-lazy-wrapper-entry",
    resolveId(id) {
      return id === `${lazyWrapperVirtualPrefix}${name}` ? id : null;
    },
    load(id) {
      return id === `${lazyWrapperVirtualPrefix}${name}` ? source : null;
    },
  };
};

const exposeEntryExports = (enabled: boolean, umdPolicy?: UmdPolicyData): Plugin => {
  return {
    name: "expose-entry-exports",
    renderChunk(code, chunk) {
      if (!enabled || !chunk.isEntry) {
        return null;
      }

      const exports = chunk.exports.filter(t => t !== "default");

      // No exports at all - just bootstrap namespace and clean up
      if (exports.length === 0) {
        if (!umdPolicy) {
          return null;
        }

        const umdCode = redirectUmdExportsToNamespace(code, umdPolicy.scope);

        return {
          code: `${getUmdGlobalsBootstrap(temporaryUmdGlobal)}${umdCode}\ndelete (globalThis.window || globalThis).${temporaryUmdGlobal};\n`,
          map: null,
        };
      }

      // No UMD policy (e.g. ESM lazy split bundles) - expose all to window (old behavior)
      if (!umdPolicy) {
        const assignments = exports.map(t => `${t}: ${t}`).join(", ");

        return {
          code: `${code}\nObject.assign(globalThis.window || globalThis, { ${assignments} });\n`,
          map: null,
        };
      }

      // With UMD policy:
      // 1) Redirect factory's exports target to the internal namespace
      // 2) After factory runs, copy public exports from namespace to window
      const publicExports = getPublicExports(exports, umdPolicy.kind);

      validatePublicExports(publicExports, exports, umdPolicy.kind);

      // The key step: replace factory's first arg so rollup writes all exports to __tsParticlesInternals.<scope>
      const umdCode = redirectUmdExportsToNamespace(code, umdPolicy.scope);

      // Read public exports from the namespace and expose on window
      const windowCode = buildWindowExposureCode(umdPolicy.scope, publicExports);
      const engineAliasCode = buildBundleEngineAliasCode(umdPolicy);

      return {
        code:
          `${getUmdGlobalsBootstrap(temporaryUmdGlobal)}${umdCode}\n${windowCode}${engineAliasCode}` +
          `delete (globalThis.window || globalThis).${temporaryUmdGlobal};\n`,
        map: null,
      };
    },
  };
};

export const createSingleConfig = (params: ConfigParams, min: boolean, lazy: boolean): RollupOptions => {
  const { additionalExternals, banner, bundle, dir, entry, minBanner, version } = params,
    { name, input } = getEntry({ ...entry, dir, min, lazy }),
    wrapperEntryPlugin = lazy ? createLazyWrapperEntryPlugin(params, min) : undefined;

  if (lazy) {
    return {
      input: `${lazyWrapperVirtualPrefix}${name}`,
      external: getExternal({ bundle, additionalExternals }),
      plugins: [
        wrapperEntryPlugin,
        nodeResolve({
          browser: true,
        }),
        replace({
          preventAssignment: true,
          __VERSION__: JSON.stringify(version),
        }),
        exposeEntryExports(true, params.umdPolicy),
        min && terser(),
      ].filter(Boolean),
      output: {
        file: path.resolve(dir, "dist", `${name}.js`),
        format: "umd",
        name: temporaryUmdGlobal,
        globals: getGlobals(additionalExternals, bundle),
        banner: toJsBanner(min ? minBanner : banner),
        // inlineDynamicImports must be true for UMD (Rollup doesn't support code-splitting in UMD format).
        // The actual lazy loading is handled at runtime via `new Function("path", "return import(path)")`
        // which Rollup cannot see/inline — so setting this to true has no effect on lazy behaviour.
        inlineDynamicImports: true,
      },
    };
  }

  return {
    input,
    external: getExternal({ bundle, additionalExternals }),
    plugins: [
      nodeResolve({
        browser: true,
      }),
      replace({
        preventAssignment: true,
        __VERSION__: JSON.stringify(version),
      }),
      exposeEntryExports(true, params.umdPolicy),
      !min &&
        visualizer({
          filename: path.resolve(dir, "dist/report.html"),
        }),
      min && terser(),
    ].filter(Boolean),
    output: {
      file: path.resolve(dir, "dist", `${name}.js`),
      format: "umd",
      name: temporaryUmdGlobal,
      globals: getGlobals(additionalExternals, bundle),
      banner: toJsBanner(min ? minBanner : banner),
      inlineDynamicImports: true,
    },
  };
};

export const createLazyRuntimeConfig = (params: ConfigParams, min: boolean): RollupOptions => {
  const { additionalExternals, banner, bundle, dir, entry, minBanner, version } = params,
    { name } = getEntry({ ...entry, dir, min, lazy: true });

  return {
    input: getLazyRuntimeInputPath(dir),
    external: getExternal({ bundle, additionalExternals }),
    plugins: [
      nodeResolve({
        browser: true,
      }),
      replace({
        preventAssignment: true,
        __VERSION__: JSON.stringify(version),
      }),
      min && terser(),
    ].filter(Boolean),
    output: {
      dir: path.resolve(dir, "dist"),
      format: "es",
      entryFileNames: buildLazyRuntimePath(name),
      chunkFileNames: min ? "chunks/[name]-[hash].min.js" : "chunks/[name]-[hash].js",
      banner: toJsBanner(min ? minBanner : banner),
    },
  };
};

