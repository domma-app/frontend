import { useApiClient } from "./client";
import type {
  BudgetRequest,
  Budget,
  BudgetResponse,
  BudgetListResponse,
  BudgetSummaryResponse,
  BudgetDeleteResponse,
} from "~/types/api";

/**
 * Budget service for managing budgets
 */
export class BudgetService {
  private readonly ENDPOINTS = {
    BUDGETS: "/budgets",
    SUMMARY: "/budgets/summary",
  };

  private apiClient;

  constructor() {
    this.apiClient = useApiClient();
  }

  /**
   * Create a new budget
   */
  async createBudget(budgetData: BudgetRequest): Promise<BudgetResponse> {
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
  async getBudgets(filters?: { category?: string; month_year?: string }): Promise<BudgetListResponse> {
    let endpoint = this.ENDPOINTS.BUDGETS;
    
    // Add query parameters if filters are provided
    if (filters) {
      const queryParams = new URLSearchParams();
      
      if (filters.category && filters.category !== 'all') {
        queryParams.append('category', filters.category);
      }
      
      if (filters.month_year) {
        queryParams.append('month_year', filters.month_year);
      }
      
      const queryString = queryParams.toString();
      if (queryString) {
        endpoint += `?${queryString}`;
      }
    }
    
    const response = await this.apiClient.get<BudgetListResponse>(endpoint);

    if (response.error) {
      throw new Error(response.error.message);
    }

    return response.data as BudgetListResponse;
  }

  /**
   * Update an existing budget
   */
  async updateBudget(
    id: string,
    budgetData: BudgetRequest
  ): Promise<BudgetResponse> {
    const response = await this.apiClient.put<BudgetResponse>(
      `${this.ENDPOINTS.BUDGETS}/${id}`,
      budgetData
    );

    if (response.error) {
      throw new Error(response.error.message);
    }

    return response.data as BudgetResponse;
  }

  /**
   * Delete a budget
   */
  async deleteBudget(id: string): Promise<BudgetDeleteResponse> {
    const response = await this.apiClient.delete<BudgetDeleteResponse>(
      `${this.ENDPOINTS.BUDGETS}/${id}`
    );

    if (response.error) {
      throw new Error(response.error.message);
    }

    return response.data as BudgetDeleteResponse;
  }

  /**
   * Get budget summary for a specific month and year
   */
  async getBudgetSummary(monthYear: string): Promise<BudgetSummaryResponse> {
    const response = await this.apiClient.get<BudgetSummaryResponse>(
      `${this.ENDPOINTS.SUMMARY}?month_year=${monthYear}`
    );

    if (response.error) {
      throw new Error(response.error.message);
    }

    return response.data as BudgetSummaryResponse;
  }
}

// Create a composable to use the budget service
export function useBudgetService() {
  return new BudgetService();
}
