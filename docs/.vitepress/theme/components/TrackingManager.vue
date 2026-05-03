<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useRoute } from "vitepress";

import { CONSENT_CHANGE_EVENT, readCookieConsent } from "../tracking/consent";
import type { CookieConsentChoice } from "../tracking/consent";
import { trackingConfig } from "../tracking/config";
import { applyConsent, trackPageView } from "../tracking/runtime";

const route = useRoute();
const currentConsent = ref<CookieConsentChoice | undefined>(undefined);

function syncConsent(choice?: CookieConsentChoice): void {
  if (!choice) {
    currentConsent.value = undefined;

    return;
  }

  currentConsent.value = choice;
  applyConsent(choice);
}

function onConsentChange(event: Event): void {
  const customEvent = event as CustomEvent<CookieConsentChoice>;

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
    if (currentConsent.value === "accepted") {
      trackPageView(path);
    }
  },
  { immediate: true },
);
</script>

<template>
  <div aria-hidden="true" style="display: none" />
</template>

