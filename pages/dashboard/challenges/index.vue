<template>
  <div>
    <ChallengeHeader @open-join-modal="showJoinChallengeModal = true" />

    <!-- Active challenges section with loading and error states -->
    <div class="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
      <div class="p-6 border-b border-gray-100">
        <div class="flex justify-between items-center">
          <h2 class="text-xl font-semibold text-gray-800">
            Your Active Challenges
          </h2>
        </div>
      </div>

      <div class="p-6">
        <!-- Loading State -->
        <div v-if="isLoadingActive" class="text-center py-8">
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
          <p class="mt-2 text-sm text-gray-600">Loading active challenges...</p>
        </div>

        <!-- Error State -->
        <div v-else-if="activeError" class="text-center py-8">
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
          <h3 class="mt-2 text-sm font-medium text-gray-900">
            {{ activeError }}
          </h3>
          <div class="mt-6">
            <button
              @click="fetchActiveChallenges"
              class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
            >
              Try Again
            </button>
          </div>
        </div>

        <!-- Active Challenges -->
        <div
          v-else-if="activeChallenges.length === 0"
          class="text-center text-gray-500 py-4"
        >
          You don't have any active challenges. Join a challenge to get started.
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ActiveChallengeItem
            v-for="challenge in activeChallenges"
            :key="challenge.id"
            :challenge="challenge"
            @check-in="handleChallengeCheckIn"
          />
        </div>
      </div>
    </div>

    <!-- Featured Challenges -->
    <div class="bg-white rounded-lg shadow-sm overflow-hidden mt-6">
      <div class="p-6 border-b border-gray-100">
        <div class="flex justify-between items-center">
          <h2 class="text-lg font-medium text-gray-800">Featured Challenges</h2>
          <NuxtLink
            to="/dashboard/challenges/browse"
            class="text-sm text-green-600 hover:text-green-700 font-medium"
          >
            View All Challenges
          </NuxtLink>
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
          v-else
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          <ChallengeCard
            v-for="challenge in challenges"
            :key="challenge.id"
            :challenge="challenge"
            @join="joinChallenge"
          />
        </div>
      </div>
    </div>

    <JoinChallengeModal
      :show="showJoinChallengeModal"
      :initial-challenge-name="selectedChallenge"
      :challenge-options="challengeOptions"
      @close="showJoinChallengeModal = false"
      @submit="submitJoinChallenge"
    />

    <CheckInModal
      :show="showCheckInModal"
      :challenge="selectedChallengeForCheckIn"
      @close="showCheckInModal = false"
      @submit="submitChallengeCheckIn"
    />
  </div>
</template>

<script setup lang="ts">
import ActiveChallengeItem from "~/components/challenges/ActiveChallengeItem.vue";
import ChallengeCard from "~/components/challenges/ChallengeCard.vue";
import ChallengeHeader from "~/components/challenges/ChallengeHeader.vue";
import JoinChallengeModal from "~/components/challenges/JoinChallengeModal.vue";
import CheckInModal from "~/components/challenges/CheckInModal.vue";
import { useChallengeService } from "~/services/api/challenge";
import type { UiChallenge, ActiveChallenge } from "~/types/api";

definePageMeta({
  layout: "dashboard",
});

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
    const response = await challengeService.getChallenges(1, 3); // Get first page with 3 items
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

onMounted(() => {
  fetchChallenges();
  fetchActiveChallenges();
});

interface CatalogChallenge {
  id: number;
  title: string;
  description: string;
  features: string[];
  targetText: string;
  color: string;
  type?: "saving" | "spending" | "habit";
  difficulty?: number;
}

interface JoinChallengeForm {
  name: string;
  startDate: string;
  notifications: {
    daily: boolean;
    progress: boolean;
  };
  goal: string;
  type: string;
}

interface CheckInData {
  challengeId: string;
  date: string;
  amount?: number;
  completed?: boolean;
  difficulty: number;
  notes?: string;
  shareProgress: boolean;
}

const router = useRouter();
const showJoinChallengeModal = ref(false);
const showCheckInModal = ref(false);
const selectedChallenge = ref("");
const selectedChallengeForCheckIn = ref({
  id: "0",
  title: "",
  description: "",
  progress: "",
  percentComplete: 0,
  color: "green",
  savingsLabel: "",
  savingsAmount: 0,
  actionText: "",
  type: "saving",
  checkInDescription: "",
  duration: "",
  difficulty: 1,
  targetAmount: 0,
  status: "active",
  startDate: "",
  endDate: "",
});

// Active challenges from API
const activeChallenges = ref<ActiveChallenge[]>([]);
const isLoadingActive = ref(false);
const activeError = ref<string | null>(null);

// Fetch active challenges from the API
async function fetchActiveChallenges() {
  isLoadingActive.value = true;
  activeError.value = null;

  try {
    const response = await challengeService.getActiveChallenges();

    if (response && response.data) {
      // Map API response to the format expected by the UI
      activeChallenges.value = response.data.map((challenge) => {
        return {
          id: challenge.id,
          title: challenge.title,
          description: challenge.description,
          progress: challenge.progress,
          percentComplete: challenge.percentComplete,
          color: challenge.color,
          savingsLabel: challenge.savingsLabel,
          savingsAmount: challenge.savingsAmount,
          actionText: challenge.actionText,
          type: challenge.type,
          checkInDescription: challenge.checkInDescription,
          duration: challenge.duration,
          difficulty: challenge.difficulty,
          targetAmount: challenge.targetAmount,
          status: challenge.status,
          startDate: challenge.startDate,
          endDate: challenge.endDate,
        };
      });
    } else {
      activeError.value = "Failed to load active challenges";
    }
  } catch (err) {
    console.error("Error fetching active challenges:", err);
    activeError.value =
      "Failed to load active challenges. Please try again later.";
  } finally {
    isLoadingActive.value = false;
  }
}

