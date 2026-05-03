<script setup lang="ts">
import DefaultTheme from "vitepress/theme";

import CookieConsentBanner from "./CookieConsentBanner.vue";
import TrackingManager from "./TrackingManager.vue";
</script>

<template>
  <DefaultTheme.Layout />
  <TrackingManager />
  <CookieConsentBanner />
</template>

