<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <HomeNavbar />

    <main class="flex-grow">
      <slot />
    </main>

    <HomeFooter />
  </div>
</template>

<script setup lang="ts"></script>
