<template>
  <section class="">
    <div class="bg-white rounded-lg shadow-sm p-6 h-full">
      <h2 class="text-xl font-semibold text-gray-800 mb-4">
        Expenditure Forecast
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
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          ></path>
        </svg>
        <span class="text-sm text-gray-600"
          >{{ isWeekly ? "Weekly" : "Monthly" }} forecast based on historical
          data</span
        >
      </div>

      <!-- Forecast Type Selector -->
      <div class="mb-6">
        <div class="flex items-center space-x-4">
          <button
            @click="isWeekly = true"
            class="px-4 py-2 text-sm rounded-full"
            :class="
              isWeekly
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            "
          >
            Weekly
          </button>
          <button
            @click="isWeekly = false"
            class="px-4 py-2 text-sm rounded-full"
            :class="
              !isWeekly
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            "
          >
            Monthly
          </button>
        </div>
      </div>

      <!-- Weekly Forecast -->
      <div v-if="isWeekly" class="space-y-6">
        <!-- Input Data -->
        <div class="bg-gray-50 rounded-lg p-4">
          <h3 class="text-md font-medium text-gray-700 mb-3">Past Weeks</h3>
          <div class="grid grid-cols-2 md:grid-cols-2 gap-4">
            <div
              v-for="(key, index) in Object.keys(weeklyInputData)"
              :key="index"
              class="bg-white p-3 rounded-lg shadow-sm"
            >
              <p class="text-xs text-gray-500">{{ key }}</p>
              <div class="relative">
                <div
                  class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                >
                  <span class="text-gray-500 sm:text-sm">Rp</span>
                </div>
                <input
                  type="number"
                  v-model="weeklyInputData[key]"
                  step="1000"
                  class="mt-1 pl-10 block w-full text-md font-semibold border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md"
                />
              </div>
            </div>
          </div>
          <div class="mt-3 text-right">
            <button
              @click="getWeeklyForecast()"
              :disabled="isLoading"
              class="px-4 py-1 text-sm bg-blue-100 text-blue-600 hover:bg-blue-200 rounded-md"
            >
              <span v-if="isLoading">Processing...</span>
              <span v-else>Update Forecast</span>
            </button>
          </div>
        </div>

        <!-- Future Forecast -->
        <div v-if="weeklyForecast">
          <h3 class="text-md font-medium text-gray-700 mb-3">
            Forecasted Weeks
          </h3>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div
              v-for="(value, key) in weeklyForecast.future_forecast"
              :key="key"
              class="bg-gradient-to-b from-blue-50 to-blue-100 p-3 rounded-lg shadow-sm border border-blue-200"
            >
              <p class="text-xs text-blue-600 font-medium">{{ key }}</p>
              <p class="text-lg font-semibold text-gray-800">
                {{ formatCurrency(value) }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Monthly Forecast -->
      <div v-if="!isWeekly" class="space-y-6">
        <!-- Input Data -->
        <div class="bg-gray-50 rounded-lg p-4">
          <h3 class="text-md font-medium text-gray-700 mb-3">Past Months</h3>
          <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div
              v-for="month in sortedMonthKeys"
              :key="month"
              class="bg-white p-3 rounded-lg shadow-sm"
            >
              <p class="text-xs text-gray-500">{{ month }}</p>
              <div class="relative">
                <div
                  class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                >
                  <span class="text-gray-500 sm:text-sm">Rp</span>
                </div>
                <input
                  type="number"
                  v-model="monthlyInputData[month]"
                  step="1000"
                  class="mt-1 pl-10 block w-full text-md font-semibold border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md"
                />
              </div>
            </div>
          </div>
          <div class="mt-3 text-right">
            <button
              @click="getMonthlyForecast()"
              :disabled="isLoading"
              class="px-4 py-1 text-sm bg-blue-100 text-blue-600 hover:bg-blue-200 rounded-md"
            >
              <span v-if="isLoading">Processing...</span>
              <span v-else>Update Forecast</span>
            </button>
          </div>
        </div>

        <!-- Future Forecast -->
        <div v-if="monthlyForecast">
          <h3 class="text-md font-medium text-gray-700 mb-3">
            Forecasted Month
          </h3>
          <div class="grid grid-cols-1 gap-4">
            <div
              v-for="(value, key) in monthlyForecast.future_forecast"
              :key="key"
              class="bg-gradient-to-b from-purple-50 to-purple-100 p-4 rounded-lg shadow-sm border border-purple-200"
            >
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm text-purple-600 font-medium">{{ key }}</p>
                  <p class="text-2xl font-semibold text-gray-800">
                    {{ formatCurrency(value) }}
                  </p>
                </div>
                <div
                  class="bg-white w-16 h-16 rounded-full flex items-center justify-center"
                >
                  <svg
                    class="w-8 h-8 text-purple-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="flex justify-center items-center py-10">
        <div
          class="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
        ></div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, computed } from "vue";
