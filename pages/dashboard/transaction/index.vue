<template>
  <div>
    <TransactionHeader />
    <TransactionFilters @filter="handleFilterChange" />
    <TransactionSummary ref="summaryComponent" />

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
        <span>Loading transactions...</span>
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
        Failed to load transactions
      </h3>
      <p class="text-sm text-gray-500 mb-4">{{ error }}</p>
      <button
        @click="fetchTransactions"
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

    <TransactionList
      v-else
      :transactions="filteredTransactions"
      :current-page="currentPage"
      :total-pages="totalPages"
      @edit="handleEditTransaction"
      @delete="handleDeleteTransaction"
      @page-change="handlePageChange"
    />
  </div>
</template>

<script setup lang="ts">
import { useTransactionService } from "~/services/api/transaction";
import type { UITransaction, TransactionListResponse } from "~/types/api";
import TransactionSummary from "~/components/transaction/TransactionSummary.vue";
import { useRouter } from "vue-router";

definePageMeta({
  layout: "dashboard",
});

const transactionService = useTransactionService();
const loading = ref(true);
const error = ref("");
const summaryComponent = ref<InstanceType<typeof TransactionSummary> | null>(null);
const router = useRouter();

// Transactions state
const allTransactions = ref<UITransaction[]>([]);

// Fetch transactions function (can be called again for retry)
async function fetchTransactions() {
  try {
    loading.value = true;
    error.value = "";
    const response = await transactionService.getTransactions(activeFilters.value);

    // Check the response structure and handle accordingly
    const transactions = response.data || [];

    // Transform API response to match our UI model
    allTransactions.value = Array.isArray(transactions)
      ? transactions.map((t) => ({
          id: t.id,
          type: t.type,
          description: t.description,
          category: t.category,
          amount: t.amount,
          date: new Date(t.transaction_date + "T" + t.transaction_time),
        }))
      : [];
    
    // Refresh summary after loading transactions
    if (summaryComponent.value) {
      summaryComponent.value.refresh();
    }
  } catch (err) {
    error.value =
      err instanceof Error ? err.message : "Failed to load transactions";
    console.error("Transaction loading error:", err);
  } finally {
    loading.value = false;
  }
}

// Fetch transactions on component mount
onMounted(() => {
  fetchTransactions();
});

// Filter state
const activeFilters = ref({
  type: "all",
  category: "all",
  dateFrom: "",
  dateTo: "",
});

// Pagination state
const currentPage = ref(1);
const itemsPerPage = 10;

// Computed values
const filteredTransactions = computed(() => {
  let filtered = [...allTransactions.value];

  // Apply type filter
  if (activeFilters.value.type !== "all") {
    filtered = filtered.filter((t) => t.type === activeFilters.value.type);
  }

  // Apply category filter
  if (activeFilters.value.category !== "all") {
    filtered = filtered.filter(
      (t) =>
        t.category.toLowerCase() === activeFilters.value.category.toLowerCase()
    );
  }

  // Apply date from filter
  if (activeFilters.value.dateFrom) {
    const fromDate = new Date(activeFilters.value.dateFrom);
    filtered = filtered.filter((t) => new Date(t.date) >= fromDate);
  }

  // Apply date to filter
  if (activeFilters.value.dateTo) {
    const toDate = new Date(activeFilters.value.dateTo);
    toDate.setHours(23, 59, 59, 999); // End of day
    filtered = filtered.filter((t) => new Date(t.date) <= toDate);
  }

  // Apply pagination
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;

  return filtered.slice(start, end);
});

const totalPages = computed(() => {
  const filtered = [...allTransactions.value];
  return Math.ceil(filtered.length / itemsPerPage) || 1;
});

// Event handlers
function handleFilterChange(filters: any) {
  activeFilters.value = { ...filters };
  fetchTransactions(); // Reload transactions with new filters
  currentPage.value = 1; // Reset to first page when filters change
}

function handlePageChange(page: number) {
  currentPage.value = page;
}

function handleEditTransaction(id: string | number) {
  router.push(`/dashboard/transaction/edit/${id}`);
}

async function handleDeleteTransaction(id: string | number) {
  if (confirm("Are you sure you want to delete this transaction?")) {
    try {
      const response = await transactionService.deleteTransaction(id);

      if (!response.status) {
        throw new Error(response.message || "Failed to delete transaction");
      }

      allTransactions.value = allTransactions.value.filter((t) => t.id !== id);
      
      // Also refresh the summary after deletion
      if (summaryComponent.value) {
        summaryComponent.value.refresh();
      }
    } catch (err) {
      console.error("Error deleting transaction:", err);
      alert("Failed to delete transaction. Please try again.");
    }
  }
}
</script>
