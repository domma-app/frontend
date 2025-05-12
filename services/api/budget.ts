import { useApiClient } from "./client";
import type {
  BudgetRequest,
  Budget,
  BudgetResponse,
  BudgetListResponse
} from "~/types/api";

/**
 * Budget service for managing budgets
 */
export class BudgetService {
  private readonly ENDPOINTS = {
    BUDGETS: "/budgets",
  };

  private apiClient;

  constructor() {
    this.apiClient = useApiClient();
  }

  /**
   * Create a new budget
   */
  async createBudget(
    budgetData: BudgetRequest
  ): Promise<BudgetResponse> {
    const response = await this.apiClient.post<BudgetResponse>(
      this.ENDPOINTS.BUDGETS,
      budgetData
    );

    if (response.error) {
      throw new Error(response.error.message);
    }

    return response.data as BudgetResponse;
  }

  /**
   * Get all budgets
   */
  async getBudgets(): Promise<BudgetListResponse> {
    const response = await this.apiClient.get<BudgetListResponse>(
      this.ENDPOINTS.BUDGETS
    );

    if (response.error) {
      throw new Error(response.error.message);
    }

    return response.data as BudgetListResponse;
  }
}

// Create a composable to use the budget service
export function useBudgetService() {
  return new BudgetService();
} 