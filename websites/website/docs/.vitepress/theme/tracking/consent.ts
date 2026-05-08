export interface CookieConsentPreferences {
  analytics: boolean;
  adsense: boolean;
}

const CONSENT_STORAGE_KEY = "tsparticles-cookie-consent";
export const CONSENT_CHANGE_EVENT = "tsparticles:cookie-consent-change";

export const defaultCookieConsentPreferences: CookieConsentPreferences = {
  analytics: false,
  adsense: false,
};

export function readCookieConsent(): CookieConsentPreferences | undefined {
  if (typeof globalThis.window === "undefined") {
    return undefined;
  }

  const storedChoice = globalThis.window.localStorage.getItem(CONSENT_STORAGE_KEY);

  if (!storedChoice) {
    return undefined;
  }

  try {
    const parsed = JSON.parse(storedChoice) as Partial<CookieConsentPreferences> | "accepted" | "rejected";

    if (parsed === "accepted") {
      return {
        analytics: true,
        adsense: true,
      };
    }

    if (parsed === "rejected") {
      return {
        analytics: false,
        adsense: false,
      };
    }

    if (typeof parsed === "object" && parsed) {
      return {
        analytics: !!parsed.analytics,
        adsense: !!parsed.adsense,
      };
    }
  } catch {
    return undefined;
  }

  return undefined;
}

export function writeCookieConsent(preferences: CookieConsentPreferences): void {
  if (typeof globalThis.window === "undefined") {
    return;
  }

  globalThis.window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(preferences));
  globalThis.window.dispatchEvent(
    new CustomEvent<CookieConsentPreferences>(CONSENT_CHANGE_EVENT, { detail: preferences }),
  );
}
