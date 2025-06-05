<template>
  <div class="bg-white rounded-lg shadow-sm p-6">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-semibold text-gray-800">Monthly Budget</h2>
      <NuxtLink
        to="/dashboard/budget"
        class="text-sm text-green-500 hover:text-green-600 transition-colors"
      >
        View All
      </NuxtLink>
    </div>

    <div v-if="loading" class="flex justify-center py-6">
      <div class="inline-flex items-center">
        <svg
          class="animate-spin -ml-1 mr-3 h-5 w-5 text-green-500"
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
        <span>Loading budgets...</span>
      </div>
    </div>

    <div v-else-if="error" class="text-center py-4">
      <p class="text-red-500">{{ error }}</p>
    </div>

    <div v-else-if="!budgets.length" class="text-center py-4">
      <p class="text-gray-500">No budgets found for this month</p>
    </div>

    <div v-else class="space-y-4">
      <div v-for="budget in budgets" :key="budget.id">
        <div class="flex justify-between mb-1">
          <span class="text-gray-700">{{ budget.category }}</span>
          <span class="text-gray-700"
            >{{ formatCurrency(budget.spent) }} /
            {{ formatCurrency(budget.amount) }}</span
          >
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2">
          <div
            :class="getBudgetBarColorClass(budget.spent, budget.amount)"
            class="h-2 rounded-full"
            :style="{
              width: `${calculatePercentage(budget.spent, budget.amount)}%`,
            }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBudgetService } from "~/services";
import type { Budget } from "~/types/api";

const budgetService = useBudgetService();
const budgets = ref<Budget[]>([]);
const loading = ref(true);
const error = ref("");

// Fetch budgets for the current month on component mount
onMounted(async () => {
  try {
    loading.value = true;
    error.value = "";

    // Get current month in YYYY-MM format
    const now = new Date();
    const currentMonthYear = `${now.getFullYear()}-${String(
      now.getMonth() + 1
    ).padStart(2, "0")}`;

    const response = await budgetService.getBudgets({
      month_year: currentMonthYear,
    });

    // Process and take only the 4 most relevant budgets (highest percentage used)
    const allBudgets = response.data.budgets || [];

    // Sort by percentage spent and take top 4
    const topBudgets = [...allBudgets]
      .sort((a, b) => {
        const percentA = a.amount > 0 ? a.spent / a.amount : 0;
        const percentB = b.amount > 0 ? b.spent / b.amount : 0;
        return percentB - percentA;
      })
      .slice(0, 4);

    budgets.value = topBudgets;
  } catch (err) {
    error.value = err instanceof Error ? err.message : "Failed to load budgets";
    console.error("Error loading budget progress:", err);
  } finally {
    loading.value = false;
  }
});

// Helper function to format currency
function formatCurrency(amount: number): string {
  return `Rp${amount.toLocaleString("id-ID")}`;
}

// Calculate percentage of budget used
function calculatePercentage(spent: number, total: number): number {
  if (total <= 0) return 0;

  const percentage = (spent / total) * 100;
  return Math.min(percentage, 100); // Cap at 100%
}

// Determine the color of the budget bar based on percentage used
function getBudgetBarColorClass(spent: number, total: number): string {
  const percentage = calculatePercentage(spent, total);

  if (percentage >= 100) return "bg-red-500";
  if (percentage >= 75) return "bg-yellow-500";
  return "bg-green-500";
}
</script>
