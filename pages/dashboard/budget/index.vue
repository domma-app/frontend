<template>
  <div>
    <div class="mb-6 flex justify-between items-center">
      <div>
        <h1 class="text-2xl font-bold text-gray-800">Budget Planner</h1>
        <p class="text-gray-600">
          Set and track your spending limits by category
        </p>
      </div>
      <button
        @click="showNewBudgetModal = true"
        class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
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
        New Budget
      </button>
    </div>

    <!-- Budget Summary -->
    <BudgetSummary v-model:selectedMonth="selectedMonth" />

    <!-- Budget Categories -->
    <BudgetCategoriesList
      :categories="budgetCategories"
      @edit="editBudget"
      @delete="deleteBudget"
    />

    <!-- Budget Form Modal -->
    <BudgetFormModal
      :show="showNewBudgetModal || isEditing"
      :is-edit="isEditing"
      :initial-data="editingBudget"
      @close="closeModal"
      @submit="saveBudget"
    />
  </div>
</template>

<script setup lang="ts">
import { budgetIcons } from "~/components/budget/budgetIcons";

definePageMeta({
  layout: "dashboard",
});

// Update to store both year and month
const selectedDate = ref({
  year: new Date().getFullYear(),
  month: new Date().getMonth(),
});

// For compatibility with the BudgetSummary component
const selectedMonth = computed({
  get: () => selectedDate.value.month.toString(),
  set: (value) => {
    selectedDate.value.month = parseInt(value);

    // The event from BudgetSummary includes year changes
    // The year is handled separately in the BudgetSummary component
  },
});

const showNewBudgetModal = ref(false);
const isEditing = ref(false);
const editingCategory = ref("");

// Mock data for budget categories
const budgetData = ref([
  { id: "food", spent: 300000, budget: 400000 },
  { id: "transportation", spent: 150000, budget: 200000 },
  { id: "education", spent: 250000, budget: 200000 },
  { id: "entertainment", spent: 50000, budget: 100000 },
  { id: "housing", spent: 115250, budget: 600000 },
]);

const budgetCategories = computed(() => {
  return budgetData.value.map((budget) => {
    const icon = budgetIcons[budget.id] || budgetIcons.other;
    return {
      id: budget.id,
      name: icon.name,
      spent: budget.spent,
      budget: budget.budget,
      iconPath: icon.iconPath,
      iconColor: icon.iconColor,
    };
  });
});

const editingBudget = computed(() => {
  if (!isEditing.value) return null;

  const budget = budgetData.value.find((b) => b.id === editingCategory.value);
  if (!budget) return null;

  // Format the current year and month for the form
  const currentYearMonth = `${selectedDate.value.year}-${String(
    selectedDate.value.month + 1
  ).padStart(2, "0")}`;

  return {
    category: budget.id,
    amount: budget.budget,
    yearMonth: currentYearMonth,
    notes: "",
    notifications: true,
  };
});

function editBudget(category: string) {
  isEditing.value = true;
  editingCategory.value = category;
}

function deleteBudget(category: string) {
  if (
    confirm(
      `Are you sure you want to delete the ${
        budgetIcons[category]?.name || category
      } budget?`
    )
  ) {
    budgetData.value = budgetData.value.filter((b) => b.id !== category);
    alert(`Budget for ${budgetIcons[category]?.name || category} deleted!`);
  }
}

function closeModal() {
  showNewBudgetModal.value = false;
  isEditing.value = false;
  editingCategory.value = "";
}

function saveBudget(budgetFormData: any) {
  // Extract year and month from the yearMonth string (format: YYYY-MM)
  const [year, month] = budgetFormData.yearMonth.split("-").map(Number);

  if (isEditing.value) {
    // Update existing budget
    const index = budgetData.value.findIndex(
      (b) => b.id === editingCategory.value
    );
    if (index !== -1) {
      budgetData.value[index].budget = budgetFormData.amount;
      alert(
        `Budget for ${
          budgetIcons[editingCategory.value]?.name || editingCategory.value
        } updated for ${month}/${year}!`
      );
    }
  } else {
    // Create new budget
    budgetData.value.push({
      id: budgetFormData.category,
      spent: 0,
      budget: budgetFormData.amount,
    });
    alert(
      `Budget for ${
        budgetIcons[budgetFormData.category]?.name || budgetFormData.category
      } created for ${month}/${year}!`
    );
  }

  closeModal();
}
</script>
