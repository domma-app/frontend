<template>
  <div class="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
    <div class="p-6 border-b border-gray-100">
      <div class="flex justify-between items-center">
        <h2 class="text-xl font-semibold text-gray-800">
          Your Active Challenges
        </h2>
        <div
          v-if="challenges.length > displayLimit"
          class="flex items-center text-sm"
        >
          <span class="text-gray-500 mr-2">
            Showing {{ Math.min(displayLimit, challenges.length) }} of
            {{ challenges.length }}
          </span>
          <button
            v-if="!showAll"
            @click="showAll = true"
            class="text-blue-600 hover:text-blue-800"
          >
            Show All
          </button>
          <button
            v-else
            @click="showAll = false"
            class="text-blue-600 hover:text-blue-800"
          >
            Show Less
          </button>
        </div>
      </div>
    </div>

    <div class="p-6">
      <div
        v-if="challenges.length === 0"
        class="text-center text-gray-500 py-4"
      >
        You don't have any active challenges. Join a challenge to get started.
      </div>

      <div v-else>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ActiveChallengeItem
            v-for="challenge in displayedChallenges"
            :key="challenge.id"
            :challenge="challenge"
            @check-in="(id) => $emit('check-in', id)"
          />
        </div>

        <div
          v-if="challenges.length > displayLimit && !showAll"
          class="mt-4 text-center"
        >
          <button
            @click="showAll = true"
            class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors inline-flex items-center"
          >
            Show {{ challenges.length - displayLimit }} More Challenges
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
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ActiveChallengeItem from "./ActiveChallengeItem.vue";

interface Challenge {
  id: string;
  title: string;
  description: string;
  progress: string;
  percentComplete: number;
  color: string;
  savingsLabel: string;
  savingsAmount: number;
  actionText: string;
  type?: string;
  checkInDescription?: string;
}

const props = defineProps<{
  challenges: Challenge[];
}>();

const displayLimit = 4; // Show only 4 challenges by default
const showAll = ref(false);

// Display all challenges or just the limited number
const displayedChallenges = computed(() => {
  if (showAll.value) {
    return props.challenges;
  } else {
    return props.challenges.slice(0, displayLimit);
  }
});

defineEmits(["check-in"]);
</script>
