<template>
  <div>
    <div class="mb-6 flex justify-between items-center">
      <div>
        <h1 class="text-2xl font-bold text-gray-800">
          Money Saving Challenges
        </h1>
        <p class="text-gray-600">
          Join challenges to build better financial habits
        </p>
      </div>
      <button
        @click="showJoinChallengeModal = true"
        class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
      >
        <svg
          class="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          ></path>
        </svg>
        Join Challenge
      </button>
    </div>

    <!-- Active Challenges -->
    <div class="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
      <div class="p-6 border-b border-gray-100">
        <h2 class="text-xl font-semibold text-gray-800">
          Your Active Challenges
        </h2>
      </div>

      <div class="p-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- 30-Day No Eating Out Challenge -->
          <div class="border border-gray-200 rounded-lg overflow-hidden">
            <div class="bg-green-50 p-4 border-b border-gray-200">
              <div class="flex justify-between items-center">
                <h3 class="text-lg font-medium text-gray-800">
                  30-Day No Eating Out
                </h3>
                <span
                  class="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full"
                  >Day 15/30</span
                >
              </div>
              <p class="text-sm text-gray-600 mt-1">
                Cook all your meals at home for 30 days
              </p>
            </div>

            <div class="p-4">
              <div class="mb-4">
                <div class="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Progress</span>
                  <span>50% Complete</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div
                    class="bg-green-500 h-2 rounded-full"
                    style="width: 50%"
                  ></div>
                </div>
              </div>

              <div class="flex justify-between items-center">
                <div>
                  <p class="text-sm text-gray-600">Potential Savings</p>
                  <p class="text-lg font-semibold text-gray-800">$150.00</p>
                </div>
                <button
                  class="px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded transition-colors text-sm"
                >
                  Check In
                </button>
              </div>
            </div>
          </div>

          <!-- 52-Week Savings Challenge -->
          <div class="border border-gray-200 rounded-lg overflow-hidden">
            <div class="bg-blue-50 p-4 border-b border-gray-200">
              <div class="flex justify-between items-center">
                <h3 class="text-lg font-medium text-gray-800">
                  52-Week Savings
                </h3>
                <span
                  class="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full"
                  >Week 20/52</span
                >
              </div>
              <p class="text-sm text-gray-600 mt-1">
                Save an increasing amount each week for a year
              </p>
            </div>

            <div class="p-4">
              <div class="mb-4">
                <div class="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Progress</span>
                  <span>38% Complete</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div
                    class="bg-blue-500 h-2 rounded-full"
                    style="width: 38%"
                  ></div>
                </div>
              </div>

              <div class="flex justify-between items-center">
                <div>
                  <p class="text-sm text-gray-600">Current Saved</p>
                  <p class="text-lg font-semibold text-gray-800">$210.00</p>
                </div>
                <button
                  class="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors text-sm"
                >
                  Deposit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Challenge Catalog -->
    <div class="bg-white rounded-lg shadow-sm overflow-hidden">
      <div class="p-6 border-b border-gray-100">
        <h2 class="text-xl font-semibold text-gray-800">Challenge Catalog</h2>
      </div>

      <div class="p-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- 30-Day $5 Challenge -->
          <div class="border border-gray-200 rounded-lg overflow-hidden">
            <div class="bg-purple-50 p-4">
              <h3 class="text-lg font-medium text-gray-800">
                30-Day $5 Challenge
              </h3>
              <p class="text-sm text-gray-600 mt-1">
                Save $5 every day for a month
              </p>
            </div>

            <div class="p-4">
              <ul class="text-sm text-gray-600 space-y-2 mb-4">
                <li class="flex items-start">
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
                  Put away $5 each day
                </li>
                <li class="flex items-start">
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
                  Save $150 in just one month
                </li>
                <li class="flex items-start">
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
                  Perfect for beginners
                </li>
              </ul>

              <div class="flex items-center justify-between">
                <p class="font-medium text-gray-800">Target: $150</p>
                <button
                  @click="joinChallenge('30-Day $5 Challenge')"
                  class="px-3 py-1 bg-purple-500 hover:bg-purple-600 text-white rounded transition-colors text-sm"
                >
                  Join
                </button>
              </div>
            </div>
          </div>

          <!-- No Spend Weekend -->
          <div class="border border-gray-200 rounded-lg overflow-hidden">
            <div class="bg-amber-50 p-4">
              <h3 class="text-lg font-medium text-gray-800">
                No Spend Weekend
              </h3>
              <p class="text-sm text-gray-600 mt-1">
                Commit to spending $0 for an entire weekend
              </p>
            </div>

            <div class="p-4">
              <ul class="text-sm text-gray-600 space-y-2 mb-4">
                <li class="flex items-start">
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
                  No discretionary spending for 48 hours
                </li>
                <li class="flex items-start">
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
                  Break the impulse spending habit
                </li>
                <li class="flex items-start">
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
                  Do this challenge once a month
                </li>
              </ul>

              <div class="flex items-center justify-between">
                <p class="font-medium text-gray-800">Est. Savings: $50+</p>
                <button
                  @click="joinChallenge('No Spend Weekend')"
                  class="px-3 py-1 bg-amber-500 hover:bg-amber-600 text-white rounded transition-colors text-sm"
                >
                  Join
                </button>
              </div>
            </div>
          </div>

          <!-- 1% More Savings -->
          <div class="border border-gray-200 rounded-lg overflow-hidden">
            <div class="bg-emerald-50 p-4">
              <h3 class="text-lg font-medium text-gray-800">1% More Savings</h3>
              <p class="text-sm text-gray-600 mt-1">
                Increase your monthly savings rate by 1%
              </p>
            </div>

            <div class="p-4">
              <ul class="text-sm text-gray-600 space-y-2 mb-4">
                <li class="flex items-start">
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
                  Start with just 1% of your income
                </li>
                <li class="flex items-start">
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
                  Add another 1% each month
                </li>
                <li class="flex items-start">
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
                  Build sustainable saving habits
                </li>
              </ul>

              <div class="flex items-center justify-between">
                <p class="font-medium text-gray-800">3-month challenge</p>
                <button
                  @click="joinChallenge('1% More Savings')"
                  class="px-3 py-1 bg-emerald-500 hover:bg-emerald-600 text-white rounded transition-colors text-sm"
                >
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Browse more challenges button -->
        <div class="mt-6 text-center">
          <button
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

    <!-- Join Challenge Modal -->
    <div
      v-if="showJoinChallengeModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <div class="bg-white rounded-lg shadow-lg max-w-md w-full">
        <div class="p-6">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">
            Join a Challenge
          </h3>

          <form @submit.prevent="submitJoinChallenge">
            <div class="mb-4">
              <label
                for="challengeName"
                class="block text-sm font-medium text-gray-700 mb-2"
                >Select a Challenge</label
              >
              <select
                id="challengeName"
                v-model="newChallenge.name"
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
                required
              >
                <option value="" disabled selected>Choose a challenge</option>
                <option value="30-Day No Eating Out">
                  30-Day No Eating Out
                </option>
                <option value="52-Week Savings">52-Week Savings</option>
                <option value="30-Day $5 Challenge">30-Day $5 Challenge</option>
                <option value="No Spend Weekend">No Spend Weekend</option>
                <option value="1% More Savings">1% More Savings</option>
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
                v-model="newChallenge.startDate"
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
                    v-model="newChallenge.notifications.daily"
                    class="h-4 w-4 text-green-500 focus:ring-green-400 border-gray-300 rounded"
                  />
                  <span class="ml-2 text-gray-700">Daily reminders</span>
                </label>
                <label class="flex items-center">
                  <input
                    type="checkbox"
                    v-model="newChallenge.notifications.progress"
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
                v-model="newChallenge.goal"
                placeholder="Example: I want to save $200 by the end of this challenge"
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
              />
            </div>

            <div class="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                @click="showJoinChallengeModal = false"
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
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "dashboard",
});

const showJoinChallengeModal = ref(false);
const selectedChallenge = ref("");

const newChallenge = ref({
  name: "",
  startDate: new Date().toISOString().split("T")[0],
  notifications: {
    daily: true,
    progress: true,
  },
  goal: "",
});

const joinChallenge = (challengeName: string) => {
  newChallenge.value.name = challengeName;
  showJoinChallengeModal.value = true;
};

const submitJoinChallenge = () => {
  // In a real app, you would save the challenge to the database
  console.log("Joining challenge:", newChallenge.value);

  // Show success notification
  alert(`Successfully joined ${newChallenge.value.name}!`);

  // Close modal and reset form
  showJoinChallengeModal.value = false;
  newChallenge.value = {
    name: "",
    startDate: new Date().toISOString().split("T")[0],
    notifications: {
      daily: true,
      progress: true,
    },
    goal: "",
  };
};
</script>
