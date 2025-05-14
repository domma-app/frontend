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

      <div class="flex justify-between items-center">
        <div>
          <p class="text-sm text-gray-600">{{ challenge.savingsLabel }}</p>
          <p class="text-lg font-semibold text-gray-800">
            Rp{{ formatCurrency(challenge.savingsAmount) }}
          </p>
        </div>
        <button
          :class="`px-3 py-1 bg-${challenge.color}-500 hover:bg-${challenge.color}-600 text-white rounded transition-colors text-sm`"
          @click="$emit('check-in', challenge.id)"
        >
          {{ challenge.actionText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
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
  challenge: Challenge;
}>();

defineEmits(["check-in"]);
</script>
