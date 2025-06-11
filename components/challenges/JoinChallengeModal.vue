<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
  >
    <div class="bg-white rounded-lg shadow-lg max-w-md w-full">
      <div class="p-6">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold text-gray-800">Join a Challenge</h3>
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

        <form @submit.prevent="$emit('submit', challengeData)">
          <div class="mb-4">
            <label
              for="challengeName"
              class="block text-sm font-medium text-gray-700 mb-2"
            >
              Select a Challenge
            </label>
            <div v-if="initialChallengeName" class="mb-3">
              <div class="p-3 border border-gray-200 rounded-md bg-gray-50">
                <div class="font-medium text-gray-800">
                  {{ initialChallengeName }}
                </div>
                <div class="text-sm text-gray-600 mt-1">
                  {{ getChallengeDescription(initialChallengeName) }}
                </div>
              </div>
            </div>
            <select
              v-else
              id="challengeName"
              v-model="challengeData.name"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
              required
            >
              <option value="" disabled selected>Choose a challenge</option>
              <option
                v-for="challenge in challengeDetails"
                :key="challenge.name"
                :value="challenge.name"
              >
                {{ challenge.name }}
              </option>
            </select>
          </div>

          <div v-if="selectedChallenge" class="mb-4">
            <div class="p-3 border border-gray-200 rounded-md mb-2">
              <div class="text-sm text-gray-600">Type</div>
              <div class="font-medium text-gray-800 capitalize">
                {{ selectedChallenge.type }}
              </div>
            </div>
            <div class="p-3 border border-gray-200 rounded-md">
              <div class="text-sm text-gray-600">Duration</div>
              <div class="font-medium text-gray-800">
                {{ selectedChallenge.duration }}
              </div>
            </div>
          </div>

          <div class="mb-4">
            <label
              for="startDate"
              class="block text-sm font-medium text-gray-700 mb-2"
            >
              Start Date
            </label>
            <input
              type="date"
              id="startDate"
              v-model="challengeData.start_date"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
              required
            />
          </div>

          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Notifications
            </label>
            <div class="space-y-2">
              <label class="flex items-center">
                <input
                  type="checkbox"
                  v-model="challengeData.notifications.daily"
                  class="h-4 w-4 text-green-500 focus:ring-green-400 border-gray-300 rounded"
                />
                <span class="ml-2 text-gray-700">Daily reminders</span>
              </label>
              <label class="flex items-center">
                <input
                  type="checkbox"
                  v-model="challengeData.notifications.progress"
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
            >
              Set a Personal Goal (Optional)
            </label>
            <input
              type="text"
              id="goal"
              v-model="challengeData.goal"
              placeholder="Example: I want to save Rp200.000 by the end of this challenge"
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
interface ChallengeOption {
  name: string;
  description: string;
  type: "saving" | "spending" | "habit";
  duration: string;
}

const props = defineProps<{
  show: boolean;
  initialChallengeName?: string;
  challengeOptions: string[];
  selectedChallengeId?: string;
}>();

const emit = defineEmits(["close", "submit"]);

// Define challenge details including types
const challengeDetails: ChallengeOption[] = [
  {
    name: "30-Day No Eating Out",
    description: "Cook all your meals at home for 30 days",
    type: "spending",
    duration: "30 Days",
  },
  {
    name: "52-Week Savings",
    description: "Save an increasing amount each week for a year",
    type: "saving",
    duration: "52 Weeks",
  },
  {
    name: "30-Day Rp5.000 Challenge",
    description: "Save Rp5.000 every day for a month",
    type: "saving",
    duration: "30 Days",
  },
  {
    name: "No Spend Weekend",
    description: "Commit to spending Rp0 for an entire weekend",
    type: "spending",
    duration: "2 Days",
  },
  {
    name: "1% More Savings",
    description: "Increase your monthly savings rate by 1%",
    type: "saving",
    duration: "3 Months",
  },
];

const challengeData = ref({
  challenge_id: props.selectedChallengeId || "",
  name: props.initialChallengeName || "",
  start_date: new Date().toISOString().split("T")[0],
  notifications: {
    daily: true,
    progress: true,
  },
  goal: "",
  type: "",
});

// Get selected challenge details
const selectedChallenge = computed(() => {
  const name = props.initialChallengeName || challengeData.value.name;
  return challengeDetails.find((challenge) => challenge.name === name);
});

// Update type when challenge changes
watch(selectedChallenge, (newChallenge) => {
  if (newChallenge) {
    challengeData.value.type = newChallenge.type;
  }
});

// Function to get challenge description
function getChallengeDescription(name: string): string {
  const challenge = challengeDetails.find((c) => c.name === name);
  return challenge?.description || "";
}

watch(
  () => props.initialChallengeName,
  (newValue) => {
    if (newValue) {
      challengeData.value.name = newValue;
      const challenge = challengeDetails.find((c) => c.name === newValue);
      if (challenge) {
        challengeData.value.type = challenge.type;
      }
    }
  },
  { immediate: true }
);

watch(
  () => props.show,
  (newValue) => {
    if (!newValue) {
      // Reset form when modal closes
      challengeData.value = {
        challenge_id: props.selectedChallengeId || "",
        name: "",
        start_date: new Date().toISOString().split("T")[0],
        notifications: {
          daily: true,
          progress: true,
        },
        goal: "",
        type: "",
      };
    } else if (props.initialChallengeName) {
      challengeData.value.name = props.initialChallengeName;
      const challenge = challengeDetails.find(
        (c) => c.name === props.initialChallengeName
      );
      if (challenge) {
        challengeData.value.type = challenge.type;
      }
    }
  }
);
</script>
