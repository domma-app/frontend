<template>
  <div>
    <div class="mb-6">
      <div class="flex items-center">
        <NuxtLink
          to="/transaction"
          class="mr-2 text-gray-500 hover:text-gray-700"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            ></path>
          </svg>
        </NuxtLink>
        <h1 class="text-2xl font-bold text-gray-800">Add New Transaction</h1>
      </div>
      <p>Record your income or expense</p>
    </div>

    <div class="bg-white rounded-lg p-6 shadow-sm">
      <form>
        <!-- Transaction Type -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Transaction Type
          </label>
          <div class="flex space-x-4">
            <label class="flex items-center">
              <input
                type="radio"
                name="transaction_type"
                value="expense"
                v-model="transaction.type"
                class="h-4w-4 text-green-500 border-gray-300 focus:ring-green-400"
              />
              <span class="ml-2 text-gray-700">Expense</span>
            </label>
            <label>
              <input
                type="radio"
                name="transaction_type"
                value="income"
                v-model="transaction.type"
                class="h-4w-4 text-green-500 border-gray-300 focus:ring-green-400"
              />
              <span class="ml-2 text-gray-700">Income</span>
            </label>
          </div>
        </div>

        <!-- Amount -->
        <div class="mb-6">
          <label
            for="amount"
            class="block text-sm font-medium text-gray-700 mb-2"
          >
            Amount
          </label>
          <div class="relative">
            <div
              class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
            >
              <span class="text-gray-500">Rp</span>
            </div>
            <input
              type="number"
              id="amount"
              min="1000"
              step="1000"
              placeholder="1000"
              v-model="transaction.amount"
              class="pl-8 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
              required
            />
          </div>
        </div>

        <!-- Description -->
        <div class="mb-6">
          <label
            for="description"
            class="block text-sm font-medium text-gray-700 mb-2"
          >
            Description
          </label>
          <input
            type="text"
            id="description"
            placeholder="What is this transaction for?"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
            required
          />
        </div>

        <!-- Category -->
        <div class="mb-6">
          <label
            for="category"
            class="block text-sm font-medium text-gray-700 mb-2"
            >Category</label
          >
          <div>
            <select
              id="category"
              v-model="transaction.category"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
              required
            >
              <option value="" disabled selected>Select Category</option>
              <optgroup
                v-if="transaction.type === 'expense'"
                label="Expense Categories"
              >
                <option value="food">Food</option>
                <option value="transportation">Transportation</option>
                <option value="education">education</option>
                <option value="entertainment">Entertainment</option>
                <option value="housing">Housing</option>
                <option value="utilities">Utilities</option>
                <option value="healthcare">Healthcare</option>
                <option value="other_expense">Other</option>
              </optgroup>
              <optgroup
                v-if="transaction.type === 'income'"
                label="Income Categories"
              >
                <option value="salary">Salary</option>
                <option value="scholarship">Scholarship</option>
                <option value="gift">Gift</option>
                <option value="investment">Investment</option>
                <option value="other_income">Other</option>
              </optgroup>
            </select>
          </div>
        </div>

        <!-- Date and Time -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label
              for="date"
              class="block text-sm font-medium text-gray-700 mb-2"
              >Date</label
            >
            <input
              type="date"
              id="date"
              v-model="transaction.date"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label
              for="time"
              class="block text-sm font-medium text-gray-700 mb-2"
              >Time</label
            >
            <input
              type="time"
              id="time"
              v-model="transaction.time"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
              required
            />
          </div>
        </div>

        <!-- Payment Method -->
        <div class="mb-6">
          <label
            for="payment_method"
            class="block text-sm font-medium text-gray-700 mb-2"
            >Payment Method</label
          >
          <select
            id="payment_method"
            v-model="transaction.paymentMethod"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
            required
          >
            <option value="" disabled selected>Select Payment Method</option>
            <option value="cash">Cash</option>
            <option value="debit_card">Debit Card</option>
            <option value="credit_card">Credit Card</option>
            <option value="bank_transfer">Bank Transfer</option>
            <option value="mobile_payment">Mobile Payment</option>
            <option value="other">Other</option>
          </select>
        </div>

        <!-- Notes -->
        <div class="mb-6">
          <label
            for="notes"
            class="block text-sm font-medium text-gray-700 mb-2"
            >Notes (Optional)</label
          >
          <textarea
            id="notes"
            v-model="transaction.notes"
            rows="5"
            placeholder="Add additional details about this transaction"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
          ></textarea>
        </div>

        <!-- Submit buttons -->
        <div class="flex justify-between">
          <NuxtLink
            to="/transaction"
            class="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Back
          </NuxtLink>

          <button
            type="submit"
            class="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Save Transaction
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
// Get today's date and current time for defaults
const today = new Date();
const formattedDate = today.toISOString().split("T")[0];
const hours = String(today.getHours()).padStart(2, "0");
const minutes = String(today.getMinutes()).padStart(2, "0");
const formattedTime = `${hours}:${minutes}`;

// Transaction data
const transaction = ref({
  type: "expense",
  amount: "",
  description: "",
  category: "",
  date: formattedDate,
  time: formattedTime,
  paymentMethod: "",
  notes: "",
  isRecurring: false,
  recurring: {
    frequency: "monthly",
    endType: "never",
    endDate: "",
    occurrences: 1,
  },
});
</script>
