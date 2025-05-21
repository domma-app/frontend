<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
  >
    <div class="bg-white rounded-lg shadow-lg max-w-md w-full">
      <div class="p-6">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold text-gray-800">
            Check In: {{ challenge.title }}
          </h3>
          <button
            @click="$emit('close')"
            class="text-gray-500 hover:text-gray-700"
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
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>

        <div class="mb-4">
          <p class="text-gray-600">
            {{
              challenge.checkInDescription ||
              "Track your progress for today's challenge."
            }}
          </p>
        </div>

        <form @submit.prevent="handleSubmit">
          <!-- Progress Input Based on Challenge Type -->
          <div v-if="challenge.type === 'saving'" class="mb-4">
            <label
              for="savingsAmount"
              class="block text-sm font-medium text-gray-700 mb-2"
            >
              How much did you save today?
            </label>
            <div class="relative">
              <div
                class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
              >
                <span class="text-gray-500 sm:text-sm">Rp</span>
              </div>
              <input
                type="number"
                id="savingsAmount"
                min="1000"
                step="1000"
                placeholder="1000"
                v-model="checkInData.amount"
                class="pl-10 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
              />
            </div>
          </div>

          <div v-else-if="challenge.type === 'spending'" class="mb-4">
            <label
              for="spendingAmount"
              class="block text-sm font-medium text-gray-700 mb-2"
            >
              How much did you NOT spend by doing this challenge?
            </label>
            <div class="relative">
              <div
                class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
              >
                <span class="text-gray-500 sm:text-sm">Rp</span>
              </div>
              <input
                type="number"
                id="spendingAmount"
                min="1000"
                step="1000"
                placeholder="1000"
                v-model="checkInData.amount"
                class="block w-full pl-10 py-2 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
              />
            </div>
          </div>

          <div v-else-if="challenge.type === 'habit'" class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Did you complete today's task?
            </label>
            <div class="flex space-x-4">
              <label class="inline-flex items-center">
                <input
                  type="radio"
                  v-model="checkInData.completed"
                  :value="true"
                  class="form-radio h-4 w-4 text-green-600"
                />
                <span class="ml-2">Yes</span>
              </label>
              <label class="inline-flex items-center">
                <input
                  type="radio"
                  v-model="checkInData.completed"
                  :value="false"
                  class="form-radio h-4 w-4 text-red-600"
                />
                <span class="ml-2">No</span>
              </label>
            </div>
          </div>

          <!-- Common fields for all check-ins -->
          <div class="mb-4">
            <label
              for="notes"
              class="block text-sm font-medium text-gray-700 mb-2"
            >
              Notes (Optional)
            </label>
            <textarea
              id="notes"
              v-model="checkInData.notes"
              rows="3"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
              placeholder="Add any thoughts or reflections about your progress today..."
            ></textarea>
          </div>

          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              How difficult was it today?
            </label>
            <div class="flex space-x-1">
              <button
                v-for="i in 5"
                :key="i"
                type="button"
                @click="checkInData.difficulty = i"
                class="outline-none focus:outline-none"
              >
                <span
                  :class="`text-xl ${
                    i <= checkInData.difficulty
                      ? 'text-yellow-400'
                      : 'text-gray-300'
                  }`"
                >
                  ★
                </span>
              </button>
            </div>
          </div>

          <div class="flex items-center mb-4">
            <input
              id="shareProgress"
              type="checkbox"
              v-model="checkInData.shareProgress"
              class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
            />
            <label for="shareProgress" class="ml-2 block text-sm text-gray-700">
              Share my progress with friends
            </label>
          </div>

          <div class="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              @click="$emit('close')"
              class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              :class="`px-4 py-2 bg-${
                challenge.color || 'green'
              }-500 hover:bg-${
                challenge.color || 'green'
              }-600 text-white rounded-md`"
            >
              Complete Check-In
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  show: boolean;
  challenge: {
    id: string;
    title: string;
    type?: string;
    color?: string;
    checkInDescription?: string;
  };
}>();

const emit = defineEmits(["close", "submit"]);

const checkInData = ref({
  amount: 0,
  completed: true,
  difficulty: 3,
  notes: "",
  shareProgress: false,
});

function handleSubmit() {
  emit("submit", {
    challengeId: props.challenge.id,
    date: new Date().toISOString().split("T")[0],
    amount: checkInData.value.amount || undefined,
    completed: checkInData.value.completed,
    difficulty: checkInData.value.difficulty,
    notes: checkInData.value.notes || undefined,
    shareProgress: checkInData.value.shareProgress,
  });
}

watch(
  () => props.show,
  (newValue) => {
    if (newValue) {
      // Reset form when modal opens
      checkInData.value = {
        amount: 0,
        completed: true,
        difficulty: 3,
        notes: "",
        shareProgress: false,
      };
    }
  }
);
</script>
