<template>
  <div class="bg-white rounded-lg shadow-sm overflow-hidden">
    <div class="p-6 border-b border-gray-100">
      <h2 class="text-xl font-semibold text-gray-800">Challenge Catalog</h2>
    </div>

    <div class="p-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <CatalogItem
          v-for="challenge in challenges"
          :key="challenge.id"
          :challenge="challenge"
          @join="(name) => $emit('join', name)"
        />
      </div>

      <!-- Browse more challenges button -->
      <div class="mt-6 text-center">
        <button
          @click="$emit('browse-more')"
          class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors inline-flex items-center"
        >
          Browse More Challenges
          <svg
            class="w-4 h-4 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CatalogItem from "./CatalogItem.vue";

interface CatalogChallenge {
  id: string | number;
  title: string;
  description: string;
  features: string[];
  targetText: string;
  color: string;
}

defineProps<{
  challenges: CatalogChallenge[];
}>();

defineEmits(["join", "browse-more"]);
</script>
