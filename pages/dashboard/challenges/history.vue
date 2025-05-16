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
      <h1 class="text-2xl font-bold text-gray-800">Challenge History</h1>
    </div>

    <!-- Achievements and Badges -->
    <div class="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
      <div class="p-6 border-b border-gray-100">
        <h2 class="text-xl font-semibold text-gray-800">Your Achievements</h2>
      </div>

      <div class="p-6">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div
            v-for="(badge, index) in badges"
            :key="index"
            class="flex flex-col items-center"
          >
            <div
              :class="`h-24 w-24 rounded-full flex items-center justify-center ${
                badge.earned ? badge.color : 'bg-gray-200'
              }`"
            >
              <span
                :class="`text-4xl ${
                  badge.earned ? 'text-white' : 'text-gray-400'
                }`"
              >
                {{ badge.icon }}
              </span>
            </div>
            <div class="mt-2 text-center">
              <h3 class="font-medium text-gray-800">{{ badge.name }}</h3>
              <p class="text-sm text-gray-500">{{ badge.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Completed Challenges -->
    <div class="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
      <div class="p-6 border-b border-gray-100">
        <h2 class="text-xl font-semibold text-gray-800">
          Completed Challenges
        </h2>
      </div>

      <div class="p-6">
        <div
          v-if="completedChallenges.length === 0"
          class="text-center text-gray-500 py-4"
        >
          You haven't completed any challenges yet. Join a challenge and
          complete it to see it here.
        </div>

        <div v-else class="divide-y divide-gray-200">
          <div
            v-for="challenge in completedChallenges"
            :key="challenge.id"
            class="py-6 first:pt-0 last:pb-0"
          >
            <div class="flex flex-col md:flex-row md:items-start">
              <div
                :class="`h-16 w-16 rounded-lg ${challenge.color} flex items-center justify-center mr-6 mb-4 md:mb-0`"
              >
                <span class="text-white text-2xl">🏆</span>
              </div>
              <div class="flex-1">
                <div
                  class="flex flex-col md:flex-row md:items-center md:justify-between mb-2"
                >
                  <h3 class="text-lg font-medium text-gray-800">
                    {{ challenge.title }}
                  </h3>
                  <span class="text-sm text-gray-500">
                    Completed on {{ formatDate(challenge.completedDate) }}
                  </span>
                </div>
                <p class="text-gray-600 mb-4">{{ challenge.description }}</p>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div class="border border-gray-200 rounded-lg p-3">
                    <div class="text-sm text-gray-500">Duration</div>
                    <div class="font-medium text-gray-800">
                      {{ challenge.duration }}
                    </div>
                  </div>
                  <div class="border border-gray-200 rounded-lg p-3">
                    <div class="text-sm text-gray-500">Total Saved</div>
                    <div class="font-medium text-gray-800">
                      Rp{{ formatCurrency(challenge.totalSaved) }}
                    </div>
                  </div>
                  <div class="border border-gray-200 rounded-lg p-3">
                    <div class="text-sm text-gray-500">Consistency</div>
                    <div class="font-medium text-gray-800">
                      {{ challenge.consistency }}%
                    </div>
                  </div>
                </div>

                <div class="flex flex-wrap gap-2">
                  <NuxtLink
                    :to="`/dashboard/challenges/${challenge.id}/results`"
                    class="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm transition-colors"
                  >
                    View Details
                  </NuxtLink>
                  <button
                    @click="repeatChallenge(challenge.title)"
                    class="px-3 py-1 bg-green-100 hover:bg-green-200 text-green-700 rounded-full text-sm transition-colors"
                  >
                    Repeat Challenge
                  </button>
                  <button
                    @click="shareChallenge(challenge)"
                    class="px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-full text-sm transition-colors"
                  >
                    Share Results
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Statistics -->
    <div class="bg-white rounded-lg shadow-sm overflow-hidden">
      <div class="p-6 border-b border-gray-100">
        <h2 class="text-xl font-semibold text-gray-800">
          Challenge Statistics
        </h2>
      </div>

      <div class="p-6">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div class="border border-gray-200 rounded-lg p-4 text-center">
            <div class="text-3xl font-bold text-green-600">
              {{ statistics.totalCompleted }}
            </div>
            <div class="text-sm text-gray-600">Challenges Completed</div>
          </div>
          <div class="border border-gray-200 rounded-lg p-4 text-center">
            <div class="text-3xl font-bold text-blue-600">
              Rp{{ formatCurrency(statistics.totalSaved) }}
            </div>
            <div class="text-sm text-gray-600">Total Money Saved</div>
          </div>
          <div class="border border-gray-200 rounded-lg p-4 text-center">
            <div class="text-3xl font-bold text-purple-600">
              {{ statistics.totalDays }}
            </div>
            <div class="text-sm text-gray-600">Total Days on Challenges</div>
          </div>
          <div class="border border-gray-200 rounded-lg p-4 text-center">
            <div class="text-3xl font-bold text-yellow-600">
              {{ statistics.averageConsistency }}%
            </div>
            <div class="text-sm text-gray-600">Average Consistency</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "dashboard",
});

// Sample data - later, this would be fetched from an API
const completedChallenges = ref([
  {
    id: 101,
    title: "30-Day No Eating Out",
    description: "Cook all your meals at home for 30 days",
    completedDate: "2023-04-15T12:00:00Z",
    duration: "30 Days",
    totalSaved: 450000,
    consistency: 90,
    color: "bg-green-500",
  },
  {
    id: 102,
    title: "No Spend Weekend",
    description: "Commit to spending Rp0 for an entire weekend",
    completedDate: "2023-05-22T12:00:00Z",
    duration: "2 Days",
    totalSaved: 75000,
    consistency: 100,
    color: "bg-amber-500",
  },
  {
    id: 103,
    title: "30-Day Rp5.000 Challenge",
    description: "Save Rp5.000 every day for a month",
    completedDate: "2023-06-30T12:00:00Z",
    duration: "30 Days",
    totalSaved: 150000,
    consistency: 95,
    color: "bg-purple-500",
  },
]);

const badges = ref([
  {
    name: "First Timer",
    description: "Complete your first challenge",
    icon: "🌟",
    color: "bg-blue-500",
    earned: true,
  },
  {
    name: "Hat Trick",
    description: "Complete 3 challenges",
    icon: "🎩",
    color: "bg-purple-500",
    earned: true,
  },
  {
    name: "Money Saver",
    description: "Save over Rp500.000",
    icon: "💰",
    color: "bg-yellow-500",
    earned: true,
  },
  {
    name: "Perfect Streak",
    description: "100% consistency on a challenge",
    icon: "🔥",
    color: "bg-red-500",
    earned: true,
  },
  {
    name: "Challenge Master",
    description: "Complete 10 challenges",
    icon: "👑",
    color: "bg-indigo-500",
    earned: false,
  },
  {
    name: "Financial Guru",
    description: "Save over Rp2.000.000",
    icon: "🏦",
    color: "bg-green-500",
    earned: false,
  },
  {
    name: "Long Haul",
    description: "Complete a 6+ month challenge",
    icon: "🗓️",
    color: "bg-teal-500",
    earned: false,
  },
  {
    name: "Social Butterfly",
    description: "Share 5 challenge results",
    icon: "🦋",
    color: "bg-pink-500",
    earned: false,
  },
]);

const statistics = ref({
  totalCompleted: 3,
  totalSaved: 675000,
  totalDays: 62,
  averageConsistency: 95,
});

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatCurrency(amount: number): string {
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function repeatChallenge(challengeName: string) {
  console.log("Repeating challenge:", challengeName);
  // Later, this would navigate to the join challenge form with the challenge pre-selected
}

function shareChallenge(challenge: any) {
  console.log("Sharing challenge results:", challenge.title);
  // Later, this would open a share dialog
  alert(
    `Sharing your results for ${challenge.title}! You saved Rp${formatCurrency(
      challenge.totalSaved
    )}!`
  );
}
</script>
