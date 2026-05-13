<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useRoute } from "vitepress";

import { CONSENT_CHANGE_EVENT, defaultCookieConsentPreferences, readCookieConsent } from "../tracking/consent";
import type { CookieConsentPreferences } from "../tracking/consent";
import { trackingConfig } from "../tracking/config";
import { applyConsent, trackPageView } from "../tracking/runtime";

const route = useRoute();
const currentConsent = ref<CookieConsentPreferences>(defaultCookieConsentPreferences);

function syncConsent(preferences?: CookieConsentPreferences): void {
  currentConsent.value = preferences ?? defaultCookieConsentPreferences;
  applyConsent(currentConsent.value);
  trackPageView(route.path);
}

function onConsentChange(event: Event): void {
  const customEvent = event as CustomEvent<CookieConsentPreferences>;

  syncConsent(customEvent.detail);
}

onMounted(() => {
  if (!trackingConfig.isAnalyticsEnabled && !trackingConfig.isAdSenseEnabled) {
    return;
  }

  syncConsent(readCookieConsent());
  globalThis.window.addEventListener(CONSENT_CHANGE_EVENT, onConsentChange);
});

onBeforeUnmount(() => {
  globalThis.window.removeEventListener(CONSENT_CHANGE_EVENT, onConsentChange);
});

watch(
  () => route.path,
  (path) => {
    trackPageView(path);
  },
  { immediate: true },
);
</script>

<template>
  <div aria-hidden="true" style="display: none" />
</template>
