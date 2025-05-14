<template>
  <div class="p-4 sm:px-6 hover:bg-gray-50 transition-colors">
    <div class="flex items-center justify-between">
      <div class="flex items-center">
        <div
          :class="[
            transaction.type === 'expense' ? 'bg-red-50' : 'bg-green-50',
            'p-2 rounded-lg mr-3',
          ]"
        >
          <svg
            :class="[
              transaction.type === 'expense'
                ? 'text-red-500'
                : 'text-green-500',
              'w-6 h-6',
            ]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              v-if="
                transaction.type === 'expense' &&
                transaction.category === 'food'
              "
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            ></path>
            <path
              v-else-if="transaction.category === 'utilities'"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 10V3L4 14h7v7l9-11h-7z"
            ></path>
            <path
              v-else-if="transaction.type === 'income'"
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
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        </div>
        <div>
          <p class="text-gray-800 font-medium">{{ transaction.description }}</p>
          <div class="flex items-center">
            <span
              :class="[
                getCategoryColorClass(transaction.category),
                'text-xs rounded-full px-2 py-0.5 mr-2',
              ]"
            >
              {{ transaction.category }}
            </span>
            <p class="text-gray-500 text-sm">
              {{ formatDate(transaction.date) }}
            </p>
          </div>
        </div>
      </div>
      <div class="flex flex-col items-end">
        <p
          :class="[
            transaction.type === 'expense' ? 'text-red-500' : 'text-green-500',
            'font-medium',
          ]"
        >
          {{ transaction.type === "expense" ? "-" : "+" }}Rp{{
            formatCurrency(transaction.amount)
          }}
        </p>
        <div class="flex mt-1">
          <button
            @click="$emit('edit', transaction.id)"
            class="text-gray-400 hover:text-gray-600 mr-2"
          >
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              ></path>
            </svg>
          </button>
          <button
            @click="$emit('delete', transaction.id)"
            class="text-gray-400 hover:text-red-500"
          >
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { UITransaction } from '~/types/api';

const props = defineProps<{
  transaction: UITransaction;
}>();

defineEmits(["edit", "delete"]);

function formatDate(date: string | Date): string {
  const d = new Date(date);
  const now = new Date();
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);

  if (d.toDateString() === now.toDateString()) {
    return `Today at ${d.getHours()}:${String(d.getMinutes()).padStart(
      2,
      "0"
    )}`;
  } else if (d.toDateString() === yesterday.toDateString()) {
    return `Yesterday ${d.getHours()}:${String(d.getMinutes()).padStart(
      2,
      "0"
    )}`;
  } else {
    return d.toLocaleDateString();
  }
}

function formatCurrency(amount: number): string {
  return amount.toLocaleString('id-ID');
}

function getCategoryColorClass(category: string): string {
  const categoryColors: Record<string, string> = {
    food: "bg-orange-100 text-orange-800",
    transportation: "bg-purple-100 text-purple-800",
    education: "bg-blue-100 text-blue-800",
    entertainment: "bg-indigo-100 text-indigo-800",
    housing: "bg-gray-100 text-gray-800",
    utilities: "bg-blue-100 text-blue-800",
    healthcare: "bg-red-100 text-red-800",
    scholarship: "bg-green-100 text-green-800",
    salary: "bg-green-100 text-green-800",
    gift: "bg-pink-100 text-pink-800",
  };

  return categoryColors[category.toLowerCase()] || "bg-gray-100 text-gray-800";
}
</script>
