<template>
  <div>
    <div class="mb-6 flex items-center">
      <NuxtLink
        to="/dashboard/challenges"
        class="mr-4 text-gray-600 hover:text-gray-800 transition-colors"
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
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          ></path>
        </svg>
      </NuxtLink>
      <h1 class="text-2xl font-bold text-gray-800">Browse All Challenges</h1>
    </div>

    <div class="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
      <div class="p-6 border-b border-gray-100">
        <div class="flex flex-wrap gap-4">
          <!-- Search Box -->
          <div class="flex-1 min-w-[250px]">
            <label for="search" class="sr-only">Search challenges</label>
            <div class="relative">
              <div
                class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
              >
                <svg
                  class="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
              <input
                id="search"
                v-model="searchQuery"
                class="block w-full bg-white border border-gray-300 rounded-md py-2 pl-10 pr-3 text-sm placeholder-gray-500"
                placeholder="Search challenges..."
                type="search"
              />
            </div>
          </div>

          <!-- Filter Dropdown - Duration -->
          <div class="w-auto">
            <label for="duration" class="sr-only">Duration</label>
            <select
              id="duration"
              v-model="filters.duration"
              class="block w-full bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm"
            >
              <option value="">Duration (All)</option>
              <option value="short">Short (< 1 week)</option>
              <option value="medium">Medium (1-4 weeks)</option>
              <option value="long">Long (1+ months)</option>
            </select>
          </div>

          <!-- Filter Dropdown - Difficulty -->
          <div class="w-auto">
            <label for="difficulty" class="sr-only">Difficulty</label>
            <select
              id="difficulty"
              v-model="filters.difficulty"
              class="block w-full bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm"
            >
              <option value="">Difficulty (All)</option>
              <option value="1">Beginner (★)</option>
              <option value="2">Easy (★★)</option>
              <option value="3">Moderate (★★★)</option>
              <option value="4">Hard (★★★★)</option>
              <option value="5">Expert (★★★★★)</option>
            </select>
          </div>

          <!-- Filter Dropdown - Category -->
          <div class="w-auto">
            <label for="category" class="sr-only">Category</label>
            <select
              id="category"
              v-model="filters.category"
              class="block w-full bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm"
            >
              <option value="">Category (All)</option>
              <option value="saving">Saving</option>
              <option value="spending">Spending Control</option>
              <option value="investing">Investing</option>
              <option value="financial-literacy">Financial Literacy</option>
            </select>
          </div>

          <!-- Reset Filters Button -->
          <button
            @click="resetFilters"
            class="px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50"
          >
            Reset Filters
          </button>
        </div>
      </div>

      <div class="p-6">
        <!-- Challenge Cards -->
        <div
          v-if="filteredChallenges.length > 0"
          class="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div
            v-for="challenge in filteredChallenges"
            :key="challenge.id"
            class="border border-gray-200 rounded-lg overflow-hidden flex flex-col"
          >
            <div :class="`bg-${challenge.color}-50 p-4`">
              <div class="flex justify-between">
                <h3 class="text-lg font-medium text-gray-800">
                  {{ challenge.title }}
                </h3>
                <div class="flex">
                  <span
                    v-for="i in 5"
                    :key="i"
                    :class="`w-4 h-4 ${
                      i <= challenge.difficulty
                        ? 'text-yellow-400'
                        : 'text-gray-300'
                    }`"
                  >
                    ★
                  </span>
                </div>
              </div>
              <p class="text-sm text-gray-600 mt-1">
                {{ challenge.description }}
              </p>
              <div class="mt-2 flex items-center">
                <span
                  :class="`bg-${challenge.color}-100 text-${challenge.color}-800 text-xs px-2 py-1 rounded-full mr-2`"
                >
                  {{ challenge.duration }}
                </span>
                <span
                  class="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full"
                >
                  {{ challenge.category }}
                </span>
              </div>
            </div>

            <div class="p-4 flex-1">
              <ul class="text-sm text-gray-600 space-y-2 mb-4">
                <li
                  v-for="(feature, index) in challenge.features.slice(0, 3)"
                  :key="index"
                  class="flex items-start"
                >
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
                  {{ feature }}
                </li>
              </ul>

              <div class="flex items-center justify-between mt-auto">
                <p class="font-medium text-gray-800">
                  {{ challenge.targetText }}
                </p>
                <div class="flex space-x-2">
                  <NuxtLink
                    :to="`/dashboard/challenges/${challenge.id}`"
                    class="px-3 py-1 border border-gray-300 text-gray-600 hover:bg-gray-50 rounded transition-colors text-sm"
                  >
                    Details
                  </NuxtLink>
                  <button
                    @click="joinChallenge(challenge.title)"
                    :class="`px-3 py-1 bg-${challenge.color}-500 hover:bg-${challenge.color}-600 text-white rounded transition-colors text-sm`"
                  >
                    Join
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-8">
          <svg
            class="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <h3 class="mt-2 text-sm font-medium text-gray-900">
            No challenges found
          </h3>
          <p class="mt-1 text-sm text-gray-500">
            Try adjusting your search or filter criteria
          </p>
          <div class="mt-6">
            <button
              @click="resetFilters"
              class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
            >
              Reset Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

definePageMeta({
  layout: "dashboard",
});

// Sample data - later, this would be fetched from an API
const challenges = ref([
  {
    id: 1,
    title: "30-Day No Eating Out",
    description: "Cook all your meals at home for 30 days",
    duration: "30 Days",
    difficulty: 3,
    category: "Spending Control",
    features: [
      "Track daily spending on food",
      "Cook all meals at home",
      "Save receipts for grocery shopping",
      "Calculate your total savings",
    ],
    targetText: "Avg. Savings: Rp300.000",
    color: "green",
  },
  {
    id: 2,
    title: "52-Week Savings",
    description: "Save an increasing amount each week for a year",
    duration: "1 Year",
    difficulty: 2,
    category: "Saving",
    features: [
      "Week 1: Save Rp5.000",
      "Week 2: Save Rp10.000",
      "Increase by Rp5.000 each week",
      "Build a savings habit gradually",
    ],
    targetText: "Total: ~Rp7.000.000",
    color: "blue",
  },
  {
    id: 3,
    title: "30-Day Rp5.000 Challenge",
    description: "Save Rp5.000 every day for a month",
    duration: "30 Days",
    difficulty: 1,
    category: "Saving",
    features: [
      "Put away Rp5.000 each day",
      "Save Rp150.000 in just one month",
      "Perfect for beginners",
      "Build a daily saving habit",
    ],
    targetText: "Target: Rp150.000",
    color: "purple",
  },
  {
    id: 4,
    title: "No Spend Weekend",
    description: "Commit to spending Rp0 for an entire weekend",
    duration: "2 Days",
    difficulty: 3,
    category: "Spending Control",
    features: [
      "No discretionary spending for 48 hours",
      "Break the impulse spending habit",
      "Do this challenge once a month",
      "Plan activities that don't cost money",
    ],
    targetText: "Est. Savings: Rp50.000+",
    color: "amber",
  },
  {
    id: 5,
    title: "1% More Savings",
    description: "Increase your monthly savings rate by 1%",
    duration: "3 Months",
    difficulty: 2,
    category: "Saving",
    features: [
      "Start with just 1% of your income",
      "Add another 1% each month",
      "Build sustainable saving habits",
      "Track your savings growth",
    ],
    targetText: "3-month challenge",
    color: "emerald",
  },
  {
    id: 6,
    title: "Investing Basics",
    description: "Learn and implement investing fundamentals",
    duration: "30 Days",
    difficulty: 4,
    category: "Investing",
    features: [
      "Daily educational content",
      "Set up your first investment",
      "Learn risk management",
      "Track market movements",
    ],
    targetText: "Investment Knowledge",
    color: "teal",
  },
  {
    id: 7,
    title: "Cash-Only Month",
    description: "Use only cash for all purchases for a month",
    duration: "30 Days",
    difficulty: 4,
    category: "Spending Control",
    features: [
      "No credit/debit cards",
      "Plan cash withdrawals",
      "Envelope budgeting system",
      "Track every expense",
    ],
    targetText: "Improved Spending Awareness",
    color: "orange",
  },
  {
    id: 8,
    title: "Financial Literacy",
    description: "Complete daily financial education tasks",
    duration: "21 Days",
    difficulty: 2,
    category: "Financial-Literacy",
    features: [
      "Daily reading assignments",
      "Video lessons",
      "Practice financial calculations",
      "Create a personal financial plan",
    ],
    targetText: "Financial Knowledge",
    color: "indigo",
  },
  {
    id: 9,
    title: "Emergency Fund Builder",
    description: "Build your 3-month emergency fund",
    duration: "6 Months",
    difficulty: 3,
    category: "Saving",
    features: [
      "Calculate your monthly expenses",
      "Set up automatic transfers",
      "Cut unnecessary expenses",
      "Build a financial safety net",
    ],
    targetText: "3-Month Expense Buffer",
    color: "rose",
  },
]);

// Filter state
const searchQuery = ref("");
const filters = ref({
  duration: "",
  difficulty: "",
  category: "",
});

// Reset all filters
function resetFilters() {
  searchQuery.value = "";
  filters.value = {
    duration: "",
    difficulty: "",
    category: "",
  };
}

// Join challenge function
function joinChallenge(challengeName: string) {
  console.log("Joining challenge:", challengeName);
  // Later, this would show a join modal or redirect to join page
}

// Computed filtered challenges
const filteredChallenges = computed(() => {
  let result = challenges.value;

  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(
      (challenge) =>
        challenge.title.toLowerCase().includes(query) ||
        challenge.description.toLowerCase().includes(query) ||
        challenge.features.some((feature) =>
          feature.toLowerCase().includes(query)
        )
    );
  }

  // Apply duration filter
  if (filters.value.duration) {
    result = result.filter((challenge) => {
      if (filters.value.duration === "short") {
        return (
          challenge.duration.includes("Days") &&
          parseInt(challenge.duration) < 7
        );
      } else if (filters.value.duration === "medium") {
        return (
          (challenge.duration.includes("Days") &&
            parseInt(challenge.duration) >= 7) ||
          (challenge.duration.includes("Weeks") &&
            parseInt(challenge.duration) <= 4)
        );
      } else if (filters.value.duration === "long") {
        return (
          challenge.duration.includes("Months") ||
          challenge.duration.includes("Year") ||
          (challenge.duration.includes("Weeks") &&
            parseInt(challenge.duration) > 4)
        );
      }
      return true;
    });
  }

  // Apply difficulty filter
  if (filters.value.difficulty) {
    const difficultyLevel = parseInt(filters.value.difficulty);
    result = result.filter(
      (challenge) => challenge.difficulty === difficultyLevel
    );
  }

  // Apply category filter
  if (filters.value.category) {
    result = result.filter(
      (challenge) =>
        challenge.category.toLowerCase() ===
        filters.value.category.toLowerCase()
    );
  }

  return result;
});
</script>
