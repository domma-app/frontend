<template>
  <div class="mb-6 flex justify-between items-center">
    <div>
      <h1 class="text-2xl font-bold text-gray-800">Transactions</h1>
      <p class="text-gray-600">Track Income Expenses</p>
    </div>
    <NuxtLink
      to="/dashboard/transaction/new"
      class="bg-green-500 hover:bg-green-600 transition-colors text-white px-4 py-2 rounded-lg flex items-center"
    >
      <svg
        class="w-5 h-5 mr-2"
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
      Add Transaction
    </NuxtLink>
  </div>
</template>
