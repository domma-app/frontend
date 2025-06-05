<template>
  <div class="bg-white rounded-lg shadow-sm p-6 md:col-span-1">
    <h2 class="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>

    <div class="grid grid-cols-2 gap-3">
      <NuxtLink
        to="/dashboard/transaction/new"
        class="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
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
        to="/dashboard/chatbot"
        class="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
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
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
          ></path>
        </svg>
        <span class="text-sm text-gray-700">AI Assistant</span>
      </NuxtLink>

      <NuxtLink
        to="/dashboard/challenges"
        class="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
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

      <NuxtLink
        to="#"
        class="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
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
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          ></path>
        </svg>
        <span class="text-sm text-gray-700">Calendar</span>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
