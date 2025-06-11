<template>
  <div class="min-h-screen bg-white flex items-center justify-center px-4">
    <div class="text-center max-w-xl">
      <!-- Error code -->
      <h1 class="text-9xl font-bold text-green-500">404</h1>

      <!-- Error message -->
      <h2 class="text-3xl md:text-4xl font-bold text-gray-800 mt-4">
        Page not found
      </h2>
      <p class="text-xl text-gray-600 mt-4">
        The page you're looking for doesn't exist or has been moved.
      </p>

      <!-- Lottie animation -->
      <div class="my-12 h-64 w-full flex items-center justify-center">
        <Vue3Lottie
          :animation-data="animationData"
          :height="250"
          :width="250"
          :loop="true"
          :auto-play="true"
        />
      </div>

      <!-- Back to home button -->
      <div>
        <NuxtLink
          to="/"
          class="inline-block px-8 py-3.5 text-base font-medium rounded-md text-white bg-green-500 hover:bg-green-600 transition-all"
        >
          Back to Home
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Vue3Lottie } from "vue3-lottie";
import animationData from "~/assets/lottie/404-animation.json";

defineProps({
  error: Object,
});

// Set the page title
useHead({
  title: "Page Not Found | DOMMA",
});
</script>
