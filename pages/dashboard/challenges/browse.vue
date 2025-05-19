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
              <option value="habit">Habit</option>
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
        <!-- Loading State -->
        <div v-if="isLoading" class="text-center py-8">
          <svg
            class="animate-spin h-8 w-8 mx-auto text-green-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <p class="mt-2 text-sm text-gray-600">Loading challenges...</p>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="text-center py-8">
          <svg
            class="mx-auto h-12 w-12 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <h3 class="mt-2 text-sm font-medium text-gray-900">{{ error }}</h3>
          <div class="mt-6">
            <button
              @click="fetchChallenges"
              class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
            >
              Try Again
            </button>
          </div>
        </div>

        <!-- Challenge Cards -->
        <div
          v-else-if="filteredChallenges.length > 0"
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          <ChallengeCard
            v-for="challenge in filteredChallenges"
            :key="challenge.id"
            :challenge="challenge"
            @join="joinChallenge"
          />
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
import { useChallengeService } from "~/services/api/challenge";
import type { UiChallenge } from "~/types/api";
import ChallengeCard from "~/components/challenges/ChallengeCard.vue";

definePageMeta({
  layout: "dashboard",
});

// Define type for valid Tailwind colors
type TailwindColor =
  | "slate"
  | "gray"
  | "zinc"
  | "neutral"
  | "stone"
  | "red"
  | "orange"
  | "amber"
  | "yellow"
  | "lime"
  | "green"
  | "emerald"
  | "teal"
  | "cyan"
  | "sky"
  | "blue"
  | "indigo"
  | "violet"
  | "purple"
  | "fuchsia"
  | "pink"
  | "rose";

// Function to get safe Tailwind color
function getSafeColor(color: string): TailwindColor {
  const validColors: Record<string, TailwindColor> = {
    slate: "slate",
    gray: "gray",
    zinc: "zinc",
    neutral: "neutral",
    stone: "stone",
    red: "red",
    orange: "orange",
    amber: "amber",
    yellow: "yellow",
    lime: "lime",
    green: "green",
    emerald: "emerald",
    teal: "teal",
    cyan: "cyan",
    sky: "sky",
    blue: "blue",
    indigo: "indigo",
    violet: "violet",
    purple: "purple",
    fuchsia: "fuchsia",
    pink: "pink",
    rose: "rose",
  };

  return validColors[color] || "blue";
}

// Use the challenge service for API calls
const challengeService = useChallengeService();
const isLoading = ref(false);
const error = ref<string | null>(null);

// Initialize challenges with an empty array
const challenges = ref<UiChallenge[]>([]);

// Fetch challenges from the API
async function fetchChallenges() {
  isLoading.value = true;
  error.value = null;

  try {
    const response = await challengeService.getChallenges();

    if (response && response.data) {
      // Map API response to the format expected by the UI
      challenges.value = response.data.map((challenge) => {
        return {
          id: challenge.id,
          title: challenge.title,
          description: challenge.description,
          duration: `${challenge.total_days} Days`,
          difficulty: challenge.difficulty,
          category:
            challenge.type === "saving"
              ? "Saving"
              : challenge.type === "spending"
              ? "Spending Control"
              : challenge.type === "habit"
              ? "Habit"
              : "Default",
          features: challenge.features,
          targetText: challenge.targetText,
          color: challenge.color,
        };
      });
    } else {
      error.value = "Failed to load challenges";
    }
  } catch (err) {
    console.error("Error fetching challenges:", err);
    error.value = "Failed to load challenges. Please try again later.";
  } finally {
    isLoading.value = false;
  }
}

// Fetch challenges when component mounts
onMounted(() => {
  fetchChallenges();
});

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

<style>
/* 
  Safelist for Tailwind to include all color variations:
  bg-slate-50 bg-slate-100 bg-slate-500 bg-slate-600 text-slate-800
  bg-gray-50 bg-gray-100 bg-gray-500 bg-gray-600 text-gray-800
  bg-zinc-50 bg-zinc-100 bg-zinc-500 bg-zinc-600 text-zinc-800
  bg-neutral-50 bg-neutral-100 bg-neutral-500 bg-neutral-600 text-neutral-800
  bg-stone-50 bg-stone-100 bg-stone-500 bg-stone-600 text-stone-800
  bg-red-50 bg-red-100 bg-red-500 bg-red-600 text-red-800
  bg-orange-50 bg-orange-100 bg-orange-500 bg-orange-600 text-orange-800
  bg-amber-50 bg-amber-100 bg-amber-500 bg-amber-600 text-amber-800
  bg-yellow-50 bg-yellow-100 bg-yellow-500 bg-yellow-600 text-yellow-800
  bg-lime-50 bg-lime-100 bg-lime-500 bg-lime-600 text-lime-800
  bg-green-50 bg-green-100 bg-green-500 bg-green-600 text-green-800
  bg-emerald-50 bg-emerald-100 bg-emerald-500 bg-emerald-600 text-emerald-800
  bg-teal-50 bg-teal-100 bg-teal-500 bg-teal-600 text-teal-800
  bg-cyan-50 bg-cyan-100 bg-cyan-500 bg-cyan-600 text-cyan-800
  bg-sky-50 bg-sky-100 bg-sky-500 bg-sky-600 text-sky-800
  bg-blue-50 bg-blue-100 bg-blue-500 bg-blue-600 text-blue-800
  bg-indigo-50 bg-indigo-100 bg-indigo-500 bg-indigo-600 text-indigo-800
  bg-violet-50 bg-violet-100 bg-violet-500 bg-violet-600 text-violet-800
  bg-purple-50 bg-purple-100 bg-purple-500 bg-purple-600 text-purple-800
  bg-fuchsia-50 bg-fuchsia-100 bg-fuchsia-500 bg-fuchsia-600 text-fuchsia-800
  bg-pink-50 bg-pink-100 bg-pink-500 bg-pink-600 text-pink-800
  bg-rose-50 bg-rose-100 bg-rose-500 bg-rose-600 text-rose-800
*/
</style>
