<template>
  <div>
    <div class="mb-6">
      <div class="flex items-center">
        <NuxtLink
          to="/dashboard/transaction"
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
      <form @submit.prevent="submitTransaction">
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
            v-model="transaction.description"
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

        <!-- Recurring Transaction -->
        <div class="mb-6">
          <label class="flex items-center">
            <input
              type="checkbox"
              v-model="transaction.isRecurring"
              class="h-4 w-4 text-green-500 focus:ring-green-400 border-gray-300 rounded"
            />
            <span class="ml-2 text-gray-700"
              >This is a recurring transaction
            </span>
          </label>
        </div>

        <div
          v-if="transaction.isRecurring"
          class="mb-6 p-4 bg-gray-50 rounded-lg"
        >
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Frequency
          </label>
          <div class="flex flex-wrap gap-3">
            <label class="flex items-center">
              <input
                type="radio"
                name="frequency"
                value="daily"
                v-model="transaction.recurring.frequency"
                class="h-4 w-4 text-green-500 focus:ring-green-400 border-gray-300"
              />
              <span class="ml-2 text-gray-700">Daily</span>
            </label>
            <label class="flex items-center">
              <input
                type="radio"
                name="frequency"
                value="weekly"
                v-model="transaction.recurring.frequency"
                class="h-4 w-4 text-green-500 focus:ring-green-400 border-gray-300"
              />
              <span class="ml-2 text-gray-700">Weekly</span>
            </label>
            <label class="flex items-center">
              <input
                type="radio"
                name="frequency"
                value="monthly"
                v-model="transaction.recurring.frequency"
                class="h-4 w-4 text-green-500 focus:ring-green-400 border-gray-300"
              />
              <span class="ml-2 text-gray-700">Monthly</span>
            </label>
            <label class="flex items-center">
              <input
                type="radio"
                name="frequency"
                value="yearly"
                v-model="transaction.recurring.frequency"
                class="h-4 w-4 text-green-500 focus:ring-green-400 border-gray-300"
              />
              <span class="ml-2 text-gray-700">Yearly</span>
            </label>
          </div>
          <div class="mt-4">
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >End Date</label
            >
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <label class="flex items-center">
                <input
                  type="radio"
                  name="end_type"
                  value="never"
                  v-model="transaction.recurring.endType"
                  class="h-4 w-4 text-green-500 focus:ring-green-400 border-gray-300"
                />
                <span class="ml-2 text-gray-700">Never</span>
              </label>

              <label class="flex items-center">
                <input
                  type="radio"
                  name="end_type"
                  value="on_date"
                  v-model="transaction.recurring.endType"
                  class="h-4 w-4 text-green-500 focus:ring-green-400 border-gray-300"
                />
                <span class="ml-2 text-gray-700">On Date</span>
              </label>

              <label class="flex items-center">
                <input
                  type="radio"
                  name="end_type"
                  value="after_occurrences"
                  v-model="transaction.recurring.endType"
                  class="h-4 w-4 text-green-500 focus:ring-green-400 border-gray-300"
                />
                <span class="ml-2 text-gray-700">After Occurrences</span>
              </label>
            </div>

            <div
              class="mt-3"
              v-if="transaction.recurring.endType === 'on_date'"
            >
              <input
                type="date"
                v-model="transaction.recurring.endDate"
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
              />
            </div>

            <div
              class="mt-3"
              v-if="transaction.recurring.endType === 'after_occurrences'"
            >
              <div class="flex items-center">
                <input
                  type="number"
                  min="1"
                  v-model="transaction.recurring.occurrences"
                  class="block w-24 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
                />
                <span class="ml-2 text-gray-700">occurrences</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Submit buttons -->
        <div class="flex justify-between">
          <NuxtLink
            to="/dashboard/transaction"
            class="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Back
          </NuxtLink>

          <button
            type="submit"
            class="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-colors"
            :disabled="loading"
          >
            <span v-if="loading" class="flex items-center">
              <svg
                class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Saving...
            </span>
            <span v-else>Save Transaction</span>
          </button>
        </div>
      </form>

      <!-- Success message -->
      <div
        v-if="success"
        class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      >
        <div class="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
          <div class="text-center">
            <div
              class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4"
            >
              <svg
                class="h-6 w-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>
            <h3 class="text-lg font-medium text-gray-900">
              Transaction Saved!
            </h3>
            <p class="mt-2 text-sm text-gray-600">
              Your transaction has been successfully saved.
            </p>
            <div class="mt-4">
              <button
                @click="goToTransactions"
                class="mt-3 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Error message -->
      <div v-if="error" class="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
        {{ error }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTransactionService } from "~/services/api/transaction";
import type { TransactionRequest, TransactionRecurring } from "~/types/api";

definePageMeta({
  layout: "dashboard",
});

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

const loading = ref(false);
const error = ref("");
const success = ref(false);
const router = useRouter();
const transactionService = useTransactionService();

async function submitTransaction() {
  try {
    loading.value = true;
    error.value = "";

    // Prepare API request payload
    const payload: TransactionRequest = {
      amount: Number(transaction.value.amount),
      type: transaction.value.type as "income" | "expense",
      description: transaction.value.description,
      category: transaction.value.category,
      transaction_date: transaction.value.date,
      transaction_time: transaction.value.time,
      payment_method: transaction.value.paymentMethod,
      notes: transaction.value.notes || undefined,
    };

    // Add recurring data if enabled
    if (transaction.value.isRecurring) {
      const recurring: TransactionRecurring = {
        frequency: transaction.value.recurring.frequency as
          | "daily"
          | "weekly"
          | "monthly"
          | "yearly",
        end_type: transaction.value.recurring.endType as
          | "never"
          | "on_date"
          | "after_occurrences",
      };

      // Add the appropriate end date or occurrences based on the end type
      if (recurring.end_type === "on_date") {
        recurring.end_date = transaction.value.recurring.endDate;
      } else if (recurring.end_type === "after_occurrences") {
        recurring.occurrences = Number(transaction.value.recurring.occurrences);
      }

      payload.recurring = recurring;
    }

    // Call the API
    const response = await transactionService.createTransaction(payload);

    if (!response.status) {
      throw new Error(response.message || "Failed to create transaction");
    }

    // Show success message
    success.value = true;

    // Auto-redirect after 5 seconds if user doesn't click Continue
    const redirectTimer = setTimeout(() => {
      goToTransactions();
    }, 5000);

    // Store the timer so it can be cancelled if user clicks Continue
    window.sessionStorage.setItem("redirectTimer", redirectTimer.toString());
  } catch (err) {
    error.value =
      err instanceof Error ? err.message : "Failed to create transaction";
    console.error("Transaction creation error:", err);
  } finally {
    loading.value = false;
  }
}

function goToTransactions() {
  // Clear any existing redirect timer
  const timerId = window.sessionStorage.getItem("redirectTimer");
  if (timerId) {
    clearTimeout(parseInt(timerId));
    window.sessionStorage.removeItem("redirectTimer");
  }

  router.push("/dashboard/transaction");
}
</script>
