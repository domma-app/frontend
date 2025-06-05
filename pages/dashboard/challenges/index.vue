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
        <div v-if="!isLoadingActive && !activeError">
          <!-- <div class="flex justify-between items-center">
            <h2 class="text-xl font-semibold text-gray-800 mb-4">
              Your Active Challenges
            </h2>
          </div> -->

          <ActiveChallenges
            :challenges="activeChallenges"
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
            v-for="challenge in filteredChallenges"
            :key="challenge.id"
            :challenge="challenge"
            :isJoined="isJoined(challenge.challenge_id)"
            @join="joinChallenge"
          />
        </div>
      </div>
    </div>

    <JoinChallengeModal
      :show="showJoinChallengeModal"
      :initial-challenge-name="selectedChallenge"
      :challenge-options="challengeOptions"
      :selected-challenge-id="joinModalSelectedChallengeId"
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
import ActiveChallenges from "~/components/challenges/ActiveChallenges.vue";

definePageMeta({
  layout: "dashboard",
});

// Use the challenge service for API calls
const challengeService = useChallengeService();
const isLoading = ref(false);
const error = ref<string | null>(null);

// Initialize challenges with an empty array
const challenges = ref<UiChallenge[]>([]);

// Featured challenges
const filteredChallenges = computed(() => {
  return challenges.value;
});

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
          challenge_id: challenge.id,
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

// Loading and error states for join and check-in
const isLoadingJoin = ref(false);
const joinError = ref<string | null>(null);
const isLoadingCheckIn = ref(false);
const checkInError = ref<string | null>(null);

// Selected challenge ID for join modal
const joinModalSelectedChallengeId = ref<string>("");

// Check if a challenge is already joined
function isJoined(challengeId: string): boolean {
  return activeChallenges.value.some(
    (challenge) => challenge.challenge_id === challengeId
  );
}

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
          challenge_id: challenge.challenge_id,
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
          features: challenge.features || [],
          activityLog: challenge.activityLog || [],
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

// List of available challenges for the modal dropdown
const challengeOptions = [
  "30-Day No Eating Out",
  "52-Week Savings",
  "30-Day Rp5.000 Challenge",
  "No Spend Weekend",
  "1% More Savings",
];

// Event handlers
function joinChallenge(challengeName: string, challengeId: string): void {
  selectedChallenge.value = challengeName;
  joinModalSelectedChallengeId.value = challengeId;
  showJoinChallengeModal.value = true;
}

function submitJoinChallenge(formData: any): void {
  isLoadingJoin.value = true;
  joinError.value = null;

  const joinRequest = {
    challenge_id: formData.challenge_id || joinModalSelectedChallengeId.value,
    goal: formData.goal || "Complete the challenge successfully",
    start_date: formData.start_date,
  };

  // Call the API to join the challenge
  challengeService
    .joinChallenge(joinRequest)
    .then((response) => {
      if (response && response.data) {
        // Add the newly joined challenge to the active challenges list
        activeChallenges.value.push(response.data);

        // Show success notification
        alert(`Successfully joined ${response.data.title}!`);
      }
    })
    .catch((err) => {
      console.error("Error joining challenge:", err);
      joinError.value =
        err.message || "Failed to join challenge. Please try again.";
      alert(`Error: ${joinError.value}`);
    })
    .finally(() => {
      isLoadingJoin.value = false;
      showJoinChallengeModal.value = false;
    });
}

function handleChallengeCheckIn(id: string): void {
  const challenge = activeChallenges.value.find((c) => c.id === id);
  if (challenge) {
    selectedChallengeForCheckIn.value = challenge;
    showCheckInModal.value = true;
  }
}

function submitChallengeCheckIn(data: CheckInData): void {
  isLoadingCheckIn.value = true;
  checkInError.value = null;

  // Format the request according to API requirements
  const checkInRequest = {
    date: data.date,
    amount: data.amount,
    completed: data.completed,
    difficulty: data.difficulty,
    notes: data.notes,
    shareProgress: data.shareProgress,
  };

  // Call the API to check in
  challengeService
    .checkInChallenge(data.challengeId, checkInRequest)
    .then((response) => {
      if (response && response.data) {
        // Find and update the challenge in our local array
        const index = activeChallenges.value.findIndex(
          (c) => c.id === data.challengeId
        );
        if (index !== -1) {
          // Replace the challenge with the updated one from the API
          activeChallenges.value[index] = response.data;
        }

        // Show success notification
        alert("Check-in successful! Your progress has been updated.");
      }
    })
    .catch((err) => {
      console.error("Error checking in:", err);
      checkInError.value =
        err.message || "Failed to check in. Please try again.";
      alert(`Error: ${checkInError.value}`);
    })
    .finally(() => {
      isLoadingCheckIn.value = false;
      showCheckInModal.value = false;
    });
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
