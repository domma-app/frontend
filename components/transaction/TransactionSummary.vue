<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
    <div class="bg-white runded-lg shadow-sm p-4">
      <p class="text-sm text-gray-500 mb-1">Total Income</p>
      <p class="text-2xl font-semibold text-green-500">
        +Rp{{ formatCurrency(totalIncome) }}
      </p>
    </div>
    <div class="bg-white runded-lg shadow-sm p-4">
      <p class="text-sm text-gray-500 mb-1">Total Expenses</p>
      <p class="text-2xl font-semibold text-red-500">
        -Rp{{ formatCurrency(totalExpenses) }}
      </p>
    </div>
    <div class="bg-white runded-lg shadow-sm p-4">
      <p class="text-sm text-gray-500 mb-1">Balance</p>
      <p class="text-2xl font-semibold text-gray-800">
        Rp{{ formatCurrency(balance) }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  totalIncome: {
    type: Number,
    default: 0,
  },
  totalExpenses: {
    type: Number,
    default: 0,
  },
});

const balance = computed(() => {
  return props.totalIncome - props.totalExpenses;
});
</script>
