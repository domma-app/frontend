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

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div class="bg-gray-50 rounded-lg p-4">
          <p class="text-sm text-gray-500 mb-1">Total Budget</p>
          <p class="text-2xl font-semibold text-gray-800">Rp1.500.000</p>
        </div>

        <div class="bg-gray-50 rounded-lg p-4">
          <p class="text-sm text-gray-500 mb-1">Spent</p>
          <p class="text-2xl font-semibold text-red-500">Rp865.000</p>
          <div class="mt-1">
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div class="bg-red-500 h-2 rounded-full" style="width: 58%"></div>
            </div>
            <p class="text-xs text-gray-500 mt-1">58% of total budget</p>
          </div>
        </div>

        <div class="bg-gray-50 rounded-lg p-4">
          <p class="text-sm text-gray-500 mb-1">Remaining</p>
          <p class="text-2xl font-semibold text-green-500">Rp634.000</p>
          <p class="text-xs text-gray-500 mt-1">
            Rp20.500 per day until end of month
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  selectedMonth: string;
}>();

const emit = defineEmits(["update:selectedMonth"]);

// Create a date object
const now = new Date();
const currentYear = ref(now.getFullYear());
const currentMonthIndex = now.getMonth();

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
  },
});
</script>
