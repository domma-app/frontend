import { useApiClient } from "./client";
import type {
  DashboardDataResponse,
  DashboardSummary,
  DashboardPrediction,
  DailyTip,
} from "~/types/api";

/**
 * Dashboard service for fetching dashboard-related data
 */
export class DashboardService {
  private readonly ENDPOINTS = {
    DASHBOARD: "/dashboard",
    SUMMARY: "/dashboard/summary",
    PREDICTION: "/dashboard/prediction",
    TIPS: "/dashboard/tips",
  };

  private apiClient;

  constructor() {
    this.apiClient = useApiClient();
  }

  /**
   * Get all dashboard data in a single call
   */
  async getDashboardData(): Promise<DashboardDataResponse> {
    const response = await this.apiClient.get<DashboardDataResponse>(
      this.ENDPOINTS.DASHBOARD
    );

    if (response.error) {
      throw new Error(response.error.message);
    }

    return response.data as DashboardDataResponse;
  }

  /**
   * Get only the financial summary data
   */
  async getDashboardSummary(): Promise<{ data: DashboardSummary }> {
    const response = await this.apiClient.get<{ data: DashboardSummary }>(
      this.ENDPOINTS.SUMMARY
    );

    if (response.error) {
      throw new Error(response.error.message);
    }

    return response.data as { data: DashboardSummary };
  }

  /**
   * Get only the prediction data
   */
  async getDashboardPrediction(): Promise<{ data: DashboardPrediction }> {
    const response = await this.apiClient.get<{ data: DashboardPrediction }>(
      this.ENDPOINTS.PREDICTION
    );

    if (response.error) {
      throw new Error(response.error.message);
    }

    return response.data as { data: DashboardPrediction };
  }

  /**
   * Get a daily financial tip
   */
  async getDailyTip(): Promise<{ data: DailyTip }> {
    const response = await this.apiClient.get<{ data: DailyTip }>(
      this.ENDPOINTS.TIPS
    );

    if (response.error) {
      throw new Error(response.error.message);
    }

    return response.data as { data: DailyTip };
  }
}

// Create a composable to use the dashboard service
export function useDashboardService() {
  return new DashboardService();
}
