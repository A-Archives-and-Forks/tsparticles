import { trackingConfig } from "./config";
import type { CookieConsentChoice } from "./consent";

type TrackingWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  adsbygoogle?: unknown[];
};

const GA_SCRIPT_ID = "tsparticles-ga-loader";
const ADSENSE_SCRIPT_ID = "tsparticles-adsense-loader";

let gaInitialized = false;
let adSenseInitialized = false;
let consentApplied: CookieConsentChoice | undefined;

function getTrackingWindow(): TrackingWindow | undefined {
  if (typeof globalThis.window === "undefined") {
    return undefined;
  }

  return globalThis.window as TrackingWindow;
}

function ensureGtagStub(): TrackingWindow | undefined {
  const trackingWindow = getTrackingWindow();

  if (!trackingWindow) {
    return undefined;
  }

  trackingWindow.dataLayer ??= [];

  if (!trackingWindow.gtag) {
    trackingWindow.gtag = (...args: unknown[]) => {
      trackingWindow.dataLayer?.push(args);
    };
  }

  return trackingWindow;
}

function loadScriptOnce(id: string, src: string): void {
  const trackingWindow = getTrackingWindow();

  if (!trackingWindow || trackingWindow.document.getElementById(id)) {
    return;
  }

  const scriptElement = trackingWindow.document.createElement("script");

  scriptElement.id = id;
  scriptElement.async = true;
  scriptElement.src = src;
  trackingWindow.document.head.append(scriptElement);
}

function initGoogleAnalytics(): void {
  if (!trackingConfig.isAnalyticsEnabled || gaInitialized) {
    return;
  }

  const trackingWindow = ensureGtagStub();

  if (!trackingWindow) {
    return;
  }

  loadScriptOnce(GA_SCRIPT_ID, `https://www.googletagmanager.com/gtag/js?id=${trackingConfig.gaMeasurementId}`);
  trackingWindow.gtag?.("js", new Date());
  trackingWindow.gtag?.("config", trackingConfig.gaMeasurementId, {
    send_page_view: false,
  });

  gaInitialized = true;
}

function initGoogleAdSense(): void {
  if (!trackingConfig.isAdSenseEnabled || adSenseInitialized) {
    return;
  }

  loadScriptOnce(
    ADSENSE_SCRIPT_ID,
    `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${trackingConfig.googleAdSenseClientId}`,
  );

  const trackingWindow = getTrackingWindow();

  if (!trackingWindow) {
    return;
  }

  trackingWindow.adsbygoogle ??= [];
  trackingWindow.adsbygoogle.push({
    google_ad_client: trackingConfig.googleAdSenseClientId,
    enable_page_level_ads: true,
  });

  adSenseInitialized = true;
}

function updateConsentMode(choice: CookieConsentChoice): void {
  if (!trackingConfig.isAnalyticsEnabled) {
    return;
  }

  const trackingWindow = ensureGtagStub();

  if (!trackingWindow?.gtag) {
    return;
  }

  const isAccepted = choice === "accepted";

  trackingWindow.gtag("consent", "update", {
    ad_storage: isAccepted ? "granted" : "denied",
    analytics_storage: isAccepted ? "granted" : "denied",
    ad_user_data: isAccepted ? "granted" : "denied",
    ad_personalization: isAccepted ? "granted" : "denied",
  });
}

export function applyConsent(choice: CookieConsentChoice): void {
  if (consentApplied === choice) {
    return;
  }

  if (choice === "accepted") {
    initGoogleAnalytics();
    initGoogleAdSense();
  }

  updateConsentMode(choice);
  consentApplied = choice;
}

export function trackPageView(path: string): void {
  if (!trackingConfig.isAnalyticsEnabled || consentApplied !== "accepted") {
    return;
  }

  const trackingWindow = getTrackingWindow();

  trackingWindow?.gtag?.("event", "page_view", {
    page_location: trackingWindow.location.href,
    page_path: path,
    page_title: trackingWindow.document.title,
  });
}
