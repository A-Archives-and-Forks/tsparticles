const gaMeasurementId = (import.meta.env.VITE_GA_MEASUREMENT_ID ?? "").trim();
const googleAdSenseClientId = (
  import.meta.env.VITE_GOOGLE_ADSENSE_CLIENT_ID ??
  import.meta.env.VITE_GOOGLE_ADS_CLIENT_ID ??
  ""
).trim();
const adSenseNonPersonalizedOnRejectRaw = (import.meta.env.VITE_ADSENSE_NON_PERSONALIZED_ON_REJECT ?? "true")
  .trim()
  .toLowerCase();
const analyticsCookielessOnRejectRaw = (import.meta.env.VITE_ANALYTICS_COOKIELESS_ON_REJECT ?? "true")
  .trim()
  .toLowerCase();
const cookiePolicyPath = (import.meta.env.VITE_COOKIE_POLICY_PATH ?? "/cookie-policy").trim();
const privacyPolicyPath = (import.meta.env.VITE_PRIVACY_POLICY_PATH ?? "/privacy-policy").trim();

const adSenseNonPersonalizedOnReject = adSenseNonPersonalizedOnRejectRaw !== "false";
const analyticsCookielessOnReject = analyticsCookielessOnRejectRaw !== "false";

export const trackingConfig = {
  gaMeasurementId,
  googleAdSenseClientId,
  adSenseNonPersonalizedOnReject,
  analyticsCookielessOnReject,
  cookiePolicyPath: cookiePolicyPath.length > 0 ? cookiePolicyPath : "/cookie-policy",
  privacyPolicyPath: privacyPolicyPath.length > 0 ? privacyPolicyPath : "/privacy-policy",
  isAnalyticsEnabled: gaMeasurementId.length > 0,
  isAdSenseEnabled: googleAdSenseClientId.length > 0,
};
