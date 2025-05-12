<template>
  <div>
    <div class="mb-6 flex justify-between items-center">
      <div>
        <h1 class="text-2xl font-bold text-gray-800">Budget Planner</h1>
        <p class="text-gray-600">
          Set and track your spending limits by category
        </p>
      </div>
      <button
        @click="showNewBudgetModal = true"
        class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
      >
        <svg
          class="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          ></path>
        </svg>
        New Budget
      </button>
    </div>

    <!-- Loading state -->
    <div v-if="loading" class="bg-white rounded-lg shadow-sm p-8 text-center">
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

    <!-- Error state -->
    <div
      v-else-if="error"
      class="bg-white rounded-lg shadow-sm p-6 text-center"
    >
      <div class="text-red-500 mb-4">
        <svg
          class="h-12 w-12 mx-auto"
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
      <h3 class="text-lg font-medium text-gray-900 mb-2">
        Failed to load budgets
      </h3>
      <p class="text-sm text-gray-500 mb-4">{{ error }}</p>
      <button
        @click="fetchBudgets"
        class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
      >
        <svg
          class="h-4 w-4 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          ></path>
        </svg>
        Try Again
      </button>
    </div>

    <div v-else>
      <!-- Budget Summary -->
      <BudgetSummary
        ref="summaryComponent"
        v-model:selectedMonth="selectedMonth"
      />

      <!-- Budget Categories -->
      <BudgetCategoriesList
        :categories="budgetCategories"
        @edit="editBudget"
        @delete="deleteBudget"
      />
    </div>

    <!-- Budget Form Modal -->
    <BudgetFormModal
      :show="showNewBudgetModal || isEditing"
      :is-edit="isEditing"
      :initial-data="editingBudget"
      @close="closeModal"
      @submit="saveBudget"
    />

    <!-- Success message -->
    <div
      v-if="success"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    >
      <div class="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <div class="text-center">
          <div
            class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4"
          >
            <svg
              class="h-6 w-6 text-green-600"
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
          <h3 class="text-lg font-medium text-gray-900">Budget Saved!</h3>
          <p class="mt-2 text-sm text-gray-600">
            Your budget has been successfully saved.
          </p>
          <div class="mt-4">
            <button
              @click="hideSuccessMessage"
              class="mt-3 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { budgetIcons } from "~/components/budget/budgetIcons";
import { useBudgetService } from "~/services";
import type { Budget, UIBudget, BudgetRequest } from "~/types/api";
import BudgetSummary from "~/components/budget/BudgetSummary.vue";

definePageMeta({
  layout: "dashboard",
});

const budgetService = useBudgetService();
const loading = ref(true);
const error = ref("");
const success = ref(false);
const summaryComponent = ref<InstanceType<typeof BudgetSummary> | null>(null);

// Update to store both year and month
const selectedDate = ref({
  year: new Date().getFullYear(),
  month: new Date().getMonth(),
});

// For compatibility with the BudgetSummary component
const selectedMonth = computed({
  get: () => selectedDate.value.month.toString(),
  set: (value) => {
    selectedDate.value.month = parseInt(value);

    // The event from BudgetSummary includes year changes
    // The year is handled separately in the BudgetSummary component
  },
});

const showNewBudgetModal = ref(false);
const isEditing = ref(false);
const editingCategory = ref("");

// State for budget data
const budgetData = ref<Budget[]>([]);

// Function to hide the success message and clear any redirect timer
function hideSuccessMessage() {
  success.value = false;
  const timerId = window.sessionStorage.getItem("budgetRedirectTimer");
  if (timerId) {
    clearTimeout(parseInt(timerId));
    window.sessionStorage.removeItem("budgetRedirectTimer");
  }
}

