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
      <h1 class="text-2xl font-bold text-gray-800">
        {{ challenge ? challenge.title : "Challenge Details" }}
      </h1>
    </div>

    <!-- Loading State -->
    <div
      v-if="isLoading"
      class="text-center py-8 bg-white rounded-lg shadow-sm"
    >
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
      <p class="mt-2 text-sm text-gray-600">Loading challenge...</p>
    </div>

    <!-- Error State -->
    <div
      v-else-if="error"
      class="text-center py-8 bg-white rounded-lg shadow-sm"
    >
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
          @click="fetchChallengeData"
          class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
        >
          Try Again
        </button>
      </div>
    </div>

    <!-- Challenge Details -->
    <template v-else-if="challenge">
      <!-- Header Section - Common for both views -->
      <div class="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
        <div
          :class="`bg-${getSafeColor(
            challenge.color
          )}-50 p-6 border-b border-gray-100`"
        >
          <div class="flex flex-wrap justify-between items-center mb-4">
            <div>
              <h2 class="text-xl font-semibold text-gray-800">
                {{ challenge.title }}
              </h2>
              <p class="text-gray-600 mt-1">{{ challenge.description }}</p>
            </div>
            <span
              v-if="userChallengeStatus"
              :class="`bg-${getSafeColor(
                challenge.color
              )}-100 text-${getSafeColor(
                challenge.color
              )}-800 text-sm px-3 py-1 rounded-full`"
            >
              {{ userChallengeStatus }}
            </span>
          </div>

          <!-- Progress Bar - Only for active participants -->
          <div v-if="isActive" class="mb-4">
            <div class="flex justify-between text-sm text-gray-600 mb-1">
              <span>Progress</span>
              <span>{{ userProgress.percentComplete }}% Complete</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div
                :class="`bg-${getSafeColor(
                  challenge.color
                )}-500 h-2 rounded-full`"
                :style="`width: ${userProgress.percentComplete}%`"
              ></div>
            </div>
          </div>
        </div>

        <!-- Basic Info Section - Common for both views -->
        <div class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div class="border border-gray-200 rounded-lg p-4">
              <h3 class="text-lg font-medium text-gray-800 mb-2">Duration</h3>
              <p class="text-gray-600">{{ challenge.total_days }} Days</p>
            </div>

            <div class="border border-gray-200 rounded-lg p-4">
              <h3 class="text-lg font-medium text-gray-800 mb-2">
                {{ isActive ? "Current Savings" : "Target Savings" }}
              </h3>
              <p class="text-2xl font-semibold text-gray-800">
                Rp{{
                  formatCurrency(
                    isActive
                      ? userProgress.savingsAmount
                      : parseInt(challenge.target_amount)
                  )
                }}
              </p>
            </div>

            <div class="border border-gray-200 rounded-lg p-4">
              <h3 class="text-lg font-medium text-gray-800 mb-2">Difficulty</h3>
              <div class="flex items-center">
                <span
                  v-for="i in 5"
                  :key="i"
                  :class="`w-5 h-5 ${
                    i <= challenge.difficulty
                      ? 'text-yellow-400'
                      : 'text-gray-300'
                  }`"
                >
                  ★
                </span>
              </div>
            </div>
          </div>

          <!-- For Users Who Haven't Joined Yet -->
          <div v-if="!isActive">
            <!-- Feature Highlights for Non-Participants -->
            <div class="mb-6">
              <h3 class="text-lg font-medium text-gray-800 mb-3">
                Challenge Features
              </h3>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div
                  v-for="(feature, index) in challenge.features"
                  :key="index"
                  :class="`p-4 rounded-lg border border-gray-200 bg-${getSafeColor(
                    challenge.color
                  )}-50`"
                >
                  <div class="flex items-start">
                    <svg
                      class="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0"
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
                    <p class="text-gray-700">{{ feature }}</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="mb-6">
              <h3 class="text-lg font-medium text-gray-800 mb-3">
                How It Works
              </h3>
              <ul class="space-y-2">
                <li
                  v-for="(step, index) in challenge.steps"
                  :key="index"
                  class="flex items-start"
                >
                  <div
                    class="flex-shrink-0 w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center mr-3 mt-0.5"
                  >
                    <span class="text-gray-700 text-sm font-medium">
                      {{ index + 1 }}
                    </span>
                  </div>
                  <p class="text-gray-600">{{ step }}</p>
                </li>
              </ul>
            </div>

            <div
              v-if="challenge.tips && challenge.tips.length > 0"
              class="mb-6"
            >
              <h3 class="text-lg font-medium text-gray-800 mb-3">
                Tips for Success
              </h3>
              <ul class="space-y-2">
                <li
                  v-for="(tip, index) in challenge.tips"
                  :key="index"
                  class="flex items-start"
                >
                  <svg
                    class="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0"
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
                  <p class="text-gray-600">{{ tip }}</p>
                </li>
              </ul>
            </div>

            <!-- Join Challenge CTA Card -->
            <div
              class="bg-gray-50 rounded-lg border border-gray-200 p-6 mb-6 text-center"
            >
              <h3 class="text-xl font-medium text-gray-800 mb-2">
                Ready to Take the Challenge?
              </h3>
              <p class="text-gray-600 mb-4">
                Join this challenge to track your progress and earn rewards.
              </p>
              <button
                @click="joinThisChallenge"
                :class="`px-6 py-3 bg-${getSafeColor(
                  challenge.color
                )}-500 hover:bg-${getSafeColor(
                  challenge.color
                )}-600 text-white rounded-lg transition-colors text-lg font-medium shadow-sm`"
              >
                Join This Challenge
              </button>
            </div>
          </div>

          <!-- For Users Who Are Participating -->
          <div v-else>
            <!-- Progress Overview for Participants -->
            <div class="bg-gray-50 rounded-lg border border-gray-200 p-6 mb-6">
              <h3 class="text-lg font-medium text-gray-800 mb-3">
                Your Progress
              </h3>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div class="bg-white p-4 rounded-lg border border-gray-200">
                  <p class="text-sm text-gray-500">Current Day</p>
                  <p class="text-2xl font-semibold text-gray-800">
                    {{ userProgress.currentDay }} of {{ challenge.total_days }}
                  </p>
                </div>
                <div class="bg-white p-4 rounded-lg border border-gray-200">
                  <p class="text-sm text-gray-500">Savings So Far</p>
                  <p class="text-2xl font-semibold text-green-600">
                    Rp{{ formatCurrency(userProgress.savingsAmount) }}
                  </p>
                </div>
                <div class="bg-white p-4 rounded-lg border border-gray-200">
                  <p class="text-sm text-gray-500">Days Remaining</p>
                  <p class="text-2xl font-semibold text-gray-800">
                    {{ challenge.total_days - userProgress.currentDay }}
                  </p>
                </div>
              </div>
            </div>

            <div class="mb-6">
              <h3 class="text-lg font-medium text-gray-800 mb-3">
                Current Steps
              </h3>
              <ul class="space-y-2">
                <li
                  v-for="(step, index) in challenge.steps"
                  :key="index"
                  class="flex items-start"
                >
                  <div
                    :class="`flex-shrink-0 w-6 h-6 rounded-full ${
                      index < userProgress.currentDay
                        ? `bg-${getSafeColor(challenge.color)}-500 text-white`
                        : 'bg-gray-200 text-gray-700'
                    } flex items-center justify-center mr-3 mt-0.5`"
                  >
                    <span
                      v-if="index < userProgress.currentDay"
                      class="text-white text-sm"
                    >
                      ✓
                    </span>
                    <span v-else class="text-gray-700 text-sm font-medium">
                      {{ index + 1 }}
                    </span>
                  </div>
                  <p
                    :class="`${
                      index < userProgress.currentDay
                        ? 'text-gray-800'
                        : 'text-gray-600'
                    }`"
                  >
                    {{ step }}
                  </p>
                </li>
              </ul>
            </div>

            <!-- Activity Log for Participants -->
            <div
              v-if="
                userProgress.activityLog && userProgress.activityLog.length > 0
              "
              class="mb-6"
            >
              <h3 class="text-lg font-medium text-gray-800 mb-3">
                Activity Log
              </h3>
              <div class="border border-gray-200 rounded-lg overflow-hidden">
                <div class="divide-y divide-gray-200">
                  <div
                    v-for="(log, index) in userProgress.activityLog"
                    :key="index"
                    class="p-4"
                  >
                    <div class="flex items-center justify-between">
                      <div>
                        <p class="font-medium text-gray-800">
                          {{ log.action }}
                        </p>
                        <p class="text-sm text-gray-500">{{ log.date }}</p>
                      </div>
                      <span
                        v-if="log.amount"
                        class="text-green-600 font-medium"
                      >
                        +Rp{{ formatCurrency(log.amount) }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Check-in Button for Participants -->
            <div class="text-center">
              <button
                @click="showCheckInModal = true"
                :class="`px-6 py-3 bg-${getSafeColor(
                  challenge.color
                )}-500 hover:bg-${getSafeColor(
                  challenge.color
                )}-600 text-white rounded-lg transition-colors text-lg font-medium shadow-sm`"
              >
                Check In Day {{ userProgress.currentDay + 1 }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </template>

    <!-- Check-in Modal -->
    <CheckInModal
      v-if="challenge"
      :show="showCheckInModal"
      :challenge="{
        ...challenge,
        checkInDescription: `Track your progress for the ${challenge.title} challenge`,
      }"
      @close="showCheckInModal = false"
      @submit="handleCheckIn"
    />

    <!-- Join Challenge Modal -->
    <JoinChallengeModal
      v-if="challenge"
      :show="showJoinModal"
      :initial-challenge-name="challenge.title"
      :challenge-options="[]"
      @close="showJoinModal = false"
      @submit="handleJoinChallenge"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import CheckInModal from "~/components/challenges/CheckInModal.vue";
import JoinChallengeModal from "~/components/challenges/JoinChallengeModal.vue";
import { useChallengeService } from "~/services/api/challenge";

definePageMeta({
  layout: "dashboard",
});

const route = useRoute();
const router = useRouter();
const challengeId = route.params.id;
const challengeService = useChallengeService();

// UI state
const isLoading = ref(true);
const error = ref<string | null>(null);
const showCheckInModal = ref(false);
const showJoinModal = ref(false);

// User preference for participation visualization
// (Allow toggling between views for demo purposes)
// Initially set to false to show the non-participant view
const forceParticipationView = ref(false);

// Challenge data
const challenge = ref<any>(null);

// User's participation data (would come from API in a real app)
const userChallengeStatus = ref<string | null>(null);
const userProgress = ref({
  percentComplete: 0,
  currentDay: 0,
  savingsAmount: 0,
  activityLog: [] as Array<{
    action: string;
    date: string;
    amount: number | null;
  }>,
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

// Fetch challenge data from API
async function fetchChallengeData() {
  isLoading.value = true;
  error.value = null;

  try {
    const response = await challengeService.getChallenge(challengeId);

    if (response && response.data) {
      challenge.value = response.data;

      // In a real app, we would also fetch the user's participation data
      // For now, we'll simulate this with mock data
      simulateUserParticipationData();
    } else {
      error.value = "Failed to load challenge details";
    }
  } catch (err) {
    console.error("Error fetching challenge:", err);
    error.value = "Failed to load challenge details. Please try again later.";
  } finally {
    isLoading.value = false;
  }
}

// Simulate user participation data (would be API data in a real app)
function simulateUserParticipationData() {
  // For demo purposes, randomly determine if user is participating
  // or use the forced view if available
  const participating = forceParticipationView.value ? true : false;

  if (participating) {
    userChallengeStatus.value = "In Progress";
    const totalDays = challenge.value.total_days;
    const currentDay = Math.floor(Math.random() * totalDays) + 1;

    userProgress.value = {
      percentComplete: Math.round((currentDay / totalDays) * 100),
      currentDay: currentDay,
      savingsAmount: Math.floor(Math.random() * 100000) + 10000,
      activityLog: [
        {
          action: "Joined Challenge",
          date: new Date(
            Date.now() - currentDay * 24 * 60 * 60 * 1000
          ).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          }),
          amount: null,
        },
      ],
    };

    // Generate activity logs
    for (let i = 1; i <= currentDay; i++) {
      userProgress.value.activityLog.push({
        action: `Check-in: Day ${i}`,
        date: new Date(
          Date.now() - (currentDay - i) * 24 * 60 * 60 * 1000
        ).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }),
        amount: Math.floor(Math.random() * 10000),
      });
    }
  } else {
    userChallengeStatus.value = null;
  }
}

// Determine if this is a challenge the user is already participating in
const isActive = computed(() => {
  return userChallengeStatus.value === "In Progress";
});

function formatCurrency(amount: number): string {
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function joinThisChallenge() {
  // Open join modal
  showJoinModal.value = true;
}

function handleJoinChallenge(data: any) {
  console.log("Joining challenge with data:", data);

  // For demonstration purposes, toggle between views
  forceParticipationView.value = true;

  // Reset API data with user now participating
  fetchChallengeData();

  // Close modal
  showJoinModal.value = false;

  // Show success notification
  alert(`Successfully joined ${challenge.value.title}!`);
}

function handleCheckIn(data: any) {
  console.log("Check-in data:", data);

  // Update local state to reflect the check-in
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const nextDay = userProgress.value.currentDay + 1;
  const totalDays = challenge.value.total_days;

  // Add to activity log
  userProgress.value.activityLog.unshift({
    action: `Check-in: Day ${nextDay}`,
    date: formattedDate,
    amount: data.amount || 0,
  });

  // Update progress
  userProgress.value.currentDay = nextDay;
  userProgress.value.percentComplete = Math.min(
    Math.round((nextDay / totalDays) * 100),
    100
  );

  // Update savings if applicable
  if (data.amount) {
    userProgress.value.savingsAmount += data.amount;
  }

  // Close modal
  showCheckInModal.value = false;

  // Show success notification
  alert("Check-in successful! Your progress has been updated.");
}

// Fetch challenge data on component mount
onMounted(() => {
  fetchChallengeData();
});
</script>
