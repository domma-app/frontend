<template>
  <div class="bg-white rounded-lg shadow-sm p-6">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-semibold text-gray-800">Recent Transactions</h2>
      <NuxtLink
        to="/dashboard/transaction"
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
        <span>Loading transactions...</span>
      </div>
    </div>

    <div v-else-if="error" class="text-center py-4">
      <p class="text-red-500">{{ error }}</p>
    </div>

    <div v-else-if="!transactions.length" class="text-center py-4">
      <p class="text-gray-500">No recent transactions found</p>
    </div>

    <div v-else class="space-y-4">
      <div
        v-for="transaction in transactions"
        :key="transaction.id"
        class="flex items-center justify-between"
      >
        <div class="flex items-center">
          <div
            :class="[
              transaction.type === 'income' ? 'bg-green-50' : 'bg-red-50',
              'p-2 rounded-lg mr-3',
            ]"
          >
            <svg
              class="w-5 h-5"
              :class="
                transaction.type === 'income'
                  ? 'text-green-500'
                  : 'text-red-500'
              "
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                v-if="transaction.type === 'income'"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
              ></path>
              <path
                v-else
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              ></path>
            </svg>
          </div>
          <div>
            <p class="text-gray-800 font-medium">
              {{ transaction.description }}
            </p>
            <p class="text-gray-500 text-sm">
              {{ formatDate(transaction.date) }}
            </p>
          </div>
        </div>
        <p
          :class="[
            transaction.type === 'income' ? 'text-green-500' : 'text-red-500',
            'font-medium',
          ]"
        >
          {{ transaction.type === "income" ? "+ " : "- "
          }}{{ formatCurrency(transaction.amount) }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTransactionService } from "~/services/api/transaction";
import type { UITransaction } from "~/types/api";

const transactionService = useTransactionService();
const transactions = ref<UITransaction[]>([]);
const loading = ref(true);
const error = ref("");

// Fetch recent transactions on component mount
onMounted(async () => {
  try {
    loading.value = true;
    error.value = "";

    const response = await transactionService.getTransactions();

    // Process and take only the 3 most recent transactions
    const allTransactions = response.data || [];

    // Transform API response to UI model and sort by most recent
    const processedTransactions = Array.isArray(allTransactions)
      ? allTransactions
          .map((t) => ({
            id: t.id,
            type: t.type,
            description: t.description,
            category: t.category,
            amount: t.amount,
            date: new Date(t.transaction_date + "T" + t.transaction_time),
          }))
          .sort((a, b) => {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
          })
          .slice(0, 3) // Take only the 3 most recent
      : [];

    transactions.value = processedTransactions;
  } catch (err) {
    error.value =
      err instanceof Error ? err.message : "Failed to load transactions";
    console.error("Error loading recent transactions:", err);
  } finally {
    loading.value = false;
  }
});

// Helper function to format currency
function formatCurrency(amount: number): string {
  return `Rp${amount.toLocaleString("id-ID")}`;
}

// Helper function to format date
function formatDate(date: Date | string): string {
  const d = new Date(date);
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
</script>
