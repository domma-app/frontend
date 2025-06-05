<template>
  <div class="border border-gray-200 rounded-lg overflow-hidden">
    <div :class="`bg-${challenge.color}-50 p-4`">
      <h3 class="text-lg font-medium text-gray-800">
        {{ challenge.title }}
      </h3>
      <p class="text-sm text-gray-600 mt-1">
        {{ challenge.description }}
      </p>
    </div>

    <div class="p-4">
      <ul class="text-sm text-gray-600 space-y-2 mb-4">
        <li
          v-for="(feature, index) in challenge.features"
          :key="index"
          class="flex items-start"
        >
          <svg
            class="w-4 h-4 text-green-500 mr-2 mt-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
          {{ feature }}
        </li>
      </ul>

      <div class="flex items-center justify-between">
        <p class="font-medium text-gray-800">{{ challenge.targetText }}</p>
        <div class="flex space-x-2">
          <NuxtLink
            :to="`/dashboard/challenges/${challenge.id}`"
            class="px-3 py-1 border border-gray-300 text-gray-600 hover:bg-gray-50 rounded transition-colors text-sm"
          >
            Details
          </NuxtLink>
          <button
            @click="$emit('join', challenge.title)"
            :class="`px-3 py-1 bg-${challenge.color}-500 hover:bg-${challenge.color}-600 text-white rounded transition-colors text-sm`"
          >
            Join
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface CatalogChallenge {
  id: number;
  title: string;
  description: string;
  features: string[];
  targetText: string;
  color: string;
  type?: "saving" | "spending" | "habit";
}

defineProps<{
  challenge: CatalogChallenge;
}>();

defineEmits(["join", "view-details"]);
</script>
