<template>
  <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label
          for="budget-category"
          class="block text-sm font-medium text-gray-700 mb-1"
          >Category</label
        >
        <select
          id="budget-category"
          v-model="filters.category"
          class="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
        >
          <option value="all">All Categories</option>
          <option value="food">Food</option>
          <option value="transportation">Transportation</option>
          <option value="education">Education</option>
          <option value="entertainment">Entertainment</option>
          <option value="housing">Housing</option>
          <option value="utilities">Utilities</option>
          <option value="healthcare">Healthcare</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label
          for="budget-month"
          class="block text-sm font-medium text-gray-700 mb-1"
          >Month</label
        >
        <input
          type="month"
          id="budget-month"
          v-model="filters.month_year"
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
  category: "all",
  month_year: "",
});

const emit = defineEmits(["filter"]);

function applyFilters() {
  emit("filter", { ...filters.value });
}

function resetFilters() {
  filters.value = {
    category: "all",
    month_year: "",
  };
  emit("filter", { ...filters.value });
}

// Initialize with current month-year
onMounted(() => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  filters.value.month_year = `${year}-${month}`;
});
</script> 