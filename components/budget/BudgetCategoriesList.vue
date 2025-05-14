<template>
  <div class="bg-white rounded-lg shadow-sm overflow-hidden">
    <div class="p-6 border-b border-gray-100">
      <h2 class="text-xl font-semibold text-gray-800">Budget Categories</h2>
    </div>

    <div class="p-4 sm:p-6 space-y-6">
      <BudgetCategoryItem
        v-for="category in categories"
        :key="category.id"
        :category="category.id"
        :displayName="category.name"
        :spent="category.spent"
        :budget="category.budget"
        :iconPath="category.iconPath"
        :iconColor="category.iconColor"
        @edit="(category) => $emit('edit', category)"
        @delete="(category) => $emit('delete', category)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  categories: Array<{
    id: string;
    name: string;
    spent: number;
    budget: number;
    iconPath: string;
    iconColor: string;
  }>;
}>();

defineEmits(["edit", "delete"]);
</script>
