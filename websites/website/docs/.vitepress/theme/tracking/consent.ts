export type CookieConsentChoice = "accepted" | "rejected";

const CONSENT_STORAGE_KEY = "tsparticles-cookie-consent";
export const CONSENT_CHANGE_EVENT = "tsparticles:cookie-consent-change";

export function readCookieConsent(): CookieConsentChoice | undefined {
  if (typeof globalThis.window === "undefined") {
    return undefined;
  }

  const storedChoice = globalThis.window.localStorage.getItem(CONSENT_STORAGE_KEY);

  if (storedChoice === "accepted" || storedChoice === "rejected") {
    return storedChoice;
  }

  return undefined;
}

export function writeCookieConsent(choice: CookieConsentChoice): void {
  if (typeof globalThis.window === "undefined") {
    return;
  }

  globalThis.window.localStorage.setItem(CONSENT_STORAGE_KEY, choice);
  globalThis.window.dispatchEvent(new CustomEvent<CookieConsentChoice>(CONSENT_CHANGE_EVENT, { detail: choice }));
}
