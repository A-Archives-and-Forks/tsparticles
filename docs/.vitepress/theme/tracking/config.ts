const gaMeasurementId = (import.meta.env.VITE_GA_MEASUREMENT_ID ?? "").trim();
const googleAdSenseClientId = (
  import.meta.env.VITE_GOOGLE_ADSENSE_CLIENT_ID ??
  import.meta.env.VITE_GOOGLE_ADS_CLIENT_ID ??
  ""
).trim();
const cookiePolicyPath = (import.meta.env.VITE_COOKIE_POLICY_PATH ?? "/cookie-policy").trim();

export const trackingConfig = {
  gaMeasurementId,
  googleAdSenseClientId,
  cookiePolicyPath: cookiePolicyPath.length > 0 ? cookiePolicyPath : "/cookie-policy",
  isAnalyticsEnabled: gaMeasurementId.length > 0,
  isAdSenseEnabled: googleAdSenseClientId.length > 0,
};
