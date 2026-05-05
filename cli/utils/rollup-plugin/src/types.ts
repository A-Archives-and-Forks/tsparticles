export interface ExternalData {
  bundle: boolean;
  data: Record<string, unknown>;
  name: string;
}

export type UmdBuildKind = "bundle" | "confetti" | "engine" | "fireworks" | "package" | "pjs";

export interface UmdPolicyData {
  kind: UmdBuildKind;
  scope: string;
}

export interface ConfigParams {
  additionalExternals?: ExternalData[];
  banner: string;
  bundle?: boolean;
  dir: string;
  includeLazy?: boolean;
  entry: {
    bundle: boolean;
    format: string;
    name?: string;
  };
  minBanner: string;
  umdPolicy: UmdPolicyData;
  version: string;
}

export interface ParticlesBuildParams {
  dir: string;
  version: string;
  additionalExternals?: ExternalData[];
  moduleName?: string;
  bundle?: boolean;
  bundleName?: string;
  effectName?: string;
  pluginName?: string;
  presetName?: string;
  shapeName?: string;
  templateName?: string;
  updaterName?: string;
  [key: string]: unknown;
}
