<template>
  <div class="bg-white rounded-lg shadow-sm mb-6 overflow-hidden">
    <div class="p-6">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-semibold text-gray-800">
          Monthly Budget Summary
        </h2>
        <div class="flex items-center space-x-2">
          <input
            v-model="selectedMonth"
            type="month"
            class="text-sm border-gray-300 rounded-md shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
          />
        </div>
      </div>

      <!-- Loading state with shimmer effect -->
      <div v-if="loading" class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div v-for="i in 3" :key="i" class="bg-gray-50 rounded-lg p-4">
          <div class="animate-pulse flex flex-col">
            <div class="h-2 bg-gray-200 rounded w-1/3 mb-2"></div>
            <div class="h-8 bg-gray-200 rounded w-2/3 mb-3"></div>
            <div v-if="i === 2">
              <div class="w-full bg-gray-200 rounded-full h-2 mb-2"></div>
              <div class="h-2 bg-gray-200 rounded w-1/4 mt-1"></div>
            </div>
            <div
              v-if="i === 3"
              class="h-2 bg-gray-200 rounded w-3/4 mt-2"
            ></div>
          </div>
        </div>
      </div>

      <!-- Error state -->
      <div v-else-if="error" class="text-center py-6">
        <p class="text-red-500 mb-2">{{ error }}</p>
        <button
          @click="fetchSummary"
          class="text-sm text-green-600 hover:text-green-700 underline"
        >
          Try again
        </button>
      </div>

      <!-- Summary data -->
      <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div class="bg-gray-50 rounded-lg p-4">
          <p class="text-sm text-gray-500 mb-1">Total Budget</p>
          <p class="text-2xl font-semibold text-gray-800">
            {{ formatCurrency(summary.totalBudget) }}
          </p>
        </div>

        <div class="bg-gray-50 rounded-lg p-4">
          <p class="text-sm text-gray-500 mb-1">Spent</p>
          <p class="text-2xl font-semibold text-red-500">
            {{ formatCurrency(summary.totalSpent) }}
          </p>
          <div class="mt-1">
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div
                class="bg-red-500 h-2 rounded-full"
                :style="{
                  width: `${
                    summary.totalBudget > 0
                      ? (summary.totalSpent / summary.totalBudget) * 100
                      : 0
                  }%`,
                }"
              ></div>
            </div>
            <p class="text-xs text-gray-500 mt-1">
              {{
                summary.totalBudget > 0
                  ? Math.round((summary.totalSpent / summary.totalBudget) * 100)
                  : 0
              }}% of total budget
            </p>
          </div>
        </div>

        <div class="bg-gray-50 rounded-lg p-4">
          <p class="text-sm text-gray-500 mb-1">Remaining</p>
          <p class="text-2xl font-semibold text-green-500">
            {{ formatCurrency(summary.remaining) }}
          </p>
          <p class="text-xs text-gray-500 mt-1">
            {{ formatDailyBudget(summary.remaining) }} per day until end of
            month
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBudgetService } from "~/services";
import type { BudgetSummary } from "~/types/api";

const props = defineProps<{
  selectedMonth: string;
}>();

const emit = defineEmits(["update:selectedMonth"]);

const budgetService = useBudgetService();
const loading = ref(false);
const error = ref("");

// Create a date object
const now = new Date();
const currentYear = ref(now.getFullYear());
const currentMonthIndex = now.getMonth();

// Default summary data
const summary = ref<BudgetSummary>({
  totalBudget: 0,
  totalSpent: 0,
  remaining: 0,
  month_year: "",
});

// Format current month and year as YYYY-MM for the input
const currentYearMonth = computed(() => {
  return `${currentYear.value}-${String(
    parseInt(props.selectedMonth) + 1
  ).padStart(2, "0")}`;
});

const selectedMonth = computed({
  get: () => currentYearMonth.value,
  set: (value) => {
    // Parse the YYYY-MM format value
    const [year, month] = value.split("-");
    // Update the current year ref
    currentYear.value = parseInt(year);
    // Month values in input are 1-12, but we need 0-11 for JS Date
    const monthIndex = parseInt(month) - 1;
    emit("update:selectedMonth", monthIndex.toString());

    // Fetch the summary data for the new month
    fetchSummary();
  },
});

// Fetch summary data when component is mounted
onMounted(() => {
  fetchSummary();
});

// Watch for month changes from the parent component
watch(
  () => props.selectedMonth,
  () => {
    fetchSummary();
  }
);

// Function to fetch budget summary from API
async function fetchSummary() {
  try {
    loading.value = true;
    error.value = "";

    // Get the current selected month/year for the API
    const monthYear = currentYearMonth.value;

    const response = await budgetService.getBudgetSummary(monthYear);
    summary.value = response.data;
  } catch (err) {
    error.value =
      err instanceof Error ? err.message : "Failed to load budget summary";
    console.error("Error fetching budget summary:", err);
  } finally {
    loading.value = false;
  }
}

// Public method to refresh the summary
function refresh() {
  fetchSummary();
}

// Helper function to format currency
function formatCurrency(amount: number): string {
  return `Rp${amount.toLocaleString("id-ID")}`;
}

// Helper function to calculate daily budget
function formatDailyBudget(remaining: number): string {
  // Calculate days left in the month
  const year = currentYear.value;
  const month = parseInt(props.selectedMonth);
  const today = new Date();
  const lastDay = new Date(year, month + 1, 0).getDate();
  const daysLeft =
    today.getMonth() === month && today.getFullYear() === year
      ? lastDay - today.getDate() + 1
      : lastDay;

  // Calculate daily budget
  const dailyBudget = daysLeft > 0 ? Math.round(remaining / daysLeft) : 0;

  return formatCurrency(dailyBudget);
}

// Expose the refresh method to the parent component
defineExpose({ refresh });
</script>
