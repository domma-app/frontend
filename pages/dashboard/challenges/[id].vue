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
      <h1 class="text-2xl font-bold text-gray-800">{{ challenge.title }}</h1>
    </div>

    <div class="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
      <div :class="`bg-${challenge.color}-50 p-6 border-b border-gray-100`">
        <div class="flex flex-wrap justify-between items-center mb-4">
          <div>
            <h2 class="text-xl font-semibold text-gray-800">
              {{ challenge.title }}
            </h2>
            <p class="text-gray-600 mt-1">{{ challenge.description }}</p>
          </div>
          <span
            v-if="challenge.status"
            :class="`bg-${challenge.color}-100 text-${challenge.color}-800 text-sm px-3 py-1 rounded-full`"
          >
            {{ challenge.status }}
          </span>
        </div>

        <div v-if="isActive" class="mb-4">
          <div class="flex justify-between text-sm text-gray-600 mb-1">
            <span>Progress</span>
            <span>{{ challenge.percentComplete }}% Complete</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2">
            <div
              :class="`bg-${challenge.color}-500 h-2 rounded-full`"
              :style="`width: ${challenge.percentComplete}%`"
            ></div>
          </div>
        </div>
      </div>

      <div class="p-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div class="border border-gray-200 rounded-lg p-4">
            <h3 class="text-lg font-medium text-gray-800 mb-2">Duration</h3>
            <p class="text-gray-600">{{ challenge.duration }}</p>
          </div>

          <div class="border border-gray-200 rounded-lg p-4">
            <h3 class="text-lg font-medium text-gray-800 mb-2">
              {{ isActive ? challenge.savingsLabel : "Target Savings" }}
            </h3>
            <p class="text-2xl font-semibold text-gray-800">
              Rp{{
                formatCurrency(
                  isActive ? challenge.savingsAmount : challenge.targetAmount
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

        <div class="mb-6">
          <h3 class="text-lg font-medium text-gray-800 mb-3">How It Works</h3>
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

        <div v-if="challenge.tips && challenge.tips.length > 0" class="mb-6">
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
                class="w-5 h-5 text-green-500 mr-2 mt-0.5"
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

        <div v-if="isActive" class="mb-6">
          <h3 class="text-lg font-medium text-gray-800 mb-3">Activity Log</h3>
          <div class="border border-gray-200 rounded-lg overflow-hidden">
            <div class="divide-y divide-gray-200">
              <div
                v-for="(log, index) in challenge.activityLog"
                :key="index"
                class="p-4"
              >
                <div class="flex items-center justify-between">
                  <div>
                    <p class="font-medium text-gray-800">{{ log.action }}</p>
                    <p class="text-sm text-gray-500">{{ log.date }}</p>
                  </div>
                  <span v-if="log.amount" class="text-green-600 font-medium">
                    +Rp{{ formatCurrency(log.amount) }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="!isActive" class="flex justify-center">
          <button
            @click="joinThisChallenge"
            class="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors text-lg font-medium"
          >
            Join This Challenge
          </button>
        </div>

        <div v-else class="flex justify-center">
          <button
            @click="showCheckInModal = true"
            :class="`px-6 py-3 bg-${challenge.color}-500 hover:bg-${challenge.color}-600 text-white rounded-lg transition-colors text-lg font-medium`"
          >
            {{ challenge.actionText }}
          </button>
        </div>
      </div>
    </div>

    <!-- Check-in Modal -->
    <CheckInModal
      :show="showCheckInModal"
      :challenge="challenge"
      @close="showCheckInModal = false"
      @submit="handleCheckIn"
    />

    <!-- Join Challenge Modal -->
    <JoinChallengeModal
      :show="showJoinModal"
      :initial-challenge-name="challenge.title"
      :challenge-options="[]"
      @close="showJoinModal = false"
      @submit="handleJoinChallenge"
    />
  </div>
</template>

<script setup lang="ts">
import CheckInModal from "~/components/challenges/CheckInModal.vue";
import JoinChallengeModal from "~/components/challenges/JoinChallengeModal.vue";

definePageMeta({
  layout: "dashboard",
});

const route = useRoute();
const router = useRouter();
const challengeId = route.params.id;

// UI state
const showCheckInModal = ref(false);
const showJoinModal = ref(false);

// Sample data - later, this would be fetched from an API
const challenge = ref({
  id: parseInt(challengeId as string),
  title: "30-Day No Eating Out",
  description: "Cook all your meals at home for 30 days and track your savings",
  status: "In Progress",
  progress: "Day 15/30",
  percentComplete: 50,
  color: "green",
  savingsLabel: "Current Savings",
  savingsAmount: 150000,
  targetAmount: 300000,
  actionText: "Check In Today",
  duration: "30 Days",
  difficulty: 3,
  type: "spending" as "spending" | "saving" | "habit",
  checkInDescription: "How much did you save today by not eating out?",
  steps: [
    "Choose your start date and join the challenge",
    "Cook all your meals at home instead of eating out",
    "Check in each day to track your progress",
    "Record how much you saved by not eating out",
    "Complete the 30 days to earn your badge",
  ],
  tips: [
    "Meal prep on weekends to make weekday cooking easier",
    "Find simple, quick recipes for busy days",
    "Allow yourself one cheat meal per week if needed",
    "Calculate what you would have spent eating out vs. cooking at home",
    "Share your progress with friends for accountability",
  ],
  activityLog: [
    { action: "Joined Challenge", date: "May 1, 2023", amount: null },
    { action: "Check-in: Day 1", date: "May 1, 2023", amount: 5000 },
    { action: "Check-in: Day 2", date: "May 2, 2023", amount: 3500 },
    { action: "Check-in: Day 3", date: "May 3, 2023", amount: 0 },
    { action: "Check-in: Day 4", date: "May 4, 2023", amount: 7000 },
  ],
});

// Determine if this is a challenge the user is already participating in
const isActive = computed(() => {
  // Later, this would check if the user is participating in this challenge
  return challenge.value.status === "In Progress";
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

  // Later, this would call an API to join the challenge
  challenge.value.status = "In Progress";

  // Close modal
  showJoinModal.value = false;

  // Show success notification
  alert(`Successfully joined ${challenge.value.title}!`);

  // Redirect to challenge dashboard
  router.push("/dashboard/challenges");
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
  const nextDay =
    parseInt(challenge.value.progress.split("/")[0].replace("Day ", "")) + 1;
  const totalDays = parseInt(challenge.value.progress.split("/")[1]);

  // Add to activity log
  challenge.value.activityLog.unshift({
    action: `Check-in: Day ${nextDay}`,
    date: formattedDate,
    amount: data.amount || 0,
  });

  // Update progress
  challenge.value.progress = `Day ${nextDay}/${totalDays}`;
  challenge.value.percentComplete = Math.min(
    Math.round((nextDay / totalDays) * 100),
    100
  );

  // Update savings if applicable
  if (data.amount) {
    challenge.value.savingsAmount += data.amount;
  }

  // Close modal
  showCheckInModal.value = false;

  // Show success notification
  alert("Check-in successful! Your progress has been updated.");
}
</script>
