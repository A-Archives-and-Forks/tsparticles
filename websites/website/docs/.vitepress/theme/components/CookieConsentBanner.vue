<script setup lang="ts">
import { computed, onMounted, ref } from "vue";

import { trackingConfig } from "../tracking/config";
import {
  defaultCookieConsentPreferences,
  readCookieConsent,
  writeCookieConsent,
  type CookieConsentPreferences,
} from "../tracking/consent";

const savedConsent = ref<CookieConsentPreferences | undefined>(undefined);
const preferences = ref<CookieConsentPreferences>({ ...defaultCookieConsentPreferences });
const isPanelOpen = ref(false);

const isTrackingConfigured = computed(() => trackingConfig.isAnalyticsEnabled || trackingConfig.isAdSenseEnabled);
const shouldShowBanner = computed(() => isTrackingConfigured.value && (!savedConsent.value || isPanelOpen.value));

function savePreferences(next: CookieConsentPreferences): void {
  writeCookieConsent(next);
  savedConsent.value = next;
  isPanelOpen.value = false;
}

function rejectAll(): void {
  savePreferences({
    analytics: false,
    adsense: false,
  });
}

function acceptAll(): void {
  savePreferences({
    analytics: true,
    adsense: true,
  });
}

function saveCurrentPreferences(): void {
  savePreferences({
    analytics: preferences.value.analytics,
    adsense: preferences.value.adsense,
  });
}

function reopenPreferences(): void {
  preferences.value = {
    analytics: savedConsent.value?.analytics ?? false,
    adsense: savedConsent.value?.adsense ?? false,
  };
  isPanelOpen.value = true;
}

onMounted(() => {
  savedConsent.value = readCookieConsent();

  if (savedConsent.value) {
    preferences.value = {
      analytics: savedConsent.value.analytics,
      adsense: savedConsent.value.adsense,
    };
  }
});
</script>

<template>
  <div v-if="shouldShowBanner" class="cookie-banner" role="dialog" aria-live="polite" aria-label="Privacy settings">
    <p class="cookie-banner__title">Privacy settings</p>
    <p class="cookie-banner__text">
      Choose how this site can use analytics and advertising technologies. You can continue with essential only, accept
      all, or save custom preferences. With analytics disabled, we only keep anonymous cookieless measurement enabled.
      <a :href="trackingConfig.cookiePolicyPath">Cookie Policy</a>
      and
      <a :href="trackingConfig.privacyPolicyPath">Privacy Policy</a>.
    </p>
    <label class="cookie-banner__option">
      <input v-model="preferences.analytics" type="checkbox" />
      <span>Analytics cookies (Google Analytics)</span>
    </label>
    <label class="cookie-banner__option">
      <input v-model="preferences.adsense" type="checkbox" />
      <span>Advertising (Google AdSense)</span>
    </label>
    <div class="cookie-banner__actions">
      <button type="button" class="cookie-banner__button cookie-banner__button--secondary" @click="rejectAll">
        Reject all
      </button>
      <button
        type="button"
        class="cookie-banner__button cookie-banner__button--secondary"
        @click="saveCurrentPreferences"
      >
        Save choices
      </button>
      <button type="button" class="cookie-banner__button" @click="acceptAll">Accept all</button>
    </div>
  </div>
  <button
    v-else-if="isTrackingConfigured && savedConsent"
    type="button"
    class="cookie-banner__preferences"
    @click="reopenPreferences"
  >
    Privacy settings
  </button>
</template>
