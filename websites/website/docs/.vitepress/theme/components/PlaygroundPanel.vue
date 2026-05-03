<script setup lang="ts">
import { demoPresets, paletteGroupDefinitions } from "./playgroundDemos";
import type { PlaygroundMode } from "./playgroundTypes";
import { usePlaygroundPanelState } from "./usePlaygroundPanelState";

const props = withDefaults(
  defineProps<{
    mode?: PlaygroundMode;
  }>(),
  {
    mode: "all",
  },
);

const {
  copyJson,
  copyShareLink,
  containerId,
  destroyDemo,
  editorSizeLabel,
  editorText,
  groupedPalettePresets,
  isBusy,
  isDirty,
  isRunning,
  loadPresetToEditor,
  modeLabel,
  parseError,
  playgroundTarget,
  resumeDemo,
  selectedKey,
  selectedPreset,
  startDemo,
  status,
  stopDemo,
  visiblePresets,
} = usePlaygroundPanelState({
  demoPresets,
  mode: props.mode,
  paletteGroupDefinitions,
});
</script>

<template>
  <div class="playground-panel">
    <div class="playground-controls">
      <div class="toolbar-row">
        <label for="demoPreset">Ready demo</label>
        <span class="dirty-badge" :class="{ active: isDirty }">{{ isDirty ? "Edited" : "Synced" }}</span>
      </div>

      <select id="demoPreset" v-model="selectedKey" @change="loadPresetToEditor">
        <template v-if="props.mode === 'palettes'">
          <optgroup v-for="group in groupedPalettePresets" :key="group.title" :label="group.title">
            <option v-for="preset in group.presets" :key="preset.key" :value="preset.key">
              {{ preset.title }}
            </option>
          </optgroup>
        </template>
        <template v-else>
          <option v-for="preset in visiblePresets" :key="preset.key" :value="preset.key">
            {{ preset.title }}
          </option>
        </template>
      </select>

      <p class="mode-label">{{ modeLabel }}</p>

      <p class="preset-description">{{ selectedPreset.description }}</p>
      <p class="preset-recipe-link">Recipe: <a :href="selectedPreset.recipePath">open docs</a></p>

      <div class="button-row">
        <button type="button" :disabled="isBusy" @click="loadPresetToEditor">Reset JSON</button>
        <button type="button" :disabled="isBusy" @click="copyJson">Copy JSON</button>
        <button type="button" :disabled="isBusy" @click="copyShareLink">Copy Share Link</button>
        <button type="button" :disabled="isBusy" @click="startDemo">Start</button>
        <button type="button" :disabled="isBusy || !isRunning" @click="stopDemo">Stop</button>
        <button type="button" :disabled="isBusy || isRunning" @click="resumeDemo">Resume</button>
        <button type="button" :disabled="isBusy" @click="destroyDemo">Destroy</button>
      </div>

      <p class="status">{{ status }}</p>
      <p class="editor-size">{{ editorSizeLabel }}</p>
      <p v-if="parseError" class="parse-error">{{ parseError }}</p>
    </div>

    <textarea v-model="editorText" class="options-editor" spellcheck="false" aria-label="tsParticles options editor" />

    <div :id="containerId" ref="playgroundTarget" class="playground-canvas" />
  </div>
</template>

<style scoped>
.playground-panel {
  display: grid;
  gap: 1rem;
}

.playground-controls {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 1rem;
  background: var(--vp-c-bg-soft);
}

.toolbar-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.playground-controls label {
  font-weight: 600;
}

.dirty-badge {
  font-size: 0.75rem;
  border-radius: 999px;
  padding: 0.2rem 0.6rem;
  border: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-2);
}

.dirty-badge.active {
  color: #fbbf24;
  border-color: #fbbf24;
}

.playground-controls select,
.playground-controls input {
  width: 100%;
  padding: 0.55rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
}

.mode-label {
  margin: 0.5rem 0 0;
  color: var(--vp-c-text-2);
  font-size: 0.82rem;
}

.preset-description {
  margin: 0.75rem 0 0;
  color: var(--vp-c-text-2);
}

.preset-recipe-link {
  margin: 0.35rem 0 0;
  color: var(--vp-c-text-2);
}

.button-row {
  margin-top: 0.9rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.button-row button {
  padding: 0.45rem 0.8rem;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  cursor: pointer;
}

.status {
  margin: 0.75rem 0 0;
}

.editor-size {
  margin: 0.2rem 0 0;
  color: var(--vp-c-text-2);
  font-size: 0.8rem;
}

.parse-error {
  margin: 0.4rem 0 0;
  color: #ff6b6b;
}

.options-editor {
  width: 100%;
  min-height: 320px;
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider);
  padding: 0.9rem;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  font-size: 0.82rem;
  line-height: 1.5;
  background: var(--vp-c-bg-soft);
}

.playground-canvas {
  width: 100%;
  height: 360px;
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider);
  overflow: hidden;
  background: #090d1c;
}
</style>
