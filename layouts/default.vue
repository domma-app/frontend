<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <Navbar />
    <main class="flex-grow container mx-auto px-4 py-6">
      <slot />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts"></script>
