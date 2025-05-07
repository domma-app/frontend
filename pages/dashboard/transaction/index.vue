<template>
  <div>
    <TransactionHeader />
    <TransactionFilters @filter="handleFilterChange" />
    <TransactionSummary
      :total-income="totalIncome"
      :total-expenses="totalExpenses"
    />
    <TransactionList
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
definePageMeta({
  layout: "dashboard",
});

interface Transaction {
  id: string | number;
  type: "income" | "expense";
  description: string;
  category: string;
  amount: number;
  date: string | Date;
}

// Mock data - In a real application, this would come from an API
const allTransactions = ref<Transaction[]>([
  {
    id: 1,
    type: "expense",
    description: "Grocery Shopping",
    category: "Food",
    amount: 45800,
    date: new Date(),
  },
  {
    id: 2,
    type: "expense",
    description: "Coffee",
    category: "Food",
    amount: 4500,
    date: new Date(),
  },
  {
    id: 3,
    type: "income",
    description: "Part-time Salary",
    category: "Salary",
    amount: 320000,
    date: new Date(Date.now() - 86400000), // yesterday
  },
  {
    id: 4,
    type: "expense",
    description: "Electricity Bills",
    category: "Utilities",
    amount: 35750,
    date: new Date(Date.now() - 86400000), // yesterday
  },
]);

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

const totalIncome = computed(() => {
  return allTransactions.value
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
});

const totalExpenses = computed(() => {
  return allTransactions.value
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);
});

// Event handlers
function handleFilterChange(filters: any) {
  activeFilters.value = { ...filters };
  currentPage.value = 1; // Reset to first page when filters change
}

function handlePageChange(page: number) {
  currentPage.value = page;
}

function handleEditTransaction(id: string | number) {
  console.log("Edit transaction:", id);
}

function handleDeleteTransaction(id: string | number) {
  if (confirm("Are you sure you want to delete this transaction?")) {
    allTransactions.value = allTransactions.value.filter((t) => t.id !== id);
  }
}
</script>
