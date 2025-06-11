<template>
  <div class="bg-white rounded-lg shadow-sm p-6">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-semibold text-gray-800">Financial Goals</h2>
      <button
        @click="showAddGoalForm = true"
        class="px-3 py-1.5 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors text-sm flex items-center"
      >
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
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          ></path>
        </svg>
        Add Goal
      </button>
    </div>

    <!-- Form status alerts -->
    <div v-if="formStatus.message" class="mb-4">
      <div
        class="p-4 rounded-md"
        :class="
          formStatus.type === 'success'
            ? 'bg-green-50 text-green-700'
            : 'bg-red-50 text-red-700'
        "
      >
        {{ formStatus.message }}
      </div>
    </div>

    <!-- Goals list -->
    <div v-if="goals.length > 0" class="space-y-4">
      <div
        v-for="(goal, index) in goals"
        :key="index"
        class="border border-gray-200 rounded-lg p-4"
      >
        <div class="flex justify-between items-start">
          <div>
            <h3 class="font-medium text-gray-800">{{ goal.name }}</h3>
            <p class="text-sm text-gray-500">{{ goal.description }}</p>
          </div>
          <div class="flex space-x-2">
            <button
              @click="editGoal(index)"
              class="p-1.5 text-gray-500 hover:text-green-500 transition-colors"
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
              @click="deleteGoal(index)"
              class="p-1.5 text-gray-500 hover:text-red-500 transition-colors"
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

        <div class="mt-3">
          <div class="flex justify-between text-sm mb-1">
            <span>Target: {{ formatCurrency(goal.targetAmount) }}</span>
            <span>{{ formatCurrency(goal.currentAmount) }} saved</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2">
            <div
              class="bg-green-500 h-2 rounded-full"
              :style="{
                width:
                  calculateProgress(goal.currentAmount, goal.targetAmount) +
                  '%',
              }"
            ></div>
          </div>
          <div class="flex justify-between text-xs text-gray-500 mt-1">
            <span
              >{{ calculateProgress(goal.currentAmount, goal.targetAmount) }}%
              complete</span
            >
            <span>Target date: {{ formatDate(goal.targetDate) }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty state -->
    <div v-else class="py-8 flex flex-col items-center justify-center">
      <div class="bg-gray-100 p-4 rounded-full mb-4">
        <svg
          class="w-8 h-8 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          ></path>
        </svg>
      </div>
      <h3 class="text-lg font-medium text-gray-800 mb-1">
        No financial goals yet
      </h3>
      <p class="text-gray-500 text-center mb-4">
        Set financial goals to track your progress and achieve your dreams
      </p>
      <button
        @click="showAddGoalForm = true"
        class="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
      >
        Create Your First Goal
      </button>
    </div>

    <!-- Tips section -->
    <div class="mt-6 pt-6 border-t border-gray-100">
      <h3 class="text-lg font-medium text-gray-800 mb-3">
        Tips for Setting Financial Goals
      </h3>
      <div class="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
        <ul class="text-sm text-gray-700 space-y-2">
          <li class="flex items-start">
            <svg
              class="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5"
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
            <span
              >Make your goals <strong>specific</strong> and
              <strong>measurable</strong></span
            >
          </li>
          <li class="flex items-start">
            <svg
              class="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5"
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
            <span>Set realistic timeframes to avoid disappointment</span>
          </li>
          <li class="flex items-start">
            <svg
              class="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5"
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
            <span>Break large goals into smaller milestones</span>
          </li>
          <li class="flex items-start">
            <svg
              class="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5"
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
            <span>Regularly review and adjust your goals as needed</span>
          </li>
        </ul>
      </div>
    </div>

    <!-- Add/Edit Goal Modal -->
    <div
      v-if="showAddGoalForm || editingGoalIndex !== null"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-lg p-6 max-w-md w-full">
        <h3 class="text-lg font-semibold mb-4">
          {{ editingGoalIndex !== null ? "Edit Goal" : "Add New Goal" }}
        </h3>

        <form @submit.prevent="saveGoal" class="space-y-4">
          <div>
            <label
              for="goalName"
              class="block text-sm font-medium text-gray-700 mb-1"
            >
              Goal Name
            </label>
            <input
              id="goalName"
              v-model="goalForm.name"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
              required
              placeholder="e.g., New Laptop"
            />
          </div>

          <div>
            <label
              for="goalDescription"
              class="block text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <textarea
              id="goalDescription"
              v-model="goalForm.description"
              rows="2"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
              placeholder="What are you saving for?"
            ></textarea>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                for="targetAmount"
                class="block text-sm font-medium text-gray-700 mb-1"
              >
                Target Amount
              </label>
              <div class="relative">
                <div
                  class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                >
                  <span class="text-gray-500">Rp</span>
                </div>
                <input
                  id="targetAmount"
                  v-model="goalForm.targetAmount"
                  type="number"
                  min="0"
                  class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>
            </div>

            <div>
              <label
                for="currentAmount"
                class="block text-sm font-medium text-gray-700 mb-1"
              >
                Current Amount
              </label>
              <div class="relative">
                <div
                  class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                >
                  <span class="text-gray-500">Rp</span>
                </div>
                <input
                  id="currentAmount"
                  v-model="goalForm.currentAmount"
                  type="number"
                  min="0"
                  class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>
            </div>
          </div>

          <div>
            <label
              for="targetDate"
              class="block text-sm font-medium text-gray-700 mb-1"
            >
              Target Date
            </label>
            <input
              id="targetDate"
              v-model="goalForm.targetDate"
              type="date"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>

          <div class="flex justify-end space-x-3 pt-2">
            <button
              type="button"
              class="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
              @click="cancelGoalForm"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
              :disabled="isSubmitting"
            >
              {{ isSubmitting ? "Saving..." : "Save Goal" }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div
      v-if="showDeleteConfirm !== null"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-lg p-6 max-w-md w-full">
        <h3 class="text-lg font-semibold mb-4">Delete Goal?</h3>
        <p class="text-gray-600 mb-4">
          Are you sure you want to delete this goal? This action cannot be
          undone.
        </p>
        <div class="flex justify-end space-x-3">
          <button
            type="button"
            class="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
            @click="showDeleteConfirm = null"
          >
            Cancel
          </button>
          <button
            type="button"
            class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
            @click="confirmDeleteGoal"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const isSubmitting = ref(false);
const formStatus = ref({
  message: "",
  type: "success", // 'success' or 'error'
});

// Goals management
const showAddGoalForm = ref(false);
const editingGoalIndex = ref<number | null>(null);
const showDeleteConfirm = ref<number | null>(null);

// Goals data
const goals = ref<
  Array<{
    id: string;
    name: string;
    description: string;
    targetAmount: number;
    currentAmount: number;
    targetDate: string;
  }>
>([]);

// Goal form
const goalForm = ref({
  name: "",
  description: "",
  targetAmount: 0,
  currentAmount: 0,
  targetDate: "",
});

// Format currency
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// Calculate progress percentage
const calculateProgress = (current: number, target: number) => {
  if (target === 0) return 0;
  const percentage = (current / target) * 100;
  return Math.min(Math.round(percentage), 100);
};

// Edit goal
const editGoal = (index: number) => {
  editingGoalIndex.value = index;
  const goal = goals.value[index];
  goalForm.value = {
    name: goal.name,
    description: goal.description,
    targetAmount: goal.targetAmount,
    currentAmount: goal.currentAmount,
    targetDate: goal.targetDate,
  };
  showAddGoalForm.value = false;
};

// Delete goal
const deleteGoal = (index: number) => {
  showDeleteConfirm.value = index;
};

// Confirm delete goal
const confirmDeleteGoal = async () => {
  try {
    if (showDeleteConfirm.value === null) return;

    const goalId = goals.value[showDeleteConfirm.value].id;

    // Simulate API call with timeout
    await new Promise((resolve) => setTimeout(resolve, 500));

    // TODO: Make API call to delete the goal

    // Remove the goal from the list
    goals.value.splice(showDeleteConfirm.value, 1);

    showDeleteConfirm.value = null;

    formStatus.value = {
      message: "Goal deleted successfully.",
      type: "success",
    };

    // Clear the message after 3 seconds
    setTimeout(() => {
      formStatus.value.message = "";
    }, 3000);
  } catch (error) {
    formStatus.value = {
      message: "Failed to delete goal. Please try again.",
      type: "error",
    };
  }
};

// Save goal
const saveGoal = async () => {
  try {
    isSubmitting.value = true;

    // Simulate API call with timeout
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // TODO: Prepare goal data for API

    if (editingGoalIndex.value !== null) {
      // Update existing goal
      goals.value[editingGoalIndex.value] = {
        ...goals.value[editingGoalIndex.value],
        name: goalForm.value.name,
        description: goalForm.value.description,
        targetAmount: goalForm.value.targetAmount,
        currentAmount: goalForm.value.currentAmount,
        targetDate: goalForm.value.targetDate,
      };

      formStatus.value = {
        message: "Goal updated successfully!",
        type: "success",
      };
    } else {
      // Add new goal
      goals.value.push({
        id: Date.now().toString(), // Generate a temporary ID
        name: goalForm.value.name,
        description: goalForm.value.description,
        targetAmount: goalForm.value.targetAmount,
        currentAmount: goalForm.value.currentAmount,
        targetDate: goalForm.value.targetDate,
      });

      formStatus.value = {
        message: "New goal added successfully!",
        type: "success",
      };
    }

    // Reset form and close modal
    resetGoalForm();

    // Clear the message after 3 seconds
    setTimeout(() => {
      formStatus.value.message = "";
    }, 3000);
  } catch (error) {
    formStatus.value = {
      message: "Failed to save goal. Please try again.",
      type: "error",
    };
  } finally {
    isSubmitting.value = false;
  }
};

// Cancel goal form
const cancelGoalForm = () => {
  resetGoalForm();
};

// Reset goal form
const resetGoalForm = () => {
  goalForm.value = {
    name: "",
    description: "",
    targetAmount: 0,
    currentAmount: 0,
    targetDate: "",
  };
  showAddGoalForm.value = false;
  editingGoalIndex.value = null;
};

// Load goals when component mounts
onMounted(async () => {
  try {
    // Use sample data for demonstration
    goals.value = [
      {
        id: "1",
        name: "Emergency Fund",
        description: "Three months of living expenses for emergencies",
        targetAmount: 6000000,
        currentAmount: 2500000,
        targetDate: "2025-12-31",
      },
      {
        id: "2",
        name: "New Laptop",
        description: "For university projects and assignments",
        targetAmount: 12000000,
        currentAmount: 3500000,
        targetDate: "2025-08-15",
      },
      {
        id: "3",
        name: "Vacation",
        description: "Trip to Bali after graduation",
        targetAmount: 8000000,
        currentAmount: 1500000,
        targetDate: "2026-06-30",
      },
    ];

    // TODO: Get financial goals from API
  } catch (error) {
    console.error("Error loading financial goals:", error);
  }
});
</script>
