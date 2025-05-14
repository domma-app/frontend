import { useApiClient } from "./client";
import type {
  TransactionRequest,
  Transaction,
  TransactionResponse,
  TransactionListResponse,
  TransactionDeleteResponse,
  TransactionRecurring,
  TransactionSummaryResponse,
  TransactionUpdateRequest
} from "~/types/api";

/**
 * Transaction service for managing transactions
 */
export class TransactionService {
  private readonly ENDPOINTS = {
    TRANSACTIONS: "/transactions",
    SUMMARY: "/transactions/summary",
  };

  private apiClient;

  constructor() {
    this.apiClient = useApiClient();
  }

  /**
   * Create a new transaction
   */
  async createTransaction(
    transactionData: TransactionRequest
  ): Promise<TransactionResponse> {
    const response = await this.apiClient.post<TransactionResponse>(
      this.ENDPOINTS.TRANSACTIONS,
      transactionData
    );

    if (response.error) {
      throw new Error(response.error.message);
    }

    return response.data as TransactionResponse;
  }

  /**
   * Get all transactions
   */
  async getTransactions(): Promise<TransactionListResponse> {
    const response = await this.apiClient.get<TransactionListResponse>(
      this.ENDPOINTS.TRANSACTIONS
    );

    if (response.error) {
      throw new Error(response.error.message);
    }

    return response.data as TransactionListResponse;
  }

  /**
   * Get a specific transaction
   */
  async getTransaction(id: string | number): Promise<TransactionResponse> {
    const response = await this.apiClient.get<TransactionResponse>(
      `${this.ENDPOINTS.TRANSACTIONS}/${id}`
    );

    if (response.error) {
      throw new Error(response.error.message);
    }

    return response.data as TransactionResponse;
  }

  /**
   * Update a transaction
   */
  async updateTransaction(
    id: string | number,
    transactionData: TransactionUpdateRequest
  ): Promise<TransactionResponse> {
    // Make sure we're not sending empty objects for recurring
    if (transactionData.recurring && Object.keys(transactionData.recurring).length === 0) {
      transactionData.recurring = null;
    }
    
    // Clean up the data to remove any undefined or empty values
    const cleanData = Object.fromEntries(
      Object.entries(transactionData).filter(
        ([_, value]) => value !== undefined && value !== ""
      )
    );
    
    const response = await this.apiClient.put<TransactionResponse>(
      `${this.ENDPOINTS.TRANSACTIONS}/${id}`,
      cleanData
    );

    if (response.error) {
      throw new Error(response.error.message);
    }

    return response.data as TransactionResponse;
  }

  /**
   * Delete a transaction
   */
  async deleteTransaction(id: string | number): Promise<TransactionDeleteResponse> {
    const response = await this.apiClient.delete<TransactionDeleteResponse>(
      `${this.ENDPOINTS.TRANSACTIONS}/${id}`
    );

    if (response.error) {
      throw new Error(response.error.message);
    }

    return response.data as TransactionDeleteResponse;
  }

  /**
   * Get transaction summary
   */
  async getTransactionSummary(): Promise<TransactionSummaryResponse> {
    const response = await this.apiClient.get<TransactionSummaryResponse>(
      this.ENDPOINTS.SUMMARY
    );

    if (response.error) {
      throw new Error(response.error.message);
    }

    return response.data as TransactionSummaryResponse;
  }
}

// Create a composable to use the transaction service
export function useTransactionService() {
  return new TransactionService();
}
