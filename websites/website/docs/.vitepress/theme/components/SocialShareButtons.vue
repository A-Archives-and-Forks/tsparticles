<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from "vue";
import { useData, useRoute } from "vitepress";

import { trackEvent } from "../tracking/runtime";

const route = useRoute();
const { title } = useData();
const copied = ref(false);
const hasDocTitle = ref(false);

const fallbackBaseUrl = "https://particles.js.org";
const docTitleSelector = ".vp-doc h1";

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

async function updateDocTitleAvailability(): Promise<void> {
  await nextTick();
  hasDocTitle.value = Boolean(globalThis.window?.document.querySelector(docTitleSelector));
}

onMounted(() => {
  void updateDocTitleAvailability();
});

watch(
  () => route.path,
  async () => {
    await updateDocTitleAvailability();
  },
);
</script>

<template>
  <Teleport v-if="hasDocTitle" :to="docTitleSelector">
    <details class="doc-share-menu">
      <summary class="doc-share-menu__trigger" aria-label="Share this page">
        <svg class="doc-share-menu__icon" viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M18 16a3 3 0 0 0-2.39 1.18l-6.82-3.4a3.08 3.08 0 0 0 0-1.56l6.82-3.4A3 3 0 1 0 15 7a2.96 2.96 0 0 0 .07.63l-6.86 3.43a3 3 0 1 0 0 1.88l6.86 3.43A2.96 2.96 0 0 0 15 17a3 3 0 1 0 3-1z"
            fill="currentColor"
          />
        </svg>
        <span>Share</span>
      </summary>
      <div class="doc-share-menu__panel" role="menu" aria-label="Share this page">
        <a
          v-for="item in links"
          :key="item.id"
          :href="item.href"
          class="doc-share-menu__item"
          :data-network="item.id"
          target="_blank"
          rel="noopener noreferrer"
          @click="onShareClick(item.label)"
        >
          <span class="doc-share-menu__item-icon" aria-hidden="true">
            <svg v-if="item.id === 'facebook'" viewBox="0 0 24 24">
              <path
                d="M13.5 8H16V5h-2.5C10.9 5 9 6.9 9 9.5V12H7v3h2v4h3v-4h2.3l.7-3H12V9.5c0-.8.7-1.5 1.5-1.5z"
                fill="currentColor"
              />
            </svg>
            <svg v-else-if="item.id === 'x'" viewBox="0 0 24 24">
              <path
                d="M17.6 4h2.7l-5.9 6.7L21 20h-5.2l-4.1-5.3L7 20H4.3l6.3-7.2L4 4h5.3l3.7 4.8L17.6 4zm-.9 14h1.5L8.5 5.9H6.9L16.7 18z"
                fill="currentColor"
              />
            </svg>
            <svg v-else-if="item.id === 'linkedin'" viewBox="0 0 24 24">
              <path
                d="M6.5 8.5A1.5 1.5 0 1 1 6.5 5a1.5 1.5 0 0 1 0 3.5zM5 19V10h3v9H5zm5 0v-9h2.9v1.3h.1c.4-.8 1.4-1.6 3-1.6 3.2 0 3.8 2.1 3.8 4.8V19h-3v-3.9c0-.9 0-2.1-1.3-2.1S14 14 14 15.1V19h-4z"
                fill="currentColor"
              />
            </svg>
            <svg v-else-if="item.id === 'reddit'" viewBox="0 0 24 24">
              <path
                d="M18.3 10.4c-.6 0-1.1.2-1.5.6-1.1-.7-2.6-1.1-4.3-1.1s-3.2.4-4.3 1.1c-.4-.4-.9-.6-1.5-.6-1.1 0-2 .9-2 2 0 .8.5 1.5 1.2 1.8 0 .1 0 .2 0 .3 0 2.6 2.9 4.7 6.6 4.7s6.6-2.1 6.6-4.7c0-.1 0-.2 0-.3.7-.3 1.2-1 1.2-1.8 0-1.1-.9-2-2-2zm-7.8 5.1c-.5 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm4 0c-.5 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm-4 1.7c.5.4 1.2.6 2 .6s1.5-.2 2-.6c.2-.2.2-.5 0-.7-.2-.2-.5-.2-.7 0-.3.2-.8.4-1.3.4s-1-.1-1.3-.4c-.2-.2-.5-.2-.7 0-.2.2-.2.5 0 .7zM16.9 8.2c.2 0 .4.1.5.2.2.2.5.2.7 0 .2-.2.2-.5 0-.7-.2-.2-.5-.4-.8-.5l.4-2.1 1.5.3c.1.6.6 1 1.2 1 .7 0 1.3-.6 1.3-1.3S21.1 3.8 20.4 3.8c-.5 0-1 .3-1.2.8l-1.9-.4c-.3-.1-.6.1-.6.4l-.5 2.6z"
                fill="currentColor"
              />
            </svg>
            <svg v-else-if="item.id === 'telegram'" viewBox="0 0 24 24">
              <path
                d="M20.7 4.3 3.9 10.8c-1.1.4-1.1 1 .2 1.4l4.3 1.3 1.6 5c.2.6.1.8.8.8.5 0 .7-.2 1-.5l2.4-2.3 5 3.7c.9.5 1.5.2 1.7-.8l2.9-13.8c.3-1.2-.4-1.8-1.1-1.5z"
                fill="currentColor"
              />
            </svg>
            <svg v-else-if="item.id === 'whatsapp'" viewBox="0 0 24 24">
              <path
                d="M12 4a8 8 0 0 0-6.9 12l-1 4 4.1-1A8 8 0 1 0 12 4zm4.3 10.8c-.2.6-1 1.1-1.6 1.2-.4.1-.8.2-2.5-.5-2.1-.9-3.4-3-3.5-3.1-.1-.1-.8-1-.8-2s.5-1.4.7-1.6c.2-.2.5-.3.6-.3h.5c.2 0 .4 0 .6.5.2.5.7 1.6.7 1.7.1.1.1.3 0 .5-.1.2-.2.3-.3.5l-.4.4c-.1.1-.2.2-.1.4.1.2.5.9 1.2 1.5.8.7 1.5.9 1.7 1 .2.1.3 0 .4-.1l.6-.7c.2-.2.3-.2.5-.1l1.7.8c.2.1.4.2.4.3.1.1.1.7-.1 1.3z"
                fill="currentColor"
              />
            </svg>
            <svg v-else viewBox="0 0 24 24">
              <path d="M4 6h16v12H4z" fill="none" stroke="currentColor" stroke-width="2" />
              <path d="m4 7 8 6 8-6" fill="none" stroke="currentColor" stroke-width="2" />
            </svg>
          </span>
          {{ item.label }}
        </a>
        <button type="button" class="doc-share-menu__item doc-share-menu__item--copy" @click="copyPageLink">
          <span class="doc-share-menu__item-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="M8 8h10v10H8z" fill="none" stroke="currentColor" stroke-width="2" />
              <path
                d="M6 16H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              />
            </svg>
          </span>
          {{ copied ? "Copied" : "Copy link" }}
        </button>
      </div>
    </details>
  </Teleport>
</template>
