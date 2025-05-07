<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
  >
    <div class="bg-white rounded-lg shadow-lg max-w-md w-full">
      <div class="p-6">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">
          Join a Challenge
        </h3>

        <form @submit.prevent="$emit('submit', challenge)">
          <div class="mb-4">
            <label
              for="challengeName"
              class="block text-sm font-medium text-gray-700 mb-2"
              >Select a Challenge</label
            >
            <select
              id="challengeName"
              v-model="challenge.name"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
              required
            >
              <option value="" disabled selected>Choose a challenge</option>
              <option
                v-for="option in challengeOptions"
                :key="option"
                :value="option"
              >
                {{ option }}
              </option>
            </select>
          </div>

          <div class="mb-4">
            <label
              for="startDate"
              class="block text-sm font-medium text-gray-700 mb-2"
              >Start Date</label
            >
            <input
              type="date"
              id="startDate"
              v-model="challenge.startDate"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
              required
            />
          </div>

          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Notifications</label
            >
            <div class="space-y-2">
              <label class="flex items-center">
                <input
                  type="checkbox"
                  v-model="challenge.notifications.daily"
                  class="h-4 w-4 text-green-500 focus:ring-green-400 border-gray-300 rounded"
                />
                <span class="ml-2 text-gray-700">Daily reminders</span>
              </label>
              <label class="flex items-center">
                <input
                  type="checkbox"
                  v-model="challenge.notifications.progress"
                  class="h-4 w-4 text-green-500 focus:ring-green-400 border-gray-300 rounded"
                />
                <span class="ml-2 text-gray-700">Progress updates</span>
              </label>
            </div>
          </div>

          <div class="mb-4">
            <label
              for="goal"
              class="block text-sm font-medium text-gray-700 mb-2"
              >Set a Personal Goal (Optional)</label
            >
            <input
              type="text"
              id="goal"
              v-model="challenge.goal"
              placeholder="Example: I want to save $200 by the end of this challenge"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
            />
          </div>

          <div class="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              @click="$emit('close')"
              class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md transition-colors"
            >
              Join Challenge
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps<{
  show: boolean;
  initialChallengeName?: string;
  challengeOptions: string[];
}>();

const emit = defineEmits(["close", "submit"]);

const challenge = ref({
  name: props.initialChallengeName || "",
  startDate: new Date().toISOString().split("T")[0],
  notifications: {
    daily: true,
    progress: true,
  },
  goal: "",
});

watch(
  () => props.initialChallengeName,
  (newValue) => {
    if (newValue) {
      challenge.value.name = newValue;
    }
  }
);

watch(
  () => props.show,
  (newValue) => {
    if (!newValue) {
      // Reset form when modal closes
      challenge.value = {
        name: "",
        startDate: new Date().toISOString().split("T")[0],
        notifications: {
          daily: true,
          progress: true,
        },
        goal: "",
      };
    }
  }
);
</script>