// Mock data for catalog challenges
const catalogChallenges = ref<CatalogChallenge[]>([
  {
    id: 1,
    title: "30-Day Rp5.000 Challenge",
    description: "Save Rp5.000 every day for a month",
    features: [
      "Put away Rp5.000 each day",
      "Save Rp150.000 in just one month",
      "Perfect for beginners",
    ],
    targetText: "Target: Rp150.000",
    color: "purple",
    type: "saving",
  },
  {
    id: 2,
    title: "No Spend Weekend",
    description: "Commit to spending Rp0 for an entire weekend",
    features: [
      "No discretionary spending for 48 hours",
      "Break the impulse spending habit",
      "Do this challenge once a month",
    ],
    targetText: "Est. Savings: Rp50.000+",
    color: "amber",
    type: "spending",
  },
  {
    id: 3,
    title: "1% More Savings",
    description: "Increase your monthly savings rate by 1%",
    features: [
      "Start with just 1% of your income",
      "Add another 1% each month",
      "Build sustainable saving habits",
    ],
    targetText: "3-month challenge",
    color: "emerald",
    type: "saving",
  },
]);

// List of available challenges for the modal dropdown
const challengeOptions = [
  "30-Day No Eating Out",
  "52-Week Savings",
  "30-Day Rp5.000 Challenge",
  "No Spend Weekend",
  "1% More Savings",
];

// Event handlers
function joinChallenge(challengeName: string): void {
  selectedChallenge.value = challengeName;
  showJoinChallengeModal.value = true;
}

function submitJoinChallenge(newChallenge: JoinChallengeForm): void {
  // Later, this would call an API to join the challenge
  console.log("Joining challenge:", newChallenge);

  // Show success notification
  alert(`Successfully joined ${newChallenge.name}!`);

  // Close modal
  showJoinChallengeModal.value = false;

  // Later, we would fetch the updated list of active challenges
  // For now, we'll simulate adding this challenge to the active list
  const newChallengeId = Math.floor(Math.random() * 10000).toString();

  // Get challenge details from catalog if available
  const catalogChallenge = catalogChallenges.value.find(
    (c) => c.title === newChallenge.name
  );

  const newActiveChallenge = {
    id: newChallengeId,
    title: newChallenge.name,
    description: catalogChallenge?.description || "",
    progress: "Day 1/30", // This would be dynamic based on the challenge type
    percentComplete: 3,
    color: catalogChallenge?.color || "green",
    savingsLabel: "Current Saved",
    savingsAmount: 0,
    actionText: "Check In",
    type: catalogChallenge?.type || "saving", // Use the predefined type from catalog
    checkInDescription: "Track your progress for today's challenge.",
    duration: "30 Days",
    difficulty: catalogChallenge?.difficulty || 1,
    targetAmount: 0,
    status: "active",
    startDate: new Date().toISOString().split("T")[0],
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
  };

  activeChallenges.value.push(newActiveChallenge);
}

function handleChallengeCheckIn(id: string): void {
  const challenge = activeChallenges.value.find((c) => c.id === id);
  if (challenge) {
    selectedChallengeForCheckIn.value = challenge;
    showCheckInModal.value = true;
  }
}

function submitChallengeCheckIn(data: CheckInData): void {
  // Later, this would call an API to update the challenge progress
  console.log("Check-in data:", data);

  // Update local state to reflect the check-in
  const challenge = activeChallenges.value.find(
    (c) => c.id === data.challengeId
  );
  if (challenge) {
    // Update progress - this would be more sophisticated in a real app
    let currentProgress: number;
    let totalProgress: number;

    // Handle different progress formats (Day X/Y or Week X/Y)
    if (challenge.progress.includes("Day")) {
      currentProgress = parseInt(
        challenge.progress.split("/")[0].replace("Day ", "")
      );
      totalProgress = parseInt(challenge.progress.split("/")[1]);
    } else {
      currentProgress = parseInt(
        challenge.progress.split("/")[0].replace("Week ", "")
      );
      totalProgress = parseInt(challenge.progress.split("/")[1]);
    }

    const newProgress = Math.min(currentProgress + 1, totalProgress);

    // Format the progress string based on the original format
    if (challenge.progress.includes("Day")) {
      challenge.progress = `Day ${newProgress}/${totalProgress}`;
    } else {
      challenge.progress = `Week ${newProgress}/${totalProgress}`;
    }

    // Update percentage
    challenge.percentComplete = Math.round((newProgress / totalProgress) * 100);

    // Update savings amount if applicable
    if (data.amount && data.amount > 0) {
      challenge.savingsAmount += data.amount;
    }
  }

  // Close modal
  showCheckInModal.value = false;

  // Show success notification
  alert("Check-in successful! Your progress has been updated.");
}

function handleBrowseMore(): void {
  // Navigate to the browse challenges page
  router.push("/dashboard/challenges/browse");
}

// Utility function to format currency
function formatCurrency(amount: number): string {
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
</script>
