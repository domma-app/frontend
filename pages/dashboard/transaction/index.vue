<template>
  <div>
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

    <!-- Filters -->
    <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label
            for="transaction-type"
            class="block text-sm font-medium text-gray-700 mb-1"
            >Type</label
          >
          <select
            id="transaction-type"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
          >
            <option value="all">All Transactions</option>
            <option value="income">Incomes</option>
            <option value="expense">Expenses</option>
          </select>
        </div>

        <div>
          <label
            for="category"
            class="block text-sm font-medium text-gray-700 mb-1"
            >Category</label
          >
          <select
            id="category"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
          >
            <option value="all">All Categories</option>
            <option value="food">Food</option>
            <option value="transportation">Transportation</option>
            <option value="education">Education</option>
            <option value="entertainment">Entertaiment</option>
            <option value="housing">Housing</option>
            <option value="utilities">Utilities</option>
            <option value="healthcare">Healthcare</option>
            <option value="scholarship">Scholarship</option>
            <option value="salary">Salary</option>
            <option value="gift">Gift</option>
          </select>
        </div>

        <div>
          <label
            for="date-from"
            class="block text-sm font-medium text-gray-700 mb-1"
            >Date From</label
          >
          <input
            type="date"
            id="date-from"
            class="w-full rounded-md border-gray-300 shadow-sm focus:ring focus:border-green-500 focus:ring-green-200 focus:ring-opacity-50"
          />
        </div>

        <div>
          <label
            for="date-to"
            class="block text-sm font-medium text-gray-700 mb-1"
            >Date To</label
          >
          <input
            type="date"
            id="date-to"
            class="w-full rounded-md border-gray-300 shadow-sm focus:ring focus:border-green-500 focus:ring-green-200 focus:ring-opacity-50"
          />
        </div>
      </div>

      <div class="mt-4 flex gap-2">
        <button
          class="bg-green-500 px-4 py-2 rounded-lg text-white hover:bg-green-600 transition-colors"
        >
          Apply Filters
        </button>
        <button
          class="bg-gray-100 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-200 transition-colors"
        >
          Reset
        </button>
      </div>
    </div>

    <!-- Transaction Summary -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div class="bg-white runded-lg shadow-sm p-4">
        <p class="text-sm text-gray-500 mb-1">Total Income</p>
        <p class="text-2xl font-semibold text-green-500">+Rp2.500.000</p>
      </div>
      <div class="bg-white runded-lg shadow-sm p-4">
        <p class="text-sm text-gray-500 mb-1">Total Expenses</p>
        <p class="text-2xl font-semibold text-red-500">-Rp1.250.000</p>
      </div>
      <div class="bg-white runded-lg shadow-sm p-4">
        <p class="text-sm text-gray-500 mb-1">Balance</p>
        <p class="text-2xl font-semibold text-gray-800">Rp1.250.000</p>
      </div>
    </div>

    <!-- Transaction List -->
    <div class="bg-white rounded-lg shadow-sm overflow-hidden">
      <div class="p-6">
        <h2 class="text-xl font-semibold text-gray-800">Transaction History</h2>
      </div>

      <!-- Date Group - Today -->
      <div class="border-b border-gray-100">
        <div class="px-6 py-3 bg-gray-50">
          <h3 class="text-sm font-medium text-gray-500">Today</h3>
        </div>

        <div class="divide-y divide-gray-100">
          <div class="p-4 sm:px-6 hover:bg-gray-50 transition-colors">
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <div class="bg-red-50 p-2 rounded-lg mr-3">
                  <svg
                    class="w-6 h-6 text-red-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    ></path>
                  </svg>
                </div>
                <div>
                  <p class="text-gray-800 font-medium">Grocery Shopping</p>
                  <div class="flex items-center">
                    <span
                      class="text-xs bg-orange-100 text-orange-800 rounded-full px-2 py-0.5 mr-2"
                    >
                      Food
                    </span>
                    <p class="text-gray-500 text-sm">Today at 13:45</p>
                  </div>
                </div>
              </div>
              <div class="flex flex-col items-end">
                <p class="text-red-500 font-medium">-Rp45.800</p>
                <div class="flex mt-1">
                  <button class="text-gray-400 hover:text-gray-600 mr-2">
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
                  <button class="text-gray-400 hover:text-red-500">
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
          <div class="p-4 sm:px-6 hover:bg-gray-50 transition-colors">
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <div class="bg-red-50 p-2 rounded-lg mr-3">
                  <svg
                    class="w-6 h-6 text-red-500"
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
                <div>
                  <p class="text-gray-800 font-medium">Coffee</p>
                  <div class="flex items-center">
                    <span
                      class="text-xs bg-orange-100 text-orange-800 rounded-full px-2 py-0.5 mr-2"
                      >Food</span
                    >
                    <p class="text-gray-500 text-sm">Today at 9:15</p>
                  </div>
                </div>
              </div>
              <div class="flex flex-col items-end">
                <p class="text-red-500 font-medium">-Rp4.500</p>
                <div class="flex mt-1">
                  <button class="text-gray-400 hover:text-gray-600 mr-2">
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
                  <button class="text-gray-400 hover:text-red-500">
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

          <!-- Date Group - Yesterday -->
          <div class="border-b border-gray-100">
            <div class="px-6 py-3 bg-gray-50">
              <h3 class="text-sm font-medium text-gray-500">Yesterday</h3>
            </div>

            <div class="divide-y divide-gray-100">
              <div class="p-4 sm:px-6 hover:bg-gray-50 transition-colors">
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <div class="bg-green-50 p-2 rounded-lg mr-3">
                      <svg
                        class="w-6 h-6 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                        ></path>
                      </svg>
                    </div>
                    <div>
                      <p class="text-gray-800 font-medium">Part-time Salary</p>
                      <div class="flex items-center">
                        <span
                          class="text-xs bg-green-100 text-green-800 rounded-full px-2 py-0.5 mr-2"
                          >Salary</span
                        >
                        <p class="text-gray-500 text-sm">Yesterday 17:30</p>
                      </div>
                    </div>
                  </div>
                  <div class="flex flex-col items-end">
                    <p class="text-green-500 font-medium">+Rp320.000</p>
                    <div class="flex mt-1">
                      <button class="text-gray-400 hover:text-gray-600 mr-2">
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
                      <button class="text-gray-400 hover:text-red-500">
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

              <div class="p-4 sm:px-6 hover:bg-gray-50 transition-colors">
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <div class="bg-red-50 p-2 rounded-lg mr-3">
                      <svg
                        class="w-6 h-6 text-red-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        ></path>
                      </svg>
                    </div>
                    <div>
                      <p class="text-gray-800 font-medium">Electricity Bills</p>
                      <div class="flex items-center">
                        <span
                          class="text-xs bg-blue-100 text-blue-800 rounded-full px-2 py-0.5 mr-2"
                          >Utilities</span
                        >
                        <p class="text-gray-500 text-sm">Yesterday 13:20</p>
                      </div>
                    </div>
                  </div>
                  <div class="flex flex-col items-end">
                    <p class="text-red-500 font-medium">-Rp35.750</p>
                    <div class="flex mt-1">
                      <button class="text-gray-400 hover:text-gray-600 mr-2">
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
                      <button class="text-gray-400 hover:text-red-500">
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
            </div>
          </div>

          <!-- Pagination Controls -->
          <div
            class="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center"
          >
            <button
              class="text-gray-500 flex items-center hover:text-gray-700 disabled:opacity-50"
            >
              <svg
                class="w-5 h-5 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 19l-7-7 7-7"
                ></path>
              </svg>
              Previous
            </button>

            <div class="flex items-center">
              <span class="text-gray-600 text-sm mr-2">Page 1 of 3</span>
              <button
                class="flex items-center text-gray-500 hover:text-gray-700"
              >
                Next
                <svg
                  class="w-5 h-5 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "dashboard",
});
</script>
