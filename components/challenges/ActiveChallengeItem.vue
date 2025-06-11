<template>
  <div class="border border-gray-200 rounded-lg overflow-hidden">
    <div :class="`bg-${challenge.color}-50 p-4 border-b border-gray-200`">
      <div class="flex justify-between items-center">
        <h3 class="text-lg font-medium text-gray-800">
          {{ challenge.title }}
        </h3>
        <span
          :class="`bg-${challenge.color}-100 text-${challenge.color}-800 text-xs px-3 py-1 rounded-full`"
          >{{ challenge.progress }}</span
        >
      </div>
      <p class="text-sm text-gray-600 mt-1">
        {{ challenge.description }}
      </p>
    </div>

    <div class="p-4">
      <div class="mb-4">
        <div class="flex justify-between text-sm text-gray-600 mb-1">
          <span>Progress</span>
          <span>{{ challenge.percentComplete }}% Complete</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2">
          <div
            :class="`bg-${challenge.color}-500 h-2 rounded-full`"
            :style="`width: ${challenge.percentComplete}%`"
          ></div>
        </div>
      </div>

      <!-- Features display -->
      <div
        v-if="challenge.features && challenge.features.length > 0"
        class="mb-4"
      >
        <ul class="text-xs sm:text-sm text-gray-600 space-y-1">
          <li
            v-for="(feature, index) in challenge.features.slice(0, 2)"
            :key="index"
            class="flex items-start"
          >
            <svg
              class="w-3 h-3 sm:w-4 sm:h-4 text-green-500 mr-1 sm:mr-2 mt-0.5"
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
      </div>

      <div class="flex justify-between items-center">
        <div>
          <p class="text-sm text-gray-600">{{ challenge.savingsLabel }}</p>
          <p class="text-lg font-semibold text-gray-800">
            Rp{{ formatCurrency(challenge.savingsAmount) }}
          </p>
        </div>
        <div class="flex space-x-2">
          <NuxtLink
            :to="`/dashboard/challenges/${
              challenge.challenge_id || challenge.id
            }`"
            class="px-3 py-1 border border-gray-300 text-gray-600 hover:bg-gray-50 rounded transition-colors text-sm"
          >
            Details
          </NuxtLink>
          <button
            :class="`px-3 py-1 bg-${challenge.color}-500 hover:bg-${challenge.color}-600 text-white rounded transition-colors text-sm`"
            @click="$emit('check-in', challenge.id)"
          >
            {{ challenge.actionText }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Challenge {
  id: string;
  challenge_id?: string;
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
  duration?: string;
  difficulty?: number;
  targetAmount?: number;
  status?: string;
  startDate?: string;
  endDate?: string;
  features?: string[];
}

defineProps<{
  challenge: Challenge;
}>();

defineEmits(["check-in"]);

// Function to format currency
function formatCurrency(amount: number): string {
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
</script>
