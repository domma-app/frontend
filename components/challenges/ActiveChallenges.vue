<template>
  <div class="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
    <div class="p-6 border-b border-gray-100">
      <h2 class="text-xl font-semibold text-gray-800">
        Your Active Challenges
      </h2>
    </div>

    <div class="p-6">
      <div
        v-if="challenges.length === 0"
        class="text-center text-gray-500 py-4"
      >
        You don't have any active challenges. Join a challenge to get started.
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ActiveChallengeItem
          v-for="challenge in challenges"
          :key="challenge.id"
          :challenge="challenge"
          @check-in="(id) => $emit('check-in', id)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ActiveChallengeItem from "./ActiveChallengeItem.vue";

interface Challenge {
  id: string | number;
  title: string;
  description: string;
  progress: string;
  percentComplete: number;
  color: string;
  savingsLabel: string;
  savingsAmount: number;
  actionText: string;
}

defineProps<{
  challenges: Challenge[];
}>();

defineEmits(["check-in"]);
</script>
