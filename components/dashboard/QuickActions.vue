<template>
  <div class="bg-white rounded-lg shadow-sm p-6 md:col-span-1">
    <h2 class="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>

    <div class="flex flex-row justify-between gap-3">
      <NuxtLink
        to="/dashboard/transaction/new"
        class="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors flex-1 text-center"
      >
        <svg
          class="w-6 h-6 text-green-500 mb-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          ></path>
        </svg>
        <span class="text-sm text-gray-700">Add Transaction</span>
      </NuxtLink>

      <NuxtLink
        to="/dashboard/budget"
        class="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors flex-1 text-center"
      >
        <svg
          class="w-6 h-6 text-green-500 mb-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <span class="text-sm text-gray-700">Add Budget</span>
      </NuxtLink>

      <NuxtLink
        to="/dashboard/challenges"
        class="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors flex-1 text-center"
      >
        <svg
          class="w-6 h-6 text-green-500 mb-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <span class="text-sm text-gray-700">Start Challenge</span>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
