<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
  >
    <div class="bg-white rounded-lg shadow-lg max-w-md w-full">
      <div class="p-6">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">
          {{ isEdit ? "Edit Budget" : "Create New Budget" }}
        </h3>

        <form @submit.prevent="$emit('submit', budgetData)">
          <div class="mb-4">
            <label
              for="budgetCategory"
              class="block text-sm font-medium text-gray-700 mb-2"
            >
              Category
            </label>
            <select
              id="budgetCategory"
              v-model="budgetData.category"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
              required
              :disabled="isEdit"
            >
              <option value="" disabled selected>Select a category</option>
              <option value="food">Food</option>
              <option value="transportation">Transportation</option>
              <option value="education">Education</option>
              <option value="entertainment">Entertainment</option>
              <option value="housing">Housing</option>
              <option value="utilities">Utilities</option>
              <option value="healthcare">Healthcare</option>
              <option value="shopping">Shopping</option>
              <option value="personal">Personal</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div class="mb-4">
            <label
              for="budgetAmount"
              class="block text-sm font-medium text-gray-700 mb-2"
            >
              Budget Amount
            </label>
            <div class="relative">
              <div
                class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
              >
                <span class="text-gray-500">Rp</span>
              </div>
              <input
                type="number"
                id="budgetAmount"
                v-model="budgetData.amount"
                min="1000"
                step="1000"
                placeholder="0"
                class="pl-8 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
                required
              />
            </div>
          </div>

          <div class="mb-4">
            <label
              for="budgetYearMonth"
              class="block text-sm font-medium text-gray-700 mb-2"
            >
              Budget Month
            </label>
            <input
              type="month"
              id="budgetYearMonth"
              v-model="budgetData.yearMonth"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
              required
            />
          </div>

          <div class="mb-4">
            <label
              for="budgetNotes"
              class="block text-sm font-medium text-gray-700 mb-2"
            >
              Notes (Optional)
            </label>
            <textarea
              id="budgetNotes"
              v-model="budgetData.notes"
              rows="4"
              placeholder="Add any notes about this budget"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
            ></textarea>
          </div>

          <div class="mb-4">
            <label class="flex items-center">
              <input
                type="checkbox"
                v-model="budgetData.notifications"
                class="h-4 w-4 text-green-500 focus:ring-green-400 border-gray-300 rounded"
              />
              <span class="ml-2 text-gray-700">
                Get notifications when approaching budget limit
              </span>
            </label>
          </div>

          <div class="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              @click="$emit('close')"
              class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md transition-colors"
            >
              {{ isEdit ? "Update" : "Create" }} Budget
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  show: boolean;
  isEdit?: boolean;
  initialData?: {
    category: string;
    amount: number | null;
    yearMonth: string;
    notes: string;
    notifications: boolean;
  } | null;
}>();

const emit = defineEmits(["close", "submit"]);

// Get current year and month in YYYY-MM format
const now = new Date();
const currentYearMonth = `${now.getFullYear()}-${String(
  now.getMonth() + 1
).padStart(2, "0")}`;

const defaultData = {
  category: "",
  amount: null as number | null,
  yearMonth: currentYearMonth,
  notes: "",
  notifications: true,
};

const budgetData = ref({ ...defaultData });

// Update form data when initialData changes
watch(
  () => props.initialData,
  (newVal) => {
    if (newVal) {
      budgetData.value = {
        ...newVal,
        yearMonth: newVal.yearMonth || currentYearMonth,
      };
    } else {
      budgetData.value = { ...defaultData };
    }
  },
  { immediate: true }
);

// Reset form when modal is closed
watch(
  () => props.show,
  (newVal) => {
    if (!newVal && !props.isEdit) {
      budgetData.value = { ...defaultData };
    }
  }
);

const isEdit = computed(() => props.isEdit || false);
</script>
