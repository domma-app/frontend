<template>
  <div v-if="loading" class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
    <div v-for="i in 3" :key="i" class="bg-white rounded-lg shadow-sm p-4">
      <div class="animate-pulse flex flex-col">
        <div class="h-2 bg-gray-200 rounded w-1/3 mb-2"></div>
        <div class="h-8 bg-gray-200 rounded w-2/3 mb-3"></div>
        <div class="h-2 bg-gray-200 rounded w-1/4 mt-1"></div>
      </div>
    </div>
  </div>

  <div
    v-else-if="error"
    class="bg-white rounded-lg shadow-sm p-4 mb-6 text-center text-red-500"
  >
    {{ error }}
  </div>

  <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
    <div class="bg-white rounded-lg shadow-sm p-4">
      <p class="text-sm text-gray-500 mb-1">Total Income</p>
      <p class="text-2xl font-semibold text-green-500">
        +Rp{{ formatCurrency(summary.totalIncome) }}
      </p>
      <p class="text-xs text-gray-400 mt-1">
        {{ summary.incomeCount }} transactions
      </p>
    </div>
    <div class="bg-white rounded-lg shadow-sm p-4">
      <p class="text-sm text-gray-500 mb-1">Total Expenses</p>
      <p class="text-2xl font-semibold text-red-500">
        -Rp{{ formatCurrency(summary.totalExpense) }}
      </p>
      <p class="text-xs text-gray-400 mt-1">
        {{ summary.expenseCount }} transactions
      </p>
    </div>
    <div class="bg-white rounded-lg shadow-sm p-4">
      <p class="text-sm text-gray-500 mb-1">Balance</p>
      <p class="text-2xl font-semibold text-gray-800">
        Rp{{ formatCurrency(summary.balance) }}
      </p>
      <p class="text-xs text-gray-400 mt-1">
        {{ summary.transactionCount }} total transactions
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTransactionService } from "~/services/api/transaction";
import type { TransactionSummary } from "~/types/api";

const transactionService = useTransactionService();

const loading = ref(true);
const error = ref("");

const summary = ref<TransactionSummary>({
  totalIncome: 0,
  totalExpense: 0,
  balance: 0,
  transactionCount: 0,
  incomeCount: 0,
  expenseCount: 0,
});

// Fetch summary data
async function fetchSummary() {
  try {
    loading.value = true;
    error.value = "";
    const response = await transactionService.getTransactionSummary();
    summary.value = response.data;
  } catch (err) {
    error.value =
      err instanceof Error ? err.message : "Failed to load summary data";
    console.error("Error fetching transaction summary:", err);
  } finally {
    loading.value = false;
  }
}

// Format currency
function formatCurrency(amount: number): string {
  return amount.toLocaleString("id-ID");
}

// Fetch summary on component mount
onMounted(() => {
  fetchSummary();
});

// Expose a method to refresh the summary
defineExpose({
  refresh: fetchSummary,
});
</script>
