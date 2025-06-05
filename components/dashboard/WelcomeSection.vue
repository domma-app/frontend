<template>
  <section class="mb-6">
    <div class="bg-white rounded-lg shadow-sm p-6">
      <div class="flex items-center justify-between mb-4">
        <div>
          <h1 class="text-2xl font-bold text-gray-800">
            Welcome, {{ userName }}!
          </h1>
          <p class="text-gray-600">
            View your financial summary and recent activities here.
          </p>
        </div>
        <div class="bg-green-50 rounded-full p-3">
          <svg
            class="w-8 h-8 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="bg-gray-50 rounded-lg p-4">
          <p class="text-sm text-gray-500 mb-1">Current Balance</p>
          <p class="text-2xl font-semibold text-gray-800">
            {{ formatCurrency(summaryData.balance) }}
          </p>
          <div class="flex items-center mt-2 text-sm">
            <span
              class="text-green-500 flex items-center"
              v-if="summaryData.balanceChange > 0"
            >
              <svg
                class="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 10l7-7m0 0l7 7m-7-7v18"
                ></path>
              </svg>
              {{ summaryData.balanceChange }}%
            </span>
            <span
              class="text-red-500 flex items-center"
              v-else-if="summaryData.balanceChange < 0"
            >
              <svg
                class="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                ></path>
              </svg>
              {{ Math.abs(summaryData.balanceChange) }}%
            </span>
            <span class="text-gray-500 flex items-center" v-else>
              <svg
                class="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 12h14"
                ></path>
              </svg>
              No change
            </span>
            <span class="text-gray-500 ml-2">from last month</span>
          </div>
        </div>
        <div class="bg-gray-50 rounded-lg p-4">
          <p class="text-sm text-gray-500 mb-1">Monthly Summary</p>
          <div class="flex justify-between text-sm mb-2">
            <span>Income:</span>
            <span class="text-green-500"
              >+{{ formatCurrency(summaryData.income) }}</span
            >
          </div>
          <div class="flex justify-between text-sm mb-2">
            <span>Expenses:</span>
            <span class="text-red-500"
              >-{{ formatCurrency(summaryData.expenses) }}</span
            >
          </div>
          <div class="flex justify-between text-sm font-medium">
            <span>Remaining:</span>
            <span>{{ formatCurrency(summaryData.remaining) }}</span>
          </div>
        </div>

        <div class="bg-gray-50 rounded-lg p-4">
          <p class="text-sm text-gray-500 mb-1">Saving Goals</p>
          <p class="text-2xl font-semibold text-gray-800">
            {{ formatCurrency(summaryData.goalTarget) }}
          </p>
          <div class="mt-2">
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div
                class="bg-green-500 h-2 rounded-full"
                :style="{ width: `${summaryData.goalProgress}%` }"
              ></div>
            </div>
            <p class="text-xs text-gray-500 mt-1">
              {{ summaryData.goalProgress }}% of
              {{ formatCurrency(summaryData.goalTarget) }} target
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useAuth } from "~/composables/useAuth";

interface WelcomeSectionProps {
  summaryData: {
    balance: number;
    balanceChange: number;
    income: number;
    expenses: number;
    remaining: number;
    goalTarget: number;
    goalProgress: number;
  };
}

const props = withDefaults(defineProps<WelcomeSectionProps>(), {
  summaryData: () => ({
    balance: 0,
    balanceChange: 0,
    income: 0,
    expenses: 0,
    remaining: 0,
    goalTarget: 0,
    goalProgress: 0,
  }),
});

const { user } = useAuth();

// Get user's name for display
const userName = computed(() => {
  return user.value?.full_name || "User";
});

// Helper function to format currency
function formatCurrency(amount: number): string {
  return `Rp${amount.toLocaleString("id-ID")}`;
}
</script>
