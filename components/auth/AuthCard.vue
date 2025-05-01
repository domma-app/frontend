<template>
  <div class="bg-white p-8 rounded-2xl shadow-md w-full max-w-[28rem]">
    <div class="text-center mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ title }}</h1>
      <p class="text-base text-gray-500">{{ subtitle }}</p>
    </div>
    <div class="w-full">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  subtitle: string;
}>();
</script>
