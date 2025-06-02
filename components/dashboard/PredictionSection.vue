<template>
  <section class="mb-6">
    <div class="bg-white rounded-lg shadow-sm p-6">
      <h2 class="text-xl font-semibold text-gray-800 mb-4">
        Next Month Prediction
      </h2>
      <div class="flex items-center space-x-2 mb-2">
        <svg
          class="w-5 h-5 text-blue-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <span class="text-sm text-gray-600">Based on spending patterns</span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="bg-gray-50 rounded-lg p-4">
          <p class="text-sm text-gray-500 mb-1">Predicted Expenses</p>
          <p class="text-2xl font-semibold text-gray-800">
            {{ formatCurrency(predictionData.predictedExpenses) }}
          </p>
          <div class="flex items-center mt-2 text-sm">
            <span
              class="text-red-500 flex items-center"
              v-if="predictionData.expenseChangePercent > 0"
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
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                ></path>
              </svg>
              +{{ predictionData.expenseChangePercent.toFixed(1) }}%
            </span>
            <span
              class="text-green-500 flex items-center"
              v-else-if="predictionData.expenseChangePercent < 0"
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
                  d="M13 17h8m0 0v-8m0 8l-8-8-4 4-6-6"
                ></path>
              </svg>
              {{ Math.abs(predictionData.expenseChangePercent).toFixed(1) }}%
            </span>
            <span class="text-gray-500 ml-2">from this month</span>
          </div>
        </div>

        <div class="bg-gray-50 rounded-lg p-4 flex flex-col justify-between">
          <div>
            <p class="text-sm text-gray-500 mb-1">Top Expenses Category</p>
            <p class="font-semibold text-gray-800">
              {{ predictionData.topExpenseCategory }}
            </p>
          </div>
          <div class="mt-2">
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div
                class="bg-purple-500 h-2 rounded-full"
                :style="{ width: `${predictionData.topExpensePercentage}%` }"
              ></div>
            </div>
            <p class="text-xs text-gray-500 mt-1">
              {{ predictionData.topExpensePercentage }}% of total expenses
            </p>
          </div>
        </div>

        <div class="bg-gray-50 rounded-lg p-4">
          <p class="text-sm text-gray-500 mb-1">Recommended Savings</p>
          <p class="text-2xl font-semibold text-gray-800">
            {{ formatCurrency(predictionData.recommendedSavings) }}
          </p>
          <p class="text-xs text-gray-500 mt-2">based on income and expenses</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface PredictionProps {
  predictionData: {
    predictedExpenses: number;
    expenseChangePercent: number;
    topExpenseCategory: string;
    topExpensePercentage: number;
    recommendedSavings: number;
  };
}

const props = withDefaults(defineProps<PredictionProps>(), {
  predictionData: () => ({
    predictedExpenses: 0,
    expenseChangePercent: 0,
    topExpenseCategory: "None",
    topExpensePercentage: 0,
    recommendedSavings: 0,
  }),
});

// Helper function to format currency
function formatCurrency(amount: number): string {
  return `Rp${amount.toLocaleString("id-ID")}`;
}
</script>
