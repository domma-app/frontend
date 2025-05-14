<template>
  <div class="min-h-screen bg-white">
    <slot />
  </div>
</template>

<script setup lang="ts">
useHead({
  title: "Authentication",
  meta: [{ name: "description", content: "Authentication pages" }],
});
</script>

<style scoped>
/* Make sure entire screen is covered by the layout */
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>
