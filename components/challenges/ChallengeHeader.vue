<template>
  <div class="mb-6">
    <div class="flex flex-col md:flex-row md:justify-between md:items-center">
      <div class="mb-4 md:mb-0">
        <h1 class="text-2xl font-bold text-gray-800">
          Money Saving Challenges
        </h1>
        <p class="text-gray-600">
          Join challenges to build better financial habits
        </p>
      </div>
      <div class="flex flex-wrap gap-3">
        <NuxtLink
          to="/dashboard/challenges/history"
          class="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg flex items-center transition-colors"
        >
          <svg
            class="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            ></path>
          </svg>
          Challenge History
        </NuxtLink>
        <button
          @click="$emit('open-join-modal')"
          class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
        >
          <svg
            class="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            ></path>
          </svg>
          Join Challenge
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineEmits(["open-join-modal"]);
</script>
