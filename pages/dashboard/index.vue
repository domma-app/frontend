<template>
  <div>
    <!-- Welcome section -->
    <WelcomeSection :summary-data="dashboardData.summary" />

    <!-- Prediction section -->
    <PredictionSection :prediction-data="dashboardData.prediction" />

    <!-- Recent transactions and budgets section -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <!-- Recent transactions -->
      <RecentTransactions />

      <!-- Budget progress -->
      <BudgetProgress />
    </div>

    <!-- Quick actions and tips section -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Quick actions -->
      <QuickActions />

      <!-- Daily tips and quotes -->
      <DailyTips :daily-tip="dashboardData.tip" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDashboardService } from "~/services";
import type {
  DashboardSummary,
  DashboardPrediction,
  DailyTip,
} from "~/types/api";

definePageMeta({
  layout: "dashboard",
});

// Dashboard data with default values
const dashboardData = ref({
  summary: {
    balance: 125000,
    balanceChange: 8,
    income: 40000,
    expenses: 10000,
    remaining: 30000,
    goalTarget: 1000000,
    goalProgress: 65,
  } as DashboardSummary,
  prediction: {
    predictedExpenses: 82000,
    expenseChangePercent: 9.3,
    topExpenseCategory: "Housing",
    topExpensePercentage: 35,
    recommendedSavings: 300000,
  } as DashboardPrediction,
  tip: {
    title: "The 50/30/20 Rule for Student Budgeting",
    content:
      "Allocate 50% of your income to needs (rent, groceries), 30% to wants (entertainment), and 20% to savings and debt payments. This simple rule can help you maintain financial balance while enjoying college life.",
  } as DailyTip,
});

// Fetch dashboard data on component mount
onMounted(async () => {
  try {
    const dashboardService = useDashboardService();
    const response = await dashboardService.getDashboardData();

    // Update the dashboard data with the response
    if (response && response.data) {
      dashboardData.value = response.data;
    }
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
  }
});
</script>
