<template>
  <div>
    <div class="flex justify-between mb-2">
      <div class="flex items-center">
        <div
          class="p-2 rounded-lg mr-3"
          :class="{
            'bg-orange-50': iconColor === 'orange',
            'bg-blue-50': iconColor === 'blue',
            'bg-indigo-50': iconColor === 'indigo',
            'bg-purple-50': iconColor === 'purple',
            'bg-pink-50': iconColor === 'pink',
            'bg-yellow-50': iconColor === 'yellow',
            'bg-red-50': iconColor === 'red',
            'bg-green-50': iconColor === 'green',
            'bg-teal-50': iconColor === 'teal',
            'bg-gray-50': iconColor === 'gray',
          }"
        >
          <svg
            class="w-6 h-6"
            :class="{
              'text-orange-500': iconColor === 'orange',
              'text-blue-500': iconColor === 'blue',
              'text-indigo-500': iconColor === 'indigo',
              'text-purple-500': iconColor === 'purple',
              'text-pink-500': iconColor === 'pink',
              'text-yellow-500': iconColor === 'yellow',
              'text-red-500': iconColor === 'red',
              'text-green-500': iconColor === 'green',
              'text-teal-500': iconColor === 'teal',
              'text-gray-500': iconColor === 'gray',
            }"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <template v-if="category === 'education'">
              <path d="M12 14l9-5-9-5-9 5 9 5z"></path>
              <path
                d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
              ></path>
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
              ></path>
            </template>
            <path
              v-else
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              :d="iconPath"
            ></path>
          </svg>
        </div>
        <div>
          <h3 class="font-medium text-gray-800">{{ displayName }}</h3>
          <div class="flex text-sm">
            <span class="text-gray-500">Spent: </span>
            <span class="ml-1 font-medium text-red-500">{{
              formattedSpent
            }}</span>
            <span class="mx-1 text-gray-400">|</span>
            <span class="text-gray-500">Budget: </span>
            <span class="ml-1 font-medium">{{ formattedBudget }}</span>
          </div>
        </div>
      </div>
      <div class="flex items-center space-x-2">
        <button
          @click="$emit('edit', category)"
          class="text-gray-400 hover:text-gray-600"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            ></path>
          </svg>
        </button>
        <button
          @click="$emit('delete', category)"
          class="text-gray-400 hover:text-red-500"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            ></path>
          </svg>
        </button>
      </div>
    </div>
    <div class="mt-2">
      <div class="flex justify-between text-xs text-gray-500 mb-1">
        <span>{{ percentageText }}</span>
        <span>{{ remainingText }}</span>
      </div>
      <div class="w-full bg-gray-200 rounded-full h-2">
        <div
          class="h-2 rounded-full"
          :class="{
            'bg-red-500': spentPercentage > 100,
            'bg-yellow-500': spentPercentage <= 100 && spentPercentage > 75,
            'bg-green-500': spentPercentage <= 75,
          }"
          :style="{ width: `${cappedPercentage}%` }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  category: string;
  displayName: string;
  spent: number;
  budget: number;
  iconPath: string;
  iconColor?: string;
}>();

defineEmits(["edit", "delete"]);

const formattedSpent = computed(() => `Rp${props.spent.toLocaleString()}`);
const formattedBudget = computed(() => `Rp${props.budget.toLocaleString()}`);

const spentPercentage = computed(() =>
  Math.round((props.spent / props.budget) * 100)
);
const cappedPercentage = computed(() => Math.min(spentPercentage.value, 100));

const percentageText = computed(() => `${spentPercentage.value}% spent`);

const remaining = computed(() => props.budget - props.spent);
const remainingText = computed(() => {
  return remaining.value >= 0
    ? `Rp${remaining.value.toLocaleString()} left`
    : `Rp${Math.abs(remaining.value).toLocaleString()} over budget`;
});

const iconColor = computed(() => props.iconColor || "orange");
</script>
