<script setup lang="ts">
import { computed, onMounted, ref } from "vue";

import { trackingConfig } from "../tracking/config";
import { readCookieConsent, writeCookieConsent } from "../tracking/consent";

const consentChoice = ref<string | undefined>(undefined);

const isTrackingConfigured = computed(() => trackingConfig.isAnalyticsEnabled || trackingConfig.isAdSenseEnabled);
const shouldShowBanner = computed(() => isTrackingConfigured.value && !consentChoice.value);

function updateConsent(choice: "accepted" | "rejected"): void {
  writeCookieConsent(choice);
  consentChoice.value = choice;
}

onMounted(() => {
  consentChoice.value = readCookieConsent();
});
</script>

<template>
  <div v-if="shouldShowBanner" class="cookie-banner" role="dialog" aria-live="polite" aria-label="Cookie consent">
    <p class="cookie-banner__text">
      We use analytics and advertising cookies (Google Analytics and Google AdSense) to improve documentation and
      measure campaign performance.
      <a :href="trackingConfig.cookiePolicyPath">Cookie Policy</a>
      and
      <a :href="trackingConfig.privacyPolicyPath">Privacy Policy</a>.
    </p>
    <div class="cookie-banner__actions">
      <button type="button" class="cookie-banner__button cookie-banner__button--secondary" @click="updateConsent('rejected')">
        Reject
      </button>
      <button type="button" class="cookie-banner__button" @click="updateConsent('accepted')">Accept</button>
    </div>
  </div>
</template>
