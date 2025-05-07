<template>
  <div class="bg-white rounded-lg shadow-sm overflow-hidden">
    <div class="p-6">
      <h2 class="text-xl font-semibold text-gray-800">Transaction History</h2>
    </div>

    <div
      v-if="groupedTransactions.length === 0"
      class="p-12 text-center text-gray-500"
    >
      No transactions found. Start by adding a new transaction.
    </div>

    <template v-else>
      <!-- Grouped transactions by date -->
      <div
        v-for="group in groupedTransactions"
        :key="group.date"
        class="border-b border-gray-100"
      >
        <div class="px-6 py-3 bg-gray-50">
          <h3 class="text-sm font-medium text-gray-500">{{ group.title }}</h3>
        </div>

        <div class="divide-y divide-gray-100">
          <TransactionItem
            v-for="transaction in group.transactions"
            :key="transaction.id"
            :transaction="transaction"
            @edit="(id) => $emit('edit', id)"
            @delete="(id) => $emit('delete', id)"
          />
        </div>
      </div>

      <!-- Pagination Controls -->
      <div
        class="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center"
      >
        <button
          :disabled="currentPage === 1"
          @click="$emit('page-change', currentPage - 1)"
          class="text-gray-500 flex items-center hover:text-gray-700 disabled:opacity-50"
        >
          <svg
            class="w-5 h-5 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            ></path>
          </svg>
          Previous
        </button>

        <div class="flex items-center">
          <span class="text-gray-600 text-sm mr-2"
            >Page {{ currentPage }} of {{ totalPages }}</span
          >
          <button
            :disabled="currentPage === totalPages"
            @click="$emit('page-change', currentPage + 1)"
            class="flex items-center text-gray-500 hover:text-gray-700 disabled:opacity-50"
          >
            Next
            <svg
              class="w-5 h-5 ml-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import TransactionItem from "./TransactionItem.vue";

interface Transaction {
  id: string | number;
  type: "income" | "expense";
  description: string;
  category: string;
  amount: number;
  date: string | Date;
}

const props = defineProps<{
  transactions: Transaction[];
  currentPage: number;
  totalPages: number;
}>();

defineEmits(["edit", "delete", "page-change"]);

const groupedTransactions = computed(() => {
  // Group transactions by date
  const groups: Record<
    string,
    {
      date: string;
      title: string;
      transactions: Transaction[];
    }
  > = {};

  // Helper to determine a readable date group name
  const getDateGroupTitle = (date: Date): string => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      });
    }
  };

  props.transactions.forEach((transaction) => {
    const transactionDate = new Date(transaction.date);
    const dateKey = transactionDate.toDateString();

    if (!groups[dateKey]) {
      groups[dateKey] = {
        date: dateKey,
        title: getDateGroupTitle(transactionDate),
        transactions: [],
      };
    }

    groups[dateKey].transactions.push(transaction);
  });

  // Convert to array and sort by date (newest first)
  return Object.values(groups).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
});
</script>
