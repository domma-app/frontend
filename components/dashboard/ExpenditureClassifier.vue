<template>
  <section class="">
    <div class="bg-white rounded-lg shadow-sm p-6 h-full">
      <h2 class="text-xl font-semibold text-gray-800 mb-4">
        Expenditure Classification
      </h2>
      <div class="flex items-center space-x-2 mb-4">
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
        <span class="text-sm text-gray-600"
          >Analysis of your total expenses</span
        >
      </div>

      <!-- Classification Result -->
      <div
        v-if="classification"
        class="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 mb-4 border-l-4"
        :class="getBorderClass"
      >
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-2xl font-bold text-gray-800 flex items-center">
              {{ classification.emoji }} {{ classification.category }}
            </h3>
            <p class="text-lg text-gray-700 mt-2">
              {{ formatCurrency(classification.amount) }}
            </p>
            <p class="text-md text-gray-600 mt-3">
              {{ classification.message }}
            </p>
          </div>
          <div
            class="w-24 h-24 rounded-full flex items-center justify-center text-4xl"
            :class="getColorClass"
          >
            {{ classification.emoji }}
          </div>
        </div>
      </div>

      <!-- Input for custom amount -->
      <div class="mt-4">
        <label
          for="amount"
          class="block text-sm font-medium text-gray-700 mb-2"
        >
          Check different expense amount:
        </label>
        <div class="flex space-x-2">
          <div class="relative flex-grow">
            <div
              class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
            >
              <span class="text-gray-500 sm:text-sm">Rp</span>
            </div>
            <input
              type="number"
              id="amount"
              v-model="inputAmount"
              step="1000"
              class="block w-full pl-10 pr-4 sm:text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter amount"
            />
          </div>
          <button
            @click="checkAmount"
            class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Check
          </button>
        </div>
      </div>

      <!-- Expenditure Tips Section -->
      <div class="mt-6 bg-gray-50 rounded-lg p-4">
        <h3 class="text-lg font-medium text-gray-800 mb-2 flex items-center">
          <svg
            class="w-5 h-5 text-blue-500 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            ></path>
          </svg>
          Smart Spending Tips
        </h3>

        <div class="mt-2">
          <div class="flex items-start space-x-3 mb-3">
            <div class="flex-shrink-0 bg-green-100 rounded-full p-1">
              <svg
                class="w-5 h-5 text-green-600"
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
            </div>
            <p class="text-sm text-gray-600">
              Use the 50/30/20 rule: 50% needs, 30% wants, 20% savings
            </p>
          </div>

          <div class="flex items-start space-x-3 mb-3">
            <div class="flex-shrink-0 bg-blue-100 rounded-full p-1">
              <svg
                class="w-5 h-5 text-blue-600"
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
            </div>
            <p class="text-sm text-gray-600">
              Track all expenses to identify spending patterns
            </p>
          </div>

          <div class="flex items-start space-x-3">
            <div class="flex-shrink-0 bg-purple-100 rounded-full p-1">
              <svg
                class="w-5 h-5 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                ></path>
              </svg>
            </div>
            <p class="text-sm text-gray-600">
              Plan major purchases in advance to avoid impulse spending
            </p>
          </div>
        </div>
      </div>

      <!-- Expenditure Category Distribution -->
      <!-- <div class="mt-4 bg-gray-50 p-4 rounded-lg">
        <h4 class="text-sm font-medium text-gray-700 mb-2">Typical Expense Allocation</h4>
        <div class="space-y-2">
          <div>
            <div class="flex justify-between text-xs text-gray-600 mb-1">
              <span>Housing</span>
              <span>30-35%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div class="bg-blue-500 h-2 rounded-full" style="width: 33%"></div>
            </div>
          </div>
          <div>
            <div class="flex justify-between text-xs text-gray-600 mb-1">
              <span>Food</span>
              <span>10-15%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div class="bg-green-500 h-2 rounded-full" style="width: 12%"></div>
            </div>
          </div>
          <div>
            <div class="flex justify-between text-xs text-gray-600 mb-1">
              <span>Transportation</span>
              <span>10-15%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div class="bg-yellow-500 h-2 rounded-full" style="width: 15%"></div>
            </div>
          </div>
        </div>
      </div> -->
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import type { ExpenditureClassification } from "~/types/api";
import { useMlService } from "~/services";

const props = defineProps({
  initialAmount: {
    type: Number,
    default: 0,
  },
});

// State
const classification = ref<ExpenditureClassification | null>(null);
const inputAmount = ref<number | null>(null);
const isLoading = ref(false);

// Get the ML service
const mlService = useMlService();

// Helper to format currency
const formatCurrency = (amount: number): string => {
  return `Rp${amount.toLocaleString("id-ID")}`;
};

// Dynamic classes based on classification
const getBorderClass = computed(() => {
  if (!classification.value) return "border-gray-300";

  const category = classification.value.category;
  if (category === "Hemat") return "border-green-500";
  if (category === "Normal") return "border-blue-500";
  return "border-red-500";
});

const getColorClass = computed(() => {
  if (!classification.value) return "bg-gray-100 text-gray-400";

  const category = classification.value.category;
  if (category === "Hemat") return "bg-green-100 text-green-600";
  if (category === "Normal") return "bg-blue-100 text-blue-600";
  return "bg-red-100 text-red-600";
});

// Fetch classification for the initial amount
const classifyExpenditure = async (amount: number) => {
  if (amount <= 0) return;

  isLoading.value = true;
  try {
    const result = await mlService.classifyExpenditure(amount);
    classification.value = result;
  } catch (error) {
    console.error("Error classifying expenditure:", error);
  } finally {
    isLoading.value = false;
  }
};

// Check custom amount
const checkAmount = async () => {
  if (inputAmount.value && inputAmount.value > 0) {
    await classifyExpenditure(inputAmount.value);
  }
};

// Watch for changes in initialAmount
watch(
  () => props.initialAmount,
  (newValue) => {
    if (newValue > 0) {
      classifyExpenditure(newValue);
    }
  },
  { immediate: true }
);
</script>
