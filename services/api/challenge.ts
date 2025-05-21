import { useApiClient } from "./client";
import type { ChallengeListResponse, ChallengeResponse, ActiveChallengesResponse } from "~/types/api";

/**
 * Challenge service for managing challenges
 */
export class ChallengeService {
  private readonly ENDPOINTS = {
    CHALLENGE: "/challenges",
    SUMMARY: "/challenges/summary",
    ACTIVE: "/challenges/active",
  };

  private apiClient;

  constructor() {
    this.apiClient = useApiClient();
  }

  /**
   * Get all challenges
   * @param page Optional page number for pagination
   * @param limit Optional limit of items per page
   */
  async getChallenges(
    page?: number,
    limit?: number
  ): Promise<ChallengeListResponse> {
    const queryParams = new URLSearchParams();
    if (page !== undefined) queryParams.append("page", page.toString());
    if (limit !== undefined) queryParams.append("limit", limit.toString());

    const queryString = queryParams.toString();
    const endpoint = queryString
      ? `${this.ENDPOINTS.CHALLENGE}?${queryString}`
      : this.ENDPOINTS.CHALLENGE;

    const response = await this.apiClient.get<ChallengeListResponse>(endpoint);

    if (response.error) {
      throw new Error(response.error.message);
    }

    return response.data as ChallengeListResponse;
  }

  /**
   * Get a specific challenge
   */
  async getChallenge(id: string | string[]): Promise<ChallengeResponse> {
    const response = await this.apiClient.get<ChallengeResponse>(
      `${this.ENDPOINTS.CHALLENGE}/${id}`
    );

    if (response.error) {
      throw new Error(response.error.message);
    }

    return response.data as ChallengeResponse;
  }

  /**
   * Get active challenges for the current user
   */
  async getActiveChallenges(): Promise<ActiveChallengesResponse> {
    const response = await this.apiClient.get<ActiveChallengesResponse>(
      this.ENDPOINTS.ACTIVE
    );

    if (response.error) {
      throw new Error(response.error.message);
    }

    return response.data as ActiveChallengesResponse;
  }
}

// Create a composable to use the challenge service
export function useChallengeService() {
  return new ChallengeService();
}
