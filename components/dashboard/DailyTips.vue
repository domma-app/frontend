<template>
  <div class="bg-white rounded-lg shadow-sm p-6 md:col-span-2">
    <h2 class="text-xl font-semibold text-gray-800 mb-4">
      Daily Financial Tip
    </h2>

    <div class="mb-6 bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
      <h3 class="font-medium text-gray-800 mb-2">
        {{ dailyTip.title }}
      </h3>
      <p class="text-gray-600">
        {{ dailyTip.content }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface DailyTipProps {
  dailyTip: {
    title: string;
    content: string;
  };
}

const props = withDefaults(defineProps<DailyTipProps>(), {
  dailyTip: () => ({
    title: "The 50/30/20 Rule for Student Budgeting",
    content:
      "Allocate 50% of your income to needs (rent, groceries), 30% to wants (entertainment), and 20% to savings and debt payments. This simple rule can help you maintain financial balance while enjoying college life.",
  }),
});
</script>