import type { ForecastResponse } from "~/types/api";
import { useMlService } from "~/services";

// Define types for the input data
interface WeeklyInputData {
  [key: string]: number;
}

interface MonthlyInputData {
  [key: string]: number;
}

// Default data for weekly
const defaultWeeklyData: WeeklyInputData = {
  "Weeks-1": 100000,
  "Weeks-2": 200000,
  "Weeks-3": 350000,
  "Weeks-4": 150000,
};

// Get the current and previous 5 months for the default data
const getCurrentAndPrevious5Months = (): string[] => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const today = new Date();
  const currentMonthIndex = today.getMonth();

  // Collect 6 months including current month, going backward
  const result: string[] = [];

  // Start with 5 months ago
  for (let i = 5; i >= 0; i--) {
    // Calculate month index (handle wrapping around to previous year)
    let monthIndex = (currentMonthIndex - i + 12) % 12;
    result.push(months[monthIndex]);
  }

  return result;
};

// Generate default monthly data with current and previous 5 months
const generateDefaultMonthlyData = (): MonthlyInputData => {
  const monthsArray = getCurrentAndPrevious5Months();
  const data: MonthlyInputData = {};

  // Assign default value for each month
  monthsArray.forEach((month) => {
    data[month] = 1500000;
  });

  return data;
};

// State
const isWeekly = ref(true);
const isLoading = ref(false);
const weeklyForecast = ref<ForecastResponse | null>(null);
const monthlyForecast = ref<ForecastResponse | null>(null);
const weeklyInputData = reactive<WeeklyInputData>({ ...defaultWeeklyData });
const monthlyInputData = reactive<MonthlyInputData>(
  generateDefaultMonthlyData()
);

// Get sorted month keys for display order
const sortedMonthKeys = computed(() => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Custom sort function for months
  return Object.keys(monthlyInputData).sort((a, b) => {
    const indexA = months.indexOf(a);
    const indexB = months.indexOf(b);
    return indexA - indexB;
  });
});

// Get the ML service
const mlService = useMlService();

// Helper to format currency
const formatCurrency = (amount: number): string => {
  return `Rp${amount.toLocaleString("id-ID")}`;
};

// Fetch weekly forecast
const getWeeklyForecast = async () => {
  isLoading.value = true;
  try {
    const result = await mlService.forecastWeekly(weeklyInputData);
    weeklyForecast.value = result;
  } catch (error) {
    console.error("Error fetching weekly forecast:", error);
  } finally {
    isLoading.value = false;
  }
};

// Fetch monthly forecast
const getMonthlyForecast = async () => {
  isLoading.value = true;
  try {
    const result = await mlService.forecastMonthly(monthlyInputData);
    monthlyForecast.value = result;
  } catch (error) {
    console.error("Error fetching monthly forecast:", error);
  } finally {
    isLoading.value = false;
  }
};

// Get next month name
const getNextMonth = (currentMonth: string): string => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const currentIndex = months.indexOf(currentMonth);
  if (currentIndex === -1) return "Next Month";

  return months[(currentIndex + 1) % 12];
};

// Fetch both forecasts on component mount
onMounted(async () => {
  await getWeeklyForecast();
  await getMonthlyForecast();
});
</script>
