<template>
  <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div>
        <label
          for="transaction-type"
          class="block text-sm font-medium text-gray-700 mb-1"
          >Type</label
        >
        <select
          id="transaction-type"
          v-model="filters.type"
          class="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
        >
          <option value="all">All Transactions</option>
          <option value="income">Incomes</option>
          <option value="expense">Expenses</option>
        </select>
      </div>

      <div>
        <label
          for="category"
          class="block text-sm font-medium text-gray-700 mb-1"
          >Category</label
        >
        <select
          id="category"
          v-model="filters.category"
          class="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
        >
          <option value="all">All Categories</option>
          <option value="food">Food</option>
          <option value="transportation">Transportation</option>
          <option value="education">Education</option>
          <option value="entertainment">Entertaiment</option>
          <option value="housing">Housing</option>
          <option value="utilities">Utilities</option>
          <option value="healthcare">Healthcare</option>
          <option value="scholarship">Scholarship</option>
          <option value="salary">Salary</option>
          <option value="gift">Gift</option>
        </select>
      </div>

      <div>
        <label
          for="date-from"
          class="block text-sm font-medium text-gray-700 mb-1"
          >Date From</label
        >
        <input
          type="date"
          id="date-from"
          v-model="filters.dateFrom"
          class="w-full rounded-md border-gray-300 shadow-sm focus:ring focus:border-green-500 focus:ring-green-200 focus:ring-opacity-50"
        />
      </div>

      <div>
        <label
          for="date-to"
          class="block text-sm font-medium text-gray-700 mb-1"
          >Date To</label
        >
        <input
          type="date"
          id="date-to"
          v-model="filters.dateTo"
          class="w-full rounded-md border-gray-300 shadow-sm focus:ring focus:border-green-500 focus:ring-green-200 focus:ring-opacity-50"
        />
      </div>
    </div>

    <div class="mt-4 flex gap-2">
      <button
        @click="applyFilters"
        class="bg-green-500 px-4 py-2 rounded-lg text-white hover:bg-green-600 transition-colors"
      >
        Apply Filters
      </button>
      <button
        @click="resetFilters"
        class="bg-gray-100 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-200 transition-colors"
      >
        Reset
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const filters = ref({
  type: "all",
  category: "all",
  dateFrom: "",
  dateTo: "",
});

const emit = defineEmits(["filter"]);

function applyFilters() {
  emit("filter", { ...filters.value });
}

function resetFilters() {
  filters.value = {
    type: "all",
    category: "all",
    dateFrom: "",
    dateTo: "",
  };
  emit("filter", { ...filters.value });
}
</script>
