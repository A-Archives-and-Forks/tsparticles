<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { useData, useRoute } from "vitepress";

import { trackEvent } from "../tracking/runtime";

const route = useRoute();
const { title } = useData();
const copied = ref(false);
const isMobile = ref(false);

const fallbackBaseUrl = "https://particles.js.org";

const pageUrl = computed(() => {
  if (typeof globalThis.window === "undefined") {
    return `${fallbackBaseUrl}${route.path}`;
  }

  return globalThis.window.location.href;
});

const shareText = computed(() => {
  const pageTitle = title.value?.trim();

  return pageTitle ? `${pageTitle} | tsParticles` : "tsParticles";
});

const encodedUrl = computed(() => encodeURIComponent(pageUrl.value));
const encodedText = computed(() => encodeURIComponent(shareText.value));

const links = computed(() => [
  {
    id: "facebook",
    href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl.value}`,
    label: "Facebook",
  },
  {
    id: "x",
    href: `https://x.com/intent/tweet?url=${encodedUrl.value}&text=${encodedText.value}`,
    label: "X",
  },
  {
    id: "linkedin",
    href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl.value}`,
    label: "LinkedIn",
  },
  {
    id: "reddit",
    href: `https://www.reddit.com/submit?url=${encodedUrl.value}&title=${encodedText.value}`,
    label: "Reddit",
  },
  {
    id: "telegram",
    href: `https://t.me/share/url?url=${encodedUrl.value}&text=${encodedText.value}`,
    label: "Telegram",
  },
  {
    id: "whatsapp",
    href: `https://wa.me/?text=${encodedText.value}%20${encodedUrl.value}`,
    label: "WhatsApp",
  },
  {
    id: "email",
    href: `mailto:?subject=${encodedText.value}&body=${encodedUrl.value}`,
    label: "Email",
  },
]);

const orderedLinks = computed(() => {
  const desktopOrder = ["facebook", "x", "linkedin", "reddit", "telegram", "whatsapp", "email"];
  const mobileOrder = ["x", "whatsapp", "telegram", "facebook", "linkedin", "reddit", "email"];
  const order = isMobile.value ? mobileOrder : desktopOrder;

  return [...links.value].sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));
});

function onShareClick(label: string): void {
  trackEvent("share_click", {
    method: label,
    page_path: route.path,
    page_title: shareText.value,
  });
}

async function copyPageLink(): Promise<void> {
  if (typeof globalThis.window === "undefined") {
    return;
  }

  try {
    await globalThis.window.navigator.clipboard.writeText(pageUrl.value);
    copied.value = true;
    trackEvent("share_copy_link", {
      method: "copy_link",
      page_path: route.path,
      page_title: shareText.value,
    });
    globalThis.window.setTimeout(() => {
      copied.value = false;
    }, 1800);
  } catch {
    copied.value = false;
  }
}

function updateViewport(): void {
  if (typeof globalThis.window === "undefined") {
    isMobile.value = false;

    return;
  }

  isMobile.value = globalThis.window.matchMedia("(max-width: 768px)").matches;
}

onMounted(() => {
  updateViewport();
  globalThis.window.addEventListener("resize", updateViewport);
});

onBeforeUnmount(() => {
  globalThis.window.removeEventListener("resize", updateViewport);
});
</script>

<template>
  <div class="social-share" aria-label="Share this page">
    <span class="social-share__label">Share:</span>
    <a
      v-for="item in orderedLinks"
      :key="item.id"
      :href="item.href"
      class="social-share__button"
      target="_blank"
      rel="noopener noreferrer"
      @click="onShareClick(item.label)"
    >
      {{ item.label }}
    </a>
    <button type="button" class="social-share__button social-share__button--copy" @click="copyPageLink">
      {{ copied ? "Copied" : "Copy link" }}
    </button>
  </div>
</template>
