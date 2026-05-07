<script setup lang="ts">
import websitePackage from "../../../../package.json";
</script>

<template>
  <p>
    Current website package version: <code>{{ websitePackage.version }}</code>
  </p>
</template>
