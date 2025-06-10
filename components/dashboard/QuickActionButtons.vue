<template>
  <div
    class="bg-white rounded-lg shadow-sm p-3 mb-4 overflow-x-auto max-w-lg mx-auto md:hidden"
  >
    <!-- <div class="text-center mb-2">
      <h2 class="text-sm font-semibold text-gray-600 flex items-center justify-center">
        <svg class="w-4 h-4 mr-1 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"></path>
        </svg>
        QUICK ACTIONS
      </h2>
    </div> -->
    <div class="flex justify-center space-x-4 min-w-max">
      <NuxtLink
        to="/dashboard/transaction/new"
        class="flex flex-col items-center justify-center p-3 bg-gradient-to-b from-green-50 to-green-100 rounded-lg hover:from-green-100 hover:to-green-200 transition-colors border border-green-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 transition-transform duration-200"
      >
        <div
          class="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-1 shadow-inner"
        >
          <svg
            class="w-6 h-6 text-green-600"
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
        </div>
        <span class="text-xs font-semibold text-green-700"
          >Add Transaction</span
        >
      </NuxtLink>

      <NuxtLink
        to="/dashboard/budget/new"
        class="flex flex-col items-center justify-center p-3 bg-gradient-to-b from-blue-50 to-blue-100 rounded-lg hover:from-blue-100 hover:to-blue-200 transition-colors border border-blue-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 transition-transform duration-200"
      >
        <div
          class="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-1 shadow-inner"
        >
          <svg
            class="w-6 h-6 text-blue-600"
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
        </div>
        <span class="text-xs font-semibold text-blue-700">Add Budget</span>
      </NuxtLink>

      <NuxtLink
        to="/dashboard/challenges/new"
        class="flex flex-col items-center justify-center p-3 bg-gradient-to-b from-purple-50 to-purple-100 rounded-lg hover:from-purple-100 hover:to-purple-200 transition-colors border border-purple-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 transition-transform duration-200"
      >
        <div
          class="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-1 shadow-inner"
        >
          <svg
            class="w-6 h-6 text-purple-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            ></path>
          </svg>
        </div>
        <span class="text-xs font-semibold text-purple-700"
          >Start Challenge</span
        >
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
// No additional setup needed
</script>