// Fetch budget data from the API
async function fetchBudgets() {
  try {
    loading.value = true;
    error.value = "";

    const response = await budgetService.getBudgets();
    budgetData.value = response.data.budgets || [];

    // Refresh the summary after loading budgets
    if (summaryComponent.value) {
      summaryComponent.value.refresh();
    }
  } catch (err) {
    error.value = err instanceof Error ? err.message : "Failed to load budgets";
    console.error("Budget loading error:", err);
  } finally {
    loading.value = false;
  }
}

// Load budgets when component is mounted
onMounted(() => {
  fetchBudgets();
});

const budgetCategories = computed(() => {
  return budgetData.value.map((budget) => {
    const icon =
      budgetIcons[budget.category.toLowerCase()] || budgetIcons.other;
    return {
      id: budget.id,
      name: icon.name || budget.category,
      spent: budget.spent,
      budget: budget.amount,
      iconPath: icon.iconPath,
      iconColor: icon.iconColor,
    };
  });
});

const editingBudget = computed(() => {
  if (!isEditing.value) return null;

  const budget = budgetData.value.find((b) => b.id === editingCategory.value);
  if (!budget) return null;

  // Format the current year and month for the form
  const currentYearMonth = `${selectedDate.value.year}-${String(
    selectedDate.value.month + 1
  ).padStart(2, "0")}`;

  return {
    category: budget.category,
    amount: budget.amount,
    yearMonth: budget.month_year || currentYearMonth,
    notes: budget.notes || "",
    notifications: true,
  };
});

function editBudget(category: string) {
  isEditing.value = true;
  editingCategory.value = category;
}

function deleteBudget(category: string) {
  if (
    confirm(
      `Are you sure you want to delete the ${
        budgetIcons[category]?.name || category
      } budget?`
    )
  ) {
    budgetData.value = budgetData.value.filter((b) => b.id !== category);
    alert(`Budget for ${budgetIcons[category]?.name || category} deleted!`);
  }
}

function closeModal() {
  showNewBudgetModal.value = false;
  isEditing.value = false;
  editingCategory.value = "";
}

async function saveBudget(budgetFormData: any) {
  try {
    loading.value = true;

    // Prepare the data for API
    const budgetRequest: BudgetRequest = {
      category: budgetFormData.category,
      amount: budgetFormData.amount,
      month_year: budgetFormData.yearMonth,
      notes: budgetFormData.notes || "",
    };

    if (isEditing.value) {
      // Update existing budget - this would be implemented in the API service
      const index = budgetData.value.findIndex(
        (b) => b.id === editingCategory.value
      );
      if (index !== -1) {
        // Temporary: Just update local state until we implement API update
        budgetData.value[index].amount = budgetFormData.amount;
        budgetData.value[index].month_year = budgetFormData.yearMonth;
        budgetData.value[index].notes = budgetFormData.notes || "";

        // Show success message
        success.value = true;

        // Auto-hide success message after 5 seconds if user doesn't click Continue
        const redirectTimer = setTimeout(() => {
          success.value = false;
        }, 5000);

        // Store the timer so it can be cancelled if user clicks Continue
        window.sessionStorage.setItem(
          "budgetRedirectTimer",
          redirectTimer.toString()
        );
      }
    } else {
      // Create new budget
      const response = await budgetService.createBudget(budgetRequest);

      // Add the new budget to the local state
      budgetData.value.push(response.data);

      // Show success message
      success.value = true;

      // Auto-hide success message after 5 seconds if user doesn't click Continue
      const redirectTimer = setTimeout(() => {
        success.value = false;
      }, 5000);

      // Store the timer so it can be cancelled if user clicks Continue
      window.sessionStorage.setItem(
        "budgetRedirectTimer",
        redirectTimer.toString()
      );
    }

    closeModal();
    fetchBudgets(); // Refresh the data from the API

    // Refresh the summary after saving a budget
    if (summaryComponent.value) {
      summaryComponent.value.refresh();
    }
  } catch (err) {
    error.value = err instanceof Error ? err.message : "Failed to save budget";
    console.error("Error saving budget:", err);
  } finally {
    loading.value = false;
  }
}
</script>
