<template>
  <div>
    <!-- Welcome section -->
    <section class="mb-6">
      <div class="bg-white rounded-lg shadow-sm p-6">
        <div class="flex items-center justify-between mb-4">
          <div>
            <h1 class="text-2xl font-bold text-gray-800">
              Welcome, {{ userName }}!
            </h1>
            <p class="text-gray-600">
              View your financial summary and recent activities here.
            </p>
          </div>
          <div class="bg-green-50 rounded-full p-3">
            <svg
              class="w-8 h-8 text-green-500"
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
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="bg-gray-50 rounded-lg p-4">
            <p class="text-sm text-gray-500 mb-1">Current Balance</p>
            <p class="text-2xl font-semibold text-gray-800">Rp125.000</p>
            <div class="flex items-center mt-2 text-sm">
              <span class="text-green-500 flex items-center">
                <svg
                  class="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 10l7-7m0 0l7 7m-7-7v18"
                  ></path>
                </svg>
                8%
              </span>
              <span class="text-gray-500 ml-2">from last month</span>
            </div>
          </div>
          <div class="bg-gray-50 rounded-lg p-4">
            <p class="text-sm text-gray-500 mb-1">Monthly Summary</p>
            <div class="flex justify-between text-sm mb-2">
              <span>Income:</span>
              <span class="text-green-500">+Rp40.000</span>
            </div>
            <div class="flex justify-between text-sm mb-2">
              <span>Expenses:</span>
              <span class="text-red-500">-Rp10.000</span>
            </div>
            <div class="flex justify-between text-sm font-medium">
              <span>Remaining:</span>
              <span>Rp30.000</span>
            </div>
          </div>

          <div class="bg-gray-50 rounded-lg p-4">
            <p class="text-sm text-gray-500 mb-1">Saving Goals</p>
            <p class="text-2xl font-semibold text-gray-800">Rp1.000.000</p>
            <div class="mt-2">
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div
                  class="bg-green-500 h-2 rounded-full"
                  style="width: 65%"
                ></div>
              </div>
              <p class="text-xs text-gray-500 mt-1">65% of Rp1000.000 target</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Prediction section -->
    <section class="mb-6">
      <div class="bg-white rounded-lg shadow-sm p-6">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">
          Next Month Prediction
        </h2>
        <div class="flex items-center space-x-2 mb-2">
          <svg
            class="w-5 h-5 text-blue-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span class="text-sm text-gray-600">Based on spending patterns</span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="bg-gray-50 rounded-lg p-4">
            <p class="text-sm text-gray-500 mb-1">Predicted Expenses</p>
            <p class="text-2xl font-semibold text-gray-800">Rp82.000</p>
            <div class="flex items-center mt-2 text-sm">
              <span class="text-red-500 flex items-center">
                <svg
                  class="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  ></path>
                </svg>
                +9.3%
              </span>
              <span class="text-gray-500 ml-2">from this month</span>
            </div>
          </div>

          <div class="bg-gray-50 rounded-lg p-4 flex flex-col justify-between">
            <div>
              <p class="text-sm text-gray-500 mb-1">Top Expenses Category</p>
              <p class="font-semibold text-gray-800">Housing</p>
            </div>
            <div class="mt-2">
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div
                  class="bg-purple-500 h-2 rounded-full"
                  style="width: 35%"
                ></div>
              </div>
              <p class="text-xs text-gray-500 mt-1">35% of total expenses</p>
            </div>
          </div>

          <div class="bg-gray-50 rounded-lg p-4">
            <p class="text-sm text-gray-500 mb-1">Recommended Savings</p>
            <p class="text-2xl font-semibold text-gray-800">Rp300.000</p>
            <p class="text-xs text-gray-500 mt-2">
              based on income and expenses
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Recent transactions and budgets section -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <!-- Recent transactions -->
      <div class="bg-white rounded-lg shadow-sm p-6">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-semibold text-gray-800">
            Recent Transactions
          </h2>
          <NuxtLink
            to="/dashboard/transaction"
            class="text-sm text-green-500 hover:text-green-600 transition-colors"
          >
            View All
          </NuxtLink>
        </div>

        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <div class="bg-red-50 p-2 rounded-lg mr-3">
                <svg
                  class="w-5 h-5 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  ></path>
                </svg>
              </div>
              <div>
                <p class="text-gray-800 font-medium">Tuition Fees</p>
                <p class="text-gray-500 text-sm">21 Sep 2023</p>
              </div>
            </div>
            <p class="text-red-500 font-medium">- Rp250.000</p>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <div class="bg-green-50 p-2 rounded-lg mr-3">
                <svg
                  class="w-5 h-5 text-green-500"
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
                <p class="text-gray-800 font-medium">Schoolarship</p>
                <p class="text-gray-500 text-sm">15 Sep 2023</p>
              </div>
            </div>
            <p class="text-green-500 font-medium">+ Rp1.000.000</p>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <div class="bg-red-50 p-2 rounded-lg mr-3">
                <svg
                  class="w-5 h-5 text-red-500"
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
                <p class="text-gray-800 font-medium">Books</p>
                <p class="text-gray-500 text-sm">10 Sep 2023</p>
              </div>
            </div>
            <p class="text-red-500 font-medium">- Rp75.000</p>
          </div>
        </div>
      </div>

      <!-- Budget progress -->
      <div class="bg-white rounded-lg shadow-sm p-6">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-semibold text-gray-800">Monthly Budget</h2>
          <NuxtLink
            to="/dashboard/budget"
            class="text-sm text-green-500 hover:text-green-600 transition-colors"
          >
            View All
          </NuxtLink>
        </div>

        <div class="space-y-4">
          <div>
            <div class="flex justify-between mb-1">
              <span class="text-gray-700">Food</span>
              <span class="text-gray-700">Rp300.000 / Rp400.000</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div
                class="bg-green-500 h-2 rounded-full"
                style="width: 75%"
              ></div>
            </div>
          </div>

          <div>
            <div class="flex justify-between mb-1">
              <span class="text-gray-700">Transportation</span>
              <span class="text-gray-700">Rp150.000 / Rp200.000</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div
                class="bg-yellow-500 h-2 rounded-full"
                style="width: 85%"
              ></div>
            </div>
          </div>

          <div>
            <div class="flex justify-between mb-1">
              <span class="text-gray-700">Education</span>
              <span class="text-gray-700">Rp250.000 / Rp200.000</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div
                class="bg-red-500 h-2 rounded-full"
                style="width: 100%"
              ></div>
            </div>
          </div>

          <div>
            <div class="flex justify-between mb-1">
              <span class="text-gray-700">Entertaiment</span>
              <span class="text-gray-700">Rp50.000 / Rp100.000</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div
                class="bg-green-500 h-2 rounded-full"
                style="width: 50%"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick actions and tips section -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Quick actions -->
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
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              ></path>
            </svg>
            <span class="text-sm text-gray-700">View Reports</span>
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

      <!-- Daily tips and quotes -->
      <div class="bg-white rounded-lg shadow-sm p-6 md:col-span-2">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">
          Daily Financial Tip
        </h2>

        <div
          class="mb-6 bg-green-50 p-4 rounded-lg border-l-4 border-green-500"
        >
          <h3 class="font-medium text-gray-800 mb-2">
            The 50/30/20 Rule for Student Budgeting
          </h3>
          <p class="text-gray-600">
            Allocate 50% of your income to needs (rent, groceries), 30% to wants
            (entertainment), and 20% to savings and debt payments. This simple
            rule can help you maintain financial balance while enjoying college
            life.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "dashboard",
});

const { user } = useAuth();

// Get user's name for display
const userName = computed(() => {
  return user.value?.full_name || "Student";
});
</script>
